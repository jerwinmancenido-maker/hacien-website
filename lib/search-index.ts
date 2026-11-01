import { categories, products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { insights } from "@/data/insights";

export type SearchIndexItem = {
  title: string;
  href: string;
  group: "Products" | "Categories" | "Solutions" | "Insights";
  summary: string;
  keywords: string[];
};

function tokensFromSlug(slug: string): string[] {
  return slug.split("-").filter(Boolean);
}

function uniqueKeywords(values: Array<string | undefined | null>): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    if (!value) continue;
    const trimmed = value.trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(trimmed);
  }
  return out;
}

export function buildSearchIndex(): SearchIndexItem[] {
  const productItems: SearchIndexItem[] = products.map((product) => ({
    title: product.name,
    href: `/products/${product.categorySlug}/${product.slug}`,
    group: "Products",
    summary: product.shortDescription,
    keywords: uniqueKeywords([
      product.slug,
      product.categorySlug,
      ...tokensFromSlug(product.slug),
      ...tokensFromSlug(product.categorySlug),
      ...product.specs.flatMap((spec) => spec.split(/[^a-zA-Z0-9+&]+/).filter((t) => t.length > 1)),
      product.sku,
    ]),
  }));

  const categoryItems: SearchIndexItem[] = categories.map((category) => ({
    title: category.name,
    href: `/products/${category.slug}`,
    group: "Categories",
    summary: category.summary,
    keywords: uniqueKeywords([
      category.slug,
      ...tokensFromSlug(category.slug),
    ]),
  }));

  const solutionItems: SearchIndexItem[] = solutions.map((solution) => ({
    title: solution.title,
    href: `/solutions/${solution.slug}`,
    group: "Solutions",
    summary: solution.summary,
    keywords: uniqueKeywords([
      solution.slug,
      solution.shortTitle,
      solution.category,
      ...tokensFromSlug(solution.slug),
      ...solution.outcomes.flatMap((outcome) =>
        outcome.split(/[^a-zA-Z0-9+&]+/).filter((t) => t.length > 1),
      ),
    ]),
  }));

  const insightItems: SearchIndexItem[] = insights.map((insight) => ({
    title: insight.title,
    href: `/insights/${insight.slug}`,
    group: "Insights",
    summary: insight.summary,
    keywords: uniqueKeywords([
      insight.slug,
      insight.category,
      ...tokensFromSlug(insight.slug),
    ]),
  }));

  return [...categoryItems, ...productItems, ...solutionItems, ...insightItems];
}

/** Case-insensitive match against title, summary, and keywords. */
export function searchCatalog(query: string, index: SearchIndexItem[] = buildSearchIndex()): SearchIndexItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return index.filter((item) => {
    const haystack = [item.title, item.summary, ...item.keywords].join(" ").toLowerCase();
    return haystack.includes(q);
  });
}
