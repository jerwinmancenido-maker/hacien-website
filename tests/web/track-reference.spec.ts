import { describe, expect, it } from "vitest";
import { parseTrackReference } from "@/lib/security/track-reference";

describe("track reference parser (c)", () => {
  it("accepts legacy sequential refs", () => {
    expect(parseTrackReference("RFQ-2026-000009")).toEqual({
      referenceNumber: "RFQ-2026-000009",
      kind: "legacy",
    });
    expect(parseTrackReference("rfq-2026-000001")).toEqual({
      referenceNumber: "RFQ-2026-000001",
      kind: "legacy",
    });
  });

  it("accepts opaque hard-to-guess refs", () => {
    expect(parseTrackReference("RFQ-2026-K7M2P9Q4X1AB")).toEqual({
      referenceNumber: "RFQ-2026-K7M2P9Q4X1AB",
      kind: "opaque",
    });
  });

  it("rejects malformed refs before any Gateway call", () => {
    expect(parseTrackReference("")).toBeNull();
    expect(parseTrackReference("RFQ-26-000001")).toBeNull();
    expect(parseTrackReference("RFQ-2026-1")).toBeNull();
    expect(parseTrackReference("RFQ-2026-00001")).toBeNull();
    expect(parseTrackReference("RFQ-2026-0000001")).toBeNull();
    expect(parseTrackReference("INV-2026-000001")).toBeNull();
    expect(parseTrackReference("RFQ-2026-$$$$")).toBeNull();
    expect(parseTrackReference("../etc/passwd")).toBeNull();
  });
});
