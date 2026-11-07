import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const floating = readFileSync("components/FloatingChat.tsx", "utf8");
const layout = readFileSync("app/layout.tsx", "utf8");

describe("Floating chat button", () => {
  it("is a client component that shows on every page, including the form pages", () => {
    // The chat lives only in this panel, so there is no page where the
    // button hides — the quote, contact, and support pages show their
    // full forms and the button floats above them too.
    expect(floating).toContain('"use client"');
    expect(floating).not.toContain("CHAT_PAGES");
    expect(floating).not.toContain("usePathname");
  });

  it("renders a fixed blue button at the bottom right with an accessible label", () => {
    expect(floating).toContain("fixed right-6 bottom-6");
    expect(floating).toContain("bg-blue");
    expect(floating).toContain("rounded-full");
    expect(floating).toContain("Open chat with the HACIEN team");
    expect(floating).toContain("aria-expanded");
    expect(floating).toContain("<svg");
  });

  it("opens the same guided chat in a panel, closable by its own button or Escape", () => {
    expect(floating).toContain("GuidedChat");
    expect(floating).toContain('role="dialog"');
    expect(floating).toContain("Close chat");
    expect(floating).toContain("Escape");
    expect(floating).toContain("turnstileSiteKey={turnstileSiteKey}");
  });

  it("has exactly one close button — the launcher keeps the chat icon when open", () => {
    // The launcher must not turn into a second ✕: the panel's own close
    // button is the only one.
    expect(floating).not.toContain('aria-label={open ? "Close chat"');
    expect(floating).toContain('aria-label="Open chat with the HACIEN team"');
    expect(floating).toContain('aria-label="Close chat"');
  });

  it("goes near full-screen on phones and a small card on desktop", () => {
    expect(floating).toContain("inset-x-4 bottom-24 top-20");
    expect(floating).toContain("sm:w-[380px]");
    expect(floating).toContain("sm:h-[560px]");
  });

  it("sits below the cookie banner so it never covers Accept or Decline", () => {
    // CookieNotice is z-50; the button and panel are z-40, so the banner
    // paints above them while it is open, and they appear once it is dismissed.
    expect(floating).toContain("z-40");
    expect(floating).not.toContain("z-50");
  });

  it("points the full-form switch at the real quote and contact pages", () => {
    expect(floating).toContain('href="/quote"');
    expect(floating).toContain("Open the full quote form");
    expect(floating).toContain('href="/contact"');
    expect(floating).toContain("Open the full contact form");
  });

  it("is mounted in the layout inside the quote-cart provider, after the footer", () => {
    expect(layout).toContain('import { FloatingChat } from "@/components/FloatingChat"');
    expect(layout).toContain("<FloatingChat");
    expect(layout).toContain("process.env.TURNSTILE_SITE_KEY");
    const footerIndex = layout.indexOf("<Footer />");
    const floatingIndex = layout.indexOf("<FloatingChat");
    expect(footerIndex).toBeGreaterThan(-1);
    expect(floatingIndex).toBeGreaterThan(footerIndex);
  });
});
