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

  it("keeps AiDocumentParser free of cyan/amber classes and hexes", () => {
    const source = readFileSync(join(ROOT, "components/AiDocumentParser.tsx"), "utf8");
    const forbidden =
      /\b(?:cyan|amber)(?:-\d{2,3})?\b|#(?:00f2fe|ffb300|38bdf8|f59e0b|fbbf24|22d3ee|06b6d4|fcd34d)/i;
    const offenders: string[] = [];
    for (const [index, line] of source.split("\n").entries()) {
      if (forbidden.test(line)) {
        offenders.push(`${index + 1}: ${line.trim()}`);
      }
    }
    expect(offenders, offenders.join("\n")).toEqual([]);
  });
});

