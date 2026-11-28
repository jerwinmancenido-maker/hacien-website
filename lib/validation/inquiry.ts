/**
 * One validation definition for website inquiry payloads (R5-FIX-9, n-13).
 *
 * The chat path already enforced an email pattern and per-field length caps
 * on the client (components/AiChat.tsx, lib/ai/intake.ts); the raw
 * sendInquiryEmail action enforced none of them, so a direct POST could put
 * a malformed email or an over-cap field in front of the Gateway. The
 * pattern and the caps live here exactly once and both sides enforce them:
 * the client imports the pattern, the intake sanitizer imports the caps,
 * and the server action validates every payload against this module before
 * anything reaches the Gateway.
 *
 * Two payload shapes are deliberate exceptions, both matching how the
 * guided-chat payload builders (lib/guided-chat/payloads.ts) build them:
 *
 * - A callback request collects no email - it asks for a phone number to
 *   call back on, and its builder sends an empty email - so an empty email
 *   is accepted on that flow only. A non-empty email must be well-formed
 *   on every flow, and every other flow still requires one.
 * - The caps apply to the visitor's original fields, not to text a builder
 *   composes from them. A max-length answer, or a few quote-cart lines,
 *   legitimately composes past the single-field cap; the intake sanitizer
 *   caps the originals before composition, and the form flows send
 *   originals, so the composed fields named below are exempt.
 */

export const INQUIRY_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Caps aligned to the chat intake sanitizer (lib/ai/intake.ts). */
export const INQUIRY_FIELD_LENGTH_CAP = 600;
export const INQUIRY_LONG_FIELD_LENGTH_CAP = 4_000;

const EMAIL_FIELD_CAP = 254;

/** Free-text fields that may carry a full requirements list. */
const LONG_TEXT_FIELDS = new Set(["need", "details", "message", "notes"]);

/** Machine fields are not content: security tokens run long by design, and
 *  timing/UA/source strings are not sender prose. */
const UNVALIDATED_FIELDS = new Set([
  "turnstileToken",
  "formStartedAt",
  "website",
  "userAgent",
  "sourceUrl",
]);

/** Fields a payload builder composes from other answers, keyed by a marker
 *  in the payload's own type string - the same dispatch sendInquiryEmail
 *  uses downstream. The length caps do not apply to these fields (see the
 *  header note): they are not original user fields. */
const COMPOSED_FIELDS: ReadonlyArray<{
  marker: string;
  fields: ReadonlySet<string>;
}> = [
  // buildCallbackPayload: the message is composed from the phone number,
  // the best time and the topic.
  { marker: "callback", fields: new Set(["message"]) },
  // buildQuotePayload: the requirement lines are formatted from the
  // requirement blocks, and the attachment line from the file details.
  { marker: "rfq", fields: new Set(["requirements", "attachmentInfo"]) },
  { marker: "quote", fields: new Set(["requirements", "attachmentInfo"]) },
  // buildInquiryPayload: the message is composed from the need, details,
  // location, target-date and anything-else answers.
  { marker: "inquiry", fields: new Set(["message"]) },
];

const NO_COMPOSED_FIELDS: ReadonlySet<string> = new Set();

export type InquiryValidation = { ok: true } | { ok: false; error: string };

function fieldString(formData: Record<string, unknown>, key: string): string {
  const value = formData[key];
  return typeof value === "string" ? value : "";
}

function payloadType(formData: Record<string, unknown>): string {
  return fieldString(formData, "type").trim().toLowerCase();
}

function composedFieldKeys(
  formData: Record<string, unknown>,
): ReadonlySet<string> {
  const type = payloadType(formData);
  for (const entry of COMPOSED_FIELDS) {
    if (type.includes(entry.marker)) return entry.fields;
  }
  return NO_COMPOSED_FIELDS;
}

export function validateInquiryPayload(
  formData: Record<string, unknown>,
): InquiryValidation {
  const email = fieldString(formData, "email").trim();
  // An empty email is acceptable only on a callback request, the one flow
  // that intentionally collects none; any email that is present must be
  // well-formed, and every other flow still requires one.
  const emailRequired = !payloadType(formData).includes("callback");
  if ((emailRequired || email) && !INQUIRY_EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (!fieldString(formData, "name").trim()) {
    return { ok: false, error: "Please enter your name." };
  }

  const composed = composedFieldKeys(formData);
  for (const [key, value] of Object.entries(formData)) {
    if (
      typeof value !== "string" ||
      UNVALIDATED_FIELDS.has(key) ||
      composed.has(key)
    ) {
      continue;
    }
    const cap =
      key === "email"
        ? EMAIL_FIELD_CAP
        : LONG_TEXT_FIELDS.has(key)
          ? INQUIRY_LONG_FIELD_LENGTH_CAP
          : INQUIRY_FIELD_LENGTH_CAP;
    if (value.length > cap) {
      return {
        ok: false,
        error: "One of the fields is too long - please shorten it and try again.",
      };
    }
  }

  return { ok: true };
}
