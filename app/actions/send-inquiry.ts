"use server";

import { headers } from "next/headers";
import { Ratelimit } from "@upstash/ratelimit";
import { isContactInquiryType } from "@/app/actions/contact-inquiry";
import { sendInquiryConfirmationEmail } from "@/lib/email/inquiry-confirmation";
import { sendStaffNotificationEmail } from "@/lib/email/staff-notification";
import { getClientIp } from "@/lib/security/client-ip";
import { redis } from "@/lib/redis/upstash";

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // max submissions per window per IP (updated to 10 per 360-degree audit)
const EMAIL_RATE_LIMIT_MAX = 3;
const MIN_SUBMIT_TIME_MS = 3_000;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const emailRateLimitMap = new Map<string, { count: number; resetAt: number }>();

// Initialize Upstash Ratelimiters if Redis is available
const ipRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(RATE_LIMIT_MAX, "60 s"),
      analytics: true,
      prefix: "@upstash/ratelimit/ip",
    })
  : null;

const emailRateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(EMAIL_RATE_LIMIT_MAX, "60 s"),
      analytics: true,
      prefix: "@upstash/ratelimit/email",
    })
  : null;

// ── Rate Limiting ──────────────────────────────────────────────

async function getRateLimitInfo(ip: string): Promise<{ allowed: boolean; retryAfterSec: number }> {
  if (ipRateLimiter) {
    try {
      const result = await ipRateLimiter.limit(ip);
      const retryAfterSec = Math.ceil((result.reset - Date.now()) / 1000);
      return { allowed: result.success, retryAfterSec };
    } catch (err) {
      console.warn("Upstash IP rate limit failed, falling back to memory.", err);
    }
  }

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

async function getEmailRateLimitInfo(email: string): Promise<{ allowed: boolean; retryAfterSec: number }> {
  const key = email.trim().toLowerCase();
  if (!key) return { allowed: true, retryAfterSec: 0 };

  if (emailRateLimiter) {
    try {
      const result = await emailRateLimiter.limit(key);
      const retryAfterSec = Math.ceil((result.reset - Date.now()) / 1000);
      return { allowed: result.success, retryAfterSec };
    } catch (err) {
      console.warn("Upstash Email rate limit failed, falling back to memory.", err);
    }
  }

  const now = Date.now();
  const entry = emailRateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    emailRateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSec: 0 };
  }

  if (entry.count >= EMAIL_RATE_LIMIT_MAX) {
    const retryAfterSec = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfterSec };
  }

  entry.count++;
  return { allowed: true, retryAfterSec: 0 };
}

function getString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

async function validateSubmissionSecurity(
  formData: Record<string, unknown>,
): Promise<{ allowed: boolean; error?: string; ip: string; retryAfterSec?: number }> {
  const headerList = await headers();
  const ip = getClientIp(headerList);

  if (getString(formData.website)) {
    return { allowed: false, error: "We could not verify this request. Please try again.", ip };
  }

  const startedAt = Number(getString(formData.formStartedAt));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_SUBMIT_TIME_MS) {
    return { allowed: false, error: "Please review your message and try again.", ip };
  }

  const { allowed, retryAfterSec } = await getRateLimitInfo(ip);
  if (!allowed) {
    console.warn("RFQ: Rate limited.", { ip });
    return {
      allowed: false,
      error: `Too many requests. Please wait ${retryAfterSec} seconds before trying again.`,
      ip,
      retryAfterSec,
    };
  }

  const emailLimit = await getEmailRateLimitInfo(getString(formData.email));
  if (!emailLimit.allowed) {
    console.warn("RFQ: Email rate limited.", { ip });
    return {
      allowed: false,
      error: `Too many requests. Please wait ${emailLimit.retryAfterSec} seconds before trying again.`,
      ip,
      retryAfterSec: emailLimit.retryAfterSec,
    };
  }

  const hasTurnstileKey = Boolean(process.env.TURNSTILE_SITE_KEY);
  const isDev = process.env.NODE_ENV === "development";
  const token = getString(formData.turnstileToken);

  if (hasTurnstileKey && !isDev) {
    if (!token) {
      console.warn("RFQ: Turnstile token missing.", { ip });
      return {
        allowed: false,
        error:
          "Security verification could not be completed. Please refresh and try again.",
        ip,
      };
    }
  }

  return { allowed: true, ip };
}

// ── Public API ─────────────────────────────────────────────────

export type EmailResult = {
  success: boolean;
  error?: string;
  retryAfterSec?: number;
  referenceNumber?: string;
  status?: string;
  trackingUrl?: string;
  /** True only when the customer confirmation email was accepted by the mail provider. */
  confirmationSent?: boolean;
};

function getGatewaySubmissionType(formType: string) {
  const normalized = formType.toLowerCase();
  if (normalized.includes("support")) return "SUPPORT";
  if (normalized.includes("rfq") || normalized.includes("quote")) return "RFQ";
  return "CONTACT";
}

function getGatewayUrl() {
  let url = (
    process.env.HACIEN_GATEWAY_API_URL ||
    process.env.HACIEN_API_PUBLIC_URL ||
    "http://localhost:4101/api/v1"
  ).replace(/\/+$/, "");

  if (!url.endsWith("/api/v1")) {
    url = `${url}/api/v1`;
  }
  return url;
}

