import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { requirementBuilderOptions } from "@/components/RequirementBuilder";
import { brandPhrases, brandsLine, carriedBrands } from "@/data/companyContact";
import { canonicalProductSlug, categories, getProduct, products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { getAboutContent, getHomepageContent, getPublishedCmsContent } from "@/lib/cms/content";
import { getCmsSeoRecords } from "@/lib/cms/seo";
import { buildPageTitleInventory } from "@/lib/seo/page-title-inventory";

/** Unlisted brands kept only when the sentence is a client's own specification. None in this pass. */
const clientSpecBrandAllowances: readonly string[] = [];

const removedBrands = ["HPE", "Fortinet", "Synology"] as const;

function brandPattern(brand: string) {
  return new RegExp(`\\b${brand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
}

function withoutAllowances(text: string) {
  return clientSpecBrandAllowances.reduce((current, sample) => current.split(sample).join(""), text);
}

function walkSource(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      files.push(...walkSource(full));
    } else if (/\.(ts|tsx|js|jsx|mjs|css|json|svg|md)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

describe("carried brands", () => {
  it("renders the brands section as the 19 brands plus the two phrases", () => {
    expect(carriedBrands).toHaveLength(19);
    expect(brandsLine.split(", ")).toEqual([...carriedBrands, ...brandPhrases]);

    const homepage = getHomepageContent();
    expect(homepage.rfqReadiness.title).toBe("Brands");
    expect(homepage.rfqReadiness.description).toBe(brandsLine);

    const aboutBrand = getAboutContent().hero.highlights.find((item) => item.label === "Brands");
    expect(aboutBrand?.text).toBe(brandsLine);

    const aboutPage = readFileSync(path.join(process.cwd(), "app/about/page.tsx"), "utf8");
    const contactPage = readFileSync(path.join(process.cwd(), "app/contact/page.tsx"), "utf8");
    expect(aboutPage).toContain('{ title: "Brands", text: brandsLine }');
    expect(contactPage).toContain('{ label: "Brands", text: brandsLine }');
  });

  it("does not say exclusive distributor, partner, or dealer", () => {
    const roots = ["app", "components", "data", "lib"].map((dir) => path.join(process.cwd(), dir));
    const hits: string[] = [];
    const pattern = /exclusive\s+(distributor|partner|dealer)/i;

    for (const root of roots) {
      for (const file of walkSource(root)) {
        const source = readFileSync(file, "utf8");
        if (pattern.test(source)) hits.push(path.relative(process.cwd(), file));
      }
    }

    const published = JSON.stringify({
      cms: getPublishedCmsContent(),
      seo: getCmsSeoRecords(),
      titles: buildPageTitleInventory(),
    });
    expect(pattern.test(published)).toBe(false);
    expect(hits).toEqual([]);
  });

  it("keeps HPE, Fortinet, and Synology out of the catalog and requirement options", () => {
    const catalog = withoutAllowances(JSON.stringify({ categories, products, solutions }));
    const options = withoutAllowances(requirementBuilderOptions().join("\n"));

    for (const brand of removedBrands) {
      expect(brandPattern(brand).test(catalog), brand).toBe(false);
      expect(brandPattern(brand).test(options), brand).toBe(false);
    }

    expect(/microsoft\s*365/i.test(`${catalog}\n${options}`)).toBe(false);

    for (const option of requirementBuilderOptions()) {
      const spelled = carriedBrands.find((brand) => brand.toLowerCase() === option.toLowerCase());
      if (spelled) expect(option).toBe(spelled);
    }
  });

  it("sends retired product slugs to the current slug", () => {
    const retired: Array<[string, string]> = [
      ["hpe-proliant-class-rack-server-options", "dell-lenovo-rack-server-options"],
      ["synology-class-nas-backup-appliance", "nas-backup-appliance"],
      ["fortinet-class-firewall-options", "cisco-firewall-options"],
      ["epson-ecotank-class-mfp-options", "epson-brother-canon-mfp-options"],
      ["apc-smart-ups-class-power-protection", "apc-cyberpower-eaton-power-protection"],
    ];

    for (const [previous, current] of retired) {
      expect(canonicalProductSlug(previous)).toBe(current);
      expect(getProduct(previous)?.slug).toBe(current);
      expect(products.some((product) => product.slug === previous)).toBe(false);
    }
  });
});
