import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getHomepageContent, getIndustriesContent } from "@/lib/cms/content";

const platformPage = readFileSync("app/platform/page.tsx", "utf8");
const technologyPage = readFileSync("app/technology/page.tsx", "utf8");

describe("site rewrite batch 2 (home, industries, platform, technology intros)", () => {
  it("gives the homepage a real hero description instead of a lone qualifier", () => {
    const home = getHomepageContent();
    expect(home.hero.description).toContain("within 1 business day");
    expect(home.hero.description).not.toBe(
      "(excluding products requiring special regulatory licenses such as FDA or DOH-LTO)",
    );
  });

  it("gives each homepage preview section one distinct job", () => {
    const home = getHomepageContent();
    expect(home.solutionsPreview.title).toContain("Work HACIEN takes on");
    expect(home.productCatalogPreview.title).toContain("what a solution is built from");
    expect(home.platformPreview.description).toContain("never restart the story");
  });

  it("sharpens the industries hero without touching the concrete buyer cards", () => {
    const industries = getIndustriesContent();
    expect(industries.hero.title).toContain("Different buyers, different requirements");
    expect(industries.hero.description).toContain("operating reality");
    expect(industries.supportedIndustries.cards).toHaveLength(5);
  });

  it("states plainly that the platform is internal, not a product for sale", () => {
    expect(platformPage).toContain("not a product you buy");
    expect(platformPage).toContain("not sold as a product");
  });

  it("names products in every technology domain line", () => {
    for (const noun of ["servers", "Switches", "Endpoint protection", "subscriptions", "Licensed", "NAS", "UPS", "Cabling"]) {
      expect(technologyPage).toContain(noun);
    }
    expect(technologyPage).not.toContain("for serious operations");
  });
});
