"use server";

import { cookies } from "next/headers";

import { authConfig } from "@/lib/auth/config";

export type AuthActionResult = {
  success: boolean;
  message: string;
  nextUrl?: string;
};

function toText(value: FormDataEntryValue | null): string {
  return String(value ?? "").trim();
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function registerCustomerAccount(formData: FormData): Promise<AuthActionResult> {
  const contactName = toText(formData.get("contactName"));
  const email = toText(formData.get("email")).toLowerCase();
  const organizationName = toText(formData.get("organizationName"));

  if (!contactName || !email || !organizationName) {
    return {
      success: false,
      message: "Please provide your name, email, and organization.",
    };
  }

  if (!isValidEmail(email)) {
    return {
      success: false,
      message: "Please provide a valid email address.",
    };
  }

  return {
    success: true,
    message:
      "Account request received. We will verify your email and review account access. For now, continue using RFQ and support paths if urgent.",
  };
}

export async function loginCustomer(formData: FormData): Promise<AuthActionResult> {
  const email = toText(formData.get("email")).toLowerCase();
  const password = toText(formData.get("password"));

  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required.",
    };
  }

  if (!isValidEmail(email)) {
    return {
      success: false,
      message: "Please provide a valid email address.",
    };
  }

  if (!authConfig.isAuthReady) {
    return {
      success: false,
      message:
        "Customer sign-in is preparing. Please continue with RFQ/contact or request access for public paths.",
      nextUrl: authConfig.workspaceRoute,
    };
  }

  return {
    success: true,
    message: "Signed in successfully.",
    nextUrl: "/account",
  };
}

export async function logoutCustomer(): Promise<AuthActionResult> {
  const cookieStore = await cookies();
  cookieStore.set({
    name: authConfig.sessionCookieName,
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });

  return {
    success: true,
    message: "You are signed out.",
    nextUrl: "/",
  };
}
