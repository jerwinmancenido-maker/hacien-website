import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const read = (rel: string) => readFileSync(path.join(process.cwd(), rel), "utf8");

// Owner decisions (2026-11-08): the simple request box AND the
// detailed RequirementBuilder are both removed — the chat is the
// only front door for describing a need.
describe("products: no request forms — the chat is the front door", () => {
  it("no longer ships the SimpleRequestBox or RequirementBuilder components", () => {
    expect(existsSync(path.join(process.cwd(), "components/SimpleRequestBox.tsx"))).toBe(false);
    expect(existsSync(path.join(process.cwd(), "components/RequirementBuilder.tsx"))).toBe(false);
  });

  it("renders neither form on /products", () => {
    const page = read("app/products/page.tsx");
    expect(page).not.toContain("SimpleRequestBox");
    expect(page).not.toContain("RequirementBuilder");
    expect(page).not.toContain("detailed builder");
    expect(page).not.toContain('id="simple-request"');
  });

  it("sends the hero's main action to /quote as Request a Quote", () => {
    const page = read("app/products/page.tsx");
    expect(page).toContain("Tell us what you need.");
    expect(page).toContain('primaryAction={{ href: "/quote", label: "Request a Quote" }}');
  });
});
