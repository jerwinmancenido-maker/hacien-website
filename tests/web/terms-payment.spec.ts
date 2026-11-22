import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("terms of sale: payment terms as stated in quotation", () => {
  it("states payment terms are stated in each quotation, with no payment-first default and no 50/50 default", () => {
    const src = readFileSync(path.join(process.cwd(), "app/policies/_lib/content.ts"), "utf8");
    const start = src.indexOf("termsOfSalePage");
    const end = src.indexOf("export const warrantyPage", start);
    const terms = src.slice(start, end);
    expect(terms).toContain("Version\", value: \"1.3");
    expect(terms).toContain("Payment terms are stated in each quotation and confirmed before an order proceeds. No single default payment schedule applies to all orders.");
    expect(terms).toContain("**Payment terms:** payment timing, deposit (if any), and method are stated in your quotation and govern your order.");
    expect(terms).not.toContain("payment is due before ordering");
    expect(terms).not.toContain("Unless your quotation states approved credit terms");
    expect(terms).not.toContain("100% upfront");
    expect(terms).not.toContain("50% down");
    expect(terms).not.toContain("50% on delivery");
  });
});
