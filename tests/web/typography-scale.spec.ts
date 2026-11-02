import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

function walkDir(dir: string, excludeDirs: string[] = []): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    if (excludeDirs.includes(entry)) continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walkDir(full, excludeDirs));
    } else if (/\.(tsx|ts)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

describe("G06: Fixed heading size scale", () => {
  it("defines fixed heading scale classes in app/globals.css", () => {
    const css = readFileSync(path.join(ROOT, "app/globals.css"), "utf8");
    expect(css).toContain(".heading-h1");
    expect(css).toContain(".heading-h2");
    expect(css).toContain(".heading-h3");
    expect(css).toContain(".heading-h4");
  });

  it("ensures SectionHeading scales H1 titles to 48px on desktop (text-5xl)", () => {
    const source = readFileSync(path.join(ROOT, "components/SectionHeading.tsx"), "utf8");
    expect(source).toContain("text-3xl sm:text-5xl");
  });

  it("ensures detail page titles reach 48px on desktop (text-5xl or SectionHeading as=h1)", () => {
    // Solution detail page
    const solutionDetail = readFileSync(path.join(ROOT, "app/solutions/[slug]/page.tsx"), "utf8");
    expect(solutionDetail).toContain('as="h1"');

    // Insight detail page
    const insightDetail = readFileSync(path.join(ROOT, "app/insights/[slug]/page.tsx"), "utf8");
    expect(insightDetail).toMatch(/<h1[^>]*sm:text-5xl/);

    // Product detail page
    const productDetail = readFileSync(path.join(ROOT, "components/ProductDetail.tsx"), "utf8");
    expect(productDetail).toMatch(/<h1[^>]*sm:text-5xl/);
  });

  it("rejects tiny 12px or 14px section headings (text-xs / text-sm on h2)", () => {
    const excluded = ["node_modules", ".next", "legal", "privacy", "terms-of-sale", "warranty", "policies"];
    const files = [
      ...walkDir(path.join(ROOT, "app"), excluded),
      ...walkDir(path.join(ROOT, "components"), excluded),
    ];

    const violations: string[] = [];
    const tinyH2Pattern = /<h2[^>]*\b(?:text-xs|text-sm)\b[^>]*>/g;

    for (const file of files) {
      const rel = path.relative(ROOT, file);
      // Skip legal / policy paths as instructed
      if (/app\/(?:legal|privacy|terms-of-sale|warranty|policies)\b/.test(rel)) continue;

      const content = readFileSync(file, "utf8");
      if (tinyH2Pattern.test(content)) {
        violations.push(rel);
      }
    }

    expect(violations, `Found tiny text-xs/text-sm h2 headings in: ${violations.join(", ")}`).toEqual([]);
  });
});
