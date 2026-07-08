export type CmsOwnerType = "cms" | "erp" | "config" | "code" | "blocked";

export type CmsPublishRisk = "low" | "medium" | "high" | "blocked";

export type CmsRiskLevel = 1 | 2 | 3 | 4 | 5;

export type CmsReadiness = "ready" | "needs-model" | "blocked" | "future-db";

export type CmsValidationSchema = {
  requiredFields: Array<keyof CmsInventoryItem>;
  rules: string[];
};

export type CmsInventoryItem = {
  key: string;
  label: string;
  route?: string;
  ownerType: CmsOwnerType;
  currentSource: string;
  sourceFile: string;
  editableNow: boolean;
  publishRisk: CmsPublishRisk;
  riskLevel: CmsRiskLevel;
  validationRequirements: string[];
  validationSchema: CmsValidationSchema;
  dependencies: string[];
  seoSource: string;
  cmsReadiness: CmsReadiness;
  notes?: string;
};

type CmsInventorySeed = Omit<
  CmsInventoryItem,
  "sourceFile" | "riskLevel" | "validationSchema" | "dependencies" | "seoSource" | "cmsReadiness"
> &
  Partial<
    Pick<CmsInventoryItem, "sourceFile" | "riskLevel" | "validationSchema" | "dependencies" | "seoSource" | "cmsReadiness">
  >;

export const expectedCmsInventoryKeys = [
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
  "products.display-metadata",
  "industries",
  "insights.index",
  "insights.article",
  "faq",
  "help",
  "quote.support-copy",
  "search",
  "support",
  "tracking.lookup",
  "tracking.reference",
  "legal",
  "privacy",
  "terms",
  "trust-center",
  "navigation.header",
  "navigation.footer",
  "media.photos",
  "seo.metadata",
  "sitemap.discovery",
  "erp.product-publication-truth",
  "erp.official-order-records",
  "blocked.payment-tax-documents",
  "blocked.supplier-stock-sla-guarantees",
  "blocked.government-credential-claims",
] as const;

export type ExpectedCmsInventoryKey = (typeof expectedCmsInventoryKeys)[number];

export type CmsRouteOwnershipRule = {
  route: string;
  inventoryKey: ExpectedCmsInventoryKey;
  discoverableInSitemap: boolean;
};

export const staticSitemapRoutes = [
  "",
  "/about",
  "/about/company-profile",
  "/solutions",
  "/technology",
  "/platform",
  "/products",
  "/industries",
  "/quote",
  "/access",
  "/customer-workspace",
  "/contact",
  "/support",
  "/track",
  "/faq",
  "/help",
  "/search",
  "/trust-center",
  "/insights",
  "/privacy",
  "/terms",
  "/legal",
] as const;

export const dynamicSitemapRoutePatterns = [
  "/solutions/[slug]",
  "/products/[category]",
  "/products/[category]/[product]",
  "/insights/[slug]",
] as const;

