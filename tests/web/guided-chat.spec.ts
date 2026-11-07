import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { contactInquiryTypes } from "@/app/actions/contact-inquiry";
import {
  CHAT_PATHS,
  getChatPath,
  validateStepAnswer,
} from "@/lib/guided-chat/steps";
import {
  buildCallbackPayload,
  buildInquiryPayload,
  buildQuotePayload,
  buildTrackUrl,
} from "@/lib/guided-chat/payloads";
import { formatRequirementLines } from "@/lib/quote-requirements";

const ROOT = process.cwd();
const read = (rel: string) => readFileSync(path.join(ROOT, rel), "utf8");

const META = { website: "", formStartedAt: String(Date.now() - 60_000), turnstileToken: "test-token" };

const SAMPLE_REQUIREMENT = {
  categoryLabel: "Computers & Laptops",
  quantity: "10",
  brandPreference: "Dell or similar",
  otherBrand: "",
  equivalentAccepted: "Yes",
  deadline: "2026-12-01",
  deliveryLocation: "Ortigas",
  notes: "16GB RAM",
  fields: { RAM: "16GB" },
};

describe("guided chat paths", () => {
  it("offers exactly the four paths: quote, inquiry, callback, track", () => {
    expect(CHAT_PATHS.map((candidate) => candidate.id)).toEqual([
      "quote",
      "inquiry",
      "callback",
      "track",
    ]);
  });

  it("quote path collects every required QuoteCart field, one question at a time", () => {
    const ids = getChatPath("quote").steps.map((step) => step.id);
    for (const field of ["need", "procurementType", "name", "company", "email", "phone", "location", "targetDate"]) {
      expect(ids).toContain(field);
    }
    expect(getChatPath("quote").steps.find((step) => step.id === "need")?.required).toBe(true);
  });

  it("inquiry path uses the real inquiry types from the contact form", () => {
    const step = getChatPath("inquiry").steps.find((candidate) => candidate.id === "inquiryType");
    expect(step?.options).toEqual([...contactInquiryTypes]);
    expect(contactInquiryTypes).toContain("Privacy request");
  });

  it("inquiry path asks guided questions so the message comes back complete", () => {
    const steps = getChatPath("inquiry").steps;
    const ids = steps.map((step) => step.id);
    for (const id of ["inquiryType", "need", "details", "location", "targetDate", "message"]) {
      expect(ids).toContain(id);
    }
    expect(steps.find((step) => step.id === "need")?.required).toBe(true);
    for (const id of ["details", "location", "targetDate", "message"]) {
      expect(steps.find((step) => step.id === id)?.required).toBe(false);
    }
  });

  it("callback path asks for a phone number and a best time", () => {
    const ids = getChatPath("callback").steps.map((step) => step.id);
    expect(ids).toContain("phone");
    expect(ids).toContain("bestTime");
    expect(getChatPath("callback").steps.find((step) => step.id === "phone")?.required).toBe(true);
  });

  it("track path asks for the reference number only", () => {
    expect(getChatPath("track").steps.map((step) => step.id)).toEqual(["reference"]);
  });
});

describe("guided chat validation", () => {
  it("rejects an empty answer on a required step and accepts it when filled", () => {
    const step = getChatPath("quote").steps.find((candidate) => candidate.id === "name")!;
    expect(validateStepAnswer(step, "  ")).toBe("Please answer to continue.");
    expect(validateStepAnswer(step, "Maria Santos")).toBeNull();
  });

  it("rejects a bad email and accepts a good one", () => {
    const step = getChatPath("quote").steps.find((candidate) => candidate.id === "email")!;
    expect(validateStepAnswer(step, "not-an-email")).toMatch(/email/i);
    expect(validateStepAnswer(step, "buyer@company.ph")).toBeNull();
  });

  it("rejects a too-short phone number", () => {
    const step = getChatPath("quote").steps.find((candidate) => candidate.id === "phone")!;
    expect(validateStepAnswer(step, "123")).toMatch(/phone/i);
    expect(validateStepAnswer(step, "09171234567")).toBeNull();
  });

  it("lets an optional step pass empty", () => {
    const step = getChatPath("quote").steps.find((candidate) => candidate.id === "budgetRange")!;
    expect(step.required).toBe(false);
    expect(validateStepAnswer(step, "")).toBeNull();
  });
});

