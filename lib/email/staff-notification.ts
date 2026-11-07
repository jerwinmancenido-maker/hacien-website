import { sendEmail } from "@/lib/email/resend-client";

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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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

  const factRows: Array<[string, string]> = [
    ["Reference", referenceNumber],
    ["Type", kind],
  ];
  if (name) factRows.push(["Customer", name]);
  if (company) factRows.push(["Company", company]);
  if (customerEmail) factRows.push(["Customer email", customerEmail]);

  const facts = factRows
    .map(
      ([label, value]) =>
        `      <tr><td style="padding:6px 12px 6px 0;font-weight:bold;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 0;">${escapeHtml(value)}</td></tr>`,
    )
    .join("\n");

  const summaryItems = input.summaryLines
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `      <li>${escapeHtml(line)}</li>`)
    .join("\n");

  const html = [
    `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#111;">`,
    `  <p style="font-size:16px;"><strong>New ${escapeHtml(kind)} from the website</strong></p>`,
    `  <table style="border-collapse:collapse;">`,
    facts,
    `  </table>`,
    summaryItems ? `  <p><strong>What they sent</strong></p>\n  <ul>\n${summaryItems}\n  </ul>` : "",
    `  <p>The request is stored in the Gateway with status RECEIVED and needs review.${
      customerEmail
        ? ` Reply to the customer at <a href="mailto:${escapeHtml(customerEmail)}">${escapeHtml(customerEmail)}</a> and mention the reference number.`
        : ""
    }</p>`,
    `</div>`,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    to,
    subject: `New ${kind} — ${referenceNumber} · HACIEN website`,
    html,
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
