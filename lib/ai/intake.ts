/** AI chat intake contract.
 *
 * The AI conversation collects the SAME fields the guided steps collect
 * (lib/guided-chat/steps.ts), so a confirmed AI intake can be submitted
 * through the existing payload builders unchanged. Everything the model
 * returns passes through here before the UI or a submission ever sees it:
 * only known field ids for the chosen path survive, values are trimmed
 * and length-capped, and readiness is computed from the required-field
 * list — never trusted from the model alone.
 */

import type { GuidedChatAnswers } from "@/lib/guided-chat/payloads";

export type AiChatPath = "quote" | "inquiry" | "callback";

export const AI_CHAT_PATHS: AiChatPath[] = ["quote", "inquiry", "callback"];

/** Field ids the AI may collect per path — mirrors lib/guided-chat/steps.ts.
 *  The quote path's document step is excluded: file details cannot be
 *  collected reliably in free conversation, and the team can ask for the
 *  document by email after the request arrives. */
export const AI_INTAKE_FIELDS: Record<AiChatPath, string[]> = {
  quote: [
    "need",
    "procurementType",
    "name",
    "company",
    "email",
    "phone",
    "location",
    "targetDate",
    "budgetRange",
  ],
  inquiry: [
    "inquiryType",
    "need",
    "details",
    "location",
    "targetDate",
    "message",
    "name",
    "company",
    "email",
    "phone",
    "budgetRange",
    "timeline",
  ],
  callback: ["name", "phone", "bestTime", "topic"],
};

/** Required before the review card may be shown — the same fields the
 *  guided steps mark required, plus the substance of the request. */
export const AI_INTAKE_REQUIRED: Record<AiChatPath, string[]> = {
  quote: ["need", "name", "email", "phone", "targetDate"],
  inquiry: ["inquiryType", "need", "name", "email"],
  callback: ["name", "phone"],
};

const MAX_FIELD_LENGTH = 600;
const MAX_REPLY_LENGTH = 2_000;

export function isAiChatPath(value: unknown): value is AiChatPath {
  return value === "quote" || value === "inquiry" || value === "callback";
}

/** Keep only known fields for the path, as trimmed, capped strings. */
export function sanitizeIntakeFields(
  path: AiChatPath,
  raw: unknown,
): GuidedChatAnswers {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const allowed = new Set(AI_INTAKE_FIELDS[path]);
  const clean: GuidedChatAnswers = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!allowed.has(key) || typeof value !== "string") continue;
    const trimmed = value.trim().slice(0, MAX_FIELD_LENGTH);
    if (trimmed) clean[key] = trimmed;
  }
  return clean;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** True only when every required field for the path holds a usable
 *  value — the same standard the guided steps enforce as the visitor
 *  types: an email must look like an email, a phone must carry enough
 *  digits to call back. A malformed address must never reach the
 *  review card, or the confirmation email goes nowhere. */
export function intakeReady(path: AiChatPath, fields: GuidedChatAnswers): boolean {
  return AI_INTAKE_REQUIRED[path].every((id) => {
    const value = (fields[id] || "").trim();
    if (!value) return false;
    if (id === "email") return EMAIL_PATTERN.test(value);
    if (id === "phone") return value.replace(/\D/g, "").length >= 7;
    return true;
  });
}

export type AiChatTurn = {
  reply: string;
  path: AiChatPath | null;
  fields: GuidedChatAnswers;
  readyToReview: boolean;
};

function turnFromRecord(record: Record<string, unknown>): AiChatTurn | null {
  const reply = typeof record.reply === "string" ? record.reply.trim() : "";
  if (!reply) return null;
  const path = isAiChatPath(record.path) ? record.path : null;
  const fields = path ? sanitizeIntakeFields(path, record.fields) : {};
  return {
    reply: reply.slice(0, MAX_REPLY_LENGTH),
    path,
    fields,
    readyToReview: path ? intakeReady(path, fields) : false,
  };
}

/** Parse one model response into a turn. The model answers through a
 *  forced tool call, so the normal input is the tool's input object; a
 *  JSON string is also accepted defensively. Anything else returns null
 *  so the caller can retry or fall back instead of showing junk to the
 *  visitor. Readiness is recomputed here from the sanitized fields —
 *  the model's own claim is ignored. */
export function parseAiChatTurn(raw: unknown): AiChatTurn | null {
  if (typeof raw === "string") {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start === -1 || end <= start) return null;
    try {
      const data: unknown = JSON.parse(raw.slice(start, end + 1));
      if (!data || typeof data !== "object" || Array.isArray(data)) return null;
      return turnFromRecord(data as Record<string, unknown>);
    } catch {
      return null;
    }
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  return turnFromRecord(raw as Record<string, unknown>);
}