describe("guided chat payloads", () => {
  it("quote payload matches the QuoteCart submission shape", () => {
    const payload = buildQuotePayload(
      {
        need: "10 laptops",
        procurementType: "Corporate",
        name: "Maria Santos",
        company: "Acme Corp",
        email: "buyer@acme.ph",
        phone: "09171234567",
        location: "Ortigas",
        targetDate: "2026-12-01",
        budgetRange: "Under PHP 50,000",
      },
      [SAMPLE_REQUIREMENT],
      META,
    );
    expect(payload.type).toBe("Universal RFQ Gateway Submission");
    expect(payload.intakePath).toBe("Describe requirements");
    expect(payload.notes).toBe("10 laptops");
    expect(payload.requirementCount).toBe(1);
    expect(payload.requirements).toContain("Computers & Laptops");
    expect(payload.requirements).toContain("16GB RAM");
    expect(payload.attachmentInfo).toBe("No attachment selected");
    expect(payload.acceptsZeroCatalogProducts).toBe(true);
    expect(payload.turnstileToken).toBe("test-token");
  });

  it("inquiry payload composes a complete message from the guided answers", () => {
    const payload = buildInquiryPayload(
      {
        inquiryType: "Supplier partnership",
        need: "Servers for a new office",
        details: "20 units, rack-mount",
        location: "Ortigas",
        targetDate: "2026-12-01",
        message: "Please send your catalog.",
        name: "Jose Reyes",
        company: "Supply Co",
        email: "jose@supply.ph",
        phone: "",
        budgetRange: "",
        timeline: "This quarter",
      },
      META,
    );
    expect(payload.type).toBe("Contact Inquiry");
    expect(payload.inquiryType).toBe("Supplier partnership");
    expect(payload.message).toContain("What is needed: Servers for a new office");
    expect(payload.message).toContain("Details: 20 units, rack-mount");
    expect(payload.message).toContain("Delivery location: Ortigas");
    expect(payload.message).toContain("Needed by: 2026-12-01");
    expect(payload.message).toContain("Anything else: Please send your catalog.");
    expect(payload.timeline).toBe("This quarter");
  });

  it("inquiry payload skips guided answers the customer left empty", () => {
    const payload = buildInquiryPayload(
      {
        inquiryType: "Privacy request",
        need: "Delete my data",
        details: "",
        location: "",
        targetDate: "",
        message: "",
        name: "Ana Cruz",
        company: "",
        email: "ana@example.ph",
        phone: "",
        budgetRange: "",
        timeline: "",
      },
      META,
    );
    expect(payload.message).toBe("What is needed: Delete my data");
  });

  it("callback payload carries the phone and best time in the message, with no inquiry type", () => {
    const payload = buildCallbackPayload(
      { name: "Maria Santos", phone: "09171234567", bestTime: "Morning (9:00 AM – 12:00 PM)", topic: "Laptop pricing" },
      META,
    );
    expect(payload.type).toBe("Callback Request");
    expect(payload).not.toHaveProperty("inquiryType");
    expect(payload.message).toContain("09171234567");
    expect(payload.message).toContain("Morning (9:00 AM – 12:00 PM)");
    expect(payload.message).toContain("Laptop pricing");
  });

  it("track URL accepts a real reference and rejects garbage", () => {
    expect(buildTrackUrl("RFQ-2026-000009")).toBe("/track/RFQ-2026-000009");
    expect(buildTrackUrl("  rfq-2026-000009  ")).toBe("/track/RFQ-2026-000009");
    expect(buildTrackUrl("not-a-reference")).toBeNull();
    expect(buildTrackUrl("")).toBeNull();
  });
});

describe("shared requirement formatting", () => {
  it("formats a requirement block exactly like the QuoteCart did", () => {
    expect(formatRequirementLines([SAMPLE_REQUIREMENT])).toBe(
      [
        "1. Computers & Laptops — quantity/scope: 10",
        "  - Preferred brand/vendor: Dell or similar",
        "  - Equivalent options: Yes",
        "  - Deadline: 2026-12-01",
        "  - Delivery location: Ortigas",
        "  - RAM: 16GB",
        "  - Notes: 16GB RAM",
      ].join("\n"),
    );
    expect(formatRequirementLines([])).toBe("");
  });

  it("QuoteCart uses the shared formatter, not its own copy", () => {
    expect(read("components/QuoteCart.tsx")).toContain("formatRequirementLines(requirements)");
    expect(read("components/QuoteCart.tsx")).toContain('from "@/lib/quote-requirements"');
  });
});

describe("guided chat wiring", () => {
  it("quote page shows the full QuoteCart directly — the chat lives only in the floating panel", () => {
    const page = read("app/quote/page.tsx");
    expect(page).toContain("<QuoteCart");
    expect(page).toContain("turnstileSiteKey={turnstileSiteKey}");
    expect(page).not.toContain("GuidedChat");
  });

  it("contact and support pages show the full ContactForm directly — the chat lives only in the floating panel", () => {
    for (const rel of ["app/contact/page.tsx", "app/support/page.tsx"]) {
      const page = read(rel);
      expect(page).toContain("<ContactForm");
      expect(page).toContain("turnstileSiteKey={turnstileSiteKey}");
      expect(page).not.toContain("GuidedChat");
    }
  });

  it("the contact form shows a completeness checklist above the message box", () => {
    const form = read("components/ContactForm.tsx");
    expect(form).toContain("Please include:");
    expect(form).toContain("Quantity and specifications");
    expect(form).toContain("Delivery location, if it matters");
    expect(form).toContain("When you need it");
  });

  it("the chat offers the full form and a way back, and never calls itself AI", () => {
    const chat = read("components/GuidedChat.tsx");
    expect(chat).toContain("Prefer the full form?");
    expect(chat).toContain("Back to the guided chat");
    expect(chat).not.toMatch(/AI agent|artificial intelligence/i);
    expect(chat).toContain("{replyTime}");
    expect(chat).toContain("<TurnstileField");
    expect(chat).toContain('name="_website"');
    expect(chat).toContain('name="formStartedAt"');
  });

  it("the chat reads like a support chat: team voice, review summary, and staged processing", () => {
    const chat = read("components/GuidedChat.tsx");
    expect(chat).toContain("HACIEN Team");
    expect(chat).toContain("A real person from the HACIEN team reads every request.");
    expect(chat).toContain("we've got your request");
    expect(chat).toContain("Looks good — send request");
    expect(chat).toContain("Requirement package");
    expect(chat).toContain("Checking your answers…");
    expect(chat).toContain("Sending your request…");
  });
});
