import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import sitemap from "@/app/sitemap";
import { categories, products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { insights } from "@/data/insights";
import { staticSitemapRoutes } from "@/lib/cms/inventory";

// Draft prepared 2026-11-04 for jerwinmancenido-maker/hacien-website.
// Extends the existing sitemap coverage in tests/web/seo-tags.spec.ts with
// link hygiene: every sitemap URL must be a unique, same-origin, public URL.
// All tests in this file should pass on main at 2fbfa0a. This is a static
// check, not a live crawl — the live crawl is covered by the live full test
// and by scripts/crawl-routes.mjs.

const DISALLOWED = [
  "/access",
  "/cms-preview",
  "/customer-workspace",
  "/portal",
  "/login",
  "/signup",
  "/command-center",
];

describe("Sitemap link hygiene", () => {
  it("every sitemap URL is on haciensolutions.com, unique, and has no query or hash", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.length).toBeGreaterThan(50);
    expect(new Set(urls).size).toBe(urls.length);
    for (const url of urls) {
      expect(url.startsWith("https://haciensolutions.com/") || url === "https://haciensolutions.com").toBe(true);
      expect(url).not.toMatch(/[?#]/);
    }
  });

  it("every static route, solution, category, product and insight appears exactly once", () => {
    const urls = new Set(sitemap().map((entry) => entry.url));
    for (const route of staticSitemapRoutes) {
      expect(urls.has(`https://haciensolutions.com${route}`)).toBe(true);
    }
    for (const solution of solutions) {
      expect(urls.has(`https://haciensolutions.com/solutions/${solution.slug}`)).toBe(true);
    }
    for (const category of categories) {
      expect(urls.has(`https://haciensolutions.com/products/${category.slug}`)).toBe(true);
    }
    for (const product of products) {
      expect(urls.has(`https://haciensolutions.com/products/${product.categorySlug}/${product.slug}`)).toBe(true);
    }
    for (const insight of insights) {
      expect(urls.has(`https://haciensolutions.com/insights/${insight.slug}`)).toBe(true);
    }
  });

  it("no private / auth / preview route leaks into the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const blocked of DISALLOWED) {
      expect(urls.some((url) => url.includes(blocked))).toBe(false);
    }
  });
});
