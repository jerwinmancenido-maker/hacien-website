/** Product cards for one AI chat reply.

 *  A card exists only when the model cites a catalogue id or slug.
 *  The visitor's bubble does not repeat those names: when cards are
 *  shown, the reply is the short lead-in. A tap sends the catalogue
 *  name, and the next reply stays on that item. Price, stock, and
 *  lead time never get a field here.
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

/** Shown instead of a name list when at least one card is real. */
export const CARD_LEAD_IN = "Here are options we can quote. Tap one to start:";

/** Not a catalogue item. Always last when real cards are shown. */
export const OTHER_CARD_LABEL = "Something else / not listed";

/** Jerwin's reply for that card. No price, stock, or lead time. */
export const OTHER_CARD_REPLY =
  "No problem, we can source it. Tell me the item, quantity and specs, or attach your RFQ / spec sheet.";

const USEFUL_FOLLOW_UP = /\b(how many|quantity|qty|specs?|budget)\b/i;

export function tappedProductQuestion(name: string): string {
  return `How many ${name} units do you need, and are there specs or a budget to match?`;
}

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
  refs: ChatProductRef[],
  catalogue: ChatCatalogueEntry[],
): ChatProductCard[] {
  const cards: ChatProductCard[] = [];
  const seen = new Set<string>();
  for (const item of refs) {
    const key = norm(item.ref);
    const entry = catalogue.find((candidate) => norm(candidate.id) === key || norm(candidate.slug) === key);
    if (!entry) continue;
    const slugKey = norm(entry.slug);
    if (seen.has(slugKey)) continue;
    seen.add(slugKey);
    cards.push({ name: entry.name });
    if (cards.length >= MAX_CHAT_PRODUCT_CARDS) break;
  }
  return cards;
}

/** Real catalogue cards, then the unlisted escape. No cards means no escape. */
export function appendOtherCard(cards: ChatProductCard[]): ChatProductCard[] {
  const real = cards.filter((card) => card.name !== OTHER_CARD_LABEL);
  if (real.length === 0) return [];
  return [...real, { name: OTHER_CARD_LABEL }];
}

function catalogueNameMatch(value: string, catalogue: ChatCatalogueEntry[]): ChatCatalogueEntry | undefined {
  const key = norm(value);
  return catalogue.find((entry) => norm(entry.name) === key);
}

/** After the visitor taps a card, the next reply stays on that product.
 *  An unrelated reply, including one that names a different catalogue
 *  item, becomes a question about quantity, specs, or budget. */
export function replyAfterTappedProduct(
  userMessage: string,
  reply: string,
  catalogue: ChatCatalogueEntry[],
): string {
  const tapped = catalogueNameMatch(userMessage, catalogue);
  if (!tapped) return reply;
  const mentionsOther = catalogue.some(
    (entry) => entry.slug !== tapped.slug && norm(reply).includes(norm(entry.name)),
  );
  const aboutTapped = norm(reply).includes(norm(tapped.name));
  if (!mentionsOther && (aboutTapped || USEFUL_FOLLOW_UP.test(reply))) return reply;
  return tappedProductQuestion(tapped.name);
}

/** Validate refs, then either show the lead-in with name-only cards or
 *  keep the reply with no cards. A tapped product never opens another menu. */
export function presentCatalogueTurn(input: {
  reply: string;
  refs: ChatProductRef[];
  catalogue: ChatCatalogueEntry[];
  userMessage: string;
}): { reply: string; cards: ChatProductCard[] } {
  if (catalogueNameMatch(input.userMessage, input.catalogue)) {
    return {
      reply: replyAfterTappedProduct(input.userMessage, input.reply, input.catalogue),
      cards: [],
    };
  }
  const cards = resolveChatProductCards(input.refs, input.catalogue);
  if (cards.length === 0) return { reply: input.reply, cards: [] };
  return { reply: CARD_LEAD_IN, cards };
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
    if (!name || name === OTHER_CARD_LABEL) continue;
    const rawMention = (card as { mention?: unknown }).mention;
    const mention = mentionForReply(reply, name, typeof rawMention === "string" ? rawMention : undefined);
    visible.push(mention ? { name, mention } : { name });
    if (visible.length >= MAX_CHAT_PRODUCT_CARDS) break;
  }
  return visible;
}
