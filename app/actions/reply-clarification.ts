"use server";

const MIN_REPLY_TIME_MS = 2_000;

export type ClarificationReplyResult = {
  success: boolean;
  error?: string;
  status?: string;
};

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

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function replyToClarification(formData: Record<string, unknown>): Promise<ClarificationReplyResult> {
  const referenceNumber = getString(formData.referenceNumber);
  const message = getString(formData.message);
  const honeypot = getString(formData.website);
  const startedAt = Number(getString(formData.formStartedAt));

  if (honeypot) {
    return {
      success: false,
      error: "Unable to receive the clarification. Please refresh and try again.",
    };
  }

  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_REPLY_TIME_MS) {
    return {
      success: false,
      error: "Please take a moment to review your reply before sending.",
    };
  }

  if (!referenceNumber || !message) {
    return {
      success: false,
      error: "Please enter the requested clarification before sending.",
    };
  }

  const response = await fetch(
    `${getGatewayUrl()}/gateway/submissions/${encodeURIComponent(referenceNumber)}/clarifications`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message }),
    },
  );

  const body = (await response.json().catch(() => null)) as
    | { status?: string; message?: string; error?: string }
    | null;

  if (!response.ok) {
    return {
      success: false,
      error: body?.message || body?.error || "Unable to receive the clarification. Please try again.",
    };
  }

  return {
    success: true,
    status: body?.status || "UNDER_REVIEW",
  };
}
