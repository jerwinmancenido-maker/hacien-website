export type PublicTrackResult = {
  status: string;
  receivedAt: string | null;
  eventDates: string[];
};

const ALLOWED_TRACK_STATUSES = new Set([
  "RECEIVED",
  "IN_REVIEW",
  "NEEDS_CLARIFICATION",
  "QUOTED",
  "CLOSED",
  "REJECTED",
  "CANCELLED",
  "COMPLETED",
]);

const GENERIC_TRACK_STATUS = "UNAVAILABLE";

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function readIsoDate(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Date.parse(trimmed);
  if (Number.isNaN(parsed)) return null;
  return new Date(parsed).toISOString();
}

function normalizePublicStatus(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const status = raw.trim().toUpperCase();
  if (!status) return null;
  return ALLOWED_TRACK_STATUSES.has(status) ? status : GENERIC_TRACK_STATUS;
}

/**
 * Allowlist-only public track view: status + dates.
 * Drops names, emails, phones, addresses, prices, files, messages, actors, and bodies.
 */
export function toPublicTrackResult(gatewayPayload: unknown): PublicTrackResult | null {
  const root = asRecord(gatewayPayload);
  if (!root) return null;

  const gateway = asRecord(root.gateway) ?? root;
  const status = normalizePublicStatus(gateway.status);
  if (!status) return null;

  const receivedAt = readIsoDate(gateway.receivedAt);

  const timeline = asRecord(root.timeline);
  const events = Array.isArray(timeline?.events)
    ? timeline.events
    : Array.isArray(root.events)
      ? root.events
      : [];

  const eventDates: string[] = [];
  for (const event of events) {
    const row = asRecord(event);
    if (!row) continue;
    const occurredAt = readIsoDate(row.occurredAt) ?? readIsoDate(row.at);
    if (occurredAt) eventDates.push(occurredAt);
  }

  return {
    status,
    receivedAt,
    eventDates,
  };
}
