"use server";

import { createOrderIntent } from "@/lib/erp/ecommerce-client";

export async function submitOrderIntent(formData: FormData) {
  const customerEmail = String(formData.get("customerEmail") || "")
    .trim()
    .toLowerCase();
  const organizationName = String(formData.get("organizationName") || "").trim();
  const productId = String(formData.get("productId") || "").trim();
  const publicationId = String(formData.get("publicationId") || "").trim();
  const sku = String(formData.get("sku") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const quantity = Number(formData.get("quantity") || 1);
  const sourceUrl = String(formData.get("sourceUrl") || "").trim();
  const turnstileToken = String(formData.get("turnstileToken") || "").trim();
  const antiSpamVerificationRaw = String(
    formData.get("antiSpamVerification") || "",
  ).trim();

  let antiSpamVerification: Record<string, unknown> | undefined;
  if (antiSpamVerificationRaw) {
    try {
      const parsed = JSON.parse(antiSpamVerificationRaw);
      if (
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed)
      ) {
        antiSpamVerification = parsed as Record<string, unknown>;
      } else {
        return {
          success: false,
          message: "Anti-spam metadata format is invalid.",
        };
      }
    } catch {
      return {
        success: false,
        message: "Anti-spam metadata format is invalid.",
      };
    }
  }

  if (!customerEmail || !organizationName || !productId || !publicationId || !name) {
    return {
      success: false,
      message: "Email, organization, and product are required.",
    };
  }

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    return { success: false, message: "Quantity must be between 1 and 99." };
  }

  try {
    return await createOrderIntent({
      customerEmail,
      organizationName,
      paymentMode: "manual",
      turnstileToken: turnstileToken || undefined,
      antiSpamVerification: antiSpamVerification,
      items: [
        {
          productId,
          publicationId,
          sku: sku || undefined,
          name,
          quantity,
        },
      ],
      sourceUrl: sourceUrl || undefined,
    });
  } catch {
    return {
      success: false,
      message: "Order intent is temporarily unavailable. Please request a quote instead.",
    };
  }
}
