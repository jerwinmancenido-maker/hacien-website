/** Legacy sequential Gateway refs, e.g. RFQ-2026-000009 */
const LEGACY_TRACK_REFERENCE = /^RFQ-(\d{4})-(\d{6})$/i;

/**
 * Opaque public refs with a hard-to-guess suffix (10–24 chars).
 * Example shape only — minting is Gateway-side until that follow-up lands.
 */
const OPAQUE_TRACK_REFERENCE = /^RFQ-(\d{4})-([A-Z0-9]{10,24})$/i;

export type ParsedTrackReference = {
  referenceNumber: string;
  kind: "legacy" | "opaque";
};

/** Normalize and accept legacy sequential or new opaque track references. */
export function parseTrackReference(raw: string | null | undefined): ParsedTrackReference | null {
  const referenceNumber = String(raw || "").trim().toUpperCase();
  if (!referenceNumber) return null;

  if (LEGACY_TRACK_REFERENCE.test(referenceNumber)) {
    return { referenceNumber, kind: "legacy" };
  }

  if (OPAQUE_TRACK_REFERENCE.test(referenceNumber)) {
    return { referenceNumber, kind: "opaque" };
  }

  return null;
}
