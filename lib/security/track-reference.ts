/** Compact shapes, matched after separators are stripped: visitors
 *  paste references in every shape — any case, dashes or spaces
 *  between the groups, sometimes no separators at all. */
const LEGACY_TRACK_REFERENCE = /^RFQ(\d{4})(\d{6})$/;

/** Sequential refs the Gateway issues for website inquiries,
 *  e.g. LEAD-2026-000001 */
const LEAD_TRACK_REFERENCE = /^LEAD(\d{4})(\d{6})$/;

/**
 * Opaque public refs with a hard-to-guess suffix (10–24 chars).
 * Example shape only — minting is Gateway-side until that follow-up lands.
 */
const OPAQUE_TRACK_REFERENCE = /^RFQ(\d{4})([A-Z0-9]{10,24})$/;

export type ParsedTrackReference = {
  referenceNumber: string;
  kind: "legacy" | "opaque";
};

/** Normalize and accept legacy sequential or new opaque track
 *  references. Separators (dashes, spaces) are stripped for matching;
 *  the returned referenceNumber is always the canonical dashed form. */
export function parseTrackReference(raw: string | null | undefined): ParsedTrackReference | null {
  const compact = String(raw || "")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "");
  if (!compact) return null;

  const lead = compact.match(LEAD_TRACK_REFERENCE);
  if (lead) return { referenceNumber: `LEAD-${lead[1]}-${lead[2]}`, kind: "legacy" };

  const legacy = compact.match(LEGACY_TRACK_REFERENCE);
  if (legacy) return { referenceNumber: `RFQ-${legacy[1]}-${legacy[2]}`, kind: "legacy" };

  const opaque = compact.match(OPAQUE_TRACK_REFERENCE);
  if (opaque) return { referenceNumber: `RFQ-${opaque[1]}-${opaque[2]}`, kind: "opaque" };

  return null;
}

/** A sequential reference appearing anywhere inside a longer message,
 *  e.g. "my reference is lead 2026 000001, any update?" */
const REFERENCE_IN_TEXT = /(LEAD|RFQ)[\s-]*(\d{4})[\s-]*(\d{6})/i;

/** Find a trackable reference inside free text and return its
 *  normalized form, or null. A whole-message reference (including the
 *  opaque shape) is tried first. Only the reference itself is
 *  returned — never any status or lead details. */
export function findTrackReference(rawText: string | null | undefined): string | null {
  const direct = parseTrackReference(rawText);
  if (direct) return direct.referenceNumber;
  const match = String(rawText || "").match(REFERENCE_IN_TEXT);
  if (!match) return null;
  const candidate = `${match[1].toUpperCase()}-${match[2]}-${match[3]}`;
  return parseTrackReference(candidate)?.referenceNumber ?? null;
}
