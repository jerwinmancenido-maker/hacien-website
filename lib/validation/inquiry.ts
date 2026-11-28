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
 *   on every flow, and every other flow still requires one. The callback
 *   flow instead requires the phone number it exists to collect: a
 *   callback with no usable phone number is rejected.
 * - The caps apply to the visitor's original fields, not to text a builder
 *   composes from them. A max-length answer, or a few quote-cart lines,
 *   legitimately composes past the single-field cap; the intake sanitizer
 *   caps the originals before composition, and the form flows send
 *   originals, so the composed fields named below are exempt from the
 *   normal caps. The exemption is keyed by an EXACT match on the payload
 *   type string - the three type strings the builders emit, nothing else -
 *   and even an exempt field stays under an absolute ceiling, so no
 *   payload can put an unbounded field in front of the Gateway.
 *
 * Content fields must carry strings. A non-string value (an array or an
 * object where prose belongs) is rejected rather than skipped, so content
 * cannot ride past the caps in a shape the length check cannot measure.
 * The only non-string fields allowed are the quote builder's machine
 * fields, and they are typed per key, never skipped by name: the counters
 * must be numbers, the flag a boolean, and the requirement blocks an
 * array whose entries are measured by their serialized length. Their
 * sizes count toward the same absolute ceiling, so no key name is a
 * route around the caps. An absent (null/undefined) value counts as an
 * empty field, as it does today.
 */

export const INQUIRY_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Caps aligned to the chat intake sanitizer (lib/ai/intake.ts). */
export const INQUIRY_FIELD_LENGTH_CAP = 600;
export const INQUIRY_LONG_FIELD_LENGTH_CAP = 4_000;

/** Absolute ceiling for a composed field exempt from the normal caps: far
 *  above anything the builders can compose from capped originals (a fully
 *  composed inquiry message tops out near 13k characters), while still
 *  bounding a single field at roughly 100 KB. */
export const INQUIRY_COMPOSED_FIELD_LENGTH_CAP = 100_000;

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

/** Machine fields that legitimately carry non-string values: the quote
 *  builder's requirement blocks (an array) and its counters/flags
 *  (numbers, a boolean). Being listed here exempts a field from the
 *  string checks only - machineFieldSize() below validates each one per
 *  key. Everything else on a payload is prose and must arrive as a
 *  string. */
const MACHINE_FIELDS = new Set([
  "requirementBlocks",
  "requirementCount",
  "attachmentSizeKb",
  "acceptsZeroCatalogProducts",
]);

/** The exact payload type strings the guided-chat builders emit
 *  (lib/guided-chat/payloads.ts), lower-cased to match payloadType(). */
const CALLBACK_TYPE = "callback request";
const INQUIRY_TYPE = "contact inquiry";
const QUOTE_TYPE = "universal rfq gateway submission";

/** Fields a payload builder composes from other answers, keyed by the
 *  payload's EXACT type string - never a substring, because the type is
 *  caller-supplied and a substring test lets any lookalike type claim the
 *  exemption. The normal length caps do not apply to these fields (see the
 *  header note); the absolute ceiling still does. */
const COMPOSED_FIELDS_BY_TYPE: ReadonlyMap<string, ReadonlySet<string>> =
  new Map([
    // buildCallbackPayload: the message is composed from the phone number,
    // the best time and the topic.
    [CALLBACK_TYPE, new Set(["message"])],
    // buildQuotePayload: the requirement lines are formatted from the
    // requirement blocks, and the attachment line from the file details.
    [QUOTE_TYPE, new Set(["requirements", "attachmentInfo"])],
    // buildInquiryPayload: the message is composed from the need, details,
    // location, target-date and anything-else answers.
    [INQUIRY_TYPE, new Set(["message"])],
  ]);

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
  return COMPOSED_FIELDS_BY_TYPE.get(payloadType(formData)) ?? NO_COMPOSED_FIELDS;
}

/** The callback path's phone rule, the same one the intake readiness
 *  check applies (lib/ai/intake.ts, isUsableIntakeValue): a phone is
 *  usable when it carries at least seven digits. (This module cannot
 *  import that helper - intake imports the caps from here.) */
function isUsablePhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 7;
}

const FIELD_READ_ERROR =
  "One of the fields could not be read - please re-enter it and try again.";
const FIELD_TOO_LONG_ERROR =
  "One of the fields is too long - please shorten it and try again.";

