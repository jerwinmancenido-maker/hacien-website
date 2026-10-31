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
});
