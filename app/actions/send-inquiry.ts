"use server";

import nodemailer from "nodemailer";

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max submissions per window per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

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

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  // Fallback: use direct mail (works on Hostinger with local sendmail or no auth)
  return nodemailer.createTransport({
    sendmail: true,
    newline: "unix",
    path: "/usr/sbin/sendmail",
  });
}

export type EmailResult = {
  success: boolean;
  error?: string;
  retryAfterSec?: number;
};

export async function sendInquiryEmail(
  formData: Record<string, unknown>,
  clientIp?: string,
): Promise<EmailResult> {
  // Rate limit
  const ip = clientIp || "unknown";
  const { allowed, retryAfterSec } = getRateLimitInfo(ip);
  if (!allowed) {
    return {
      success: false,
      error: `Too many requests. Please wait ${retryAfterSec} seconds before trying again.`,
      retryAfterSec,
    };
  }

  try {
    const transporter = getTransporter();
    const from = process.env.SMTP_FROM || "noreply@haciensolutions.com";
    const to = process.env.SALES_TO_EMAIL || "sales@haciensolutions.com";

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

    await transporter.sendMail({
      from,
      to,
      replyTo: (formData.email as string) || undefined,
      subject,
      text: `New inquiry from haciensolutions.com\n\n${fields}`,
      html: `<!DOCTYPE html><html><body style="font-family:sans-serif;font-size:14px;color:#1a1a1a"><h2 style="color:#1457d9">HACIEN Website Inquiry</h2><table style="border-collapse:collapse">${htmlFields}</table><hr style="margin-top:24px;border:none;border-top:1px solid #e2e8f0"><p style="color:#64748b;font-size:12px">Submitted via haciensolutions.com</p></body></html>`,
    });

    return { success: true };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to send email";
    console.error("Email send failed:", message);
    return { success: false, error: message };
  }
}