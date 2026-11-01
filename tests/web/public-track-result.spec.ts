import { describe, expect, it } from "vitest";
import { toPublicTrackResult } from "@/lib/security/public-track-result";

describe("public track result serializer (d)", () => {
  it("keeps only status and dates from a PII-heavy Gateway payload", () => {
    const result = toPublicTrackResult({
      gateway: {
        referenceNumber: "RFQ-2026-000009",
        status: "RECEIVED",
        receivedAt: "2026-03-01T08:15:00.000Z",
        message: "Call Jane Doe at +63 917 000 0000 about the Manila delivery",
        customerName: "Jane Doe",
        email: "jane.doe@example.com",
        phone: "+63 917 000 0000",
        address: "123 Example Street, Pasig",
        price: "PHP 999999",
        fileUrl: "https://example.com/secret-quote.pdf",
        history: [
          {
            type: "NOTE",
            actor: "agent@example.com",
            body: "Customer SSN 123-45-6789",
            at: "2026-03-01T09:00:00.000Z",
          },
        ],
      },
      timeline: {
        events: [
          {
            id: "evt-1",
            title: "Internal review by John Smith",
            description: "Email jane.doe@example.com for bank details",
            reason: "pricing",
            nextAction: "Send file secret-quote.pdf",
            occurredAt: "2026-03-02T10:00:00.000Z",
          },
        ],
      },
    });

    expect(result).toEqual({
      status: "RECEIVED",
      receivedAt: "2026-03-01T08:15:00.000Z",
      eventDates: ["2026-03-02T10:00:00.000Z"],
    });

    const serialized = JSON.stringify(result);
    expect(serialized).not.toMatch(/Jane Doe|jane\.doe|917 000|Pasig|999999|secret-quote|SSN|John Smith|bank details/i);
    expect(serialized).not.toContain("referenceNumber");
    expect(serialized).not.toContain("message");
    expect(serialized).not.toContain("history");
    expect(serialized).not.toContain("description");
  });

  it("returns null when status is missing", () => {
    expect(
      toPublicTrackResult({
        gateway: {
          receivedAt: "2026-03-01T08:15:00.000Z",
          email: "leak@example.com",
        },
      }),
    ).toBeNull();
  });

  it("maps unknown status tokens to a generic status", () => {
    expect(
      toPublicTrackResult({
        gateway: {
          status: "SUPER_SECRET_INTERNAL_STATE",
          receivedAt: "2026-03-01T08:15:00.000Z",
        },
      }),
    ).toEqual({
      status: "UNAVAILABLE",
      receivedAt: "2026-03-01T08:15:00.000Z",
      eventDates: [],
    });
  });
});
