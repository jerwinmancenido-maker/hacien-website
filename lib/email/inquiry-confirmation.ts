import { companyContact, replyTime } from "@/data/companyContact";
import { sendEmail } from "@/lib/email/resend-client";
import { getCanonicalUrl } from "@/lib/seo/site-metadata";

/**
 * Confirmation email sent to the customer after a website inquiry, quote
 * request, or callback request is accepted by the Gateway.
 *
 * The submission itself never depends on this email: when the mail provider
 * is not configured (or the send fails), the caller logs it and the
 * submission still succeeds with its reference number.
 */

export type InquiryConfirmationInput = {
  /** The submission type, e.g. "Universal RFQ Gateway Submission". */
  type: string;
  email: string;
  referenceNumber: string;
  name?: string;
  /** Plain one-line summaries of what the customer sent. */
  summaryLines: string[];
};

export type InquiryConfirmationEmail = {
  to: string;
  subject: string;
  html: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getConfirmationKind(type: string): {
  title: string;
  kind: string;
} {
  const normalized = type.toLowerCase();
  if (normalized.includes("quote") || normalized.includes("rfq")) {
    return { title: "Quotation request received", kind: "quotation request" };
  }
  if (normalized.includes("callback")) {
    return { title: "Callback request received", kind: "callback request" };
  }
  return { title: "Inquiry received", kind: "inquiry" };
}

export function buildInquiryConfirmationEmail(
  input: InquiryConfirmationInput,
): InquiryConfirmationEmail | null {
  const email = input.email.trim();
  const referenceNumber = input.referenceNumber.trim();
  if (!email || !referenceNumber) return null;

  const { title, kind } = getConfirmationKind(input.type);
  const name = input.name?.trim();
  const trackUrl = getCanonicalUrl(`/track/${encodeURIComponent(referenceNumber)}`);
  const summaryItems = input.summaryLines
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `      <li>${escapeHtml(line)}</li>`)
    .join("\n");

  const html = [
    `<p>Hi${name ? ` ${escapeHtml(name)}` : ""},</p>`,
    `<p>We&rsquo;ve received your ${kind}. Your reference number is <strong>${escapeHtml(referenceNumber)}</strong>.</p>`,
    summaryItems
      ? `<p><strong>What you sent</strong></p>\n    <ul>\n${summaryItems}\n    </ul>`
      : "",
    `<p>Track your request: <a href="${trackUrl}">${trackUrl}</a></p>`,
    `<p>Reply time: ${escapeHtml(replyTime)}</p>`,
    `<p>HACIEN Information Technology Solutions &middot; ${escapeHtml(companyContact.email)}</p>`,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    to: email,
    subject: `${title} — ${referenceNumber} · HACIEN`,
    html,
  };
}

/**
 * Sends the confirmation email. Returns true only when Resend accepted it.
 * Returns false (never throws) when the provider is not configured, the
 * input is incomplete, or the send fails — the submission still succeeds.
 */
export async function sendInquiryConfirmationEmail(
  input: InquiryConfirmationInput,
): Promise<boolean> {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    console.warn("CONFIRMATION: email provider not configured, skipping confirmation email.", {
      referenceNumber: input.referenceNumber,
    });
    return false;
  }

  const built = buildInquiryConfirmationEmail(input);
  if (!built) return false;

  try {
    const result = await sendEmail(built);
    return result.success;
  } catch (err) {
    console.error("CONFIRMATION: failed to send confirmation email.", {
      referenceNumber: input.referenceNumber,
      error: err instanceof Error ? err.message : "Unknown error",
    });
    return false;
  }
}
