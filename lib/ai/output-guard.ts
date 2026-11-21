/** AI chat output guard.
 *
 * The system prompt forbids prices, discounts, promises, and delivery
 * time claims — but instructions can fail, especially under a visitor
 * trying to talk the assistant into an estimate. This screen runs on
 * every reply before the visitor sees it: a hit replaces the whole
 * reply with the safe wording. The patterns are deliberately narrow so
 * approved facts never trip them (the reply-time fact is about replies,
 * quotations are "valid for 15 days", the warranty is "within 7 days"
 * for dead-on-arrival — none of those state a price or a delivery time).
 * A third family screens for instruction leakage (owner hardening /
 * PR #82 nits, 2026-11-20): phrases that appear when the assistant talks
 * about its own instructions instead of the visitor's request.
 */

const PRICE_PATTERNS: RegExp[] = [
  /₱\s?\d/, // ₱1,250
  /\bPHP\s?\d/i, // PHP 1250
  /\b\d[\d,]*(\.\d+)?\s?(pesos|php)\b/i, // 1250 pesos
  /\$\s?\d[\d,]*(\.\d+)?/, // $25
  /\b(price|costs?|total|amount|quote|quotation)\b[^.]{0,40}\b\d[\d,]{2,}/i,
  /\b\d+\s?%\s?(off|discount)\b/i,
  /\b(special|discounted)\s+price\b/i,
];

const PROMISE_PATTERNS: RegExp[] = [
  /\b(we|i)\s+(promise|guarantee|assure)\b/i,
  /\bguaranteed\s+(delivery|stock|availability|price)\b/i,
  /\b(definitely|certainly)\s+(available|in stock|deliver)\b/i,
  /\bin stock\b[^.]{0,30}\b(available|ready)\b/i,
];

const DELIVERY_TIME_PATTERNS: RegExp[] = [
  /\b(deliver|delivery|arrive|arrives|arrival of|receive|ship|shipping)\b[^.]{0,50}\b(within|in|after)\s+\d+\s*(business\s+)?(days?|weeks?|hours?)\b/i,
  /\b\d+\s*(business\s+)?(days?|weeks?)\s+(delivery|lead\s?time|shipping)\b/i,
  /\b(lead\s?time|delivery\s?time)\b[^.]{0,30}\b\d+\s*(days?|weeks?|hours?)\b/i,
];

export const AI_SAFE_REPLY =
  "I don't want to give you the wrong information on that — a member of the HACIEN team will confirm it when they reply. If you'd like, tell me what you need and I'll prepare your request for them.";

/** Instruction-leak family. Verbs beyond say/tell/require/are catch the
 *  paraphrase bypasses from the #82 adversarial nits; chat_turn is
 *  case-insensitive; "system prompt" skips ordinary software UX wording. */
const PROMPT_LEAK_PATTERNS = [
  /CURRENT INTAKE STATE/,
  /MATCHES FROM THE SITE/,
  /QUOTE LEAD missing/,
  /chat_turn/i,
  /\bmy system instructions\b/i,
  /\bmy instructions\b[^.]{0,48}\b(say|tell|require|are|allow|forbid|state|include|don'?t allow|do not allow)\b/i,
  /output guard/i,
  /knowledge sheet/i,
];

const SYSTEM_PROMPT_LEAK = /\bsystem prompts?\b/i;
const SYSTEM_PROMPT_SOFTWARE_UX =
  /\b([\w']+\s+)?(software|POS|OS|application|app|program)\b[^.]{0,48}\bsystem prompts?\b/i;
const SYSTEM_PROMPT_UX_VERB =
  /\bsystem prompts?\s+(you|the\s+(user|cashier|operator)|guide|guides)\b/i;

function leaksSystemPrompt(reply: string): boolean {
  if (!SYSTEM_PROMPT_LEAK.test(reply)) return false;
  if (SYSTEM_PROMPT_SOFTWARE_UX.test(reply)) return false;
  if (SYSTEM_PROMPT_UX_VERB.test(reply)) return false;
  return true;
}

/** Returns the reply unchanged when it is clean, or the safe wording
 *  when it states a price, a discount, a promise, or a delivery time,
 *  or when it leaks the assistant's own instructions.
 *  Delivery-time patterns are checked per sentence, skipping sentences
 *  about replies — "you'll receive a reply within 1 business day" is an
 *  approved fact, not a delivery claim. */
export function screenAiReply(reply: string): { text: string; flagged: boolean } {
  if (PROMPT_LEAK_PATTERNS.some((pattern) => pattern.test(reply)) || leaksSystemPrompt(reply)) {
    return { text: AI_SAFE_REPLY, flagged: true };
  }
  for (const pattern of [...PRICE_PATTERNS, ...PROMISE_PATTERNS]) {
    if (pattern.test(reply)) {
      return { text: AI_SAFE_REPLY, flagged: true };
    }
  }
  const sentences = reply.split(/(?<=[.!?])\s+/);
  for (const sentence of sentences) {
    if (/\b(reply|replies|respond|confirmation)\b/i.test(sentence)) continue;
    for (const pattern of DELIVERY_TIME_PATTERNS) {
      if (pattern.test(sentence)) {
        return { text: AI_SAFE_REPLY, flagged: true };
      }
    }
  }
  return { text: reply, flagged: false };
}
