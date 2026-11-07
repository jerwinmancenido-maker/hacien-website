import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import billingSettings from "@/config/billing-compliance-settings.json";
import { insights } from "@/data/insights";
import { solutions } from "@/data/solutions";

const layout = readFileSync("app/layout.tsx", "utf8");
const quotePage = readFileSync("app/quote/page.tsx", "utf8");

describe("visual inspection fixes (sticky header, checks verbs, duplication, quote note)", () => {
  it("gives the page bottom scroll room below the sticky header", () => {
    expect(layout).toContain("<Footer />");
    const footerAt = layout.indexOf("<Footer />");
    const spacerAt = layout.indexOf('className="h-20 bg-ink"', footerAt);
    expect(spacerAt).toBeGreaterThan(footerAt);
  });

  it("starts every What HACIEN checks body with a verb", () => {
    for (const item of [...solutions, ...insights]) {
      const checks = item.sections.find((section) => section.heading === "What HACIEN checks");
      expect(checks).toBeDefined();
      expect(checks?.body.startsWith("HACIEN checks ")).toBe(true);
    }
  });

  it("does not repeat the IT Infrastructure hero line as the detail opening", () => {
    const infra = solutions.find((solution) => solution.slug === "it-infrastructure");
    expect(infra).toBeDefined();
    expect(infra?.detail.startsWith("HACIEN prepares a quotation-ready package")).toBe(false);
    expect(infra?.detail).toContain("turns your requirements into a package suppliers can quote");
  });

  it("removes prototype wording from the /quote validity disclaimer", () => {
    expect(billingSettings.compliance_disclaimer).not.toMatch(/prototype/i);
    expect(billingSettings.compliance_disclaimer).toContain("approved business records");
  });

  it("replaces the internal-sounding Draft Request Summary box on /quote", () => {
    expect(quotePage).not.toContain("Draft Request Summary");
    expect(quotePage).not.toContain("evidence-gated");
    expect(quotePage).toContain("Please note:");
    expect(quotePage).toContain("No online payment is collected.");
  });
});
