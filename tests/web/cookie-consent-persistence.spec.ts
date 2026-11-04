import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

function read(rel: string) {
  return readFileSync(path.join(ROOT, rel), "utf8");
}

// Draft prepared 2026-11-04 for jerwinmancenido-maker/hacien-website.
// Context: a live browser test reported the cookie banner reappearing on
// every navigation after declining. Code review found the logic correct
// (see below), so this file is a guardrail, NOT a fix for that report.
// If the live reappearance reproduces on a real device with a normal
// browser profile, it is a storage/session issue to reproduce there —
// do not "fix" this logic blindly. All tests here should pass on main.

describe("Cookie consent persistence (guardrail)", () => {
  it("Decline stores 'denied' under the same key the banner reads", () => {
    const notice = read("components/CookieNotice.tsx");
    expect(notice).toMatch(/CONSENT_STORAGE_KEY = "hacien-consent"/);
    expect(notice).toMatch(/localStorage\.setItem\(CONSENT_STORAGE_KEY, "denied"\)/);
    expect(notice).toMatch(/localStorage\.setItem\(CONSENT_STORAGE_KEY, "granted"\)/);
  });

  it("Banner shows only when consent is null (granted or denied both hide it)", () => {
    const notice = read("components/CookieNotice.tsx");
    expect(notice).toMatch(/const isOpen = isValid && consent === null/);
  });

  it("Banner re-reads consent on storage and consent-change events", () => {
    const notice = read("components/CookieNotice.tsx");
    expect(notice).toMatch(/window\.addEventListener\("storage"/);
    expect(notice).toMatch(/window\.addEventListener\(CHANGE_EVENT/);
    expect(notice).toMatch(/window\.dispatchEvent\(new Event\(CHANGE_EVENT\)\)/);
  });
});
