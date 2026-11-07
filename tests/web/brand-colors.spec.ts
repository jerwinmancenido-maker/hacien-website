import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

/** Hex values allowed in product category accents (CSS vars resolve to these). */
const ALLOWED_PRODUCT_ACCENT_PATTERN =
  /accent:\s*(?:brandCategoryAccent|brandColors\.(?:ink|grey600|grey700)|"var\(--(?:ink|grey-600|grey-700)\)")/;

const FORBIDDEN_PRODUCT_ACCENT_HEX =
  /accent:\s*"#(?!0[Aa]0[Aa]0[Aa]|525252|404040)[0-9a-fA-F]{3,8}"/;

/** Low-contrast / non-brand light-grey text utilities that fail WCAG AA on white. */
const FORBIDDEN_TEXT_CLASSES =
  /\b(?:text-slate-400|placeholder:text-slate-400|text-gray-400|text-zinc-400|text-neutral-400|text-stone-400|text-slate-300|placeholder:text-slate-300)\b/;

/**
 * Dark / translucent-dark surface markers (hero glass, ink panels, footer).
 * Dark-grey body text (grey-600/700) on these backgrounds fails AA.
 * Intentionally excludes light frosted controls (e.g. bg-white/80 search field).
 */
const DARK_SURFACE_HINT =
  /(?:bg-ink\b|bg-\[#0[Aa]0[Aa]0[Aa]\]|glass-section-dark|glass-control-dark|bg-slate-950|bg-white\/(?:1[0-5]|2[0-5]|\[0\.(?:0\d|1\d)\])|border-white\/(?:1[0-6]|2[0-5]))/;

const DARK_TEXT_TOO_DARK = /\btext-grey-[67]00\b/;

/** Inverse/dark ternaries must not pick grey-600/700 for the dark branch. */
const DARK_TERNARY_TOO_DARK =
  /(?:inverse|isDark|dark)\s*\?\s*["'`][^"'`]*\btext-grey-[67]00\b/;

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".git" || name === ".next" || name === "generated") continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (/\.(tsx|ts|css)$/.test(name)) out.push(full);
  }
  return out;
}

