import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const read = (rel: string) => readFileSync(path.join(process.cwd(), rel), "utf8");

describe("category pages: simple request first, detailed builder optional", () => {
  it("lets the simple box carry the category", () => {
    const src = read("components/SimpleRequestBox.tsx");
    expect(src).toContain('category = "other"');
    expect(src).toContain("categoryLabel");
  });

  it("puts the simple request before the detailed builder on category pages", () => {
    const page = read("app/products/[category]/page.tsx");
    expect(page).toContain('<SimpleRequestBox category={category.slug} categoryLabel={category.name} />');
    expect(page).toContain("Need exact specs? Use the detailed builder");
    expect(page.indexOf("<SimpleRequestBox")).toBeLessThan(page.indexOf("<RequirementBuilder"));
  });
});
