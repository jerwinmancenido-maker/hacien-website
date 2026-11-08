import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const read = (rel: string) => readFileSync(path.join(process.cwd(), rel), "utf8");

describe("content bundle: no registration details, plain buying copy", () => {
  it("keeps company contact free of registration details and founding dates", () => {
    const src = read("data/companyContact.ts");
    for (const banned of ["RDO", "Non-VAT", "Red Registration", "June 2026", "fast, quotation"]) {
      expect(src).not.toContain(banned);
    }
    expect(src).toContain("Based in Ortigas Center, Pasig City");
    expect(src).toContain("Registration papers are not published online");
    expect(src).toContain("BIR Registered Taxpayer");
  });

  it("shows the six buying steps with a neutral payment summary", () => {
    const src = read("components/BuyingTimeline.tsx");
    for (const step of ["Request", "Reply within 1 business day", "Quotation valid 15 days", "Accept and confirm payment terms", "Supplier order", "Delivery"]) {
      expect(src).toContain(step);
    }
    expect(src).toContain("Payment terms, including any deposit, are stated in your quotation");
    expect(src).not.toContain("payment first");
    expect(src).not.toContain("credit investigation");
  });

  it("uses positive sourcing wording on products and a callback route on warranty", () => {
    expect(read("app/products/page.tsx")).toContain("Every order is checked fresh");
    expect(read("app/products/page.tsx")).not.toContain("guarantee stock");
    const warranty = read("app/policies/_lib/content.ts");
    expect(warranty).toContain("request a callback through the chat on the [Contact page](/contact)");
    expect(warranty).not.toContain("by phone or Viber");
  });
});
