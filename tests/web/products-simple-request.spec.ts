import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const read = (rel: string) => readFileSync(path.join(process.cwd(), rel), "utf8");

// Owner decision (2026-11-08): the simple request box is removed —
// the chat is the front door for describing a need. The detailed
// builder stays, collapsed, for buyers who want every field.
describe("products: no simple request box — chat first, detailed builder optional", () => {
  it("no longer ships the SimpleRequestBox component or renders it", () => {
    expect(existsSync(path.join(process.cwd(), "components/SimpleRequestBox.tsx"))).toBe(false);
    const page = read("app/products/page.tsx");
    expect(page).not.toContain("SimpleRequestBox");
    expect(page).not.toContain('id="simple-request"');
  });

  it("sends the hero's main action to /quote as Request a Quote", () => {
    const page = read("app/products/page.tsx");
    expect(page).toContain("Tell us what you need.");
    expect(page).toContain('primaryAction={{ href: "/quote", label: "Request a Quote" }}');
  });

  it("keeps the detailed builder, described against the chat", () => {
    const page = read("app/products/page.tsx");
    expect(page).toContain("Need exact specs? Use the detailed builder");
    expect(page).toContain("describing what you need in the chat is enough.");
    expect(page).not.toContain("the simple request above");
  });
});
