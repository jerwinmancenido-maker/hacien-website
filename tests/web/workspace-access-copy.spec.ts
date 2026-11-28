import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { loginCustomer } from "@/app/actions/auth";
import { authConfig } from "@/lib/auth/config";

// Errands ruling (PR #111 round 2, 2026-11-28): every account surface says
// one thing — accounts are by request, the team reviews, and sign-in opens
// for approved accounts when the Customer Workspace launches. isAuthReady is
// false, so no page may claim or imply sign-in works today.
const CANONICAL =
  "Customer accounts are by request. Submit a request and our team reviews it. Sign-in opens for approved accounts when the Customer Workspace launches; we'll let you know.";

const LAUNCH_SENTENCE_LOWER =
  "sign-in opens for approved accounts when the customer workspace launches";

const SURFACES = [
  "app/customer-workspace/page.tsx",
  "app/actions/auth.ts",
  "app/signup/page.tsx",
  "app/login/page.tsx",
  "app/access/page.tsx",
  "app/platform/page.tsx",
];

// Phrases that claim or imply sign-in works now, or that approval alone
// unlocks it before the launch. ("Approved accounts" is the canonical
// wording and is deliberately not banned; "approved access/customers" is.)
const BANNED = [
  "with approved access",
  "access is granted",
  "once access is approved",
  "already have access",
  "approved customer",
  "accounts are not open yet",
  "sign in with an approved",
  "being prepared",
  "account verification",
  "not open yet",
];

function source(rel: string) {
  return readFileSync(path.join(process.cwd(), rel), "utf8");
}

function flat(text: string) {
  // &apos; is how the canonical "we'll" is written in JSX text (lint rule
  // react/no-unescaped-entities); it renders as a plain apostrophe.
  return text.replace(/&apos;/g, "'").replace(/\s+/g, " ");
}

describe("customer account posture: one by-request message everywhere", () => {
  it("the workspace hero and the sign-in refusal carry the canonical statement verbatim", () => {
    expect(flat(source("app/customer-workspace/page.tsx"))).toContain(CANONICAL);
    expect(flat(source("app/actions/auth.ts"))).toContain(CANONICAL);
  });

  it("the login page carries the canonical statement verbatim", () => {
    expect(flat(source("app/login/page.tsx"))).toContain(CANONICAL);
  });

  it("the login page's workspace button is labelled for staff and existing workspace users only", () => {
    const login = flat(source("app/login/page.tsx"));

    expect(login).toContain("Staff / existing workspace sign-in");
    expect(login).toContain(
      "For HACIEN staff and existing workspace users only. Customer accounts are by request.",
    );
    expect(login).not.toContain("Open Workspace Access");

    // The button block itself (from the workspace link onward) must carry
    // the staff-only label and line, with no customer-facing sign-in wording
    // that could make a customer mistake it for their sign-in.
    const start = login.indexOf("href={workspaceUrl}");
    expect(start).toBeGreaterThan(-1);
    const buttonBlock = login.slice(start, start + 900);
    expect(buttonBlock).toContain("Staff / existing workspace sign-in");
    expect(buttonBlock).toContain("For HACIEN staff and existing workspace users only.");
    expect(buttonBlock.toLowerCase()).not.toContain("customer sign-in");
    expect(buttonBlock.toLowerCase()).not.toContain("customer login");
  });

  it("every posture surface states accounts are by request", () => {
    for (const rel of SURFACES) {
      expect(flat(source(rel)).toLowerCase(), rel).toContain("by request");
    }
  });

  it("every page surface ties sign-in to the Customer Workspace launch", () => {
    for (const rel of SURFACES.filter((rel) => rel !== "app/actions/auth.ts")) {
      expect(flat(source(rel)).toLowerCase(), rel).toContain(LAUNCH_SENTENCE_LOWER);
    }
  });

  it("no surface claims or implies sign-in works now", () => {
    for (const rel of SURFACES) {
      const text = flat(source(rel)).toLowerCase();
      for (const phrase of BANNED) {
        expect(text, `${rel} must not contain "${phrase}"`).not.toContain(phrase);
      }
    }
  });

  it("sign-in stays mechanically closed and the refusal returns the canonical message", async () => {
    expect(authConfig.isAuthReady).toBe(false);

    const form = new FormData();
    form.set("email", "buyer@example.com");
    form.set("password", "whatever-123");
    const result = await loginCustomer(form);

    expect(result.success).toBe(false);
    expect(result.message).toBe(CANONICAL);
  });
});
