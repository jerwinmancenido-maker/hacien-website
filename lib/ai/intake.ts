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

import {
  sanitizeInputHint,
  sanitizeProductRefs,
  type ChatProductCard,
  type ChatProductRef,
} from "@/lib/ai/chat-product-cards";
import {
  isCompletePersonName,
  isPhilippineMobile,
  isTin,
  normalizeBusinessType,
  quoteLeadIssues,
  quoteLeadReady,
} from "@/lib/ai/lead";
import { isInjectionText } from "@/lib/ai/scope";
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
    "businessType",
    "position",
    "businessAddress",
    "tin",
    "buyerReference",
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

/** Required before the review card may be shown — the fields the
 *  guided steps mark required, plus the substance of the request.
 *  One deliberate exception: procurementType (buyer type) is required
 *  in the guided steps but never blocks the AI card — the visitor
 *  states it or it stays blank (owner decision, Nov 8, 2026). */
export const AI_INTAKE_REQUIRED: Record<AiChatPath, string[]> = {
  quote: [
    "need",
    "name",
    "company",
    "businessType",
    "position",
    "businessAddress",
    "email",
    "phone",
    "location",
    "targetDate",
  ],
  inquiry: ["inquiryType", "need", "name", "email"],
  callback: ["name", "phone"],
};

/** Option-list fields and their only valid values — mirrors the guided
 *  steps' option lists (lib/guided-chat/steps.ts QUOTE_PROCUREMENT_TYPES
 *  and app/actions/contact-inquiry.ts contactInquiryTypes). A value the
 *  model returns outside the list is dropped, never shown on the
 *  review card: the visitor picks a buyer type, the model never does. */
const CHOICE_FIELD_OPTIONS: Partial<Record<AiChatPath, Record<string, readonly string[]>>> = {
  quote: {
    procurementType: ["Corporate", "Institutional", "Education", "Project-based", "Reseller / integrator"],
  },
  inquiry: {
    inquiryType: [
      "Request a quote",
      "Supplier partnership",
      "Institutional procurement",
      "Systems integration project",
      "Privacy request",
    ],
  },
};

const MAX_FIELD_LENGTH = 600;
/** The substantive free-text fields can carry a whole requirements
 *  list extracted from an attached BOQ — they get a longer cap. */
const LONG_TEXT_FIELDS = new Set(["need", "details", "message"]);
const MAX_LONG_FIELD_LENGTH = 4_000;
const MAX_REPLY_LENGTH = 2_000;

export function isAiChatPath(value: unknown): value is AiChatPath {
  return value === "quote" || value === "inquiry" || value === "callback";
}

/** Keep only known fields for the path, as trimmed, capped strings.
 *  Option-list fields keep only an exact option value (matched
 *  case-insensitively, stored in the option's canonical spelling). */
export function sanitizeIntakeFields(
  path: AiChatPath,
  raw: unknown,
): GuidedChatAnswers {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const allowed = new Set(AI_INTAKE_FIELDS[path]);
  const choiceOptions = CHOICE_FIELD_OPTIONS[path] || {};
  const clean: GuidedChatAnswers = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!allowed.has(key) || typeof value !== "string") continue;
    const cap = LONG_TEXT_FIELDS.has(key) ? MAX_LONG_FIELD_LENGTH : MAX_FIELD_LENGTH;
    const trimmed = value.trim().slice(0, cap);
    if (!trimmed) continue;
    if (key === "businessType") {
      const canonical = normalizeBusinessType(trimmed);
      if (canonical) clean[key] = canonical;
      continue;
    }
    if (key === "need" || key === "details" || key === "message") {
      const kept = trimmed
        .split("\n")
        .filter((line) => !isInjectionText(line))
        .join("\n")
        .trim();
      if (kept) clean[key] = kept;
      continue;
    }
    // Single-line fields (company, position, address, …): drop the
    // whole value when it is an injection attempt — never store it
    // for later replay into model context.
    if (isInjectionText(trimmed)) continue;
    const options = choiceOptions[key];
    if (options) {
      const canonical = options.find((option) => option.toLowerCase() === trimmed.toLowerCase());
      if (!canonical) continue;
      clean[key] = canonical;
    } else {
      clean[key] = trimmed;
    }
  }
  return clean;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** True when a stored value is usable for its field id on this path —
 *  empty is not; a half name, short phone, or malformed email is not.
 *  Used by readiness and by the merge that must not let the model
 *  overwrite a good visitor value (Bugbot Medium, PR #88 at 9ac4fca). */
export function isUsableIntakeValue(id: string, value: string, path: AiChatPath = "inquiry"): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (id === "email") return EMAIL_PATTERN.test(trimmed);
  if (id === "phone") {
    return path === "quote" ? isPhilippineMobile(trimmed) : trimmed.replace(/\D/g, "").length >= 7;
  }
  if (id === "name") {
    return path === "quote" ? isCompletePersonName(trimmed) : trimmed.length >= 2;
  }
  if (id === "tin") {
    if (/^(none|n\/?a|na|no tin|wala|not applicable|-+)$/i.test(trimmed)) return true;
    return isTin(trimmed);
  }
  return true;
}

/** Missing and invalid required field ids for the path — keys only,
 *  never values. Quote path reuses the lead checker; inquiry/callback
 *  apply the same email/phone usability rules as intakeReady. */
export function intakeFieldIssues(
  path: AiChatPath,
  fields: GuidedChatAnswers,
): { missing: string[]; invalid: string[] } {
  if (path === "quote") return quoteLeadIssues(fields);
  const missing: string[] = [];
  const invalid: string[] = [];
  for (const id of AI_INTAKE_REQUIRED[path]) {
    const value = (fields[id] || "").trim();
    if (!value) {
      missing.push(id);
      continue;
    }
    if (!isUsableIntakeValue(id, value, path)) invalid.push(id);
  }
  return { missing, invalid };
}

/** True only when every required field for the path holds a usable
 *  value — the same standard the guided steps enforce as the visitor
 *  types: an email must look like an email, a phone must carry enough
 *  digits to call back. A malformed address must never reach the
 *  review card, or the confirmation email goes nowhere. */
export function intakeReady(path: AiChatPath, fields: GuidedChatAnswers): boolean {
  if (path === "quote") return quoteLeadReady(fields);
  const issues = intakeFieldIssues(path, fields);
  return issues.missing.length === 0 && issues.invalid.length === 0;
}

export type AiChatTurn = {
  reply: string;
  path: AiChatPath | null;
  fields: GuidedChatAnswers;
  readyToReview: boolean;
  /** Filled by the server after catalogue matching. The parser leaves this empty. */
  cards: ChatProductCard[];
  /** Refs the model cited. Cleared before the turn is returned to the browser. */
  productRefs: ChatProductRef[];
  /** Optional short placeholder hint for the visitor's input box,
   *  sanitized at parse time. Absent when the model offered none. */
  inputHint?: string;
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
    cards: [],
    productRefs: sanitizeProductRefs(record.products),
    inputHint: sanitizeInputHint(record.inputHint),
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
