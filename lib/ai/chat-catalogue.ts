/** The allowlist a chat card may cite.
 *
 *  Static profiles always. ERP rows contribute id, slug, and name only,
 *  and only so a ref the static list missed can still match. Price and
 *  availability never leave this file.
 */

import { products } from "@/data/products";
import type { ChatCatalogueEntry } from "@/lib/ai/chat-product-cards";

export function staticChatCatalogue(): ChatCatalogueEntry[] {
  return products.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
  }));
}

export function catalogueEntriesFromErpItems(items: unknown): ChatCatalogueEntry[] {
  if (!Array.isArray(items)) return [];
  const entries: ChatCatalogueEntry[] = [];
  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    const record = item as { id?: unknown; slug?: unknown; name?: unknown };
    const id = typeof record.id === "string" ? record.id.trim().slice(0, 80) : "";
    const slug = typeof record.slug === "string" ? record.slug.trim().slice(0, 80) : "";
    const name = typeof record.name === "string" ? record.name.trim().replace(/\s+/g, " ").slice(0, 160) : "";
    if (!id || !slug || !name) continue;
    entries.push({ id, slug, name });
  }
  return entries;
}

/** Static catalogue entries keep their id and name. ERP may only add entries for slugs
 *  (or ids) that the static list does not already have. Do not overwrite on collision. */
export function mergeChatCatalogue(
  base: ChatCatalogueEntry[],
  extra: ChatCatalogueEntry[],
): ChatCatalogueEntry[] {
  const bySlug = new Map<string, ChatCatalogueEntry>();
  const seenIds = new Set<string>();
  for (const entry of base) {
    bySlug.set(entry.slug.toLowerCase(), { id: entry.id, slug: entry.slug, name: entry.name });
    seenIds.add(entry.id.toLowerCase());
  }
  for (const entry of extra) {
    const slugKey = entry.slug.toLowerCase();
    const idKey = entry.id.toLowerCase();
    if (!bySlug.has(slugKey) && !seenIds.has(idKey)) {
      bySlug.set(slugKey, { id: entry.id, slug: entry.slug, name: entry.name });
      seenIds.add(idKey);
    }
  }
  return [...bySlug.values()];
}

export function cataloguePromptLines(): string {
  return staticChatCatalogue()
    .map((entry) => `${entry.id} | ${entry.slug} | ${entry.name}`)
    .join("\n");
}