async function submitToGateway(formData: Record<string, unknown>, ip: string) {
  const formType = getString(formData.type) || "Website Inquiry";
  const gatewayUrl = getGatewayUrl();
  const response = await fetch(`${gatewayUrl}/gateway/submissions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      submissionType: getGatewaySubmissionType(formType),
      payload: {
        ...formData,
        turnstileToken: undefined,
        website: undefined,
        formStartedAt: undefined,
        gatewayPrinciple:
          "Universal intake: catalog products are optional; Gateway review is mandatory before Opportunity creation.",
      },
      sourceSurface: "WEBSITE",
      sourceUrl: getString(formData.sourceUrl),
      turnstileToken: getString(formData.turnstileToken),
      antiSpamVerification: {
        passed: true,
        source: "website-server-action",
        verifiedAt: new Date().toISOString(),
      },
      submitterContext: {
        ip,
        formType,
      },
      clientMetadata: {
        userAgent: getString(formData.userAgent),
      },
    }),
  });

  const body = (await response.json().catch(() => null)) as {
    referenceNumber?: string;
    tracking?: { status?: string };
    error?: string;
    message?: string;
  } | null;

  if (!response.ok || !body?.referenceNumber) {
    console.error("Gateway: Submission failed.", {
      status: response.status,
      hasReference: Boolean(body?.referenceNumber),
      message: body?.message || body?.error || "Gateway submission failed",
    });
    return {
      success: false,
      error: "Unable to receive the request. Please try again later.",
    };
  }

  return {
    success: true,
    referenceNumber: body.referenceNumber,
    status: body.tracking?.status || "RECEIVED",
    trackingUrl: `/track/${encodeURIComponent(body.referenceNumber)}`,
  };
}

export async function sendInquiryEmail(
  formData: Record<string, unknown>,
  clientIp?: string,
): Promise<EmailResult> {
  // ── Security checks ──
  const security = await validateSubmissionSecurity(formData);
  if (!security.allowed) {
    return {
      success: false,
      error: security.error || "Security verification could not be completed. Please try again.",
      retryAfterSec: security.retryAfterSec,
    };
  }
  const ip = clientIp || security.ip;
  const inquiryType = getString(formData.inquiryType).trim();
  if (inquiryType && !isContactInquiryType(inquiryType)) {
    return { success: false, error: "Please choose a valid inquiry type." };
  }

  // ── Log: submission received ──
  const formType = (formData.type as string) || "Unknown";
  const formEmail = (formData.email as string) || "no-email";
  console.info("RFQ: Submission received.", {
    type: formType,
    email: formEmail,
    ip,
    timestamp: new Date().toISOString(),
  });

  try {
    const result = await submitToGateway(formData, ip);
    if (!result.success) return result;

    console.info("Gateway: Submission received.", {
      referenceNumber: result.referenceNumber,
      status: result.status,
    });

    // The confirmation email is best-effort: a failure here never fails
    // the submission — the reference number on screen is the confirmation.
    const submissionType = getString(formData.type);
    const normalizedType = submissionType.toLowerCase();
    const summaryLines: string[] = [];
    if (normalizedType.includes("quote") || normalizedType.includes("rfq")) {
      const notes = getString(formData.notes).trim();
      if (notes) summaryLines.push(`What you need: ${notes}`);
      const extra: Array<[string, string]> = [
        ["Business type", "businessType"],
        ["Position", "position"],
        ["Business address", "businessAddress"],
        ["Delivery location", "location"],
        ["Needed by", "targetDate"],
        ["Budget or ABC", "budgetRange"],
        ["TIN", "tin"],
        ["RFQ or PR number", "buyerReference"],
      ];
      for (const [label, key] of extra) {
        const value = getString(formData[key]).trim();
        if (value) summaryLines.push(`${label}: ${value}`);
      }
      const count = Number(formData.requirementCount);
      if (Number.isFinite(count) && count > 0) {
        summaryLines.push(`Requirement package: ${count} item${count === 1 ? "" : "s"}`);
      }
    } else if (normalizedType.includes("callback")) {
      const message = getString(formData.message).trim();
      if (message) summaryLines.push(message);
    } else {
      const inquiryType = getString(formData.inquiryType).trim();
      if (inquiryType) summaryLines.push(`Type: ${inquiryType}`);
      const message = getString(formData.message).trim();
      if (message) summaryLines.push(`Your message: ${message}`);
    }

    let confirmationSent = false;
    try {
      confirmationSent = await sendInquiryConfirmationEmail({
        type: submissionType,
        email: getString(formData.email),
        referenceNumber: result.referenceNumber || "",
        name: getString(formData.name),
        summaryLines,
      });
    } catch {
      confirmationSent = false;
    }

    // The staff notification is best-effort too: sales is emailed on
    // every accepted submission, and a failure here never fails the
    // submission. (sendStaffNotificationEmail never throws; the guard
    // is belt and braces.)
    try {
      await sendStaffNotificationEmail({
        type: submissionType,
        email: getString(formData.email),
        referenceNumber: result.referenceNumber || "",
        name: getString(formData.name),
        company: getString(formData.company),
        summaryLines,
      });
    } catch {
      // Notification failures are logged inside the sender.
    }

    return { ...result, confirmationSent };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to send email";

    // ── Log: failure (safe — no secrets) ──
    console.error("Gateway: Submission failure.", {
      errorName: err instanceof Error ? err.name : "UnknownError",
      errorMessage: message,
      gatewayConfigured: Boolean(process.env.HACIEN_GATEWAY_API_URL),
    });

    return {
      success: false,
      error: "Unable to send RFQ. Please try again later.",
    };
  }
}
