import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { buildQuoteExpiryNoticeHtml } from "@/lib/email/quote-expiry-notice";

const ROOT = process.cwd();
const read = (rel: string) => readFileSync(path.join(ROOT, rel), "utf8");

const NOTICE =
  "Your HACIEN draft request RFQ-2026-000042 may need follow-up review. Pricing, availability, and documents remain subject to confirmation before any official business record.";

describe("quote expiry notice email", () => {
  it("keeps the reminder sentence inside the shared email shell", () => {
    const html = buildQuoteExpiryNoticeHtml("RFQ-2026-000042");

    expect(html).toContain(NOTICE);
    expect(html).toContain("<!doctype html>");
    expect(html).toContain("background-color:#0A0A0A");
    expect(html).toContain("background-color:#2563EB");
    expect(html).toContain("Draft quotation review window");
    expect(html).toContain("HACIEN Information Technology Solutions");
    expect(html).toContain("info@haciensolutions.com");
    expect(html).toContain("This is an automatic reminder about a draft request.");
  });

  it("escapes the draft reference before it is placed in the paragraph", () => {
    const html = buildQuoteExpiryNoticeHtml(`Q&A <draft> "1"`);

    expect(html).toContain("Your HACIEN draft request Q&amp;A &lt;draft&gt; &quot;1&quot; may need follow-up review.");
    expect(html).not.toContain("<draft>");
    expect(html).not.toContain('"1"');
  });

  it("the cron builds that HTML and keeps the same recipient, subject, and send", () => {
    const cron = read("cron/quote-expiry-monitor.ts");

    expect(cron).toContain("buildQuoteExpiryNoticeHtml");
    expect(cron).toContain('subject: "HACIEN draft quotation review window"');
    expect(cron).toContain("to,");
    expect(cron).toContain("order.organization.email");
    expect(cron).toContain("from: `HACIEN <${fromEmail}>`");
    expect(cron).toContain('fetch("https://api.resend.com/emails"');
    expect(cron).not.toContain("<p>Your HACIEN draft request");
  });
});
