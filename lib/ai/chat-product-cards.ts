/** Product cards for one AI chat reply.

 *  A card exists only when the model cited a catalogue id or slug and
 *  the screened reply already contains that item's name. The object
 *  sent to the browser is the name plus an optional phrase copied from
 *  the reply. Price, stock, and lead time never get a field here.
 */

import { screenAiReply } from "@/lib/ai/output-guard";

export const MAX_CHAT_PRODUCT_CARDS = 3;
export const MAX_CHAT_PRODUCT_REFS = 8;

export type ChatCatalogueEntry = {
  id: string;
  slug: string;
  name: string;
};

export type ChatProductCard = {
  name: string;
  mention?: string;
};

export type ChatProductRef = {
  ref: string;
  mention?: string;
};

function norm(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

const MENTION_BLOCK =
  /\b(stock|stocks|lead\s*time|availability|price|priced|discount)\b|₱|\$\s?\d/i;

export function sanitizeProductRefs(raw: unknown): ChatProductRef[] {
  if (!Array.isArray(raw)) return [];
  const refs: ChatProductRef[] = [];
  for (const item of raw) {
    let ref = "";
    let mention: string | undefined;
    if (typeof item === "string") {
      ref = item;
    } else if (item && typeof item === "object") {
      const record = item as { ref?: unknown; mention?: unknown };
      if (typeof record.ref === "string") ref = record.ref;
      if (typeof record.mention === "string") mention = record.mention;
    }
    ref = ref.trim().slice(0, 80);
    if (!ref) continue;
    const next: ChatProductRef = { ref };
    if (mention) {
      const cleaned = mention.trim().replace(/\s+/g, " ").slice(0, 160);
      if (cleaned) next.mention = cleaned;
    }
    refs.push(next);
    if (refs.length >= MAX_CHAT_PRODUCT_REFS) break;
  }
  return refs;
}

export function mentionForReply(reply: string, name: string, mention: string | undefined): string | undefined {
  if (!mention) return undefined;
  const text = mention.trim().replace(/\s+/g, " ");
  if (!text || text.length > 160) return undefined;
  if (norm(text) === norm(name)) return undefined;
  if (!norm(reply).includes(norm(text))) return undefined;
  if (screenAiReply(text).flagged || MENTION_BLOCK.test(text)) return undefined;
  return text;
}

export function resolveChatProductCards(
  reply: string,
  refs: ChatProductRef[],
  catalogue: ChatCatalogueEntry[],
): ChatProductCard[] {
  const replyNorm = norm(reply);
  const cards: ChatProductCard[] = [];
  const seen = new Set<string>();
  for (const item of refs) {
    const key = norm(item.ref);
    const entry = catalogue.find((candidate) => norm(candidate.id) === key || norm(candidate.slug) === key);
    if (!entry) continue;
    const slugKey = norm(entry.slug);
    if (seen.has(slugKey)) continue;
    if (!replyNorm.includes(norm(entry.name))) continue;
    seen.add(slugKey);
    const mention = mentionForReply(reply, entry.name, item.mention);
    cards.push(mention ? { name: entry.name, mention } : { name: entry.name });
    if (cards.length >= MAX_CHAT_PRODUCT_CARDS) break;
  }
  return cards;
}

/** Re-check cards before they are shown or restored. Extra fields,
 *  including anything a tampered session might have stored, are dropped. */
export function cardsVisibleInReply(reply: string, cards: unknown): ChatProductCard[] {
  if (!Array.isArray(cards)) return [];
  const visible: ChatProductCard[] = [];
  for (const card of cards) {
    if (!card || typeof card !== "object") continue;
    const rawName = (card as { name?: unknown }).name;
    const name = typeof rawName === "string" ? rawName.trim().replace(/\s+/g, " ") : "";
    if (!name || !norm(reply).includes(norm(name))) continue;
    const rawMention = (card as { mention?: unknown }).mention;
    const mention = mentionForReply(reply, name, typeof rawMention === "string" ? rawMention : undefined);
    visible.push(mention ? { name, mention } : { name });
    if (visible.length >= MAX_CHAT_PRODUCT_CARDS) break;
  }
  return visible;
}
