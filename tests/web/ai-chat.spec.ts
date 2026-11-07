import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { sendAiChatMessage } from "@/app/actions/ai-chat";
import { buildAiChatSystemPrompt } from "@/lib/ai/knowledge";
import { AI_SAFE_REPLY, screenAiReply } from "@/lib/ai/output-guard";
import {
  intakeReady,
  parseAiChatTurn,
  sanitizeIntakeFields,
} from "@/lib/ai/intake";
import { findTrackUrl } from "@/lib/guided-chat/payloads";

const ORIGINAL_KEY = process.env.ANTHROPIC_API_KEY;

function anthropicResponse(text: string) {
  return {
    ok: true,
    status: 200,
    json: async () => ({ content: [{ type: "text", text }] }),
  };
}

function anthropicToolResponse(input: Record<string, unknown>) {
  return {
    ok: true,
    status: 200,
    json: async () => ({
      content: [{ type: "tool_use", name: "chat_turn", input }],
      usage: { input_tokens: 120, output_tokens: 45 },
    }),
  };
}

const VALID_TURN = JSON.stringify({
  reply: "Sure — what would you like quoted?",
  path: "quote",
  fields: { need: "10 laptops" },
  readyToReview: false,
});

function read(rel: string): string {
  return readFileSync(join(process.cwd(), rel), "utf8");
}

describe("AI chat panel wiring", () => {
  it("the panel opens on the AI assistant and falls back to guided for the session", () => {
    const floating = read("components/FloatingChat.tsx");
    expect(floating).toContain("<AiChat");
    expect(floating).toContain("<GuidedChat");
    expect(floating).toContain("onUnavailable");
    expect(floating).toContain("aiUnavailable ? undefined");
  });

  it("the AI chat submits through the same action and payload builders as the guided chat", () => {
    const ai = read("components/AiChat.tsx");
    expect(ai).toContain("sendAiChatMessage");
    expect(ai).toContain("sendInquiryEmail");
    expect(ai).toContain("buildQuotePayload");
    expect(ai).toContain("buildInquiryPayload");
    expect(ai).toContain("buildCallbackPayload");
    expect(ai).toContain("findTrackUrl");
  });

  it("answers a pasted reference with a code-built tracking link, and the review card asks for confirmation", () => {
    const ai = read("components/AiChat.tsx");
    expect(ai).toContain("const trackUrl = findTrackUrl(text);");
    expect(ai).toContain("Open tracking page →");
    expect(ai).toContain("Please confirm these details are correct before sending.");
  });

  it("auto-scrolls the panel to the newest message after each reply", () => {
    const ai = read("components/AiChat.tsx");
    const floating = read("components/FloatingChat.tsx");
    expect(floating).toContain("data-chat-scroll");
    expect(ai).toContain("bottomRef");
    expect(ai).toContain('closest<HTMLElement>("[data-chat-scroll]")');
    expect(ai).toContain("container.scrollTo({ top: container.scrollHeight");
    expect(ai).toContain("[messages, sending, readyToReview, submitStatus, notice]");
  });

  it("the AI chat is honestly labelled and gates send on the security-check token", () => {
    const ai = read("components/AiChat.tsx");
    expect(ai).toContain("HACIEN AI assistant");
    expect(ai).toContain("HACIEN AI assistant. Ask me");
    expect(ai).toContain("onTokenChange={setTurnstileToken}");
    expect(ai).toContain("Completing security check…");
    expect(ai).toContain("Prefer step-by-step questions?");
  });

  it("the guided chat offers the switch to the AI assistant", () => {
    const guided = read("components/GuidedChat.tsx");
    expect(guided).toContain("onUseAi");
    expect(guided).toContain("Chat with the AI assistant instead");
  });
});

describe("AI chat knowledge sheet", () => {
  it("carries the hard rules and only approved facts", () => {
    const prompt = buildAiChatSystemPrompt();
    expect(prompt).toContain("Never state or estimate prices");
    expect(prompt).toContain("Within 1 business day");
    expect(prompt).toContain("sales@haciensolutions.com");
    expect(prompt).toContain("Quotations are valid for 15 days");
    expect(prompt).not.toMatch(/₱\s?\d/);
  });

  it("lists every intake path with its required fields", () => {
    const prompt = buildAiChatSystemPrompt();
    expect(prompt).toContain("quote: required [need, name, email, phone, targetDate]");
    expect(prompt).toContain("inquiry: required [inquiryType, need, name, email]");
    expect(prompt).toContain("callback: required [name, phone]");
  });

  it("requires the delivery answer to carry both points: sourced per order, timing confirmed in the quotation", () => {
    const prompt = buildAiChatSystemPrompt();
    expect(prompt).toContain("every item is sourced per order");
    expect(prompt).toContain("items are sourced per order, and timing is confirmed in the quotation");
    expect(prompt).toContain("Never promise or estimate a delivery date");
  });

  it("never lets the model fill buyer type, and walks a callback name first, then phone", () => {
    const prompt = buildAiChatSystemPrompt();
    expect(prompt).toContain("never guess or infer a value");
    expect(prompt).toContain("never fill procurementType (buyer type) unless the visitor states it");
    expect(prompt).toContain("collect the name first and the phone number second");
  });

  it("forbids stating or guessing any request status or lead details", () => {
    const prompt = buildAiChatSystemPrompt();
    expect(prompt).toContain("never state or guess a request's status");
    expect(prompt).toContain("shows them its tracking link automatically");
  });
});

