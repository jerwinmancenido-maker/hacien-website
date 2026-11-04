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
    // Today: "py-2.5 ... sm:py-3" — mobile is one step below 44px.
    // Fix: add min-h-11 to the primary action link.
    expect(hero).toMatch(/min-h-11/);
  });

  it("Header quote action is not the only CTA on mobile (it is lg:flex only)", () => {
    // This is a content check, not a size check: on mobile the header CTA
    // disappears, so the hero primary action must carry the quote path.
    // If this ever changes, update the hero test above in the same PR.
    const header = read("components/Header.tsx");
    expect(header).toMatch(/hidden[\s\S]*?lg:flex[\s\S]*?quoteAction/);
    const hero = read("components/Hero.tsx");
    expect(hero).toMatch(/primaryAction/);
  });
});
