import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const floating = readFileSync("components/FloatingChat.tsx", "utf8");
const layout = readFileSync("app/layout.tsx", "utf8");

describe("Floating chat button", () => {
  it("is a client component that shows on every page, and opens by itself on the request pages", () => {
    // The chat lives only in this panel, so there is no page where the
    // button hides. On /quote, /contact, and /support — where sending a
    // request is the whole point — the panel opens by itself on load.
    expect(floating).toContain('"use client"');
    expect(floating).not.toContain("CHAT_PAGES");
    expect(floating).toContain("usePathname");
    expect(floating).toContain("AUTO_OPEN_PATHS");
    expect(floating).toContain('"/quote"');
    expect(floating).toContain('"/contact"');
    expect(floating).toContain('"/support"');
  });

  it("renders a fixed blue button at the bottom right with an accessible label", () => {
    expect(floating).toContain("fixed right-6 bottom-6");
    expect(floating).toContain("bg-blue");
    expect(floating).toContain("rounded-full");
    expect(floating).toContain("Open chat with the HACIEN team");
    expect(floating).toContain("aria-expanded");
    expect(floating).toContain("<svg");
  });

  it("opens the AI chat in a panel, closable by its own button or Escape", () => {
    expect(floating).toContain("AiChat");
    expect(floating).not.toContain("GuidedChat");
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
    expect(floating).toContain("inset-x-4 bottom-4 top-20");
    expect(floating).toContain("sm:bottom-6");
    // The launcher hides while the panel is open — no dead space is
    // kept beneath the panel for a button that is not there.
    expect(floating).toContain("{!open ? (");
    expect(floating).toContain("sm:w-[440px]");
    expect(floating).toContain("sm:h-[640px]");
  });

  it("sits below the cookie banner so it never covers Accept or Decline", () => {
    // CookieNotice is z-50; the button and panel are z-40, so the banner
    // paints above them while it is open, and they appear once it is dismissed.
    expect(floating).toContain("z-40");
    expect(floating).not.toContain("z-50");
  });

  it("opens when a page's invitation card asks it to, and carries no form links anymore", () => {
    expect(floating).toContain("OPEN_CHAT_EVENT");
    expect(floating).toContain("addEventListener(OPEN_CHAT_EVENT");
    expect(floating).not.toContain("FloatingFormLinks");
    expect(floating).not.toContain("Open the full quote form");
    expect(floating).not.toContain("form={");
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
