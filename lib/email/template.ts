import { companyContact } from "@/data/companyContact";

/**
 * The shared HACIEN email template.
 *
 * EVERY email the website sends is built on this shell — the black
 * HACIEN header band, the blue rule, the white card, and the footer
 * with the official company name, address, and contact email. Do not
 * hand-roll email HTML in a new module: compose the body from the
 * blocks below (paragraph, reference box, summary/facts tables,
 * numbered steps) and pass it to buildEmailShell.
 *
 * Table layout and inline styles only: email clients do not run
 * external CSS, and the template uses no images.
 */

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Wraps body HTML in the full email document: header band, blue rule,
 * white card, and the company footer. `footnote` is the small grey
 * line under the footer contact block, e.g. what kind of automatic
 * email this is.
 */
export function buildEmailShell(options: {
  heading: string;
  bodyHtml: string;
  footnote: string;
}): string {
  const contactEmail = escapeHtml(companyContact.email);

  return `<!doctype html>
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
            <div style="color:#0A0A0A;font-size:20px;font-weight:bold;margin:0 0 12px;">${escapeHtml(options.heading)}</div>
${options.bodyHtml}
          </td>
        </tr>
        <tr>
          <td style="background-color:#F5F5F5;border-top:1px solid #E5E5E5;padding:20px 32px;">
            <div style="color:#525252;font-size:12px;line-height:1.6;">${escapeHtml(companyContact.legalName)}<br>
            ${escapeHtml(companyContact.addressOneLine)}<br>
            <a href="mailto:${contactEmail}" style="color:#2563EB;text-decoration:none;">${contactEmail}</a> &middot; <a href="https://haciensolutions.com" style="color:#2563EB;text-decoration:none;">haciensolutions.com</a></div>
            <div style="color:#A3A3A3;font-size:11px;margin-top:10px;">${escapeHtml(options.footnote)}</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/** A body paragraph in the template's text style. `html` is trusted
 * markup — escape any user content before passing it in. */
export function buildEmailParagraph(html: string, margin = "0 0 24px"): string {
  return `            <p style="color:#404040;font-size:15px;line-height:1.6;margin:${margin};">${html}</p>`;
}

/**
 * The light reference-number box. Pass `action` to add the blue
 * button row under the number (e.g. "Track your request"); staff
 * emails omit it — there is no button, just the number to quote.
 */
export function buildReferenceBox(
  referenceNumber: string,
  action?: { url: string; label: string },
): string {
  const buttonRow = action
    ? `
              <tr>
                <td align="center" style="padding:8px 24px 22px;">
                  <a href="${escapeHtml(action.url)}" style="display:inline-block;background-color:#2563EB;color:#FFFFFF;font-size:14px;font-weight:bold;text-decoration:none;padding:12px 28px;border-radius:6px;">${escapeHtml(action.label)}</a>
                </td>
              </tr>`
    : "";

  return `            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F5F5;border:1px solid #E5E5E5;border-radius:8px;margin:0 0 28px;">
              <tr>
                <td align="center" style="padding:20px 24px ${action ? "8px" : "20px"};">
                  <div style="color:#525252;font-size:11px;font-weight:bold;letter-spacing:2px;">REFERENCE NUMBER</div>
                  <div style="color:#0A0A0A;font-size:24px;font-weight:bold;letter-spacing:1px;margin-top:6px;">${escapeHtml(referenceNumber)}</div>
                </td>
              </tr>${buttonRow}
            </table>`;
}

function buildSectionHeading(heading: string): string {
  return `            <div style="color:#0A0A0A;font-size:15px;font-weight:bold;margin:0 0 10px;">${escapeHtml(heading)}</div>`;
}

function buildRowsTable(rowsHtml: string): string {
  return `            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5E5E5;border-radius:8px;margin:0 0 28px;">
${rowsHtml}
            </table>`;
}

function labelValueRow(label: string, valueHtml: string, index: number): string {
  const border = index === 0 ? "" : "border-top:1px solid #E5E5E5;";
  return `              <tr><td style="padding:12px 16px;${border}color:#525252;font-size:13px;width:110px;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:12px 16px;${border}color:#0A0A0A;font-size:14px;line-height:1.55;">${valueHtml}</td></tr>`;
}

/**
 * A headed label/value table built from plain-text summary lines. A
 * line starting with one of `labels` followed by ": " renders as a
 * label/value row; any other line (e.g. a customer's free-text
 * message) renders as a full-width row. Returns "" when there are no
 * lines.
 */
export function buildSummarySection(
  heading: string,
  summaryLines: string[],
  labels: string[],
): string {
  const lines = summaryLines.map((line) => line.trim()).filter(Boolean);
  if (lines.length === 0) return "";

  const rows = lines
    .map((line, index) => {
      const label = labels.find((candidate) => line.startsWith(`${candidate}: `));
      const border = index === 0 ? "" : "border-top:1px solid #E5E5E5;";
      if (label) {
        return labelValueRow(label, escapeHtml(line.slice(label.length + 2)), index);
      }
      return `              <tr><td colspan="2" style="padding:12px 16px;${border}color:#0A0A0A;font-size:14px;line-height:1.55;">${escapeHtml(line)}</td></tr>`;
    })
    .join("\n");

  return [buildSectionHeading(heading), buildRowsTable(rows)].join("\n");
}

export type EmailFact = {
  label: string;
  value: string;
  /** When set, the value renders as a link to this URL. */
  href?: string;
};

/** A headed label/value table from structured facts. Returns "" when
 * there are no facts. */
export function buildFactsSection(heading: string, facts: EmailFact[]): string {
  if (facts.length === 0) return "";

  const rows = facts
    .map((fact, index) => {
      const valueHtml = fact.href
        ? `<a href="${escapeHtml(fact.href)}" style="color:#2563EB;text-decoration:none;">${escapeHtml(fact.value)}</a>`
        : escapeHtml(fact.value);
      return labelValueRow(fact.label, valueHtml, index);
    })
    .join("\n");

  return [buildSectionHeading(heading), buildRowsTable(rows)].join("\n");
}

/**
 * A headed numbered-steps block. `stepsHtml` entries are trusted
 * markup — escape any user content before passing them in.
 */
export function buildStepsSection(heading: string, stepsHtml: string[]): string {
  const rows = stepsHtml
    .map((step, index) => {
      const last = index === stepsHtml.length - 1;
      return `              <tr>
                <td style="padding:0 10px ${last ? "0" : "10px"} 0;color:#2563EB;font-size:15px;font-weight:bold;vertical-align:top;">${index + 1}</td>
                <td style="padding:0${last ? "" : " 0 10px"};color:#404040;font-size:14px;line-height:1.55;">${step}</td>
              </tr>`;
    })
    .join("\n");

  return [
    buildSectionHeading(heading),
    `            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 8px;">
${rows}
            </table>`,
  ].join("\n");
}
