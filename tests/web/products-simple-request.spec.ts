import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const read = (rel: string) => readFileSync(path.join(process.cwd(), rel), "utf8");

describe("products: simple request first, detailed builder optional", () => {
  it("offers one description box that adds a single requirement and goes to /quote", () => {
    const src = read("components/SimpleRequestBox.tsx");
    expect(src).toContain("What do you need?");
    expect(src).toContain("addRequirement");
    expect(src).toContain('router.push("/quote")');
  });

  it("puts the simple request before the detailed builder on /products", () => {
    const page = read("app/products/page.tsx");
    expect(page).toContain("Tell us what you need.");
    expect(page).toContain('id="simple-request"');
    expect(page).toContain("Need exact specs? Use the detailed builder");
    expect(page.indexOf("<SimpleRequestBox")).toBeLessThan(page.indexOf("<RequirementBuilder"));
  });
});
