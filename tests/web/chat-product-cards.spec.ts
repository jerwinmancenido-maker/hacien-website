import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  CARD_LEAD_IN,
  cardsVisibleInReply,
  presentCatalogueTurn,
  replyAfterTappedProduct,
  resolveChatProductCards,
  sanitizeProductRefs,
  tappedProductQuestion,
  type ChatCatalogueEntry,
} from "@/lib/ai/chat-product-cards";
import {
  catalogueEntriesFromErpItems,
  mergeChatCatalogue,
  staticChatCatalogue,
} from "@/lib/ai/chat-catalogue";
import { buildAiChatSystemPrompt } from "@/lib/ai/knowledge";
import { parseAiChatTurn } from "@/lib/ai/intake";

const CATALOGUE: ChatCatalogueEntry[] = [
  { id: "HAC-LTP-001", slug: "business-laptop-16gb", name: "Business Laptop Class" },
  { id: "HAC-DESK-002", slug: "office-desktop-monitor-bundle", name: "Business Desktop and Monitor Bundle" },
  { id: "HAC-PWR-001", slug: "apc-cyberpower-eaton-power-protection", name: "APC, CyberPower, and Eaton UPS" },
  { id: "HAC-NET-003", slug: "cisco-firewall-options", name: "Cisco Firewall Options" },
];

const REPLY =
  "We can include these in the quotation request: Business Laptop Class, Business Desktop and Monitor Bundle, and APC, CyberPower, and Eaton UPS.";

describe("resolveChatProductCards", () => {
  it("matches a slug or an id even when the reply does not repeat the name", () => {
    const cards = resolveChatProductCards(
      [
        { ref: "business-laptop-16gb" },
        { ref: "HAC-PWR-001" },
      ],
      CATALOGUE,
    );
    expect(cards).toEqual([
      { name: "Business Laptop Class" },
      { name: "APC, CyberPower, and Eaton UPS" },
    ]);
    expect(JSON.stringify(cards)).not.toMatch(/price|stock|lead time|leadTime/i);
  });

  it("drops unknown refs and partial names, and never invents a card for them", () => {
    const cards = resolveChatProductCards(
      [
        { ref: "cisco-catalyst-9300" },
        { ref: "Business Laptop" },
        { ref: "cisco-firewall-options" },
      ],
      CATALOGUE,
    );
    expect(cards).toEqual([{ name: "Cisco Firewall Options" }]);
  });

  it("keeps the first three unique matches and does not copy a mention onto the card", () => {
    const cards = resolveChatProductCards(
      [
        { ref: "business-laptop-16gb", mention: "Business Laptop Class" },
        { ref: "HAC-LTP-001" },
        { ref: "office-desktop-monitor-bundle", mention: "PHP 45000" },
        { ref: "HAC-PWR-001", mention: "in stock next week" },
        { ref: "cisco-firewall-options" },
      ],
      CATALOGUE,
    );
    expect(cards).toEqual([
      { name: "Business Laptop Class" },
      { name: "Business Desktop and Monitor Bundle" },
      { name: "APC, CyberPower, and Eaton UPS" },
    ]);
  });

  it("does not copy price fields off a catalogue row", () => {
    const dirty = [
      { id: "HAC-LTP-001", slug: "business-laptop-16gb", name: "Business Laptop Class", price: 1250 },
    ] as unknown as ChatCatalogueEntry[];
    const cards = resolveChatProductCards([{ ref: "HAC-LTP-001" }], dirty);
    expect(cards).toEqual([{ name: "Business Laptop Class" }]);
    expect(Object.keys(cards[0] ?? {})).toEqual(["name"]);
  });
});

describe("presentCatalogueTurn", () => {
  it("replaces a name list with the lead-in and keeps only real cards", () => {
    const presented = presentCatalogueTurn({
      reply: REPLY,
      refs: [
        { ref: "HAC-LTP-001" },
        { ref: "office-desktop-monitor-bundle" },
        { ref: "HAC-PWR-001" },
        { ref: "cisco-catalyst-9300" },
      ],
      catalogue: CATALOGUE,
      userMessage: "We need laptops, desktops, and a UPS for the new office.",
    });
    expect(presented.reply).toBe(CARD_LEAD_IN);
    expect(presented.reply).not.toContain("Business Laptop Class");
    expect(presented.cards).toEqual([
      { name: "Business Laptop Class" },
      { name: "Business Desktop and Monitor Bundle" },
      { name: "APC, CyberPower, and Eaton UPS" },
    ]);
  });

  it("leaves plain text alone when nothing matches the catalogue", () => {
    const reply = "Tell me the port count and where it will sit.";
    const presented = presentCatalogueTurn({
      reply,
      refs: [{ ref: "cisco-catalyst-9300" }],
      catalogue: CATALOGUE,
      userMessage: "What about a Cisco Catalyst 9300?",
    });
    expect(presented).toEqual({ reply, cards: [] });
  });
});

