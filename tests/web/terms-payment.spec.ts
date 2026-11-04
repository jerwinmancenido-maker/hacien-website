import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("terms of sale: payment terms as stated in quotation", () => {
  it("states payment due before ordering/delivery unless approved credit terms, with no 50/50 default", () => {
    const src = readFileSync(path.join(process.cwd(), "app/policies/_lib/content.ts"), "utf8");
    const start = src.indexOf("termsOfSalePage");
    const end = src.indexOf("export const warrantyPage", start);
    const terms = src.slice(start, end);
    expect(terms).toContain("Version\", value: \"1.2");
    expect(terms).toContain("Unless your quotation states approved credit terms, payment is due");
    expect(terms).toContain("Software and special orders are paid **100% upfront**");
    expect(terms).not.toContain("50% down");
    expect(terms).not.toContain("50% on delivery");
  });
});
