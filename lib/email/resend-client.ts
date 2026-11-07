export interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({
  to,
  subject,
  html,
}: SendEmailPayload): Promise<{ success: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "no-reply@example.invalid";

  if (!apiKey) {
    console.warn("RESEND: API key not set. Email was not sent.", {
      to,
      subject,
      from: fromEmail,
      htmlLength: html.length,
    });
    return { success: false, error: "Email provider is not configured." };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `HACIEN <${fromEmail}>`,
        to,
        subject,
        html,
      }),
    });

    const data = (await response.json().catch(() => null)) as {
      id?: string;
      message?: string;
    } | null;

    if (!response.ok) {
      console.error("RESEND: request failed.", {
        status: response.status,
        message: data?.message || "Failed to send email via Resend.",
      });
      return { success: false, error: data?.message || "Failed to send email via Resend." };
    }

    return { success: true, id: data?.id };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Network error";
    console.error("RESEND: network error.", { errorMessage: errorMsg });
    return { success: false, error: errorMsg };
  }
}