describe("replyAfterTappedProduct", () => {
  it("replaces an unrelated reply with a question about the tapped product", () => {
    const reply = replyAfterTappedProduct(
      "Business Laptop Class",
      "A Cisco Catalyst 9300 is not one of the published profiles I can show here.",
      CATALOGUE,
    );
    expect(reply).toBe(tappedProductQuestion("Business Laptop Class"));
    expect(reply).not.toContain("Cisco");
    expect(reply).toMatch(/how many/i);
    expect(reply).toMatch(/specs/i);
    expect(reply).toMatch(/budget/i);
  });

  it("replaces a reply that switches to a different catalogue item", () => {
    const reply = replyAfterTappedProduct(
      "Business Laptop Class",
      "Cisco Firewall Options could be quoted instead. How many do you need?",
      CATALOGUE,
    );
    expect(reply).toBe(tappedProductQuestion("Business Laptop Class"));
    expect(reply).not.toContain("Cisco Firewall Options");
  });

  it("keeps a follow-up that already asks about the tapped product", () => {
    const original = "How many Business Laptop Class units should we include?";
    expect(replyAfterTappedProduct("Business Laptop Class", original, CATALOGUE)).toBe(original);
  });

  it("does not open another card menu after the tap", () => {
    const presented = presentCatalogueTurn({
      reply: "A Cisco Catalyst 9300 is not one of the published profiles I can show here.",
      refs: [{ ref: "cisco-firewall-options" }],
      catalogue: CATALOGUE,
      userMessage: "Business Laptop Class",
    });
    expect(presented.cards).toEqual([]);
    expect(presented.reply).toBe(tappedProductQuestion("Business Laptop Class"));
  });
});

describe("sanitizeProductRefs", () => {
  it("keeps at most eight ref strings and ignores junk", () => {
    const refs = sanitizeProductRefs([
      { ref: " business-laptop-16gb ", mention: "  hello  " },
      "HAC-PWR-001",
      { ref: "" },
      4,
      null,
      ...Array.from({ length: 10 }, (_, index) => ({ ref: `extra-${index}` })),
    ]);
    expect(refs[0]).toEqual({ ref: "business-laptop-16gb", mention: "hello" });
    expect(refs[1]).toEqual({ ref: "HAC-PWR-001" });
    expect(refs).toHaveLength(8);
  });
});

describe("cardsVisibleInReply", () => {
  it("keeps catalogue names that are not repeated in the lead-in, and drops extra fields", () => {
    const visible = cardsVisibleInReply(CARD_LEAD_IN, [
      { name: "Business Laptop Class", mention: "See", priceCents: 100 },
      { name: "Cisco Catalyst 9300" },
    ]);
    expect(visible).toEqual([{ name: "Business Laptop Class" }, { name: "Cisco Catalyst 9300" }]);
    expect(JSON.stringify(visible)).not.toMatch(/priceCents|mention/);
  });
});

describe("chat catalogue", () => {
  it("lists static profiles as id, slug, and name only", () => {
    const entries = staticChatCatalogue();
    expect(entries.some((entry) => entry.id === "HAC-LTP-001" && entry.name === "Business Laptop Class")).toBe(true);
    expect(JSON.stringify(entries)).not.toMatch(/priceCents|price|stock|lead time/i);
  });

  it("reads only id, slug, and name from ERP rows and lets ERP win on slug", () => {
    const erp = catalogueEntriesFromErpItems([
      { id: "erp-1", slug: "business-laptop-16gb", name: "ERP Laptop", price: 999, isAvailable: true },
      { id: "erp-2", slug: "published-switch", name: "Published Switch", price: 50 },
      { id: "", slug: "skip", name: "Skip" },
    ]);
    expect(erp).toEqual([
      { id: "erp-1", slug: "business-laptop-16gb", name: "ERP Laptop" },
      { id: "erp-2", slug: "published-switch", name: "Published Switch" },
    ]);
    const merged = mergeChatCatalogue(staticChatCatalogue(), erp);
    expect(merged.find((entry) => entry.slug === "business-laptop-16gb")?.name).toBe("ERP Laptop");
    expect(merged.some((entry) => entry.slug === "published-switch")).toBe(true);
    expect(JSON.stringify(merged)).not.toMatch(/price|isAvailable|stock/i);
  });
});

describe("catalogue prompt and parser", () => {
  it("tells the model to cite ids and not to invent a card", () => {
    const prompt = buildAiChatSystemPrompt();
    expect(prompt).toContain("HAC-LTP-001 | business-laptop-16gb | Business Laptop Class");
    expect(prompt).toContain("do not invent a card");
    expect(prompt).toContain(CARD_LEAD_IN);
    expect(prompt).toContain("quantity, specs, or budget");
    expect(prompt).not.toContain("exact name appears in reply");
    expect(prompt).not.toMatch(/₱\s?\d/);
  });

  it("keeps product refs without letting them reject a valid turn", () => {
    const turn = parseAiChatTurn({
      reply: "Business Laptop Class is a published profile.",
      path: null,
      fields: {},
      readyToReview: false,
      products: [{ ref: "HAC-LTP-001" }, { nope: true }, "office-desktop-monitor-bundle"],
    });
    expect(turn?.reply).toContain("Business Laptop Class");
    expect(turn?.productRefs).toEqual([
      { ref: "HAC-LTP-001" },
      { ref: "office-desktop-monitor-bundle" },
    ]);
    expect(turn?.cards).toEqual([]);
  });
});

describe("chat card wiring", () => {
  it("renders product cards from the reply and sends the product name", () => {
    const bubbles = readFileSync(join(process.cwd(), "components/ChatBubbles.tsx"), "utf8");
    const ai = readFileSync(join(process.cwd(), "components/AiChat.tsx"), "utf8");
    expect(bubbles).toContain("export function ChatProductCards");
    expect(bubbles).toContain('aria-label="Products mentioned in this reply"');
    expect(bubbles).not.toContain("priceCents");
    expect(ai).toContain("ChatProductCards");
    expect(ai).toContain("cardsVisibleInReply");
    expect(ai).toContain("onPick={(name) => void send(name)}");
  });
});
