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
  createCmsDraft,
  editableCmsDraftKeys,
  getEditableCmsDraftInventory,
  validateCmsDraft,
} from "@/lib/cms/drafts";
import { resolveCmsDraftDirectory } from "@/lib/cms/draft-storage";
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
import { getCmsPreviewData } from "@/lib/cms/preview";
import { getCmsSeoRecords, validateCmsSeoRecords } from "@/lib/cms/seo";
import { applyCmsDraftToSource, validateCmsDraftApplyPlan } from "@/lib/cms/apply-draft";

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

  it("builds a read-only CMS preview dataset from source registries", () => {
    const preview = getCmsPreviewData();

    expect(preview.summary.inventoryRecords).toBe(preview.inventory.length);
    expect(preview.summary.publishedContent).toBe(preview.content.length);
    expect(preview.summary.mediaRecords).toBe(preview.media.length);
    expect(preview.summary.seoRecords).toBe(preview.seo.length);
    expect(preview.blockedOrErpOwned.length).toBeGreaterThan(0);
    expect(preview.blockedOrErpOwned.every((item) => item.editableNow === false)).toBe(true);
  });

  it("declares local CMS draft ownership for every CMS-owned public content area", () => {
    const editableInventory = getEditableCmsDraftInventory();
    const inventory = getCmsInventory();
    const cmsOwnedKeys = inventory.filter((item) => item.ownerType === "cms").map((item) => item.key);

    expect(editableCmsDraftKeys).toEqual([
      "homepage",
      "about",
      "about.company-profile",
      "access",
      "contact",
      "customer-workspace",
      "solutions.index",
      "solutions.detail",
      "technology",
      "platform",
      "industries",
      "insights.index",
      "insights.article",
      "faq",
      "help",
      "search",
      "support",
      "tracking.lookup",
      "legal",
      "privacy",
      "terms",
      "trust-center",
      "navigation.header",
      "navigation.footer",
      "media.photos",
      "seo.metadata",
    ]);
    expect(editableCmsDraftKeys).toEqual(cmsOwnedKeys);
    expect(editableInventory.map((item) => item.key)).toEqual(expect.arrayContaining([...editableCmsDraftKeys]));
    expect(editableInventory.every((item) => item.ownerType === "cms")).toBe(true);
    expect(editableInventory.every((item) => item.editableNow === true)).toBe(true);
    expect(editableInventory.every((item) => item.publishRisk !== "blocked")).toBe(true);
    expect(inventory.filter((item) => item.ownerType !== "cms").every((item) => item.editableNow === false)).toBe(true);
  });

  it("validates local CMS drafts without publishing them", () => {
    const draft = createCmsDraft({
      id: "draft-faq-hero",
      contentKey: "faq",
      fields: {
        title: "Evidence-safe answers for HACIEN buyers.",
        description: "Search common RFQ questions before sending a request.",
      },
      updatedAt: "2026-07-09T00:00:00.000Z",
    });

    expect(draft).toMatchObject({
      id: "draft-faq-hero",
      contentKey: "faq",
      ownerType: "cms",
      status: "draft",
    });
    expect(validateCmsDraft(draft)).toMatchObject({
      ok: true,
      errors: [],
      blockedClaims: [],
    });
  });

  it("validates structured local CMS document drafts", () => {
    for (const contentKey of ["legal", "privacy", "terms", "trust-center"] as const) {
      const draft = createCmsDraft({
        id: `draft-${contentKey}-document`,
        contentKey,
        fields: {
          title: `${contentKey} draft`,
          summary: "Review-ready policy summary.",
          effectiveDate: "2026-07-09",
          sections: [
            {
              heading: "Policy section",
              body: "This section is editable as plain text for local review before publishing.",
            },
          ],
          reviewNotes: "Founder/legal review required before publishing.",
        },
        updatedAt: "2026-07-09T00:00:00.000Z",
      });

      expect(validateCmsDraft(draft)).toMatchObject({
        ok: true,
        errors: [],
        blockedClaims: [],
      });
    }
  });

  it("validates structured local CMS page drafts", () => {
    for (const contentKey of ["homepage", "about", "solutions.index", "industries", "support", "tracking.lookup"] as const) {
      const draft = createCmsDraft({
        id: `draft-${contentKey}-page`,
        contentKey,
        fields: {
          title: `${contentKey} draft`,
          description: "Review-ready page description.",
          sections: [
            {
              heading: "Page section",
              body: "This page section is editable as plain text for local review before publishing.",
            },
          ],
          reviewNotes: "Review route, density, and claim safety before publishing.",
        },
        updatedAt: "2026-07-09T00:00:00.000Z",
      });

      expect(validateCmsDraft(draft)).toMatchObject({
        ok: true,
        errors: [],
        blockedClaims: [],
      });
    }
  });

  it("validates local CMS navigation drafts", () => {
    const headerDraft = createCmsDraft({
      id: "draft-navigation.header-nav",
      contentKey: "navigation.header",
      fields: {
        title: "navigation.header draft",
        links: [{ label: "Home", href: "/" }],
        reviewNotes: "Route crawl required before publishing.",
      },
      updatedAt: "2026-07-09T00:00:00.000Z",
    });
    const footerDraft = createCmsDraft({
      id: "draft-navigation.footer-nav",
      contentKey: "navigation.footer",
      fields: {
        title: "navigation.footer draft",
        statement: "Footer statement.",
        groups: [{ title: "Company", links: [{ label: "About", href: "/about" }] }],
        reviewNotes: "Route crawl required before publishing.",
      },
      updatedAt: "2026-07-09T00:00:00.000Z",
    });

    for (const draft of [headerDraft, footerDraft]) {
      expect(validateCmsDraft(draft)).toMatchObject({
        ok: true,
        errors: [],
        blockedClaims: [],
      });
    }
  });

  it("rejects local CMS drafts with blocked public claims", () => {
    const result = validateCmsDraft({
      id: "draft-unsafe",
      contentKey: "help",
      ownerType: "cms",
      riskLevel: 3,
      status: "draft",
      updatedAt: "2026-07-09T00:00:00.000Z",
      fields: {
        title: "Official invoice ready",
        description: "In Stock at Manila Hub with a 15-day price match.",
      },
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContain("Draft contains blocked public claims.");
    expect(result.blockedClaims.length).toBeGreaterThan(0);
  });

  it("rejects local CMS drafts for ERP, config, and blocked ownership", () => {
    for (const contentKey of [
      "erp.product-publication-truth",
      "quote.support-copy",
      "tracking.reference",
      "blocked.payment-tax-documents",
    ]) {
      const result = validateCmsDraft({
        id: `draft-${contentKey}`,
        contentKey,
        ownerType: "cms",
        riskLevel: 5,
        status: "draft",
        updatedAt: "2026-07-09T00:00:00.000Z",
        fields: { title: "Attempted edit", description: "Should not be editable from local CMS drafts." },
      });

      expect(result.ok).toBe(false);
      expect(result.errors).toContain("Draft contentKey is not enabled for local CMS drafts.");
    }
  });

  it("requires metadata fields for SEO and media drafts", () => {
    expect(
      validateCmsDraft({
        id: "draft-seo-incomplete",
        contentKey: "seo.metadata",
        ownerType: "cms",
        riskLevel: 3,
        status: "draft",
        updatedAt: "2026-07-09T00:00:00.000Z",
        fields: { route: "/", title: "Home" },
      }).errors,
    ).toContain("Draft field description is required for seo.metadata.");

    expect(
      validateCmsDraft({
        id: "draft-media-incomplete",
        contentKey: "media.photos",
        ownerType: "cms",
        riskLevel: 3,
        status: "draft",
        updatedAt: "2026-07-09T00:00:00.000Z",
        fields: { key: "workspace", alt: "Workspace image" },
      }).errors,
    ).toEqual(
      expect.arrayContaining([
        "Draft field sourceUrl is required for media.photos.",
        "Draft field sourceNote is required for media.photos.",
      ]),
    );
  });

  it("requires structured sections for legal document drafts", () => {
    const missingSections = validateCmsDraft({
      id: "draft-legal-missing-sections",
      contentKey: "legal",
      ownerType: "cms",
      riskLevel: 4,
      status: "draft",
      updatedAt: "2026-07-09T00:00:00.000Z",
      fields: {
        title: "Legal notice",
        summary: "Policy summary.",
        effectiveDate: "2026-07-09",
        reviewNotes: "Review required.",
      },
    });

    expect(missingSections.errors).toContain("Draft field sections must include at least one section for legal.");

    const incompleteSection = validateCmsDraft({
      id: "draft-legal-incomplete-section",
      contentKey: "legal",
      ownerType: "cms",
      riskLevel: 4,
      status: "draft",
      updatedAt: "2026-07-09T00:00:00.000Z",
      fields: {
        title: "Legal notice",
        summary: "Policy summary.",
        effectiveDate: "2026-07-09",
        sections: [{ heading: "", body: "" }],
        reviewNotes: "Review required.",
      },
    });

    expect(incompleteSection.errors).toEqual(
      expect.arrayContaining([
        "Draft section 1 heading is required for legal.",
        "Draft section 1 body is required for legal.",
      ]),
    );
  });

  it("resolves local CMS draft storage back to the repo-level drafts directory", () => {
    const standaloneResolved = resolveCmsDraftDirectory(`${process.cwd()}/.next/standalone`, undefined);
    const npmStartResolved = resolveCmsDraftDirectory(`${process.cwd()}/.next/standalone`, process.cwd());

    expect(standaloneResolved).toBe(`${process.cwd()}/cms-drafts`);
    expect(npmStartResolved).toBe(`${process.cwd()}/cms-drafts`);
  });

  it("creates a dry-run apply plan for ready SEO drafts", () => {
    const draft = createCmsDraft({
      id: "ready-seo-homepage",
      contentKey: "seo.metadata",
      status: "ready",
      fields: {
        route: "/",
        title: "Updated homepage title",
        description: "Updated homepage description for local review.",
      },
      updatedAt: "2026-07-09T00:00:00.000Z",
    });
    const plan = validateCmsDraftApplyPlan(draft);

    expect(plan).toMatchObject({
      applySupported: true,
      contentKey: "seo.metadata",
      filePath: "lib/cms/seo.ts",
      mode: "dry-run",
      recordKey: "homepage",
      errors: [],
    });
  });

  it("creates a dry-run apply plan for ready media drafts", () => {
    const draft = createCmsDraft({
      id: "ready-media-workspace",
      contentKey: "media.photos",
      status: "ready",
      fields: {
        key: "workspace",
        alt: "Updated workspace image alt text.",
        sourceUrl: "https://example.com/workspace-source",
        sourceNote: "Local review source note.",
      },
      updatedAt: "2026-07-09T00:00:00.000Z",
    });
    const plan = validateCmsDraftApplyPlan(draft);

    expect(plan).toMatchObject({
      applySupported: true,
      contentKey: "media.photos",
      filePath: "lib/cms/media.ts",
      mode: "dry-run",
      recordKey: "workspace",
      errors: [],
    });
  });

  it("creates a dry-run apply plan for ready header navigation drafts", () => {
    const draft = createCmsDraft({
      id: "ready-header-navigation",
      contentKey: "navigation.header",
      status: "ready",
      fields: {
        title: "Header navigation",
        links: [
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "Technology", href: "/technology" },
          { label: "Platform", href: "/platform" },
          { label: "Insights", href: "/insights" },
          { label: "Company", href: "/about" },
          { label: "Access HACIEN", href: "/access" },
          { label: "Request Quote", href: "/quote" },
        ],
        reviewNotes: "Route crawl before apply.",
      },
      updatedAt: "2026-07-09T00:00:00.000Z",
    });
    const plan = validateCmsDraftApplyPlan(draft);

    expect(plan).toMatchObject({
      applySupported: true,
      contentKey: "navigation.header",
      filePath: "lib/cms/content.ts",
      mode: "dry-run",
      recordKey: "header",
      errors: [],
    });
  });

  it("rejects non-ready drafts before repo application", () => {
    const draft = createCmsDraft({
      id: "review-seo-homepage",
      contentKey: "seo.metadata",
      status: "needs-review",
      fields: {
        route: "/",
        title: "Updated homepage title",
        description: "Updated homepage description for local review.",
      },
      updatedAt: "2026-07-09T00:00:00.000Z",
    });
    const plan = validateCmsDraftApplyPlan(draft);

    expect(plan.applySupported).toBe(false);
    expect(plan.errors).toContain("Only drafts marked ready can be applied to repo-backed CMS content.");
  });

  it("rejects non-ready header navigation drafts before repo application", () => {
    const draft = createCmsDraft({
      id: "review-header-navigation",
      contentKey: "navigation.header",
      status: "needs-review",
      fields: {
        title: "Header navigation",
        links: [
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "Technology", href: "/technology" },
          { label: "Platform", href: "/platform" },
          { label: "Insights", href: "/insights" },
          { label: "Company", href: "/about" },
          { label: "Access HACIEN", href: "/access" },
          { label: "Request Quote", href: "/quote" },
        ],
        reviewNotes: "Route crawl before apply.",
      },
      updatedAt: "2026-07-09T00:00:00.000Z",
    });
    const plan = validateCmsDraftApplyPlan(draft);

    expect(plan.applySupported).toBe(false);
    expect(plan.errors).toContain("Only drafts marked ready can be applied to repo-backed CMS content.");
  });

  it("rejects unsupported page drafts before repo application", () => {
    const draft = createCmsDraft({
      id: "ready-homepage-page",
      contentKey: "homepage",
      status: "ready",
      fields: {
        title: "Homepage draft",
        description: "Homepage draft description.",
        sections: [{ heading: "Section", body: "Body" }],
        reviewNotes: "Review before apply.",
      },
      updatedAt: "2026-07-09T00:00:00.000Z",
    });
    const plan = validateCmsDraftApplyPlan(draft);

    expect(plan.applySupported).toBe(false);
    expect(plan.errors).toContain("Draft contentKey homepage is not supported by the apply script yet.");
  });

  it("creates a dry-run apply plan for ready grouped footer navigation drafts", () => {
    const draft = createCmsDraft({
      id: "ready-footer-navigation",
      contentKey: "navigation.footer",
      status: "ready",
      fields: {
        title: "Footer navigation",
        statement: "Technology procurement clarified before anyone quotes.",
        groups: [
          { title: "Company", links: [{ label: "About", href: "/about" }] },
          { title: "Start", links: [{ label: "Request Quote", href: "/quote" }] },
        ],
        reviewNotes: "Route crawl before apply.",
      },
      updatedAt: "2026-07-09T00:00:00.000Z",
    });
    const plan = validateCmsDraftApplyPlan(draft);

    expect(plan).toMatchObject({
      applySupported: true,
      contentKey: "navigation.footer",
      filePath: "lib/cms/content.ts",
      mode: "dry-run",
      recordKey: "footer",
      errors: [],
    });
  });

  it("rejects malformed grouped footer navigation drafts", () => {
    const draft = {
      id: "ready-malformed-footer-navigation",
      contentKey: "navigation.footer",
      ownerType: "cms",
      riskLevel: 3,
      status: "ready",
      updatedAt: "2026-07-09T00:00:00.000Z",
      fields: {
        title: "Footer navigation",
        statement: "Technology procurement clarified before anyone quotes.",
        groups: [{ title: "", links: [{ label: "", href: "" }] }],
        reviewNotes: "Route crawl before apply.",
      },
    };
    const plan = validateCmsDraftApplyPlan(draft as never);

    expect(plan.applySupported).toBe(false);
    expect(plan.errors).toEqual(
      expect.arrayContaining([
        "Draft group 1 title is required for navigation.footer.",
        "Draft group 1 link 1 label is required for navigation.footer.",
        "Draft group 1 link 1 href is required for navigation.footer.",
        "Footer navigation group 1 title is required.",
        "Footer navigation group 1: Navigation link 1 label is required.",
        "Footer navigation group 1: Navigation link 1 href is required.",
      ]),
    );
  });

  it("rejects non-ready footer navigation drafts before repo application", () => {
    const draft = createCmsDraft({
      id: "review-footer-navigation",
      contentKey: "navigation.footer",
      status: "needs-review",
      fields: {
        title: "Footer navigation",
        statement: "Technology procurement clarified before anyone quotes.",
        groups: [{ title: "Company", links: [{ label: "About", href: "/about" }] }],
        reviewNotes: "Route crawl before apply.",
      },
      updatedAt: "2026-07-09T00:00:00.000Z",
    });
    const plan = validateCmsDraftApplyPlan(draft);

    expect(plan.applySupported).toBe(false);
    expect(plan.errors).toContain("Only drafts marked ready can be applied to repo-backed CMS content.");
  });

  it("rejects header navigation drafts that point to blocked routes", () => {
    const draft = {
      id: "ready-blocked-header-navigation",
      contentKey: "navigation.header",
      ownerType: "cms",
      riskLevel: 3,
      status: "ready",
      updatedAt: "2026-07-09T00:00:00.000Z",
      fields: {
        title: "Header navigation",
        links: [
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "Technology", href: "/technology" },
          { label: "Platform", href: "/platform" },
          { label: "Insights", href: "/insights" },
          { label: "Company", href: "/about" },
          { label: "Government", href: "/government-procurement" },
          { label: "Request Quote", href: "/quote" },
        ],
        reviewNotes: "Route crawl before apply.",
      },
    };
    const plan = validateCmsDraftApplyPlan(draft as never);

    expect(plan.applySupported).toBe(false);
    expect(plan.errors).toEqual(expect.arrayContaining(["Draft contains blocked public claims.", "Navigation link 7 uses a blocked public route."]));
  });

  it("rejects footer navigation drafts that point to blocked routes", () => {
    const draft = {
      id: "ready-blocked-footer-navigation",
      contentKey: "navigation.footer",
      ownerType: "cms",
      riskLevel: 3,
      status: "ready",
      updatedAt: "2026-07-09T00:00:00.000Z",
      fields: {
        title: "Footer navigation",
        statement: "Technology procurement clarified before anyone quotes.",
        groups: [{ title: "Company", links: [{ label: "Government", href: "/government-procurement" }] }],
        reviewNotes: "Route crawl before apply.",
      },
    };
    const plan = validateCmsDraftApplyPlan(draft as never);

    expect(plan.applySupported).toBe(false);
    expect(plan.errors).toEqual(expect.arrayContaining(["Draft contains blocked public claims.", "Footer navigation group 1: Navigation link 1 uses a blocked public route."]));
  });

  it("rejects blocked claims before repo application", () => {
    const draft = {
      id: "ready-unsafe-seo",
      contentKey: "seo.metadata",
      ownerType: "cms",
      riskLevel: 3,
      status: "ready",
      updatedAt: "2026-07-09T00:00:00.000Z",
      fields: {
        route: "/",
        title: "In Stock at Manila Hub",
        description: "15-day price match guarantee.",
      },
    };
    const plan = validateCmsDraftApplyPlan(draft as never);

    expect(plan.applySupported).toBe(false);
    expect(plan.errors).toContain("Draft contains blocked public claims.");
  });

  it("updates supported source snippets without writing during dry-run", () => {
    const draft = createCmsDraft({
      id: "ready-seo-homepage-source",
      contentKey: "seo.metadata",
      status: "ready",
      fields: {
        route: "/",
        title: "New title",
        description: "New description.",
      },
      updatedAt: "2026-07-09T00:00:00.000Z",
    });
    const plan = validateCmsDraftApplyPlan(draft);
    const source = `const cmsSeoRecords = {\n  homepage: {\n    key: "homepage",\n    route: "/",\n    title: "Old title",\n    description: "Old description.",\n  },\n};\n`;
    const nextSource = applyCmsDraftToSource(source, plan);

    expect(nextSource).toContain('title: "New title",');
    expect(nextSource).toContain('description: "New description.",');
  });

  it("updates header navigation source snippets without writing during dry-run", () => {
    const draft = createCmsDraft({
      id: "ready-header-navigation-source",
      contentKey: "navigation.header",
      status: "ready",
      fields: {
        title: "Header navigation",
        links: [
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "Technology", href: "/technology" },
          { label: "Platform", href: "/platform" },
          { label: "Insights", href: "/insights" },
          { label: "Company", href: "/about" },
          { label: "Access HACIEN", href: "/access" },
          { label: "Request Quote", href: "/quote" },
        ],
        reviewNotes: "Route crawl before apply.",
      },
      updatedAt: "2026-07-09T00:00:00.000Z",
    });
    const plan = validateCmsDraftApplyPlan(draft);
    const source = `const navigationContent = {\n  header: {\n    primaryItems: [\n      { href: \"/old\", label: \"Old\" },\n    ],\n    accessAction: { href: \"/old-access\", label: \"Old Access\" },\n    quoteAction: { href: \"/old-quote\", label: \"Old Quote\" },\n  },\n};\n`;
    const nextSource = applyCmsDraftToSource(source, plan);

    expect(nextSource).toContain('{ href: "/solutions", label: "Solutions" },');
    expect(nextSource).toContain('accessAction: { href: "/access", label: "Access HACIEN" },');
    expect(nextSource).toContain('quoteAction: { href: "/quote", label: "Request Quote" },');
  });

  it("updates grouped footer navigation source snippets without writing during dry-run", () => {
    const draft = createCmsDraft({
      id: "ready-footer-navigation-source",
      contentKey: "navigation.footer",
      status: "ready",
      fields: {
        title: "Footer navigation",
        statement: "Updated footer statement.",
        groups: [
          { title: "Company", links: [{ label: "About", href: "/about" }] },
          { title: "Start", links: [{ label: "Request Quote", href: "/quote" }] },
        ],
        reviewNotes: "Route crawl before apply.",
      },
      updatedAt: "2026-07-09T00:00:00.000Z",
    });
    const plan = validateCmsDraftApplyPlan(draft);
    const source = `const navigationContent = {\n  footer: {\n    statement: \"Old footer statement.\",\n    groups: [\n      {\n        title: \"Old\",\n        links: [\n          { href: \"/old\", label: \"Old\" },\n        ],\n      },\n    ],\n  },\n};\n`;
    const nextSource = applyCmsDraftToSource(source, plan);

    expect(nextSource).toContain('statement: "Updated footer statement.",');
    expect(nextSource).toContain('title: "Company",');
    expect(nextSource).toContain('{ href: "/quote", label: "Request Quote" },');
  });
});
