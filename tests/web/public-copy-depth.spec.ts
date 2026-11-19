import { describe, expect, it } from "vitest";
import { categoryGuides, getCategoryGuide } from "@/data/categoryGuides";
import { categories } from "@/data/products";
import { industryBriefs, projectIntegration, quoteGuide } from "@/data/buyerCopy";
import { findBlockedCmsClaims } from "@/lib/cms/content";

const banned = [
  /\bIn Stock\b/i,
  /\bprice match\b/i,
  /\bexclusive\s+(distributor|partner|dealer)\b/i,
  /\bauthorized\s+(dealer|partner|distributor)\b/i,
  /\bPhilGEPS\s+Platinum\b/i,
  /\b\d+\+\s*(clients|customers|projects|years)\b/i,
  /\bMicrosoft\s*365\b/i,
  /\b(Fortinet|Synology|\bHPE\b)\b/i,
  /\bgovernment-procurement\b/i,
];

describe("public category and buyer copy", () => {
  it("gives every product category a guide with specs, use cases, and an RFQ list", () => {
    expect(categoryGuides).toHaveLength(categories.length);
    for (const category of categories) {
      const guide = getCategoryGuide(category.slug);
      expect(guide, category.slug).toBeDefined();
      expect(guide?.whatItIs.length).toBeGreaterThanOrEqual(2);
      expect(guide?.useCases.length).toBeGreaterThanOrEqual(3);
      expect(guide?.specs.length).toBeGreaterThanOrEqual(4);
      expect(guide?.beyond.map((item) => item.title)).toEqual([
        "Sourcing",
        "Configuration",
        "Delivery",
        "Installation",
        "Warranty handling",
        "Procurement documents",
      ]);
      expect(guide?.rfqChecklist.length).toBeGreaterThanOrEqual(6);
    }
  });

  it("keeps new buyer copy free of blocked claims and invented scoreboard facts", () => {
    const payload = { categoryGuides, industryBriefs, projectIntegration, quoteGuide };
    expect(findBlockedCmsClaims(payload)).toEqual([]);
    const text = JSON.stringify(payload);
    for (const pattern of banned) {
      expect(text).not.toMatch(pattern);
    }
  });

  it("states the project sequence buyers asked for", () => {
    expect(projectIntegration.phases.map((phase) => phase.step)).toEqual([
      "Site survey",
      "Bill of quantities",
      "Supply",
      "Installation",
      "Testing",
      "Turnover",
      "After-sales",
    ]);
  });
});
