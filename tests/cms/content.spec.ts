import { describe, expect, it } from "vitest";

import {
  findBlockedCmsClaims,
  getAboutContent,
  getFaqContent,
  getHelpContent,
  getHomepageContent,
  getIndustriesContent,
  getNavigationContent,
  getPublishedCmsContent,
  getSolutionsContent,
  validateCmsContent,
} from "@/lib/cms/content";
import {
  blockedPublicRoutePatterns,
  dynamicSitemapRoutePatterns,
  expectedCmsInventoryKeys,
  getCmsInventory,
  publicRouteOwnershipRules,
  staticSitemapRoutes,
  validateCmsInventory,
} from "@/lib/cms/inventory";
import { getCmsMediaRecords, validateCmsMediaRecords } from "@/lib/cms/media";
import { getCmsSeoRecords, validateCmsSeoRecords } from "@/lib/cms/seo";

describe("CMS read layer", () => {
  it("loads published repo-backed FAQ and Help content", () => {
    const content = getPublishedCmsContent();

    expect(content.map((entry) => entry.slug)).toEqual(
      expect.arrayContaining(["homepage", "about", "solutions", "industries", "faq", "help"]),
    );
    expect(content.every((entry) => entry.status === "published")).toBe(true);
    expect(getFaqContent().faqSections.length).toBeGreaterThan(0);
    expect(getHelpContent().tiles.length).toBeGreaterThan(0);
  });

  it("loads the first migrated public page content areas from CMS", () => {
    expect(getHomepageContent().rfqReadiness.cards.length).toBeGreaterThanOrEqual(4);
    expect(getAboutContent().workingStandard.cards.length).toBeGreaterThanOrEqual(5);
    expect(getSolutionsContent().meaning.cards.length).toBeGreaterThanOrEqual(3);
    expect(getIndustriesContent().supportedIndustries.cards.length).toBeGreaterThanOrEqual(6);
  });

  it("loads header and footer navigation from CMS", () => {
    const navigation = getNavigationContent();

    expect(navigation.header.primaryItems.map((item) => item.href)).toEqual(
      expect.arrayContaining(["/", "/solutions", "/technology", "/platform", "/insights", "/about"]),
    );
    expect(navigation.footer.groups.flatMap((group) => group.links.map((link) => link.href))).toEqual(
      expect.arrayContaining(["/help", "/faq", "/track", "/privacy", "/terms", "/legal"]),
    );
  });

  it("tracks media source, alt text, and source notes in CMS", () => {
    const records = getCmsMediaRecords();
    const result = validateCmsMediaRecords(records);

    expect(result).toMatchObject({
      ok: true,
      invalidRecords: [],
      duplicateKeys: [],
    });
    expect(records.map((record) => record.key)).toEqual(
      expect.arrayContaining(["commandCenter", "workspace", "knowledge", "strategy"]),
    );
    expect(records.every((record) => record.alt.length > 0 && record.sourceNote.length > 0)).toBe(true);
  });

  it("tracks first-batch SEO metadata in CMS and keeps it claim-safe", () => {
    const records = getCmsSeoRecords();
    const result = validateCmsSeoRecords(records);

    expect(result).toMatchObject({
      ok: true,
      invalidRecords: [],
      duplicateKeys: [],
      duplicateRoutes: [],
      blockedClaimRecords: [],
    });
    expect(records.map((record) => record.route)).toEqual(
      expect.arrayContaining(["/", "/about", "/solutions", "/industries", "/faq", "/help"]),
    );
  });

  it("keeps current published content claim-safe", () => {
    const results = [
      validateCmsContent(getNavigationContent()),
      ...getPublishedCmsContent().map((entry) => validateCmsContent(entry)),
    ];

    expect(results.every((result) => result.ok)).toBe(true);
  });

  it("flags blocked public claims before CMS content can publish", () => {
    const matches = findBlockedCmsClaims({
      slug: "unsafe",
      hero: {
        title: "In Stock at Manila Hub with 15-day price match",
      },
    });

    expect(matches.map((match) => match.text)).toContain(
      "In Stock at Manila Hub with 15-day price match",
    );
  });

  it("declares ownership for every expected public content area", () => {
    const inventory = getCmsInventory();
    const result = validateCmsInventory(inventory);

    expect(result).toMatchObject({
      ok: true,
      missingExpectedKeys: [],
      missingPublicRouteOwnership: [],
      missingStaticSitemapOwnership: [],
      missingDynamicSitemapOwnership: [],
      sitemapRuleDrift: [],
      blockedRoutesInSitemap: [],
      duplicateKeys: [],
      invalidItems: [],
      incompleteMetadataItems: [],
      blockedOwnershipErrors: [],
    });
    expect(inventory.map((item) => item.key)).toEqual(expect.arrayContaining([...expectedCmsInventoryKeys]));
    expect(
      inventory.every(
        (item) =>
          item.riskLevel >= 1 &&
          item.riskLevel <= 5 &&
          item.sourceFile.length > 0 &&
          item.validationSchema.requiredFields.length > 0 &&
          item.validationSchema.rules.length > 0 &&
          item.dependencies.length > 0 &&
          item.seoSource.length > 0 &&
          item.cmsReadiness.length > 0,
      ),
    ).toBe(true);
  });

  it("keeps blocked and ERP-owned business truth outside editable CMS ownership", () => {
    const inventory = getCmsInventory();
    const blockedItems = inventory.filter((item) => item.publishRisk === "blocked");

    expect(blockedItems.length).toBeGreaterThan(0);
    expect(blockedItems.every((item) => item.editableNow === false)).toBe(true);
    expect(blockedItems.every((item) => item.ownerType === "blocked" || item.ownerType === "erp")).toBe(true);
  });

  it("maps sitemap-discoverable routes to CMS ownership records", () => {
    const sitemapRoutes = staticSitemapRoutes.map((route) => (route === "" ? "/" : route));
    const sitemapRules = publicRouteOwnershipRules.filter((rule) => rule.discoverableInSitemap);

    expect(sitemapRoutes).toEqual(expect.arrayContaining(sitemapRules.filter((rule) => !rule.route.includes("[")).map((rule) => rule.route)));
    expect(sitemapRules.map((rule) => rule.route)).toEqual(expect.arrayContaining([...dynamicSitemapRoutePatterns]));
  });

  it("keeps blocked public routes out of sitemap ownership", () => {
    const sitemapRoutes = [...staticSitemapRoutes, ...dynamicSitemapRoutePatterns];

    expect(sitemapRoutes.some((route) => blockedPublicRoutePatterns.includes(route as never))).toBe(false);
  });
});
