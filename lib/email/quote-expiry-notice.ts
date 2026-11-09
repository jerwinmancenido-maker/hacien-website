import { buildEmailParagraph, buildEmailShell, escapeHtml } from "@/lib/email/template";

/**
 * HTML for the draft-request reminder sent by cron/quote-expiry-monitor.ts.
 * The paragraph is the same reminder the cron used to inline. The shell is
 * the shared HACIEN email template.
 */
export function buildQuoteExpiryNoticeHtml(reference: string): string {
  const safeReference = escapeHtml(reference);
  return buildEmailShell({
    heading: "Draft quotation review window",
    bodyHtml: buildEmailParagraph(
      `Your HACIEN draft request ${safeReference} may need follow-up review. Pricing, availability, and documents remain subject to confirmation before any official business record.`,
      "0",
    ),
    footnote: "This is an automatic reminder about a draft request.",
  });
}