describe("AI chat tracking links (code-detected, never model-made)", () => {
  it("links LEAD references in any case, with or without spaces, even inside a sentence", () => {
    expect(findTrackUrl("LEAD-2026-000001")).toBe("/track/LEAD-2026-000001");
    expect(findTrackUrl("lead-2026-000001")).toBe("/track/LEAD-2026-000001");
    expect(findTrackUrl("LEAD 2026 000001")).toBe("/track/LEAD-2026-000001");
    expect(findTrackUrl("My reference is lead 2026 000001 — any update?")).toBe(
      "/track/LEAD-2026-000001",
    );
    expect(findTrackUrl("RFQ-2026-000009")).toBe("/track/RFQ-2026-000009");
  });

  it("returns no link for ordinary messages", () => {
    expect(findTrackUrl("I need 10 laptops for the office")).toBeNull();
    expect(findTrackUrl("order 2026 please")).toBeNull();
    expect(findTrackUrl("LEAD-2026-123")).toBeNull();
  });
});

describe("AI intake sanitization", () => {
  it("keeps only known fields for the path, trimmed strings only", () => {
    const clean = sanitizeIntakeFields("callback", {
      name: "  Ana Reyes ",
      phone: "0917 555 0101",
      email: "not-a-callback-field@example.com",
      topic: 42,
      bestTime: "",
    });
    expect(clean).toEqual({ name: "Ana Reyes", phone: "0917 555 0101" });
  });

  it("drops option-list values the visitor never picked (buyer type is never model-filled)", () => {
    expect(sanitizeIntakeFields("quote", { procurementType: "Business" })).toEqual({});
    expect(sanitizeIntakeFields("quote", { procurementType: "Probably a company" })).toEqual({});
    expect(sanitizeIntakeFields("quote", { procurementType: "corporate" })).toEqual({
      procurementType: "Corporate",
    });
    expect(sanitizeIntakeFields("quote", { procurementType: "Reseller / integrator" })).toEqual({
      procurementType: "Reseller / integrator",
    });
    expect(sanitizeIntakeFields("inquiry", { inquiryType: "General Question" })).toEqual({});
    expect(sanitizeIntakeFields("inquiry", { inquiryType: "Privacy request" })).toEqual({
      inquiryType: "Privacy request",
    });
  });

  it("a callback with only a name never reaches the review card — the phone must follow", () => {
    const turn = parseAiChatTurn({
      reply: "Thanks, Ana — what's the best number to call you on?",
      path: "callback",
      fields: { name: "Ana Reyes" },
      readyToReview: true, // the model's claim is ignored; readiness is recomputed
    });
    expect(turn?.readyToReview).toBe(false);
    const complete = parseAiChatTurn({
      reply: "Here's what I'll send — please check it:",
      path: "callback",
      fields: { name: "Ana Reyes", phone: "0917 555 0101" },
      readyToReview: true,
    });
    expect(complete?.readyToReview).toBe(true);
  });

  it("computes readiness from the required list, per path", () => {
    expect(intakeReady("callback", { name: "Ana" })).toBe(false);
    expect(intakeReady("callback", { name: "Ana", phone: "0917 555 0101" })).toBe(true);
    expect(intakeReady("callback", { name: "Ana", phone: "123" })).toBe(false);
    expect(
      intakeReady("quote", { need: "x", name: "A", email: "a@b.co", phone: "1" }),
    ).toBe(false); // targetDate still missing
  });
});

describe("AI intake readiness formats", () => {
  it("requires a plausible email before the review card", () => {
    const base = { inquiryType: "General Question", need: "CCTV", name: "Ana" };
    expect(intakeReady("inquiry", { ...base, email: "ana@" })).toBe(false);
    expect(intakeReady("inquiry", { ...base, email: "ana@example.com" })).toBe(true);
  });
});

