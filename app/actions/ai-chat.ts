"use server";

/** AI chat turn endpoint.
 *
 * One visitor message in, one assistant turn out. The heavy lifting —
 * knowledge, rules, field contract — lives in lib/ai; this action owns
 * the guards and the Anthropic call:
 *
 * - No ANTHROPIC_API_KEY, a rate limit, the daily cap, or any API
 *   failure returns { fallback: true } and the UI switches to the guided
 *   steps. The chat is never a dead end.
 * - Per-IP sliding window plus a site-wide daily message cap bound the
 *   API spend; both use Upstash when configured and an in-memory store
 *   otherwise, the same pattern as send-inquiry.
 * - Model output is parsed and sanitized by lib/ai/intake before it
 *   reaches the visitor; readiness for the review card is computed
 *   server-side, never taken from the model's word.
 */

import { headers } from "next/headers";
import { Ratelimit } from "@upstash/ratelimit";
import { buildAiChatSystemPrompt } from "@/lib/ai/knowledge";
import { screenAiReply } from "@/lib/ai/output-guard";
import {
  isAiChatPath,
  parseAiChatTurn,
  sanitizeIntakeFields,
  type AiChatPath,
  type AiChatTurn,
} from "@/lib/ai/intake";
import type { GuidedChatAnswers } from "@/lib/guided-chat/payloads";
import { getClientIp } from "@/lib/security/client-ip";
import { redis } from "@/lib/redis/upstash";

const MODEL = process.env.ANTHROPIC_CHAT_MODEL || "claude-haiku-5-5";
const API_URL = "https://api.anthropic.com/v1/messages";
const MAX_HISTORY_TURNS = 20;
const MAX_CONVERSATION_MESSAGES = 40; // ~20 visitor turns, then hand over
const MAX_MESSAGE_LENGTH = 2_000;
const IP_LIMIT_MAX = 20;
const IP_LIMIT_WINDOW_MS = 10 * 60_000; // 10 minutes
const DAILY_CAP = 500;

export type AiChatClientMessage = { role: "user" | "assistant"; content: string };

export type AiChatActionResult =
  | { ok: true; turn: AiChatTurn }
  | {
      ok: false;
      fallback: true;
      reason:
        | "not-configured"
        | "rate-limited"
        | "daily-cap"
        | "turn-limit"
        | "api-error"
        | "bad-request";
    };

// ── Guards ─────────────────────────────────────────────────────

const ipRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(IP_LIMIT_MAX, "10 m"),
      analytics: true,
      prefix: "@upstash/ratelimit/ai-chat-ip",
    })
  : null;

const ipMemoryMap = new Map<string, { count: number; resetAt: number }>();

async function ipAllowed(ip: string): Promise<boolean> {
  if (ipRateLimiter) {
    try {
      const result = await ipRateLimiter.limit(ip);
      return result.success;
    } catch (err) {
      console.warn("AI chat: Upstash rate limit failed, falling back to memory.", err);
    }
  }
  const now = Date.now();
  const entry = ipMemoryMap.get(ip);
  if (!entry || now > entry.resetAt) {
    ipMemoryMap.set(ip, { count: 1, resetAt: now + IP_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= IP_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

const dailyMemory = { day: "", count: 0 };

function manilaDayKey(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Manila" });
}

async function underDailyCap(): Promise<boolean> {
  const day = manilaDayKey();
  if (redis) {
    try {
      const key = `ai-chat:daily:${day}`;
      const count = await redis.incr(key);
      if (count === 1) {
        await redis.expire(key, 60 * 60 * 36);
      }
      return count <= DAILY_CAP;
    } catch (err) {
      console.warn("AI chat: Upstash daily cap failed, falling back to memory.", err);
    }
  }
  if (dailyMemory.day !== day) {
    dailyMemory.day = day;
    dailyMemory.count = 0;
  }
  dailyMemory.count++;
  return dailyMemory.count <= DAILY_CAP;
}

// ── Anthropic call ─────────────────────────────────────────────

/** The model answers through this forced tool call, so every reply
 *  arrives in the exact contract shape — no free-text parsing in the
 *  normal path. */
const CHAT_TURN_TOOL = {
  name: "chat_turn",
  description:
    "Record one assistant turn: the reply text the visitor reads, the intake path in progress, every intake field collected so far, and whether the intake is complete.",
  input_schema: {
    type: "object",
    properties: {
      reply: { type: "string", description: "What the visitor reads." },
      path: {
        type: ["string", "null"],
        enum: ["quote", "inquiry", "callback", null],
        description: "The intake path in progress, or null.",
      },
      fields: {
        type: "object",
        additionalProperties: { type: "string" },
        description: "Every intake field collected so far, by field id.",
      },
      readyToReview: {
        type: "boolean",
        description: "True only when all required fields for the path are collected.",
      },
    },
    required: ["reply", "path", "fields", "readyToReview"],
  },
} as const;

async function callClaude(
  apiKey: string,
  system: string,
  messages: AiChatClientMessage[],
): Promise<unknown> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 800,
        system,
        messages,
        tools: [CHAT_TURN_TOOL],
        tool_choice: { type: "tool", name: CHAT_TURN_TOOL.name },
      }),
      signal: AbortSignal.timeout(25_000),
    });
    if (!response.ok) {
      console.error("AI chat: Anthropic API error.", { status: response.status });
      return null;
    }
    const body = (await response.json().catch(() => null)) as {
      content?: Array<{ type?: string; text?: string; name?: string; input?: unknown }>;
      usage?: { input_tokens?: number; output_tokens?: number };
    } | null;
    // Token counts per call, so the real spend is visible in the
    // server logs from day one.
    console.info("AI chat: completion.", {
      model: MODEL,
      inputTokens: body?.usage?.input_tokens ?? null,
      outputTokens: body?.usage?.output_tokens ?? null,
    });
    const blocks = body?.content || [];
    const toolBlock = blocks.find(
      (block) => block.type === "tool_use" && block.name === CHAT_TURN_TOOL.name,
    );
    if (toolBlock) return toolBlock.input ?? null;
    // Defensive fallback: a text answer is parsed for the JSON contract.
    const text = blocks
      .filter((block) => block.type === "text" && typeof block.text === "string")
      .map((block) => block.text as string)
      .join("");
    return text || null;
  } catch (err) {
    console.error("AI chat: Anthropic call failed.", err);
    return null;
  }
}

