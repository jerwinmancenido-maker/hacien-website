import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

function read(rel: string) {
  return readFileSync(path.join(ROOT, rel), "utf8");
}

// Draft prepared 2026-11-04 for jerwinmancenido-maker/hacien-website.
// Target size: 44px, the usual minimum tap target. Tailwind h-11 / w-11 and
// min-h-11 are 44px; py-3 on text-sm text is also ~44px total, while py-2.5
// on mobile is ~40px. Tests marked IMPROVEMENT fail on main at 2fbfa0a.

describe("Mobile tap targets (390px)", () => {
  it("Header mobile menu button is 44px (h-11 w-11) and labelled", () => {
    const header = read("components/Header.tsx");
    expect(header).toMatch(/h-11 w-11/);
    expect(header).toMatch(/aria-label=\{open \? "Close navigation" : "Open navigation"\}/);
  });

  it("IMPROVEMENT: Hero primary action is at least 44px tall on mobile, not just sm+", () => {
    const hero = read("components/Hero.tsx");
    // Variant A (REQ-WEB-RESTYLE-001): hero actions are 52px full pills at
    // every width, via the shared VA_BTN_*_52 classes in lib/variant-a.ts.
    expect(hero).toMatch(/VA_BTN_PRIMARY_52/);
    const variantA = read("lib/variant-a.ts");
    expect(variantA).toMatch(/VA_BTN_PRIMARY_52[\s\S]*?h-\[52px\]/);
  });

  it("Header quote action hides only at phone width (<=560px), per mock v5", () => {
    // REQ-WEB-RESTYLE-001 (prep correction C6): mock v5 keeps the 44px header
    // CTA beside the menu button at tablet widths and hides it only at
    // <=560px, where the hero primary action carries the quote path.
    const header = read("components/Header.tsx");
    expect(header).toMatch(/max-\[560px\]:hidden[\s\S]*?quoteAction|quoteAction[\s\S]*?max-\[560px\]:hidden/);
    expect(header).toMatch(/VA_BTN_PRIMARY_44/);
    const hero = read("components/Hero.tsx");
    expect(hero).toMatch(/primaryAction/);
  });
});
