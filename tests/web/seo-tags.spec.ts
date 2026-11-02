import { describe, expect, it, vi } from "vitest";
import type { Metadata } from "next";

vi.mock("server-only", () => ({}));

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { staticSitemapRoutes } from "@/lib/cms/inventory";
import { validateCmsContent } from "@/lib/cms/content";
import { solutions } from "@/data/solutions";
import { categories, products } from "@/data/products";
import { insights } from "@/data/insights";

// Static page metadata imports
import { metadata as homeMeta } from "@/app/page";
import { metadata as aboutMeta } from "@/app/about/page";
import { metadata as companyProfileMeta } from "@/app/about/company-profile/page";
import { metadata as solutionsMeta } from "@/app/solutions/page";
import { metadata as technologyMeta } from "@/app/technology/page";
import { metadata as platformMeta } from "@/app/platform/page";
import { metadata as productsMeta } from "@/app/products/page";
import { metadata as industriesMeta } from "@/app/industries/page";
import { metadata as quoteMeta } from "@/app/quote/page";
import { metadata as contactMeta } from "@/app/contact/page";
import { metadata as supportMeta } from "@/app/support/page";
import { metadata as trackMeta } from "@/app/track/page";
import { metadata as faqMeta } from "@/app/faq/page";
import { metadata as helpMeta } from "@/app/help/page";
import { metadata as searchMeta } from "@/app/search/page";
import { metadata as trustCenterMeta } from "@/app/trust-center/page";
import { metadata as insightsMeta } from "@/app/insights/page";
import { metadata as privacyMeta } from "@/app/privacy/page";
import { metadata as termsMeta } from "@/app/terms/page";
import { metadata as termsOfSaleMeta } from "@/app/terms-of-sale/page";
import { metadata as warrantyMeta } from "@/app/warranty/page";
import { metadata as legalMeta } from "@/app/legal/page";
import { metadata as complianceMeta } from "@/app/compliance/page";
import { metadata as policiesMeta } from "@/app/policies/page";
import { metadata as policiesHistoryMeta } from "@/app/policies/history/page";

// Dynamic page generators
import { generateMetadata as generateSolutionMeta } from "@/app/solutions/[slug]/page";
import { generateMetadata as generateCategoryMeta } from "@/app/products/[category]/page";
import { generateMetadata as generateProductMeta } from "@/app/products/[category]/[product]/page";
import { generateMetadata as generateInsightMeta } from "@/app/insights/[slug]/page";

// Noindex route metadata imports
import { metadata as accessMeta } from "@/app/access/page";
import { metadata as cmsPreviewMeta } from "@/app/cms-preview/page";
import { metadata as customerWorkspaceMeta } from "@/app/customer-workspace/page";
import { metadata as portalMeta } from "@/app/portal/page";
import { metadata as loginMeta } from "@/app/login/page";
import { metadata as signupMeta } from "@/app/signup/page";
import { metadata as commandCenterCmsMeta } from "@/app/command-center/cms/page";
import { metadata as trackReferenceMeta } from "@/app/track/[referenceNumber]/page";

type PageMetadataEntry = {
  route: string;
  metadata: Metadata;
};

async function collectAllPublicPageMetadata(): Promise<PageMetadataEntry[]> {
  const entries: PageMetadataEntry[] = [
    { route: "/", metadata: homeMeta },
    { route: "/about", metadata: aboutMeta },
    { route: "/about/company-profile", metadata: companyProfileMeta },
    { route: "/solutions", metadata: solutionsMeta },
    { route: "/technology", metadata: technologyMeta },
    { route: "/platform", metadata: platformMeta },
    { route: "/products", metadata: productsMeta },
    { route: "/industries", metadata: industriesMeta },
    { route: "/quote", metadata: quoteMeta },
    { route: "/contact", metadata: contactMeta },
    { route: "/support", metadata: supportMeta },
    { route: "/track", metadata: trackMeta },
    { route: "/faq", metadata: faqMeta },
    { route: "/help", metadata: helpMeta },
    { route: "/search", metadata: searchMeta },
    { route: "/trust-center", metadata: trustCenterMeta },
    { route: "/insights", metadata: insightsMeta },
    { route: "/privacy", metadata: privacyMeta },
    { route: "/terms", metadata: termsMeta },
    { route: "/terms-of-sale", metadata: termsOfSaleMeta },
    { route: "/warranty", metadata: warrantyMeta },
    { route: "/legal", metadata: legalMeta },
    { route: "/compliance", metadata: complianceMeta },
    { route: "/policies", metadata: policiesMeta },
    { route: "/policies/history", metadata: policiesHistoryMeta },
  ];

  for (const solution of solutions) {
    const meta = await generateSolutionMeta({ params: Promise.resolve({ slug: solution.slug }) });
    entries.push({ route: `/solutions/${solution.slug}`, metadata: meta });
  }

  for (const category of categories) {
    const meta = await generateCategoryMeta({ params: Promise.resolve({ category: category.slug }) });
    entries.push({ route: `/products/${category.slug}`, metadata: meta });
  }

  for (const product of products) {
    const meta = await generateProductMeta({
      params: Promise.resolve({ category: product.categorySlug, product: product.slug }),
    });
    entries.push({ route: `/products/${product.categorySlug}/${product.slug}`, metadata: meta });
  }

  for (const insight of insights) {
    const meta = await generateInsightMeta({ params: Promise.resolve({ slug: insight.slug }) });
    entries.push({ route: `/insights/${insight.slug}`, metadata: meta });
  }

  return entries;
}

