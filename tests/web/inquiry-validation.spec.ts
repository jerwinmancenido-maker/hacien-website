import { describe, expect, it } from "vitest";

import {
  buildCallbackPayload,
  buildInquiryPayload,
  buildQuotePayload,
} from "@/lib/guided-chat/payloads";
import type { QuoteRequirementInput } from "@/lib/quote-requirements";
import {
  INQUIRY_COMPOSED_FIELD_LENGTH_CAP,
  validateInquiryPayload,
} from "@/lib/validation/inquiry";

const META = {
  website: "",
  formStartedAt: String(Date.now() - 60_000),
  turnstileToken: "test-token",
};

const REQUIREMENT_BLOCK: QuoteRequirementInput = {
  categoryLabel: "Computers & Laptops",
  quantity: "25 units for the new office floor",
  brandPreference: "Dell or similar enterprise line",
  equivalentAccepted: "Yes, with equivalent warranty terms",
  deadline: "2026-12-01",
  deliveryLocation: "Ortigas Center, Pasig City",
  notes: "Include docking stations, monitors and three-year on-site warranty coverage.",
  fields: {
    "Screen size": "14 inch",
    Memory: "16 GB",
    Storage: "512 GB SSD",
  },
};

describe("validateInquiryPayload", () => {
  it("accepts a callback request, the flow that intentionally collects no email", () => {
    const payload = buildCallbackPayload(
      {
        name: "Example Person",
        phone: "+63 900 000 0000",
        bestTime: "Weekday mornings",
        topic: "Bulk pricing",
      },
      META,
    );
    expect(payload.email).toBe("");
    expect(validateInquiryPayload(payload)).toEqual({ ok: true });
  });

  it("still rejects a malformed email when a callback request carries one", () => {
    const payload = {
      type: "Callback Request",
      name: "Example Person",
      email: "not-an-email",
      phone: "+63 900 000 0000",
      message: "Please call me back.",
    };
    expect(validateInquiryPayload(payload).ok).toBe(false);
  });

  it("still requires a valid email on every non-callback flow", () => {
    const payload = {
      type: "Contact Inquiry",
      name: "Example Person",
      email: "",
      message: "Hello.",
    };
    expect(validateInquiryPayload(payload)).toEqual({
      ok: false,
      error: "Please enter a valid email address.",
    });
  });

  it("accepts a quote whose composed requirement lines pass the single-field cap", () => {
    const payload = buildQuotePayload(
      {
        name: "Example Person",
        email: "buyer@example.com",
        need: "Office fit-out for a new floor",
      },
      [REQUIREMENT_BLOCK, REQUIREMENT_BLOCK, REQUIREMENT_BLOCK],
      META,
    );
    // The composed lines - not an original field - are what pass the cap.
    expect((payload.requirements as string).length).toBeGreaterThan(600);
    expect(validateInquiryPayload(payload)).toEqual({ ok: true });
  });

  it("accepts an inquiry whose composed message passes the long-field cap", () => {
    const payload = buildInquiryPayload(
      {
        name: "Example Person",
        email: "buyer@example.com",
        need: "x".repeat(4_000),
        details: "y".repeat(500),
      },
      META,
    );
    // A max-length need answer composes, with its labels, past the cap.
    expect((payload.message as string).length).toBeGreaterThan(4_000);
    expect(validateInquiryPayload(payload)).toEqual({ ok: true });
  });

  it("still caps an original field on a flow whose message is composed", () => {
    const payload = buildInquiryPayload(
      {
        name: "Example Person",
        email: "buyer@example.com",
        company: "z".repeat(601),
        need: "New laptops",
      },
      META,
    );
    expect(validateInquiryPayload(payload).ok).toBe(false);
  });

  it("still caps an original field on a quote payload", () => {
    const payload = buildQuotePayload(
      {
        name: "Example Person",
        email: "buyer@example.com",
        company: "c".repeat(601),
      },
      [],
      META,
    );
    expect(validateInquiryPayload(payload).ok).toBe(false);
  });

  it("still caps the message a form sends as an original field", () => {
    const payload = {
      type: "Quick RFQ",
      name: "Example Person",
      email: "buyer@example.com",
      message: "m".repeat(4_001),
    };
    expect(validateInquiryPayload(payload).ok).toBe(false);
  });
  it("rejects a composed message past the absolute ceiling, even on the real inquiry type", () => {
    // A raw POST wearing the exact builder type still cannot put an
    // unbounded field in front of the Gateway.
    const payload = {
      type: "Contact Inquiry",
      name: "Example Person",
      email: "buyer@example.com",
      message: "m".repeat(INQUIRY_COMPOSED_FIELD_LENGTH_CAP + 1),
    };
    expect(validateInquiryPayload(payload).ok).toBe(false);
  });

  it("rejects composed quote requirements past the absolute ceiling", () => {
    const payload = buildQuotePayload(
      {
        name: "Example Person",
        email: "buyer@example.com",
        need: "Office fit-out for a new floor",
      },
      [REQUIREMENT_BLOCK],
      META,
    );
    payload.requirements = "r".repeat(INQUIRY_COMPOSED_FIELD_LENGTH_CAP + 1);
    expect(validateInquiryPayload(payload).ok).toBe(false);
  });

  it("gives no composed-field exemption to a lookalike type string", () => {
    const payload = {
      type: "Bulk Contact Inquiry",
      name: "Example Person",
      email: "buyer@example.com",
      message: "m".repeat(4_001),
    };
    expect(validateInquiryPayload(payload).ok).toBe(false);
  });

  it("gives no email exemption to a lookalike callback type string", () => {
    const payload = {
      type: "Callback Request Form",
      name: "Example Person",
      email: "",
      phone: "+63 900 000 0000",
      message: "Please call me back.",
    };
    expect(validateInquiryPayload(payload).ok).toBe(false);
  });

  it("rejects a callback request that carries no phone number", () => {
    const payload = {
      type: "Callback Request",
      name: "Example Person",
    };
    expect(validateInquiryPayload(payload)).toEqual({
      ok: false,
      error: "Please enter a valid phone number.",
    });
  });

  it("rejects a callback request whose phone number is unusable", () => {
    const payload = buildCallbackPayload(
      {
        name: "Example Person",
        phone: "123",
        bestTime: "Weekday mornings",
        topic: "Bulk pricing",
      },
      META,
    );
    expect(validateInquiryPayload(payload).ok).toBe(false);
  });

  it("accepts a callback request with a valid phone and no email", () => {
    const payload = {
      type: "Callback Request",
      name: "Example Person",
      email: "",
      phone: "+63 917 123 4567",
      message: "Please call me back at +63 917 123 4567.",
    };
    expect(validateInquiryPayload(payload)).toEqual({ ok: true });
  });

  it("rejects a non-string value on a content field", () => {
    const payload = buildInquiryPayload(
      {
        name: "Example Person",
        email: "buyer@example.com",
        need: "New laptops",
      },
      META,
    );
    payload.company = ["c".repeat(601)];
    expect(validateInquiryPayload(payload).ok).toBe(false);
  });
});