/** Extract className / class string literals (simple + template chunks). */
function classLiterals(source: string): string[] {
  const found: string[] = [];
  const re =
    /(?:className|class)\s*=\s*(?:\{`([^`]*)`\}|\{"([^"]*)"\}|\{'([^']*)'\}|"([^"]*)"|'([^']*)'|`([^`]*)`)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(source))) {
    found.push(match[1] ?? match[2] ?? match[3] ?? match[4] ?? match[5] ?? match[6] ?? "");
  }
  // Also catch template fragments inside className={`... ${cond ? "a" : "b"} ...`}
  const ternaryRe = /\?\s*["'`]([^"'`]+)["'`]\s*:\s*["'`]([^"'`]+)["'`]/g;
  while ((match = ternaryRe.exec(source))) {
    found.push(match[1], match[2]);
  }
  return found;
}

describe("HACIEN brand colors", () => {
  it("keeps data/products.ts category accents on brand ink/grey tokens only", () => {
    const source = readFileSync(join(ROOT, "data/products.ts"), "utf8");
    const accentLines = source
      .split("\n")
      .filter((line) => /^\s*accent:\s*(?:brandCategoryAccent|brandColors\.|["'`#])/.test(line));
    expect(accentLines.length).toBeGreaterThan(0);

    for (const line of accentLines) {
      expect(line, `non-brand accent: ${line.trim()}`).toMatch(ALLOWED_PRODUCT_ACCENT_PATTERN);
      expect(line, `forbidden hex accent: ${line.trim()}`).not.toMatch(FORBIDDEN_PRODUCT_ACCENT_HEX);
    }

    expect(source).toContain('from "@/lib/brand-colors"');
    expect(source).toMatch(/accent:\s*brandCategoryAccent/);
  });

  it("rejects slate-400-style low-contrast text classes in app/ and components/", () => {
    const roots = [join(ROOT, "app"), join(ROOT, "components"), join(ROOT, "data")];
    const offenders: string[] = [];

    for (const root of roots) {
      for (const file of walk(root)) {
        const source = readFileSync(file, "utf8");
        if (!FORBIDDEN_TEXT_CLASSES.test(source)) continue;
        for (const [index, line] of source.split("\n").entries()) {
          if (FORBIDDEN_TEXT_CLASSES.test(line)) {
            offenders.push(`${relative(ROOT, file)}:${index + 1}: ${line.trim()}`);
          }
        }
      }
    }

    expect(offenders, offenders.join("\n")).toEqual([]);
  });

  it("rejects grey-600/700 text on dark or translucent-dark surfaces", () => {
    const roots = [join(ROOT, "app"), join(ROOT, "components")];
    const offenders: string[] = [];

    for (const root of roots) {
      for (const file of walk(root)) {
        const source = readFileSync(file, "utf8");
        const rel = relative(ROOT, file);

        for (const [index, line] of source.split("\n").entries()) {
          if (DARK_TERNARY_TOO_DARK.test(line)) {
            offenders.push(`${rel}:${index + 1}: dark ternary uses grey-600/700: ${line.trim()}`);
          }
        }

        // Check per className literal / ternary branch — not whole templates that mix both arms.
        for (const literal of classLiterals(source)) {
          if (literal.includes("${")) continue; // multi-branch template; branches checked separately
          if (DARK_SURFACE_HINT.test(literal) && DARK_TEXT_TOO_DARK.test(literal)) {
            offenders.push(`${rel}: className mixes dark surface with grey-600/700: ${literal.slice(0, 160)}`);
          }
        }
      }
    }

    expect(offenders, offenders.join("\n")).toEqual([]);
  });

  it("ensures no amber, green, teal, cyan, or non-brand blue colour values are in public components", () => {
    const compDir = join(ROOT, "components");
    const files = walk(compDir).filter((file) => {
      const rel = relative(ROOT, file);
      // Exclude auth, checkout, account per security/payment boundary rules
      return (
        !rel.startsWith("components/auth") &&
        !rel.startsWith("components/checkout") &&
        !rel.startsWith("components/account")
      );
    });

    const forbiddenClasses =
      /\b(?:amber|emerald|green|teal|cyan|pink|purple|violet|sky|indigo|rose|yellow|orange)(?:-\d{2,3}(?:\/\d{1,3})?)?\b|\b(?:text|bg|border)-blue-(?:50|100|200|300|400|500|600|700|800|900)(?:\/\d{1,3})?\b/;
    const forbiddenHexes =
      /#(?:05101C|00f2fe|ffb300|38bdf8|f59e0b|fbbf24|22d3ee|06b6d4|fcd34d|60a5fa)/i;
    const forbiddenOverlays =
      /rgba\(\s*(?:7,\s*20,\s*38|5,\s*16,\s*28|8,\s*45,\s*62|132,\s*91,\s*44)/;

    const offenders: string[] = [];
    for (const file of files) {
      const rel = relative(ROOT, file);
      const content = readFileSync(file, "utf8");
      for (const [index, line] of content.split("\n").entries()) {
        if (forbiddenClasses.test(line) || forbiddenHexes.test(line) || forbiddenOverlays.test(line)) {
          offenders.push(`${rel}:${index + 1}: ${line.trim()}`);
        }
      }
    }

    expect(offenders, offenders.join("\n")).toEqual([]);
  });

  it("ensures hero box text meets WCAG AA (4.5:1) at 390 and 1280 on all 14 hero pages", () => {
    const heroPages = [
      { name: "Home", file: "app/page.tsx", component: "Hero" },
      { name: "About", file: "app/about/page.tsx", component: "PremiumPageHero" },
      { name: "Access", file: "app/access/page.tsx", component: "PremiumPageHero" },
      { name: "Quote", file: "app/quote/page.tsx", component: "PremiumPageHero" },
      { name: "Products", file: "app/products/page.tsx", component: "PremiumPageHero" },
      { name: "Technology", file: "app/technology/page.tsx", component: "PremiumPageHero" },
      { name: "Platform", file: "app/platform/page.tsx", component: "PremiumPageHero" },
      { name: "Solutions", file: "app/solutions/page.tsx", component: "PremiumPageHero" },
      { name: "Contact", file: "app/contact/page.tsx", component: "PremiumPageHero" },
      { name: "Support", file: "app/support/page.tsx", component: "PremiumPageHero" },
      { name: "Customer Workspace", file: "app/portal/page.tsx", component: "PremiumPageHero" },
      { name: "FAQ", file: "app/faq/page.tsx", component: "PremiumPageHero" },
      { name: "Search", file: "app/search/page.tsx", component: "PremiumPageHero" },
      { name: "Insights", file: "app/insights/page.tsx", component: "PremiumPageHero" },
    ];

    expect(heroPages.length).toBe(14);

    // Verify all 14 hero pages import and render their hero component
    for (const page of heroPages) {
      const source = readFileSync(join(ROOT, page.file), "utf8");
      expect(source, `${page.name} should use ${page.component}`).toContain(page.component);
    }

    // WCAG 2.1 relative luminance and contrast calculation
    function relativeLuminance(hex: string): number {
      const clean = hex.replace("#", "");
      const num = parseInt(clean, 16);
      const r = (num >> 16) & 255;
      const g = (num >> 8) & 255;
      const b = num & 255;
      const toLinear = (c: number) => {
        const s = c / 255;
        return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    }

    function contrastRatio(hex1: string, hex2: string): number {
      const l1 = relativeLuminance(hex1);
      const l2 = relativeLuminance(hex2);
      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      return (lighter + 0.05) / (darker + 0.05);
    }

    // Verify solid dark backgrounds used in hero boxes
    const heroSource = readFileSync(join(ROOT, "components/Hero.tsx"), "utf8");
    const premiumHeroSource = readFileSync(join(ROOT, "components/PremiumPageHero.tsx"), "utf8");

    // The Home hero is light (site restyle, chat visual language): white
    // surface with ink text. It must not carry the old dark boxes.
    expect(heroSource).toMatch(/bg-white/);
    expect(heroSource).not.toMatch(/bg-\[#0A0A0A\]/);
    expect(heroSource).not.toMatch(/bg-\[#141414\]/);
    const inkOnWhite = contrastRatio("#0A0A0A", "#FFFFFF");
    expect(inkOnWhite, "ink on white must meet WCAG AA (>= 4.5)").toBeGreaterThanOrEqual(4.5);

    // PremiumPageHero (all other hero pages) still uses solid dark box
    // containers to prevent photo bleed-through.
    expect(premiumHeroSource).toMatch(/bg-\[#0A0A0A\]/);
    expect(premiumHeroSource).toMatch(/bg-\[#141414\]/);

    // Text colors used on the solid dark hero box (#141414 / #0A0A0A)
    const cardBg = "#141414";
    const boxBg = "#0A0A0A";
    const whiteText = "#FFFFFF";
    const grey200Text = "#E5E5E5";
    const grey300Text = "#D4D4D4";

    const textColors = [
      { name: "white (headings)", hex: whiteText },
      { name: "grey-200 (body)", hex: grey200Text },
      { name: "grey-300 (eyebrow/signals)", hex: grey300Text },
    ];

    for (const text of textColors) {
      const ratioCard = contrastRatio(text.hex, cardBg);
      const ratioBox = contrastRatio(text.hex, boxBg);
      expect(ratioCard, `${text.name} on ${cardBg} must meet WCAG AA (>= 4.5)`).toBeGreaterThanOrEqual(4.5);
      expect(ratioBox, `${text.name} on ${boxBg} must meet WCAG AA (>= 4.5)`).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("rejects blue text classes on uppercase tracking eyebrow labels in app/ and components/", () => {
    const roots = [join(ROOT, "app"), join(ROOT, "components")];
    const files = roots
      .flatMap((root) => walk(root))
      .filter((file) => {
        const rel = relative(ROOT, file);
        return (
          !rel.startsWith("components/auth") &&
          !rel.startsWith("components/checkout") &&
          !rel.startsWith("components/account")
        );
      });

    const uppercaseTrackingPattern = /\buppercase\b.*\btracking-|\btracking-.*\buppercase\b/;
    const blueTextClassPattern = /(?:^|[\s"'`])text-(?:blue\b|\[#2563[eE][bB]\]|blue-[0-9]+)/;

    const offenders: string[] = [];
    for (const file of files) {
      const rel = relative(ROOT, file);
      const content = readFileSync(file, "utf8");
      for (const [index, line] of content.split("\n").entries()) {
        if (uppercaseTrackingPattern.test(line) && blueTextClassPattern.test(line)) {
          offenders.push(`${rel}:${index + 1}: ${line.trim()}`);
        }
      }
    }

    expect(offenders, offenders.join("\n")).toEqual([]);
  });

  it("ensures every grey-NNN class used in app/ and components/ exists in the theme defined in app/globals.css", () => {
    const globalsCss = readFileSync(join(ROOT, "app/globals.css"), "utf8");
    const themeMatch = globalsCss.match(/@theme\s*\{([^}]+)\}/);
    expect(themeMatch).toBeTruthy();
    const themeContent = themeMatch ? themeMatch[1] : "";
    const themeGreyTokens = new Set(
      Array.from(themeContent.matchAll(/--color-grey-(\d+)/g), (m) => m[1])
    );
    expect(themeGreyTokens.size).toBeGreaterThan(0);

    const roots = [join(ROOT, "app"), join(ROOT, "components")];
    const files = roots
      .flatMap((root) => walk(root))
      .filter((file) => !file.endsWith(".css"));

    const greyClassPattern = /\b(?:[a-zA-Z0-9:-]+-)?grey-(\d+)\b/g;
    const offenders: string[] = [];

    for (const file of files) {
      const rel = relative(ROOT, file);
      const content = readFileSync(file, "utf8");
      for (const [index, line] of content.split("\n").entries()) {
        for (const match of line.matchAll(greyClassPattern)) {
          const token = match[1];
          if (!themeGreyTokens.has(token)) {
            offenders.push(`${rel}:${index + 1}: uses undefined theme token grey-${token}: ${line.trim()}`);
          }
        }
      }
    }

    expect(offenders, offenders.join("\n")).toEqual([]);
  });
});

