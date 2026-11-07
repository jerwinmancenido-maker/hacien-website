import { sendEmail } from "@/lib/email/resend-client";
import {
  buildEmailParagraph,
  buildEmailShell,
  buildFactsSection,
  buildReferenceBox,
  buildSummarySection,
  escapeHtml,
  type EmailFact,
} from "@/lib/email/template";

/**
 * Staff notification sent to the sales inbox after a website submission
 * is accepted by the Gateway. The recipient is the SALES_TO_EMAIL
 * setting (the sales inbox on live).
 *
 * This email is the only signal that a new request arrived — submissions
 * otherwise sit in the Gateway with status RECEIVED and nobody is told.
 * It is still best-effort: it fails closed when SALES_TO_EMAIL or the
 * mail provider is not configured, and a failed send never fails the
 * submission itself.
 *
 * The body is built on the shared email template (lib/email/template.ts)
 * — the same shell as the customer confirmation email.
 */

export type StaffNotificationInput = {
  /** The submission type, e.g. "Universal RFQ Gateway Submission". */
  type: string;
  /** The customer's email address. */
  email: string;
  referenceNumber: string;
  name?: string;
  company?: string;
  /** Plain one-line summaries of what the customer sent. */
  summaryLines: string[];
};

export type StaffNotificationEmail = {
  to: string;
  subject: string;
  html: string;
};

function getNotificationKind(type: string): string {
  const normalized = type.toLowerCase();
  if (normalized.includes("quote") || normalized.includes("rfq")) {
    return "quotation request";
  }
  if (normalized.includes("callback")) {
    return "callback request";
  }
  return "inquiry";
}

/** Labels the submission flow itself puts in front of summary lines —
 * the same set the customer confirmation email uses. */
const SUMMARY_LABELS = ["What you need", "Requirement package", "Type", "Your message"];

export function buildStaffNotificationEmail(
  input: StaffNotificationInput,
  recipient: string,
): StaffNotificationEmail | null {
  const to = recipient.trim();
  const referenceNumber = input.referenceNumber.trim();
  if (!to || !referenceNumber) return null;

  const kind = getNotificationKind(input.type);
  const customerEmail = input.email.trim();
  const name = input.name?.trim();
  const company = input.company?.trim();

  const facts: EmailFact[] = [{ label: "Type", value: kind }];
  if (name) facts.push({ label: "Customer", value: name });
  if (company) facts.push({ label: "Company", value: company });
  if (customerEmail) {
    facts.push({ label: "Customer email", value: customerEmail, href: `mailto:${customerEmail}` });
  }

  const closing = customerEmail
    ? `The request is stored in the Gateway with status RECEIVED and needs review. Reply to the customer at <a href="mailto:${escapeHtml(customerEmail)}" style="color:#2563EB;text-decoration:none;">${escapeHtml(customerEmail)}</a> and mention the reference number.`
    : "The request is stored in the Gateway with status RECEIVED and needs review.";

  const bodyHtml = [
    buildReferenceBox(referenceNumber),
    buildFactsSection("Submission", facts),
    buildSummarySection("What they sent", input.summaryLines, SUMMARY_LABELS),
    buildEmailParagraph(closing, "0"),
  ]
    .filter(Boolean)
    .join("\n");

  return {
    to,
    subject: `New ${kind} — ${referenceNumber} · HACIEN website`,
    html: buildEmailShell({
      heading: `New ${kind}`,
      bodyHtml,
      footnote: "This is an automatic notification from the HACIEN website.",
    }),
  };
}

/**
 * Sends the staff notification. Returns true only when Resend accepted
 * it. Returns false (never throws) when SALES_TO_EMAIL or the mail
 * provider is not configured, the input is incomplete, or the send
 * fails — the submission still succeeds either way.
 */
export async function sendStaffNotificationEmail(
  input: StaffNotificationInput,
): Promise<boolean> {
  const recipient = process.env.SALES_TO_EMAIL?.trim();
  if (!recipient) {
    console.warn("STAFF NOTIFICATION: SALES_TO_EMAIL is not set, skipping staff notification.", {
      referenceNumber: input.referenceNumber,
    });
    return false;
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    console.warn("STAFF NOTIFICATION: email provider not configured, skipping staff notification.", {
      referenceNumber: input.referenceNumber,
    });
    return false;
  }

  const built = buildStaffNotificationEmail(input, recipient);
  if (!built) return false;

  try {
    const result = await sendEmail(built);
    if (!result.success) {
      console.error("STAFF NOTIFICATION: send was not accepted.", {
        referenceNumber: input.referenceNumber,
        error: result.error || "Unknown error",
      });
    }
    return result.success;
  } catch (err) {
    console.error("STAFF NOTIFICATION: failed to send staff notification.", {
      referenceNumber: input.referenceNumber,
      error: err instanceof Error ? err.message : "Unknown error",
    });
    return false;
  }
}
