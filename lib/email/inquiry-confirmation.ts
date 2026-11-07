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

/** Labels the submission flow itself puts in front of summary lines. A line
 * starting with one of these renders as a label/value row; any other line
 * (e.g. a customer's free-text message) renders as a full-width row. */
const SUMMARY_LABELS = ["What you need", "Requirement package", "Type", "Your message"];

function buildSummaryRows(summaryLines: string[]): string {
  const lines = summaryLines.map((line) => line.trim()).filter(Boolean);
  if (lines.length === 0) return "";

  const rows = lines
    .map((line, index) => {
      const label = SUMMARY_LABELS.find((candidate) => line.startsWith(`${candidate}: `));
      const border = index === 0 ? "" : "border-top:1px solid #E5E5E5;";
      if (label) {
        const value = line.slice(label.length + 2);
        return `              <tr><td style="padding:12px 16px;${border}color:#525252;font-size:13px;width:110px;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:12px 16px;${border}color:#0A0A0A;font-size:14px;line-height:1.55;">${escapeHtml(value)}</td></tr>`;
      }
      return `              <tr><td colspan="2" style="padding:12px 16px;${border}color:#0A0A0A;font-size:14px;line-height:1.55;">${escapeHtml(line)}</td></tr>`;
    })
    .join("\n");

  return [
    `            <div style="color:#0A0A0A;font-size:15px;font-weight:bold;margin:0 0 10px;">What you sent</div>`,
    `            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5E5E5;border-radius:8px;margin:0 0 28px;">`,
    rows,
    `            </table>`,
  ].join("\n");
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
  const summaryBlock = buildSummaryRows(input.summaryLines);
  const contactEmail = escapeHtml(companyContact.email);

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#F5F5F5;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F5F5;">
  <tr>
    <td align="center" style="padding:32px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background-color:#FFFFFF;border:1px solid #E5E5E5;border-radius:8px;overflow:hidden;">
        <tr>
          <td style="background-color:#0A0A0A;padding:24px 32px;">
            <div style="color:#FFFFFF;font-size:24px;font-weight:bold;letter-spacing:3px;">HACIEN</div>
            <div style="color:#A3A3A3;font-size:12px;letter-spacing:1px;margin-top:4px;">INFORMATION TECHNOLOGY SOLUTIONS</div>
          </td>
        </tr>
        <tr><td style="background-color:#2563EB;line-height:3px;font-size:0;">&nbsp;</td></tr>
        <tr>
          <td style="padding:32px;">
            <div style="color:#0A0A0A;font-size:20px;font-weight:bold;margin:0 0 12px;">${escapeHtml(title)}</div>
            <p style="color:#404040;font-size:15px;line-height:1.6;margin:0 0 8px;">Hi${name ? ` ${escapeHtml(name)}` : ""},</p>
            <p style="color:#404040;font-size:15px;line-height:1.6;margin:0 0 24px;">Thank you — we&rsquo;ve received your ${escapeHtml(kind)}. Keep your reference number; you can use it to track your request any time.</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F5F5;border:1px solid #E5E5E5;border-radius:8px;margin:0 0 28px;">
              <tr>
                <td align="center" style="padding:20px 24px 8px;">
                  <div style="color:#525252;font-size:11px;font-weight:bold;letter-spacing:2px;">REFERENCE NUMBER</div>
                  <div style="color:#0A0A0A;font-size:24px;font-weight:bold;letter-spacing:1px;margin-top:6px;">${escapeHtml(referenceNumber)}</div>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:8px 24px 22px;">
                  <a href="${trackUrl}" style="display:inline-block;background-color:#2563EB;color:#FFFFFF;font-size:14px;font-weight:bold;text-decoration:none;padding:12px 28px;border-radius:6px;">Track your request</a>
                </td>
              </tr>
            </table>
${summaryBlock}
            <div style="color:#0A0A0A;font-size:15px;font-weight:bold;margin:0 0 10px;">What happens next</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 8px;">
              <tr>
                <td style="padding:0 10px 10px 0;color:#2563EB;font-size:15px;font-weight:bold;vertical-align:top;">1</td>
                <td style="padding:0 0 10px;color:#404040;font-size:14px;line-height:1.55;">Our team reviews your request.</td>
              </tr>
              <tr>
                <td style="padding:0 10px 10px 0;color:#2563EB;font-size:15px;font-weight:bold;vertical-align:top;">2</td>
                <td style="padding:0 0 10px;color:#404040;font-size:14px;line-height:1.55;">Reply time: ${escapeHtml(replyTime)}</td>
              </tr>
              <tr>
                <td style="padding:0 10px 0 0;color:#2563EB;font-size:15px;font-weight:bold;vertical-align:top;">3</td>
                <td style="padding:0;color:#404040;font-size:14px;line-height:1.55;">Questions in the meantime? Email <a href="mailto:${contactEmail}" style="color:#2563EB;text-decoration:none;">${contactEmail}</a> and mention your reference number.</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:#F5F5F5;border-top:1px solid #E5E5E5;padding:20px 32px;">
            <div style="color:#525252;font-size:12px;line-height:1.6;">${escapeHtml(companyContact.legalName)}<br>
            ${escapeHtml(companyContact.addressOneLine)}<br>
            <a href="mailto:${contactEmail}" style="color:#2563EB;text-decoration:none;">${contactEmail}</a> &middot; <a href="https://haciensolutions.com" style="color:#2563EB;text-decoration:none;">haciensolutions.com</a></div>
            <div style="color:#A3A3A3;font-size:11px;margin-top:10px;">This is an automatic confirmation of your website submission.</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

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