describe("AI output guard", () => {
  it("replaces replies that state a price, a promise, or a delivery time", () => {
    expect(screenAiReply("That laptop is ₱42,500.").text).toBe(AI_SAFE_REPLY);
    expect(screenAiReply("We can deliver within 3 days.").flagged).toBe(true);
    expect(screenAiReply("I guarantee we have the lowest price.").flagged).toBe(true);
    expect(screenAiReply("You get 20% off if you order now.").flagged).toBe(true);
  });

  it("lets the approved facts through untouched", () => {
    const replyTime =
      "You'll receive a reply within 1 business day (Monday to Friday, 9:00 AM – 6:00 PM PHT, excluding holidays).";
    expect(screenAiReply(replyTime)).toEqual({ text: replyTime, flagged: false });
    expect(screenAiReply("Quotations are valid for 15 days.").flagged).toBe(false);
    expect(
      screenAiReply(
        "Items dead on arrival are covered within 7 days, with shipping both ways by HACIEN.",
      ).flagged,
    ).toBe(false);
    expect(screenAiReply("Delivery is nationwide; the fee is quoted per order.").flagged).toBe(
      false,
    );
  });
});

describe("AI turn parsing", () => {
  it("parses a JSON turn and recomputes readiness instead of trusting the model", () => {
    const turn = parseAiChatTurn(
      JSON.stringify({
        reply: "All set — please check the summary.",
        path: "callback",
        fields: { name: "Ana" },
        readyToReview: true, // model claims ready; phone is missing
      }),
    );
    expect(turn?.reply).toContain("All set");
    expect(turn?.readyToReview).toBe(false);
  });

  it("accepts JSON wrapped in prose or fences, rejects junk", () => {
    expect(parseAiChatTurn("```json\n" + VALID_TURN + "\n```")?.path).toBe("quote");
    expect(parseAiChatTurn("not json at all")).toBeNull();
    expect(parseAiChatTurn('{"reply": ""}')).toBeNull();
  });

  it("accepts the tool-form input object directly", () => {
    const turn = parseAiChatTurn({
      reply: "What is your name?",
      path: "callback",
      fields: { phone: "0917 555 0101" },
      readyToReview: true,
    });
    expect(turn?.path).toBe("callback");
    expect(turn?.readyToReview).toBe(false); // name still missing
    expect(parseAiChatTurn(null)).toBeNull();
    expect(parseAiChatTurn(42)).toBeNull();
  });
});

describe("sendAiChatMessage guards", () => {
  beforeEach(() => {
    delete process.env.ANTHROPIC_API_KEY;
  });

  afterEach(() => {
    if (ORIGINAL_KEY === undefined) delete process.env.ANTHROPIC_API_KEY;
    else process.env.ANTHROPIC_API_KEY = ORIGINAL_KEY;
    vi.unstubAllGlobals();
  });

  it("falls back without calling the API when no key is configured", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const result = await sendAiChatMessage({
      messages: [{ role: "user", content: "Do you deliver to Cebu?" }],
    });
    expect(result).toEqual({ ok: false, fallback: true, reason: "not-configured" });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("rejects a malformed conversation before any API call", async () => {
    process.env.ANTHROPIC_API_KEY = "test-key";
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const result = await sendAiChatMessage({ messages: [] });
    expect(result).toEqual({ ok: false, fallback: true, reason: "bad-request" });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("returns the sanitized turn on a good tool-form completion", async () => {
    process.env.ANTHROPIC_API_KEY = "test-key";
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        anthropicToolResponse({
          reply: "Sure — what would you like quoted?",
          path: "quote",
          fields: { need: "10 laptops" },
          readyToReview: false,
        }),
      ),
    );
    const result = await sendAiChatMessage({
      messages: [{ role: "user", content: "I need 10 laptops quoted" }],
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.turn.path).toBe("quote");
      expect(result.turn.fields).toEqual({ need: "10 laptops" });
      expect(result.turn.readyToReview).toBe(false);
    }
  });

  it("hands over at the conversation length limit without calling the API", async () => {
    process.env.ANTHROPIC_API_KEY = "test-key";
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const messages = Array.from({ length: 41 }, (_, i) => ({
      role: i % 2 === 0 ? ("user" as const) : ("assistant" as const),
      content: `message ${i}`,
    }));
    const result = await sendAiChatMessage({ messages });
    expect(result).toEqual({ ok: false, fallback: true, reason: "turn-limit" });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("falls back when the model will not answer in the contract format", async () => {
    process.env.ANTHROPIC_API_KEY = "test-key";
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => anthropicResponse("Just a plain sentence, no JSON.")),
    );
    const result = await sendAiChatMessage({
      messages: [{ role: "user", content: "Hello" }],
    });
    expect(result).toEqual({ ok: false, fallback: true, reason: "api-error" });
  });
});
