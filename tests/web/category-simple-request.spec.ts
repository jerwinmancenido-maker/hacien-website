import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const read = (rel: string) => readFileSync(path.join(process.cwd(), rel), "utf8");

// Owner decisions (2026-11-08): category pages drop the simple
// request box and the detailed builder too — the chat takes the
// description and the specifications.
describe("category pages: no request forms — the chat is the front door", () => {
  it("renders neither the SimpleRequestBox nor the RequirementBuilder", () => {
    const page = read("app/products/[category]/page.tsx");
    expect(page).not.toContain("SimpleRequestBox");
    expect(page).not.toContain("RequirementBuilder");
    expect(page).not.toContain("detailed builder");
  });

  it("keeps the category content and procurement note", () => {
    const page = read("app/products/[category]/page.tsx");
    expect(page).toContain("Procurement note:");
    expect(page).toContain("ProductGrid");
  });
});
