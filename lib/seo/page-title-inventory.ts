import { getCmsDocumentRecord } from "@/lib/cms/documents";
import { getCmsSeoRecords } from "@/lib/cms/seo";
import { insights } from "@/data/insights";
import { categories, products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { DOCUMENT_TITLE_DEFAULT, renderDocumentTitle } from "@/lib/seo/document-title";

export type PageTitleEntry = {
  route: string;
  segment: string;
  rendered: string;
  usesTemplate: boolean;
};

/**
 * Static page title segments (the `%s` before `| HACIEN`).
 * Keep in sync with each route's `metadata.title` / `generateMetadata` fallbacks.
 */
export const staticPageTitleSegments: Record<string, string> = {
  "/products": "Products",
  "/technology": "Enterprise Technology",
  "/quote": "Universal RFQ Gateway",
  "/support": "Support",
  "/search": "Search",
  "/contact": "Contact",
  "/access": "Access",
  "/platform": "Platform | Operating Model",
  "/login": "Customer Login",
  "/signup": "Customer Signup",
  "/portal": "Customer Workspace",
  "/customer-workspace": "Customer Workspace",
  "/about/company-profile": "Company Profile",
  "/insights": "Enterprise Technology Knowledge Center | Insights",
  "/cms-preview": "CMS Preview",
  "/command-center/cms": "Command Center CMS Drafts",
  "/product/[slug]": "Product Detail",
  "/products/[category]": "Technology Category",
  "/products/[category]/[product]": "Product Detail",
  "/solutions/[slug]": "Solution",
  "/insights/[slug]": "Insights",
};

export function buildPageTitleInventory(): PageTitleEntry[] {
  const entries: PageTitleEntry[] = [
    {
      route: "/ (default)",
      segment: DOCUMENT_TITLE_DEFAULT,
      rendered: DOCUMENT_TITLE_DEFAULT,
      usesTemplate: false,
    },
  ];

  for (const record of getCmsSeoRecords()) {
    entries.push({
      route: record.route,
      segment: record.title,
      rendered: renderDocumentTitle(record.title),
      usesTemplate: true,
    });
  }

  for (const [route, segment] of Object.entries(staticPageTitleSegments)) {
    entries.push({
      route,
      segment,
      rendered: renderDocumentTitle(segment),
      usesTemplate: true,
    });
  }

  for (const key of ["legal", "privacy", "terms", "trust-center"] as const) {
    const document = getCmsDocumentRecord(key);
    entries.push({
      route: `/${key === "trust-center" ? "trust-center" : key}`,
      segment: document.title,
      rendered: renderDocumentTitle(document.title),
      usesTemplate: true,
    });
  }

  for (const category of categories) {
    const segment = category.seoTitle.replace("Products", "Technology");
    entries.push({
      route: `/products/${category.slug}`,
      segment,
      rendered: renderDocumentTitle(segment),
      usesTemplate: true,
    });
  }

  for (const product of products) {
    entries.push({
      route: `/products/${product.categorySlug}/${product.slug}`,
      segment: product.name,
      rendered: renderDocumentTitle(product.name),
      usesTemplate: true,
    });
    entries.push({
      route: `/product/${product.slug}`,
      segment: product.name,
      rendered: renderDocumentTitle(product.name),
      usesTemplate: true,
    });
  }

  for (const solution of solutions) {
    entries.push({
      route: `/solutions/${solution.slug}`,
      segment: solution.seoTitle,
      rendered: renderDocumentTitle(solution.seoTitle),
      usesTemplate: true,
    });
  }

  for (const insight of insights) {
    entries.push({
      route: `/insights/${insight.slug}`,
      segment: insight.seoTitle,
      rendered: renderDocumentTitle(insight.seoTitle),
      usesTemplate: true,
    });
  }

  return entries;
}
