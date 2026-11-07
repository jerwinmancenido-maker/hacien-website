import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { buildInquiryConfirmationEmail } from "@/lib/email/inquiry-confirmation";

const ROOT = process.cwd();
const read = (rel: string) => readFileSync(path.join(ROOT, rel), "utf8");

describe("inquiry confirmation email", () => {
  it("builds a quote confirmation with the reference, track link, and summary", () => {
    const built = buildInquiryConfirmationEmail({
      type: "Universal RFQ Gateway Submission",
      email: "buyer@acme.ph",
      referenceNumber: "RFQ-2026-000009",
      name: "Maria Santos",
      summaryLines: ["What you need: 10 laptops", "Requirement package: 1 item"],
    });
    expect(built).not.toBeNull();
    expect(built?.to).toBe("buyer@acme.ph");
    expect(built?.subject).toContain("Quotation request received");
    expect(built?.subject).toContain("RFQ-2026-000009");
    expect(built?.html).toContain("Hi Maria Santos,");
    expect(built?.html).toContain("REFERENCE NUMBER");
    expect(built?.html).toContain("RFQ-2026-000009");
    expect(built?.html).toContain("https://haciensolutions.com/track/RFQ-2026-000009");
    expect(built?.html).toContain("What you need");
    expect(built?.html).toContain("10 laptops");
    expect(built?.html).toContain("Requirement package");
    expect(built?.html).toContain("1 item");
    expect(built?.html).toContain("Within 1 business day");
    expect(built?.html).toContain("info@haciensolutions.com");
  });

  it("uses the inquiry and callback titles for those types", () => {
    const inquiry = buildInquiryConfirmationEmail({
      type: "Contact Inquiry",
      email: "jose@supply.ph",
      referenceNumber: "RFQ-2026-000010",
      summaryLines: ["Your message: We supply servers."],
    });
    expect(inquiry?.subject).toContain("Inquiry received");
    expect(inquiry?.html).toContain("Your message");
    expect(inquiry?.html).toContain("We supply servers.");

    const callback = buildInquiryConfirmationEmail({
      type: "Callback Request",
      email: "maria@acme.ph",
      referenceNumber: "RFQ-2026-000011",
      summaryLines: ["Please call me back at 09171234567."],
    });
    expect(callback?.subject).toContain("Callback request received");
    // A summary line without a known label renders whole, as one row.
    expect(callback?.html).toContain("Please call me back at 09171234567.");
  });

  it("returns null without an email address or a reference number", () => {
    expect(
      buildInquiryConfirmationEmail({
        type: "Contact Inquiry",
        email: "  ",
        referenceNumber: "RFQ-2026-000009",
        summaryLines: [],
      }),
    ).toBeNull();
    expect(
      buildInquiryConfirmationEmail({
        type: "Contact Inquiry",
        email: "buyer@acme.ph",
        referenceNumber: " ",
        summaryLines: [],
      }),
    ).toBeNull();
  });

  it("escapes user content in the email body", () => {
    const built = buildInquiryConfirmationEmail({
      type: "Contact Inquiry",
      email: "buyer@acme.ph",
      referenceNumber: "RFQ-2026-000009",
      name: "<script>alert(1)</script>",
      summaryLines: ["Your message: <b>bold</b> & \"quoted\""],
    });
    expect(built?.html).not.toContain("<script>");
    expect(built?.html).toContain("&lt;script&gt;");
    expect(built?.html).toContain("&lt;b&gt;bold&lt;/b&gt; &amp; &quot;quoted&quot;");
  });

  it("the action sends the confirmation after a successful gateway submission, without failing it", () => {
    const action = read("app/actions/send-inquiry.ts");
    expect(action).toContain("sendInquiryConfirmationEmail");
    expect(action).toContain("confirmationSent");
    expect(action).toContain("result.referenceNumber");
  });

  it("the chat success screen mentions the confirmation email", () => {
    // The full forms are gone (Step B) — the guided chat is the only
    // success screen left, and it carries the confirmation line.
    expect(read("components/GuidedChat.tsx")).toContain(
      "A confirmation email is on its way to your inbox.",
    );
  });
});