export const publicRouteOwnershipRules: CmsRouteOwnershipRule[] = [
  { route: "/", inventoryKey: "homepage", discoverableInSitemap: true },
  { route: "/about", inventoryKey: "about", discoverableInSitemap: true },
  { route: "/about/company-profile", inventoryKey: "about.company-profile", discoverableInSitemap: true },
  { route: "/access", inventoryKey: "access", discoverableInSitemap: true },
  { route: "/contact", inventoryKey: "contact", discoverableInSitemap: true },
  { route: "/customer-workspace", inventoryKey: "customer-workspace", discoverableInSitemap: true },
  { route: "/faq", inventoryKey: "faq", discoverableInSitemap: true },
  { route: "/help", inventoryKey: "help", discoverableInSitemap: true },
  { route: "/industries", inventoryKey: "industries", discoverableInSitemap: true },
  { route: "/insights", inventoryKey: "insights.index", discoverableInSitemap: true },
  { route: "/insights/[slug]", inventoryKey: "insights.article", discoverableInSitemap: true },
  { route: "/legal", inventoryKey: "legal", discoverableInSitemap: true },
  { route: "/platform", inventoryKey: "platform", discoverableInSitemap: true },
  { route: "/privacy", inventoryKey: "privacy", discoverableInSitemap: true },
  { route: "/products", inventoryKey: "products.display-metadata", discoverableInSitemap: true },
  { route: "/products/[category]", inventoryKey: "products.display-metadata", discoverableInSitemap: true },
  { route: "/products/[category]/[product]", inventoryKey: "products.display-metadata", discoverableInSitemap: true },
  { route: "/quote", inventoryKey: "quote.support-copy", discoverableInSitemap: true },
  { route: "/search", inventoryKey: "search", discoverableInSitemap: true },
  { route: "/solutions", inventoryKey: "solutions.index", discoverableInSitemap: true },
  { route: "/solutions/[slug]", inventoryKey: "solutions.detail", discoverableInSitemap: true },
  { route: "/support", inventoryKey: "support", discoverableInSitemap: true },
  { route: "/technology", inventoryKey: "technology", discoverableInSitemap: true },
  { route: "/terms", inventoryKey: "terms", discoverableInSitemap: true },
  { route: "/track", inventoryKey: "tracking.lookup", discoverableInSitemap: true },
  { route: "/track/[referenceNumber]", inventoryKey: "tracking.reference", discoverableInSitemap: false },
  { route: "/trust-center", inventoryKey: "trust-center", discoverableInSitemap: true },
];

export const blockedPublicRoutePatterns = [
  "/government-procurement",
  "/government-procurement/[topic]",
  "/product/[slug]",
] as const;

function normalizeRoute(route: string) {
  if (route === "") {
    return "/";
  }

  return route;
}

function routeMatchesPattern(route: string, pattern: string) {
  const routeParts = normalizeRoute(route).split("/").filter(Boolean);
  const patternParts = normalizeRoute(pattern).split("/").filter(Boolean);

  if (routeParts.length !== patternParts.length) {
    return false;
  }

  return patternParts.every((part, index) => part.startsWith("[") || part === routeParts[index]);
}

function findRouteOwnershipRule(route: string) {
  return publicRouteOwnershipRules.find((rule) => routeMatchesPattern(route, rule.route));
}

function riskLevelFromPublishRisk(publishRisk: CmsPublishRisk): CmsRiskLevel {
  if (publishRisk === "blocked") {
    return 5;
  }
  if (publishRisk === "high") {
    return 4;
  }
  if (publishRisk === "medium") {
    return 3;
  }

  return 1;
}

function readinessForItem(item: CmsInventorySeed): CmsReadiness {
  if (item.ownerType === "blocked" || item.publishRisk === "blocked") {
    return "blocked";
  }
  if (item.ownerType === "erp") {
    return "blocked";
  }
  if (item.editableNow) {
    return "ready";
  }

  return "needs-model";
}

function dependenciesForItem(item: CmsInventorySeed) {
  const dependencies = new Set<string>();

  if (item.route) {
    dependencies.add(`route:${item.route}`);
  }
  if (item.key.startsWith("navigation.") || item.key === "sitemap.discovery") {
    dependencies.add("sitemap");
    dependencies.add("route-crawl");
  }
  if (item.key.includes("seo") || item.validationRequirements.some((rule) => rule.toLowerCase().includes("metadata"))) {
    dependencies.add("seo");
  }
  if (item.key.includes("quote") || item.validationRequirements.some((rule) => rule.toLowerCase().includes("gateway"))) {
    dependencies.add("gateway-rfq");
  }
  if (item.ownerType === "erp") {
    dependencies.add("erp-boundary");
  }
  if (item.ownerType === "blocked" || item.publishRisk === "blocked") {
    dependencies.add("founder-evidence-gate");
  }
  if (item.publishRisk === "high" || item.publishRisk === "blocked") {
    dependencies.add("founder-review");
  }
  if (item.key === "media.photos") {
    dependencies.add("media-source-review");
  }

  return [...dependencies];
}

function seoSourceForItem(item: CmsInventorySeed) {
  if (item.key === "seo.metadata") {
    return "metadata exports and data records listed in currentSource";
  }
  if (item.route) {
    return `${item.currentSource} metadata or route metadata export`;
  }

  return "not public-route SEO controlled";
}

