import { describe, expect, it } from "vitest";
import { findTrackReference, parseTrackReference } from "@/lib/security/track-reference";

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

  it("accepts LEAD refs (the Gateway's website-inquiry format) in any case, with or without spaces", () => {
    expect(parseTrackReference("LEAD-2026-000001")).toEqual({
      referenceNumber: "LEAD-2026-000001",
      kind: "legacy",
    });
    expect(parseTrackReference("lead-2026-000001")).toEqual({
      referenceNumber: "LEAD-2026-000001",
      kind: "legacy",
    });
    expect(parseTrackReference(" LEAD 2026 000001 ")).toEqual({
      referenceNumber: "LEAD-2026-000001",
      kind: "legacy",
    });
    expect(parseTrackReference("LEAD-2026-00001")).toBeNull();
    expect(parseTrackReference("LEAD-26-000001")).toBeNull();
  });

  it("finds a reference inside a longer chat message", () => {
    expect(findTrackReference("my reference is lead 2026 000001, any update?")).toBe(
      "LEAD-2026-000001",
    );
    expect(findTrackReference("LEAD-2026-000001")).toBe("LEAD-2026-000001");
    expect(findTrackReference("RFQ-2026-K7M2P9Q4X1AB")).toBe("RFQ-2026-K7M2P9Q4X1AB");
    expect(findTrackReference("I need a quote for 2026 laptops")).toBeNull();
    expect(findTrackReference("call me on 0917 555 0101")).toBeNull();
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
