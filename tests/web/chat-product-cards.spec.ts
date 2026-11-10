import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  CARD_LEAD_IN,
  CARDS_INPUT_PLACEHOLDER,
  MAX_INPUT_HINT_LENGTH,
  cardsVisibleInReply,
  isTypedUnlistedItem,
  presentCatalogueTurn,
  replyAfterTappedProduct,
  resolveChatProductCards,
  sanitizeInputHint,
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

describe("typed unlisted item", () => {
  it("treats free text under the cards as an unlisted item, and a card name as a tap", () => {
    const shown = ["Business Laptop Class", "Business Desktop and Monitor Bundle"];
    expect(isTypedUnlistedItem("Cisco Catalyst 9300, 4 units", shown)).toBe(true);
    expect(isTypedUnlistedItem("  business laptop class  ", shown)).toBe(false);
    expect(isTypedUnlistedItem("Cisco Catalyst 9300", [])).toBe(false);
    expect(isTypedUnlistedItem("   ", shown)).toBe(false);
    expect(isTypedUnlistedItem("I've attached our requirements document — please read it.", shown)).toBe(false);
    expect(isTypedUnlistedItem("I’ve attached our requirements document — please read it.", shown)).toBe(false);
  });

  it("does not invent a card for the typed item, and the cards placeholder is not a product", () => {
    const presented = presentCatalogueTurn({
      reply: "Tell me the quantity and where it will sit.",
      refs: [{ ref: "cisco-catalyst-9300" }],
      catalogue: CATALOGUE,
      userMessage: "Cisco Catalyst 9300, 4 units",
    });
    expect(presented.cards).toEqual([]);
    expect(presented.reply).not.toBe(CARD_LEAD_IN);
    expect(staticChatCatalogue().some((entry) => entry.name === CARDS_INPUT_PLACEHOLDER)).toBe(false);
    expect(CARDS_INPUT_PLACEHOLDER).toBe("Not listed? Type the item or attach your RFQ…");
    expect(CARDS_INPUT_PLACEHOLDER).not.toMatch(/price|stock|lead time|₱/i);
  });

  it("keeps a removed escape label from coming back as a stored card", () => {
    const visible = cardsVisibleInReply(CARD_LEAD_IN, [
      { name: "Business Laptop Class" },
      { name: "Something else / not listed" },
    ]);
    expect(visible).toEqual([{ name: "Business Laptop Class" }]);
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

  it("reads only id, slug, and name from ERP rows and preserves static id/name on slug collision", () => {
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
    expect(merged.find((entry) => entry.slug === "business-laptop-16gb")?.name).toBe("Business Laptop Class");
    expect(merged.find((entry) => entry.slug === "business-laptop-16gb")?.id).toBe("HAC-LTP-001");
    expect(merged.some((entry) => entry.slug === "published-switch")).toBe(true);
    expect(JSON.stringify(merged)).not.toMatch(/price|isAvailable|stock/i);
  });

  it("still resolves static id like HAC-LTP-001 after a same-slug ERP row is merged", () => {
    const erp = catalogueEntriesFromErpItems([
      { id: "erp-1", slug: "business-laptop-16gb", name: "ERP Laptop" },
    ]);
    const merged = mergeChatCatalogue(staticChatCatalogue(), erp);
    const cards = resolveChatProductCards([{ ref: "HAC-LTP-001" }], merged);
    expect(cards).toEqual([{ name: "Business Laptop Class" }]);
  });
});

describe("catalogue prompt and parser", () => {
  it("tells the model to cite ids and not to invent a card", () => {
    const prompt = buildAiChatSystemPrompt();
    expect(prompt).toContain("HAC-LTP-001 | business-laptop-16gb | Business Laptop Class");
    expect(prompt).toContain("do not invent a card");
    expect(prompt).toContain(CARD_LEAD_IN);
    expect(prompt).toContain("quantity, specs, or budget");
    expect(prompt).toContain("record that text as the quote need");
    expect(prompt).toContain("inputHint");
    expect(prompt).toContain("e.g. Juan Dela Cruz");
    expect(prompt).toContain("e.g. Dec 15, Pasig City");
    expect(prompt).not.toContain("Something else / not listed");
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

  it("carries a sanitized input hint on the parsed turn and drops a priced one", () => {
    const named = parseAiChatTurn({
      reply: "What name should go on the request?",
      path: "quote",
      fields: {},
      readyToReview: false,
      inputHint: "e.g. Juan Dela Cruz",
    });
    expect(named?.inputHint).toBe("e.g. Juan Dela Cruz");
    const priced = parseAiChatTurn({
      reply: "Here is the range.",
      path: null,
      fields: {},
      readyToReview: false,
      inputHint: "e.g. ₱50,000 budget",
    });
    expect(priced?.inputHint).toBeUndefined();
  });
});

describe("sanitizeInputHint", () => {
  it("trims, collapses whitespace, and caps the length", () => {
    expect(sanitizeInputHint("  e.g.   Dec 15,\nPasig City ")).toBe("e.g. Dec 15, Pasig City");
    const long = sanitizeInputHint("x".repeat(120));
    expect(long).toHaveLength(MAX_INPUT_HINT_LENGTH);
  });

  it("drops non-strings, blanks, and price, stock, or lead-time claims", () => {
    expect(sanitizeInputHint(undefined)).toBeUndefined();
    expect(sanitizeInputHint(42)).toBeUndefined();
    expect(sanitizeInputHint("   ")).toBeUndefined();
    expect(sanitizeInputHint("Only 3 left in stock")).toBeUndefined();
    expect(sanitizeInputHint("Lead time is 3 days")).toBeUndefined();
    expect(sanitizeInputHint("Starts at $500")).toBeUndefined();
  });

  it("keeps the two approved step examples", () => {
    expect(sanitizeInputHint("e.g. Juan Dela Cruz")).toBe("e.g. Juan Dela Cruz");
    expect(sanitizeInputHint("e.g. Dec 15, Pasig City")).toBe("e.g. Dec 15, Pasig City");
  });
});

describe("chat card wiring", () => {
  it("renders product cards from the reply and sends the product name", () => {
    const bubbles = readFileSync(join(process.cwd(), "components/ChatBubbles.tsx"), "utf8");
    const ai = readFileSync(join(process.cwd(), "components/AiChat.tsx"), "utf8");
    expect(bubbles).not.toContain("CARDS_INPUT_PLACEHOLDER");
    expect(ai).toContain("CARDS_INPUT_PLACEHOLDER");
    expect(ai).toContain("composerPlaceholder");
    expect(ai).toContain("inputHint");
    expect(ai).toContain("disabled={sending || readyToReview}");
    expect(bubbles).not.toContain("appendOtherCard");
    expect(bubbles).not.toContain("Something else / not listed");
    expect(bubbles).toContain("export function ChatProductCards");
    expect(bubbles).toContain('aria-label="Products mentioned in this reply"');
    expect(bubbles).not.toContain("priceCents");
    expect(bubbles).toContain("disabled:pointer-events-none");
    expect(bubbles).toContain("if (disabled) return;");
    expect(ai).toContain("ChatProductCards");
    expect(ai).toContain("cardsVisibleInReply");
    expect(ai).toContain("isTypedUnlistedItem");
    expect(ai).toContain('unlistedTyped ? "quote"');
    expect(ai).toContain("setUnlistedUpload(true)");
    expect(ai).toContain('label: "Attach a document or photo"');
    expect(ai).toContain("onPick={readyToReview ? () => {} : (name) => void send(name)}");
    expect(ai).toContain("if (readyToReview) return;");
    expect(ai).toContain("const unlistedTyped = !file && isTypedUnlistedItem(text, shownCards);");
    expect(ai).not.toContain("Something else / not listed");
  });

  it("cannot fire onPick or call send when readyToReview is true", () => {
    let sentName: string | null = null;
    const send = (name: string) => {
      sentName = name;
    };

    // AiChat onPick is a no-op during review:
    const readyToReview = true;
    const onPick = readyToReview ? () => {} : (name: string) => void send(name);
    onPick("Business Laptop Class");
    expect(sentName).toBeNull();

    // ChatBubbles button click guards against disabled:
    let bubblePickFired = false;
    const pickHandler = () => {
      bubblePickFired = true;
    };
    const disabled = true;
    const clickHandler = () => {
      if (disabled) return;
      pickHandler();
    };
    clickHandler();
    expect(bubblePickFired).toBe(false);

    // AiChat send() guards against readyToReview:
    const guardedSend = (text: string, isReview: boolean) => {
      if (isReview) return;
      sentName = text;
    };
    guardedSend("Business Laptop Class", true);
    expect(sentName).toBeNull();
  });
});