function validationSchemaForItem(item: CmsInventorySeed): CmsValidationSchema {
  return {
    requiredFields: ["key", "label", "ownerType", "currentSource", "sourceFile", "editableNow", "riskLevel"],
    rules: item.validationRequirements,
  };
}

function expandCmsInventoryItem(item: CmsInventorySeed): CmsInventoryItem {
  return {
    ...item,
    sourceFile: item.sourceFile ?? item.currentSource,
    riskLevel: item.riskLevel ?? riskLevelFromPublishRisk(item.publishRisk),
    validationSchema: item.validationSchema ?? validationSchemaForItem(item),
    dependencies: item.dependencies ?? dependenciesForItem(item),
    seoSource: item.seoSource ?? seoSourceForItem(item),
    cmsReadiness: item.cmsReadiness ?? readinessForItem(item),
  };
}

const cmsInventorySeeds: CmsInventorySeed[] = [
  {
    key: "homepage",
    label: "Homepage sections",
    route: "/",
    ownerType: "cms",
    currentSource: "app/page.tsx, components/HomeV3Sections.tsx, components/RequirementBuilder.tsx",
    editableNow: false,
    publishRisk: "medium",
    validationRequirements: ["claim-safety scan", "mobile density review", "route screenshot QA"],
    notes: "Move hero, service blocks, CTAs, and cinematic copy into repo-backed CMS content before MySQL.",
  },
  {
    key: "about",
    label: "About page",
    route: "/about",
    ownerType: "cms",
    currentSource: "app/about/page.tsx",
    editableNow: false,
    publishRisk: "medium",
    validationRequirements: ["claim-safety scan", "single H1 check", "mobile density review"],
  },
  {
    key: "about.company-profile",
    label: "Company profile",
    route: "/about/company-profile",
    ownerType: "cms",
    currentSource: "app/about/company-profile/page.tsx, data/companyContact.ts",
    editableNow: false,
    publishRisk: "high",
    validationRequirements: ["claim-safety scan", "contact data review", "public credential wording scan"],
  },
  {
    key: "access",
    label: "Access page",
    route: "/access",
    ownerType: "cms",
    currentSource: "app/access/page.tsx",
    editableNow: false,
    publishRisk: "medium",
    validationRequirements: ["claim-safety scan", "route screenshot QA", "auth-boundary wording scan"],
  },
  {
    key: "contact",
    label: "Contact page",
    route: "/contact",
    ownerType: "cms",
    currentSource: "app/contact/page.tsx, components/ContactForm.tsx, data/companyContact.ts",
    editableNow: false,
    publishRisk: "medium",
    validationRequirements: ["claim-safety scan", "contact data review", "route screenshot QA"],
  },
  {
    key: "customer-workspace",
    label: "Customer workspace preview",
    route: "/customer-workspace",
    ownerType: "cms",
    currentSource: "app/customer-workspace/page.tsx",
    editableNow: false,
    publishRisk: "high",
    validationRequirements: ["claim-safety scan", "prototype wording scan", "auth-boundary wording scan"],
  },
  {
    key: "solutions.index",
    label: "Solutions index",
    route: "/solutions",
    ownerType: "cms",
    currentSource: "app/solutions/page.tsx, data/solutions.ts",
    editableNow: false,
    publishRisk: "medium",
    validationRequirements: ["claim-safety scan", "solution slug validation", "route screenshot QA"],
  },
  {
    key: "solutions.detail",
    label: "Solution detail pages",
    route: "/solutions/[slug]",
    ownerType: "cms",
    currentSource: "app/solutions/[slug]/page.tsx, data/solutions.ts",
    editableNow: false,
    publishRisk: "medium",
    validationRequirements: ["claim-safety scan", "slug validation", "metadata validation"],
  },
  {
    key: "technology",
    label: "Technology page",
    route: "/technology",
    ownerType: "cms",
    currentSource: "app/technology/page.tsx",
    editableNow: false,
    publishRisk: "medium",
    validationRequirements: ["claim-safety scan", "route screenshot QA", "technology capability wording scan"],
  },
  {
    key: "platform",
    label: "Platform page",
    route: "/platform",
    ownerType: "cms",
    currentSource: "app/platform/page.tsx",
    editableNow: false,
    publishRisk: "medium",
    validationRequirements: ["claim-safety scan", "route screenshot QA", "platform readiness wording scan"],
  },
  {
    key: "products.display-metadata",
    label: "Public product display metadata",
    route: "/products",
    ownerType: "config",
    currentSource: "data/products.ts, lib/erp/catalog-products.ts",
    editableNow: false,
    publishRisk: "high",
    validationRequirements: ["ERP truth boundary check", "unsafe product claim scan", "category/slug validation"],
    notes: "CMS may own display guidance later, but ERP ProductPublication remains the source of truth.",
  },
  {
    key: "industries",
    label: "Industries page",
    route: "/industries",
    ownerType: "cms",
    currentSource: "app/industries/page.tsx",
    editableNow: false,
    publishRisk: "medium",
    validationRequirements: ["claim-safety scan", "route screenshot QA"],
  },
  {
    key: "insights.index",
    label: "Insights index",
    route: "/insights",
    ownerType: "cms",
    currentSource: "app/insights/page.tsx, data/insights.ts",
    editableNow: false,
    publishRisk: "medium",
    validationRequirements: ["claim-safety scan", "article count validation", "metadata validation"],
  },
  {
    key: "insights.article",
    label: "Insight articles",
    route: "/insights/[slug]",
    ownerType: "cms",
    currentSource: "app/insights/[slug]/page.tsx, data/insights.ts",
    editableNow: false,
    publishRisk: "medium",
    validationRequirements: ["claim-safety scan", "slug validation", "SEO metadata validation"],
  },
  {
    key: "faq",
    label: "B2B FAQ",
    route: "/faq",
    ownerType: "cms",
    currentSource: "lib/cms/content.ts, config/faq-data.json",
    editableNow: true,
    publishRisk: "medium",
    validationRequirements: ["CMS published status", "claim-safety scan", "FAQ section validation"],
  },
  {
    key: "help",
    label: "Help Center",
    route: "/help",
    ownerType: "cms",
    currentSource: "lib/cms/content.ts, components/AiDocumentParser.tsx",
    editableNow: true,
    publishRisk: "medium",
    validationRequirements: ["CMS published status", "claim-safety scan", "prototype-tool wording scan"],
  },
  {
    key: "quote.support-copy",
    label: "Quote/RFQ support copy",
    route: "/quote",
    ownerType: "config",
    currentSource: "app/quote/page.tsx, components/QuoteRequestForm.tsx, config/billing-compliance-settings.json",
    editableNow: false,
    publishRisk: "high",
    validationRequirements: ["claim-safety scan", "payment/tax wording scan", "Gateway route smoke"],
  },
  {
    key: "search",
    label: "Search page",
    route: "/search",
    ownerType: "cms",
    currentSource: "app/search/page.tsx",
    editableNow: false,
    publishRisk: "low",
    validationRequirements: ["route crawl", "empty-state copy scan", "claim-safety scan"],
  },
  {
    key: "support",
    label: "Support page",
    route: "/support",
    ownerType: "cms",
    currentSource: "app/support/page.tsx",
    editableNow: false,
    publishRisk: "medium",
    validationRequirements: ["claim-safety scan", "support path review", "route screenshot QA"],
  },
  {
    key: "tracking.lookup",
    label: "Track request lookup",
    route: "/track",
    ownerType: "cms",
    currentSource: "app/track/page.tsx, components/TrackReferenceLookup.tsx",
    editableNow: false,
    publishRisk: "medium",
    validationRequirements: ["route crawl", "reference input UX check", "customer-safe copy scan"],
  },
  {
    key: "tracking.reference",
    label: "Track request reference result",
    route: "/track/[referenceNumber]",
    ownerType: "config",
    currentSource: "app/track/[referenceNumber]/page.tsx, components/TrackReferenceLookup.tsx",
    editableNow: false,
    publishRisk: "high",
    validationRequirements: ["Gateway route smoke", "customer-safe response check", "graceful failure check"],
  },
  {
    key: "legal",
    label: "Legal notice",
    route: "/legal",
    ownerType: "code",
    currentSource: "app/legal/page.tsx",
    editableNow: false,
    publishRisk: "high",
    validationRequirements: ["founder/legal review", "claim-safety scan", "document layout QA"],
  },
  {
    key: "privacy",
    label: "Privacy policy",
    route: "/privacy",
    ownerType: "code",
    currentSource: "app/privacy/page.tsx",
    editableNow: false,
    publishRisk: "high",
    validationRequirements: ["founder/legal review", "claim-safety scan", "document layout QA"],
  },
  {
    key: "terms",
    label: "Terms",
    route: "/terms",
    ownerType: "code",
    currentSource: "app/terms/page.tsx",
    editableNow: false,
    publishRisk: "high",
    validationRequirements: ["founder/legal review", "claim-safety scan", "document layout QA"],
  },
  {
    key: "trust-center",
    label: "Trust Center",
    route: "/trust-center",
    ownerType: "code",
    currentSource: "app/trust-center/page.tsx",
    editableNow: false,
    publishRisk: "high",
    validationRequirements: ["claim-safety scan", "public credential wording scan", "document layout QA"],
  },
  {
    key: "navigation.header",
    label: "Header navigation",
    ownerType: "cms",
    currentSource: "components/Header.tsx",
    editableNow: false,
    publishRisk: "medium",
    validationRequirements: ["internal route crawl", "sitemap consistency", "public route policy check"],
  },
  {
    key: "navigation.footer",
    label: "Footer navigation",
    ownerType: "cms",
    currentSource: "components/Footer.tsx",
    editableNow: false,
    publishRisk: "medium",
    validationRequirements: ["internal route crawl", "sitemap consistency", "public route policy check"],
  },
  {
    key: "media.photos",
    label: "Media and photography references",
    ownerType: "cms",
    currentSource: "components/EnterpriseImagery.tsx, components/PremiumPageHero.tsx, public/brand/",
    editableNow: false,
    publishRisk: "medium",
    validationRequirements: ["alt text check", "source/license note check", "image render QA"],
  },
  {
    key: "seo.metadata",
    label: "SEO metadata",
    ownerType: "cms",
    currentSource: "app/**/page.tsx metadata exports, data/products.ts, data/solutions.ts, data/insights.ts",
    editableNow: false,
    publishRisk: "medium",
    validationRequirements: ["title/description presence", "canonical policy check", "blocked claim scan"],
  },
  {
    key: "sitemap.discovery",
    label: "Sitemap and route discovery",
    ownerType: "config",
    currentSource: "app/sitemap.ts, app/robots.ts",
    editableNow: false,
    publishRisk: "medium",
    validationRequirements: ["route crawl", "canonical product URL check", "blocked route exclusion"],
  },
  {
    key: "erp.product-publication-truth",
    label: "ERP ProductPublication truth",
    ownerType: "erp",
    currentSource: "ERP ProductPublication API boundary",
    editableNow: false,
    publishRisk: "blocked",
    validationRequirements: ["ERP API contract check", "CMS cannot override ERP product truth"],
    notes: "Website CMS must not directly write ERP ProductPublication truth.",
  },
  {
    key: "erp.official-order-records",
    label: "Official order records",
    ownerType: "erp",
    currentSource: "ERP order intent validation and official record workflow",
    editableNow: false,
    publishRisk: "blocked",
    validationRequirements: ["ERP API boundary check", "CMS cannot create official order records"],
  },
  {
    key: "blocked.payment-tax-documents",
    label: "Payment, tax, invoice, and receipt claims",
    ownerType: "blocked",
    currentSource: "Founder evidence gate",
    editableNow: false,
    publishRisk: "blocked",
    validationRequirements: ["blocked claim scan", "founder approval required before public use"],
  },
  {
    key: "blocked.supplier-stock-sla-guarantees",
    label: "Supplier stock, SLA, 15-day, and price-match guarantees",
    ownerType: "blocked",
    currentSource: "Founder evidence gate",
    editableNow: false,
    publishRisk: "blocked",
    validationRequirements: ["blocked claim scan", "supplier evidence required before public use"],
  },
  {
    key: "blocked.government-credential-claims",
    label: "Government credential and procurement claims",
    ownerType: "blocked",
    currentSource: "Founder public-positioning gate",
    editableNow: false,
    publishRisk: "blocked",
    validationRequirements: ["public government-claim scan", "keep out of public CMS"],
  },
];

