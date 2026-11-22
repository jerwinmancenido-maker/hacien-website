import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

/**
 * R2-PC-1 (Review Board Round 2, run 41) — the Variant A dark home
 * surfaces and the /c/[id] card page pair near-white text with dark
 * backgrounds. Print strips backgrounds, so without a print reset the
 * text prints white-on-white. These specs pin that the @media print
 * block in app/globals.css covers every dark background / light text
 * utility class those surfaces actually use (derived from the sources,
 * not a hand-copied list), plus the card page's white-logo swap.
 */
const SURFACE_FILES = [
  "lib/variant-a.ts",
  "app/page.tsx",
  "app/layout.tsx",
  "components/Hero.tsx",
  "components/HomeVariantASections.tsx",
  "components/HomeV3Sections.tsx",
  "components/EnterpriseImagery.tsx",
  "app/c/[id]/page.tsx",
];

function read(rel: string): string {
  return readFileSync(join(ROOT, rel), "utf8");
}

function surfaceSource(): string {
  return SURFACE_FILES.map(read).join("\n");
}

/** Extract the @media print block (brace-balanced) from globals.css. */
function printBlock(css: string): string {
  const start = css.indexOf("@media print");
  if (start === -1) return "";
  let depth = 0;
  for (let i = css.indexOf("{", start); i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") {
      depth--;
      if (depth === 0) return css.slice(start, i + 1);
    }
  }
  return css.slice(start);
}

/** Raw-text form of a utility class as it appears inside a CSS selector. */
function escaped(cls: string): string {
  return cls.replace(/([[\]#\/.:])/g, "\\$1");
}

function luminance(hex: string): number {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function brightness(hex: string): number {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return (299 * r + 587 * g + 114 * b) / 1000;
}

/** Base (non-variant) bg-[#hex] classes used by the surfaces. */
function usedBgHexes(source: string): string[] {
  const found = new Set<string>();
  for (const m of source.matchAll(/(?<![:\w-])bg-\[#([0-9A-Fa-f]{6})\]/g)) {
    found.add(m[1].toUpperCase());
  }
  return [...found];
}

/** Base (non-variant) text-[#hex] classes used by the surfaces. */
function usedTextHexes(source: string): string[] {
  const found = new Set<string>();
  for (const m of source.matchAll(/(?<![:\w-])text-\[#([0-9A-Fa-f]{6})\]/g)) {
    found.add(m[1].toUpperCase());
  }
  return [...found];
}

const css = read("app/globals.css");
const block = printBlock(css);
const source = surfaceSource();
const darkBgHexes = usedBgHexes(source).filter((hex) => luminance(hex) < 0.2);
const lightTextHexes = usedTextHexes(source).filter((hex) => brightness(hex) > 140);

describe("print stylesheet covers the dark surfaces (R2-PC-1)", () => {
  it("finds the dark surfaces in the sources (guard against a vacuous pass)", () => {
    expect(darkBgHexes).toContain("0B0C10"); // home page wrapper
    expect(darkBgHexes).toContain("15171D"); // Variant A panel / card
    expect(darkBgHexes).toContain("0A1C42"); // /c/[id] card page
    expect(lightTextHexes).toContain("F4F6FA"); // Variant A heading text
    expect(lightTextHexes).toContain("C3C8D2"); // Variant A body text
  });

  it("has a @media print block", () => {
    expect(block).not.toBe("");
  });

  it("forces every dark background the surfaces use to white in print", () => {
    expect(block).toContain("background-color: #fff !important");
    for (const hex of darkBgHexes) {
      expect(block, `print block must reset bg-[#${hex}]`).toContain(
        `.${escaped(`bg-[#${hex}]`)}`,
      );
    }
  });

  it("forces every light text token the surfaces use to black in print", () => {
    expect(block).toContain("color: #000 !important");
    for (const hex of lightTextHexes) {
      expect(block, `print block must reset text-[#${hex}]`).toContain(
        `.${escaped(`text-[#${hex}]`)}`,
      );
    }
  });

  it("resets the home + card white button text to black in print", () => {
    expect(block).toContain(`.${escaped("bg-[#0B0C10]")} .text-white`);
    expect(block).toContain(`.${escaped("bg-[#0A1C42]")} .text-white`);
  });

  it("keeps site-wide brand blue / ink backgrounds out of the global print reset", () => {
    // bg-[#2563EB] and bg-[#0A0A0A] appear on many pre-existing pages;
    // the print reset may only touch them scoped inside the home
    // wrapper / card page, never as unscoped global selectors.
    const unscoped = /(?:^|,)\s*\.bg-\\\[\\#(?:2563EB|0A0A0A)\\\]/m;
    expect(block).not.toMatch(unscoped);
    expect(block).toContain(`.${escaped("bg-[#0B0C10]")} .${escaped("bg-[#2563EB]")}`);
    expect(block).toContain(`.${escaped("bg-[#0A1C42]")} .${escaped("bg-[#2563EB]")}`);
  });

  it("resets the card page's white/opacity text variants in print", () => {
    for (const variant of ["85", "70", "60", "50"]) {
      expect(block, `print block must reset text-white/${variant}`).toContain(
        `.${escaped("bg-[#0A1C42]")} .${escaped(`text-white/${variant}`)}`,
      );
    }
  });

  it("swaps the card page's white logo for the dark logo in print", () => {
    expect(block).toContain('img[src="/brand/logo-full-white.svg"]');
    expect(block).toContain('content: url("/brand/logo-full.svg")');
    // The swap target must be a real shipped asset, not a guessed path.
    expect(existsSync(join(ROOT, "public/brand/logo-full.svg"))).toBe(true);
    expect(existsSync(join(ROOT, "public/brand/logo-full-white.svg"))).toBe(true);
  });
});