type MachineFieldSize =
  | { ok: true; size: number }
  | { ok: false; error: string };

/** Serialized length of a value, or -1 when it cannot be serialized (a
 *  circular structure) and so cannot be measured. */
function serializedLength(value: unknown): number {
  try {
    return JSON.stringify(value)?.length ?? 0;
  } catch {
    return -1;
  }
}

/** The per-key type contract for the quote builder's machine fields. A
 *  counter must arrive as a finite number, the flag as a boolean, and the
 *  requirement blocks as an array whose entries are the builder's blocks
 *  (objects of capped strings; a bare string entry is measured the same
 *  way). Each block is measured by its serialized length and held to the
 *  composed-field ceiling on its own; the caller sums the sizes of all
 *  four fields against the same ceiling, so the fields are bounded
 *  together as well as one by one. Any other shape is rejected - a
 *  machine-field name is never a free pass. */
function machineFieldSize(key: string, value: unknown): MachineFieldSize {
  switch (key) {
    case "requirementCount":
    case "attachmentSizeKb":
      return typeof value === "number" && Number.isFinite(value)
        ? { ok: true, size: String(value).length }
        : { ok: false, error: FIELD_READ_ERROR };
    case "acceptsZeroCatalogProducts":
      return typeof value === "boolean"
        ? { ok: true, size: String(value).length }
        : { ok: false, error: FIELD_READ_ERROR };
    case "requirementBlocks": {
      if (!Array.isArray(value)) {
        return { ok: false, error: FIELD_READ_ERROR };
      }
      let size = 0;
      for (const entry of value) {
        if (
          typeof entry !== "string" &&
          (typeof entry !== "object" || entry === null)
        ) {
          return { ok: false, error: FIELD_READ_ERROR };
        }
        const entrySize = serializedLength(entry);
        if (entrySize < 0) {
          return { ok: false, error: FIELD_READ_ERROR };
        }
        if (entrySize > INQUIRY_COMPOSED_FIELD_LENGTH_CAP) {
          return { ok: false, error: FIELD_TOO_LONG_ERROR };
        }
        size += entrySize;
      }
      return { ok: true, size };
    }
    default:
      return { ok: false, error: FIELD_READ_ERROR };
  }
}

export function validateInquiryPayload(
  formData: Record<string, unknown>,
): InquiryValidation {
  const isCallback = payloadType(formData) === CALLBACK_TYPE;

  const email = fieldString(formData, "email").trim();
  // An empty email is acceptable only on a callback request, the one flow
  // that intentionally collects none; any email that is present must be
  // well-formed, and every other flow still requires one.
  if ((!isCallback || email) && !INQUIRY_EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  // The callback flow exists to collect a phone number; one without a
  // usable number can never be actioned, so the number is required there
  // even though the email is not.
  if (isCallback && !isUsablePhone(fieldString(formData, "phone"))) {
    return { ok: false, error: "Please enter a valid phone number." };
  }

  if (!fieldString(formData, "name").trim()) {
    return { ok: false, error: "Please enter your name." };
  }

  const composed = composedFieldKeys(formData);
  let machineSize = 0;
  for (const [key, value] of Object.entries(formData)) {
    if (UNVALIDATED_FIELDS.has(key)) {
      continue;
    }
    // Absent values count as empty fields; any other non-string value is
    // content in a shape the caps cannot measure, so it is rejected.
    if (value === null || value === undefined) continue;
    if (MACHINE_FIELDS.has(key)) {
      // Machine fields are typed and measured per key, and their sizes
      // count toward the composed-field ceiling like any composed text.
      const machine = machineFieldSize(key, value);
      if (!machine.ok) {
        return { ok: false, error: machine.error };
      }
      machineSize += machine.size;
      if (machineSize > INQUIRY_COMPOSED_FIELD_LENGTH_CAP) {
        return { ok: false, error: FIELD_TOO_LONG_ERROR };
      }
      continue;
    }
    if (typeof value !== "string") {
      return {
        ok: false,
        error:
          "One of the fields could not be read - please re-enter it and try again.",
      };
    }
    if (composed.has(key)) {
      if (value.length > INQUIRY_COMPOSED_FIELD_LENGTH_CAP) {
        return {
          ok: false,
          error:
            "One of the fields is too long - please shorten it and try again.",
        };
      }
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
        error:
          "One of the fields is too long - please shorten it and try again.",
      };
    }
  }

  return { ok: true };
}