// ── Public API ─────────────────────────────────────────────────

export async function sendAiChatMessage(input: {
  messages: unknown;
  path?: unknown;
  fields?: unknown;
}): Promise<AiChatActionResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return { ok: false, fallback: true, reason: "not-configured" };

  // Validate the conversation the client sent.
  if (!Array.isArray(input.messages) || input.messages.length === 0) {
    return { ok: false, fallback: true, reason: "bad-request" };
  }
  if (input.messages.length > MAX_CONVERSATION_MESSAGES) {
    return { ok: false, fallback: true, reason: "turn-limit" };
  }
  const messages: AiChatClientMessage[] = [];
  for (const raw of input.messages.slice(-MAX_HISTORY_TURNS)) {
    if (!raw || typeof raw !== "object") return { ok: false, fallback: true, reason: "bad-request" };
    const { role, content } = raw as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
      return { ok: false, fallback: true, reason: "bad-request" };
    }
    const trimmed = content.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (trimmed) messages.push({ role, content: trimmed });
  }
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return { ok: false, fallback: true, reason: "bad-request" };
  }

  let ip = "unknown";
  try {
    ip = getClientIp(await headers());
  } catch {
    // Outside a request context (tests) — the IP guards key on "unknown".
  }
  if (!(await ipAllowed(ip))) return { ok: false, fallback: true, reason: "rate-limited" };
  if (!(await underDailyCap())) return { ok: false, fallback: true, reason: "daily-cap" };

  const path: AiChatPath | null = isAiChatPath(input.path) ? input.path : null;
  const fields: GuidedChatAnswers = path ? sanitizeIntakeFields(path, input.fields) : {};
  const stateNote = path
    ? `\n\nCURRENT INTAKE STATE\npath: ${path}\nfields collected so far: ${JSON.stringify(fields)}`
    : "\n\nCURRENT INTAKE STATE\nNo path chosen yet; no fields collected.";
  const system = buildAiChatSystemPrompt() + stateNote;

  let turn = parseAiChatTurn(await callClaude(apiKey, system, messages));
  if (!turn) {
    // One retry when the answer fell outside the contract shape.
    turn = parseAiChatTurn(await callClaude(apiKey, system, messages));
  }
  if (!turn) return { ok: false, fallback: true, reason: "api-error" };

  // The prompt forbids prices, promises, and delivery times — this
  // screen is the enforcement when an instruction fails. Collected
  // fields still count; only the wording is replaced.
  const screened = screenAiReply(turn.reply);
  if (screened.flagged) {
    console.warn("AI chat: reply replaced by the output guard.");
    turn = { ...turn, reply: screened.text };
  }
  return { ok: true, turn };
}
