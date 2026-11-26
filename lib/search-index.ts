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

  const exact = index.filter((item) => {
    const haystack = [item.title, item.summary, ...item.keywords].join(" ").toLowerCase();
    return haystack.includes(q);
  });
  if (exact.length > 0) return exact;

  return fuzzySearchCatalog(q, index);
}

/** Levenshtein edit distance, for the typo-tolerant fallback below. */
function editDistance(a: string, b: string): number {
  let previous = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) {
      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    previous = current;
  }
  return previous[b.length];
}

function fuzzyThreshold(length: number): number {
  return length <= 4 ? 1 : 2;
}

/**
 * Typo tolerance (R5-FIX-9, n-14): only when the exact pass finds nothing,
 * a single-word query falls back to near matches against item names and
 * keywords - one mistyped letter ("Hikvison") still finds its product,
 * while unrelated words stay empty.
 */
function fuzzySearchCatalog(q: string, index: SearchIndexItem[]): SearchIndexItem[] {
  if (q.includes(" ")) return [];
  const threshold = fuzzyThreshold(q.length);
  return index.filter((item) => {
    const tokens = [item.title, ...item.keywords]
      .join(" ")
      .toLowerCase()
      .split(/[^a-z0-9+&]+/)
      .filter((token) => token.length > 1);
    return tokens.some(
      (token) =>
        Math.abs(token.length - q.length) <= threshold &&
        editDistance(q, token) <= threshold,
    );
  });
}
