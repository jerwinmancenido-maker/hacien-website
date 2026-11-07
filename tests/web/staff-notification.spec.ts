import { readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import {
  buildStaffNotificationEmail,
  sendStaffNotificationEmail,
} from "@/lib/email/staff-notification";

const ROOT = process.cwd();
const read = (rel: string) => readFileSync(path.join(ROOT, rel), "utf8");

const SAMPLE = {
  type: "Universal RFQ Gateway Submission",
  email: "buyer@acme.ph",
  referenceNumber: "RFQ-2026-000009",
  name: "Maria Santos",
  company: "Acme Corp",
  summaryLines: ["What you need: 10 laptops", "Requirement package: 1 item"],
};

describe("staff notification email", () => {
  it("builds a notification to sales with the reference, customer, and summary", () => {
    const built = buildStaffNotificationEmail(SAMPLE, "sales@haciensolutions.com");
    expect(built).not.toBeNull();
    expect(built?.to).toBe("sales@haciensolutions.com");
    expect(built?.subject).toContain("New quotation request");
    expect(built?.subject).toContain("RFQ-2026-000009");
    expect(built?.html).toContain("Maria Santos");
    expect(built?.html).toContain("Acme Corp");
    expect(built?.html).toContain("buyer@acme.ph");
    // Summary lines render as label/value rows on the shared template.
    expect(built?.html).toContain("What you need");
    expect(built?.html).toContain("10 laptops");
    expect(built?.html).toContain("Requirement package");
    expect(built?.html).toContain("1 item");
    expect(built?.html).toContain("status RECEIVED");
  });

  it("is built on the shared email template shell", () => {
    const built = buildStaffNotificationEmail(SAMPLE, "sales@haciensolutions.com");
    expect(built?.html).toContain("<!doctype html>");
    expect(built?.html).toContain("background-color:#0A0A0A");
    expect(built?.html).toContain("REFERENCE NUMBER");
    expect(built?.html).toContain("RFQ-2026-000009");
    expect(built?.html).toContain("HACIEN Information Technology Solutions");
    expect(built?.html).toContain("This is an automatic notification from the HACIEN website.");
  });

  it("labels callbacks and plain inquiries in the subject", () => {
    const callback = buildStaffNotificationEmail(
      { ...SAMPLE, type: "Callback Request", summaryLines: ["Please call me back at 09171234567."] },
      "sales@haciensolutions.com",
    );
    expect(callback?.subject).toContain("New callback request");

    const inquiry = buildStaffNotificationEmail(
      { ...SAMPLE, type: "Contact Inquiry", summaryLines: ["Type: General Question"] },
      "sales@haciensolutions.com",
    );
    expect(inquiry?.subject).toContain("New inquiry —");
  });

  it("omits the company row when no company was given", () => {
    const built = buildStaffNotificationEmail(
      { ...SAMPLE, company: "" },
      "sales@haciensolutions.com",
    );
    expect(built?.html).not.toContain("Company");
    expect(built?.html).toContain("Maria Santos");
  });

  it("returns null without a recipient or a reference number", () => {
    expect(buildStaffNotificationEmail(SAMPLE, "  ")).toBeNull();
    expect(
      buildStaffNotificationEmail({ ...SAMPLE, referenceNumber: "" }, "sales@haciensolutions.com"),
    ).toBeNull();
  });

  it("escapes customer-supplied content", () => {
    const built = buildStaffNotificationEmail(
      { ...SAMPLE, name: '<script>alert("x")</script>', summaryLines: ["Need: <b>laptops</b>"] },
      "sales@haciensolutions.com",
    );
    expect(built?.html).not.toContain("<script>");
    expect(built?.html).toContain("&lt;script&gt;");
    expect(built?.html).not.toContain("<b>laptops</b>");
    expect(built?.html).toContain("&lt;b&gt;laptops&lt;/b&gt;");
  });
});

describe("staff notification sending", () => {
  const saved = {
    SALES_TO_EMAIL: process.env.SALES_TO_EMAIL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
  };

  afterEach(() => {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });

  it("fails closed (false, no send) when SALES_TO_EMAIL is not set", async () => {
    delete process.env.SALES_TO_EMAIL;
    process.env.RESEND_API_KEY = "test-key";
    process.env.RESEND_FROM_EMAIL = "no-reply@haciensolutions.com";
    await expect(sendStaffNotificationEmail(SAMPLE)).resolves.toBe(false);
  });

  it("fails closed when the mail provider is not configured", async () => {
    process.env.SALES_TO_EMAIL = "sales@haciensolutions.com";
    delete process.env.RESEND_API_KEY;
    process.env.RESEND_FROM_EMAIL = "no-reply@haciensolutions.com";
    await expect(sendStaffNotificationEmail(SAMPLE)).resolves.toBe(false);
  });
});

describe("staff notification wiring", () => {
  it("the submit action notifies staff after the customer confirmation", () => {
    const action = read("app/actions/send-inquiry.ts");
    expect(action).toContain("sendStaffNotificationEmail");
    expect(action.indexOf("sendInquiryConfirmationEmail({")).toBeGreaterThan(-1);
    expect(action.indexOf("sendStaffNotificationEmail({")).toBeGreaterThan(
      action.indexOf("sendInquiryConfirmationEmail({"),
    );
  });

  it("the recipient comes from the SALES_TO_EMAIL setting, not a hard-coded address", () => {
    const sender = read("lib/email/staff-notification.ts");
    expect(sender).toContain("process.env.SALES_TO_EMAIL");
    expect(sender).not.toContain("sales@haciensolutions.com");
  });

  it("the body is composed from the shared email template, not hand-rolled HTML", () => {
    const sender = read("lib/email/staff-notification.ts");
    expect(sender).toContain('from "@/lib/email/template"');
    expect(sender).toContain("buildEmailShell");
  });
});