function resolveTitle(title: Metadata["title"]): string {
  if (typeof title === "string") return title;
  if (title && typeof title === "object" && "absolute" in title && typeof title.absolute === "string") {
    return title.absolute;
  }
  if (title && typeof title === "object" && "default" in title && typeof title.default === "string") {
    return title.default;
  }
  return "";
}

function resolveCanonical(metadata: Metadata): string | null {
  const canonical = metadata.alternates?.canonical;
  if (typeof canonical === "string") return canonical;
  if (canonical instanceof URL) return canonical.toString();
  return null;
}

describe("SEO: Search engine tags (PR 6)", () => {
  it("provides every public page with a unique title and unique description", async () => {
    const entries = await collectAllPublicPageMetadata();
    expect(entries.length).toBeGreaterThanOrEqual(69);

    const titleMap = new Map<string, string>();
    const descMap = new Map<string, string>();

    for (const { route, metadata } of entries) {
      const title = resolveTitle(metadata.title);
      const desc = metadata.description?.trim() ?? "";

      expect(title, `Route ${route} must have a non-empty title`).toBeTruthy();
      expect(desc, `Route ${route} must have a non-empty description`).toBeTruthy();

      expect(
        titleMap.has(title),
        `Duplicate title "${title}" found on ${route} and ${titleMap.get(title)}`,
      ).toBe(false);
      titleMap.set(title, route);

      expect(
        descMap.has(desc),
        `Duplicate description "${desc}" found on ${route} and ${descMap.get(desc)}`,
      ).toBe(false);
      descMap.set(desc, route);

      const claimCheck = validateCmsContent({ text: `${title} ${desc}` });
      expect(
        claimCheck.ok,
        `Route ${route} triggered blocked claims: ${claimCheck.blockedClaims.join(", ")}`,
      ).toBe(true);
    }
  });

  it("gives every public page a canonical starting with https://haciensolutions.com", async () => {
    const entries = await collectAllPublicPageMetadata();

    for (const { route, metadata } of entries) {
      const canonical = resolveCanonical(metadata);
      expect(canonical, `Route ${route} must have a canonical URL`).toBeTruthy();
      expect(
        canonical?.startsWith("https://haciensolutions.com"),
        `Route ${route} canonical "${canonical}" must start with https://haciensolutions.com`,
      ).toBe(true);
      expect(
        canonical?.includes("www."),
        `Route ${route} canonical "${canonical}" must be non-www`,
      ).toBe(false);

      // Open Graph URL matches canonical
      const ogUrl = metadata.openGraph?.url?.toString();
      expect(ogUrl, `Route ${route} openGraph.url must match canonical`).toBe(canonical);

      // Open Graph image is present
      const images = metadata.openGraph?.images;
      expect(images, `Route ${route} openGraph.images must be defined`).toBeTruthy();
    }
  });

  it("excludes all noindex and login-gated routes from sitemap", () => {
    const sitemapEntries = sitemap();
    const urls = sitemapEntries.map((e) => e.url);

    const forbiddenRoutes = [
      "/access",
      "/cms-preview",
      "/customer-workspace",
      "/portal",
      "/login",
      "/signup",
      "/command-center",
      "/api",
    ];

    for (const forbidden of forbiddenRoutes) {
      const match = urls.find((u) => u.endsWith(forbidden) || u.includes(`${forbidden}/`));
      expect(match, `Sitemap must not contain forbidden route ${forbidden}`).toBeUndefined();
    }

    // Static sitemap routes also exclude customer-workspace
    expect(staticSitemapRoutes.includes("/customer-workspace" as never)).toBe(false);
  });

  it("disallows all noindex and login-gated routes in robots.txt", () => {
    const robotsData = robots();
    const rules = Array.isArray(robotsData.rules) ? robotsData.rules[0] : robotsData.rules;
    const disallow = Array.isArray(rules?.disallow)
      ? rules.disallow
      : rules?.disallow
        ? [rules.disallow]
        : [];

    const expectedDisallows = [
      "/access",
      "/cms-preview",
      "/customer-workspace",
      "/portal",
      "/login",
      "/signup",
      "/command-center",
      "/api/",
    ];

    for (const expected of expectedDisallows) {
      expect(
        disallow,
        `robots.txt must disallow ${expected}`,
      ).toContain(expected);
    }
  });

  it("keeps noindex on internal, gated, and private access routes in code", () => {
    const noindexPages = [
      { name: "/access", meta: accessMeta },
      { name: "/cms-preview", meta: cmsPreviewMeta },
      { name: "/customer-workspace", meta: customerWorkspaceMeta },
      { name: "/portal", meta: portalMeta },
      { name: "/login", meta: loginMeta },
      { name: "/signup", meta: signupMeta },
      { name: "/command-center/cms", meta: commandCenterCmsMeta },
      { name: "/track/[referenceNumber]", meta: trackReferenceMeta },
    ];

    for (const { name, meta } of noindexPages) {
      const robotsField = meta.robots;
      const isNoIndex =
        typeof robotsField === "object" && robotsField !== null && robotsField.index === false;
      expect(isNoIndex, `Route ${name} must have robots: index: false`).toBe(true);
    }
  });
});