export const cmsInventory: CmsInventoryItem[] = cmsInventorySeeds.map(expandCmsInventoryItem);

export function getCmsInventory() {
  return cmsInventory;
}

export function validateCmsInventory(items: CmsInventoryItem[] = cmsInventory) {
  const keys = new Set(items.map((item) => item.key));
  const staticSitemapRouteSet = new Set(staticSitemapRoutes.map(normalizeRoute));
  const missingExpectedKeys = expectedCmsInventoryKeys.filter((key) => !keys.has(key));
  const missingPublicRouteOwnership = publicRouteOwnershipRules.filter((rule) => !keys.has(rule.inventoryKey));
  const missingStaticSitemapOwnership = staticSitemapRoutes
    .map(normalizeRoute)
    .filter((route) => {
      const rule = findRouteOwnershipRule(route);
      return !rule || !rule.discoverableInSitemap || !keys.has(rule.inventoryKey);
    });
  const missingDynamicSitemapOwnership = dynamicSitemapRoutePatterns.filter((route) => {
    const rule = findRouteOwnershipRule(route);
    return !rule || !rule.discoverableInSitemap || !keys.has(rule.inventoryKey);
  });
  const sitemapRuleDrift = publicRouteOwnershipRules
    .filter((rule) => rule.discoverableInSitemap && !rule.route.includes("["))
    .map((rule) => normalizeRoute(rule.route))
    .filter((route) => !staticSitemapRouteSet.has(route));
  const blockedRoutesInSitemap = [...staticSitemapRoutes, ...dynamicSitemapRoutePatterns]
    .map(normalizeRoute)
    .filter((route) => blockedPublicRoutePatterns.some((pattern) => routeMatchesPattern(route, pattern)));
  const duplicateKeys = items
    .map((item) => item.key)
    .filter((key, index, allKeys) => allKeys.indexOf(key) !== index);
  const invalidItems = items.filter(
    (item) =>
      !item.key ||
      !item.label ||
      !item.ownerType ||
      !item.currentSource ||
      !item.sourceFile ||
      typeof item.editableNow !== "boolean" ||
      !item.publishRisk ||
      !item.riskLevel ||
      item.validationRequirements.length === 0,
  );
  const incompleteMetadataItems = items.filter(
    (item) =>
      item.validationSchema.requiredFields.length === 0 ||
      item.validationSchema.rules.length === 0 ||
      item.dependencies.length === 0 ||
      !item.seoSource ||
      !item.cmsReadiness,
  );
  const blockedOwnershipErrors = items.filter(
    (item) =>
      item.publishRisk === "blocked" &&
      item.ownerType !== "blocked" &&
      item.ownerType !== "erp",
  );

  return {
    ok:
      missingExpectedKeys.length === 0 &&
      missingPublicRouteOwnership.length === 0 &&
      missingStaticSitemapOwnership.length === 0 &&
      missingDynamicSitemapOwnership.length === 0 &&
      sitemapRuleDrift.length === 0 &&
      blockedRoutesInSitemap.length === 0 &&
      duplicateKeys.length === 0 &&
      invalidItems.length === 0 &&
      incompleteMetadataItems.length === 0 &&
      blockedOwnershipErrors.length === 0,
    missingExpectedKeys,
    missingPublicRouteOwnership,
    missingStaticSitemapOwnership,
    missingDynamicSitemapOwnership,
    sitemapRuleDrift,
    blockedRoutesInSitemap,
    duplicateKeys,
    invalidItems,
    incompleteMetadataItems,
    blockedOwnershipErrors,
  };
}
