import { companyContact, replyTime } from "@/data/companyContact";
import { sendEmail } from "@/lib/email/resend-client";
import {
  buildEmailParagraph,
  buildEmailShell,
  buildReferenceBox,
  buildStepsSection,
  buildSummarySection,
  escapeHtml,
} from "@/lib/email/template";
import { getCanonicalUrl } from "@/lib/seo/site-metadata";

/**
 * Confirmation email sent to the customer after a website inquiry, quote
 * request, or callback request is accepted by the Gateway.
 *
 * The submission itself never depends on this email: when the mail provider
 * is not configured (or the send fails), the caller logs it and the
 * submission still succeeds with its reference number.
 *
 * The body is built on the shared email template (lib/email/template.ts)
 * — the same shell as the staff notification email.
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

/** Labels the submission flow itself puts in front of summary lines. A line
 * starting with one of these renders as a label/value row; any other line
 * (e.g. a customer's free-text message) renders as a full-width row. */
const SUMMARY_LABELS = ["What you need", "Requirement package", "Type", "Your message"];

export function buildInquiryConfirmationEmail(
  input: InquiryConfirmationInput,
): InquiryConfirmationEmail | null {
  const email = input.email.trim();
  const referenceNumber = input.referenceNumber.trim();
  if (!email || !referenceNumber) return null;

  const { title, kind } = getConfirmationKind(input.type);
  const name = input.name?.trim();
  const trackUrl = getCanonicalUrl(`/track/${encodeURIComponent(referenceNumber)}`);
  const contactEmail = escapeHtml(companyContact.email);

  const steps = buildStepsSection("What happens next", [
    "Our team reviews your request.",
    `Reply time: ${escapeHtml(replyTime)}`,
    `Questions in the meantime? Email <a href="mailto:${contactEmail}" style="color:#2563EB;text-decoration:none;">${contactEmail}</a> and mention your reference number.`,
  ]);

  // No filter on purpose: an empty summary section keeps the same blank
  // line the hand-written template produced, so the output is unchanged.
  const bodyHtml = [
    buildEmailParagraph(`Hi${name ? ` ${escapeHtml(name)}` : ""},`, "0 0 8px"),
    buildEmailParagraph(
      `Thank you — we&rsquo;ve received your ${escapeHtml(kind)}. Keep your reference number; you can use it to track your request any time.`,
    ),
    buildReferenceBox(referenceNumber, { url: trackUrl, label: "Track your request" }),
    buildSummarySection("What you sent", input.summaryLines, SUMMARY_LABELS),
    steps,
  ].join("\n");

  return {
    to: email,
    subject: `${title} — ${referenceNumber} · HACIEN`,
    html: buildEmailShell({
      heading: title,
      bodyHtml,
      footnote: "This is an automatic confirmation of your website submission.",
    }),
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
