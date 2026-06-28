"use server";

import nodemailer from "nodemailer";

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max submissions per window per IP
const EMAIL_SEND_TIMEOUT_MS = 15_000;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

// ── Rate Limiting ──────────────────────────────────────────────

function getRateLimitInfo(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSec: 0 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    const retryAfterSec = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfterSec };
  }

  entry.count++;
  return { allowed: true, retryAfterSec: 0 };
}

// ── Transporter: SMTP-first, sendmail fallback ─────────────────

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const portValue = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;
  const to = process.env.SALES_TO_EMAIL;

  const missing = [
    ["SMTP_HOST", host],
    ["SMTP_PORT", portValue],
    ["SMTP_USER", user],
    ["SMTP_PASS", pass],
    ["SMTP_FROM", from],
    ["SALES_TO_EMAIL", to],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length > 0) return null; // fall back to sendmail

  const port = Number(portValue);
  if (!Number.isInteger(port) || port <= 0) return null;

  return {
    host: host as string,
    port,
    user: user as string,
    pass: pass as string,
    from: from as string,
    to: to as string,
  };
}

function createTransporter() {
  const config = getSmtpConfig();

  if (config) {
    console.info("RFQ: Using SMTP transport.", {
      host: config.host,
      port: config.port,
      secure: config.port === 465,
    });
    return {
      transport: nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.port === 465,
        auth: { user: config.user, pass: config.pass },
        connectionTimeout: EMAIL_SEND_TIMEOUT_MS,
        greetingTimeout: EMAIL_SEND_TIMEOUT_MS,
        socketTimeout: EMAIL_SEND_TIMEOUT_MS,
      }),
      from: config.from,
      to: config.to,
      mode: "smtp" as const,
    };
  }

  // Fallback: sendmail (works on Hostinger with local MTA)
  console.info("RFQ: SMTP not fully configured. Using sendmail fallback.");
  return {
    transport: nodemailer.createTransport({
      sendmail: true,
      newline: "unix",
      path: "/usr/sbin/sendmail",
    }),
    from: process.env.SMTP_FROM || "noreply@localhost",
    to: process.env.SALES_TO_EMAIL || process.env.SMTP_FROM || "noreply@localhost",
    mode: "sendmail" as const,
  };
}

// ── Send with timeout ──────────────────────────────────────────

async function sendMailWithTimeout(
  transporter: nodemailer.Transporter,
  message: nodemailer.SendMailOptions,
) {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      transporter.sendMail(message),
      new Promise<never>((_, reject) => {
        timeout = setTimeout(() => {
          reject(new Error("Email delivery timed out before SMTP confirmation."));
        }, EMAIL_SEND_TIMEOUT_MS);
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
    transporter.close();
  }
}

// ── Public API ─────────────────────────────────────────────────

export type EmailResult = {
  success: boolean;
  error?: string;
  retryAfterSec?: number;
};

export async function sendInquiryEmail(
  formData: Record<string, unknown>,
  clientIp?: string,
): Promise<EmailResult> {
  // ── Rate limit ──
  const ip = clientIp || "unknown";
  const { allowed, retryAfterSec } = getRateLimitInfo(ip);
  if (!allowed) {
    console.warn("RFQ: Rate limited.", { ip });
    return {
      success: false,
      error: `Too many requests. Please wait ${retryAfterSec} seconds before trying again.`,
      retryAfterSec,
    };
  }

  // ── Log: submission received ──
  const formType = (formData.type as string) || "Unknown";
  const formEmail = (formData.email as string) || "no-email";
  console.info("RFQ: Submission received.", {
    type: formType,
    email: formEmail,
    timestamp: new Date().toISOString(),
  });

  try {
    const { transport, from, to, mode } = createTransporter();

    // ── Build email ──
    const fields = Object.entries(formData)
      .filter(([, v]) => v !== undefined && v !== null && v !== "")
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

    const htmlFields = Object.entries(formData)
      .filter(([, v]) => v !== undefined && v !== null && v !== "")
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:4px 0">${v}</td></tr>`,
      )
      .join("");

    const rawSubject =
      (formData.subject as string) ||
      (formData.type
        ? `HACIEN Website — ${formData.type} Inquiry`
        : "HACIEN Website — New Inquiry");
    const subject = rawSubject.replace(/[\r\n]/g, "");

    // ── Log: SMTP attempt ──
    console.info("RFQ: SMTP send attempt.", { mode, to, subject });

    const info = await sendMailWithTimeout(transport, {
      from,
      to,
      replyTo: (formData.email as string) || undefined,
      subject,
      text: `New inquiry from haciensolutions.com\n\n${fields}`,
      html: `<!DOCTYPE html><html><body style="font-family:sans-serif;font-size:14px;color:#1a1a1a"><h2 style="color:#1457d9">HACIEN Website Inquiry</h2><table style="border-collapse:collapse">${htmlFields}</table><hr style="margin-top:24px;border:none;border-top:1px solid #e2e8f0"><p style="color:#64748b;font-size:12px">Submitted via haciensolutions.com</p></body></html>`,
    });

    // ── Check acceptance ──
    const accepted = Array.isArray(info.accepted) ? info.accepted.length : 0;
    const rejected = Array.isArray(info.rejected) ? info.rejected.length : 0;

    if (rejected > 0 && accepted === 0) {
      console.error("RFQ: SMTP send failure — rejected by provider.", {
        accepted,
        rejected,
        mode,
      });
      return {
        success: false,
        error: "Email delivery was rejected by the SMTP provider. Please try again later.",
      };
    }

    // ── Log: success ──
    console.info("RFQ: SMTP send success.", {
      accepted,
      rejected,
      mode,
      messageId: info.messageId,
    });

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to send email";

    // ── Log: failure (safe — no secrets) ──
    console.error("RFQ: SMTP send failure.", {
      errorName: err instanceof Error ? err.name : "UnknownError",
      errorMessage: message,
      smtpHostConfigured: Boolean(process.env.SMTP_HOST),
      smtpPortConfigured: Boolean(process.env.SMTP_PORT),
      smtpUserConfigured: Boolean(process.env.SMTP_USER),
      smtpPassConfigured: Boolean(process.env.SMTP_PASS),
      smtpFromConfigured: Boolean(process.env.SMTP_FROM),
      salesToEmailConfigured: Boolean(process.env.SALES_TO_EMAIL),
    });

    return {
      success: false,
      error: "Unable to send RFQ. Please try again later.",
    };
  }
}
