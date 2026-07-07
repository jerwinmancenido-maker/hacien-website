"use server";

import { requestCustomerSignup } from "@/lib/erp/ecommerce-client";

export async function submitCustomerSignup(formData: FormData) {
  const contactName = String(formData.get("contactName") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const organizationName = String(formData.get("organizationName") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const sourceUrl = String(formData.get("sourceUrl") || "").trim();

  if (!contactName || !email || !organizationName) {
    return {
      success: false,
      message: "Contact name, email, and organization are required.",
    };
  }

  if (!email.includes("@")) {
    return { success: false, message: "Enter a valid work email address." };
  }

  try {
    return await requestCustomerSignup({
      contactName,
      email,
      organizationName,
      phone: phone || undefined,
      sourceUrl: sourceUrl || undefined,
    });
  } catch {
    return {
      success: false,
      message:
        "Account signup is temporarily unavailable. Please use the quote or contact form.",
    };
  }
}
