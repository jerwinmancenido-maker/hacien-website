import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const read = (rel: string) => readFileSync(path.join(process.cwd(), rel), "utf8");

// Owner decision (2026-11-08): category pages drop the simple
// request box too — the chat takes the description, the detailed
// builder stays for exact specs.
describe("category pages: no simple request box — detailed builder optional", () => {
  it("does not render the SimpleRequestBox", () => {
    const page = read("app/products/[category]/page.tsx");
    expect(page).not.toContain("SimpleRequestBox");
  });

  it("keeps the detailed builder, described against the chat", () => {
    const page = read("app/products/[category]/page.tsx");
    expect(page).toContain("Need exact specs? Use the detailed builder");
    expect(page).toContain("describing what you need in the chat is enough.");
    expect(page).not.toContain("the simple request above");
    expect(page).toContain("<RequirementBuilder");
  });
});
