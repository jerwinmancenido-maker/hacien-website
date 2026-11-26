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

export type InquiryValidation = { ok: true } | { ok: false; error: string };

function fieldString(formData: Record<string, unknown>, key: string): string {
  const value = formData[key];
  return typeof value === "string" ? value : "";
}

export function validateInquiryPayload(
  formData: Record<string, unknown>,
): InquiryValidation {
  const email = fieldString(formData, "email").trim();
  if (!INQUIRY_EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (!fieldString(formData, "name").trim()) {
    return { ok: false, error: "Please enter your name." };
  }

  for (const [key, value] of Object.entries(formData)) {
    if (typeof value !== "string" || UNVALIDATED_FIELDS.has(key)) continue;
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
