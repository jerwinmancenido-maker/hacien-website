import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  cardsVisibleInReply,
  resolveChatProductCards,
  sanitizeProductRefs,
  type ChatCatalogueEntry,
} from "@/lib/ai/chat-product-cards";
import {
  catalogueEntriesFromErpItems,
  mergeChatCatalogue,
  staticChatCatalogue,
} from "@/lib/ai/chat-catalogue";
import { AI_SAFE_REPLY } from "@/lib/ai/output-guard";
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
  it("matches a slug or an id only when the catalogue name is in the reply", () => {
    const cards = resolveChatProductCards(
      REPLY,
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

  it("drops unknown refs, partial names, and names the reply does not say", () => {
    const cards = resolveChatProductCards(
      "We can look at Business Laptop Class.",
      [
        { ref: "cisco-catalyst-9300" },
        { ref: "Business Laptop" },
        { ref: "cisco-firewall-options" },
        { ref: "office-desktop-monitor-bundle" },
      ],
      CATALOGUE,
    );
    expect(cards).toEqual([]);
  });

  it("keeps the first three unique matches and ignores a price-like mention", () => {
    const cards = resolveChatProductCards(
      `${REPLY} Cisco Firewall Options.`,
      [
        { ref: "business-laptop-16gb", mention: "Business Laptop Class" },
        { ref: "HAC-LTP-001" },
        { ref: "office-desktop-monitor-bundle", mention: "PHP 45000" },
        { ref: "HAC-PWR-001", mention: "in stock next week" },
        { ref: "cisco-firewall-options", mention: "not in the reply fragment" },
      ],
      CATALOGUE,
    );
    expect(cards).toEqual([
      { name: "Business Laptop Class" },
      { name: "Business Desktop and Monitor Bundle" },
      { name: "APC, CyberPower, and Eaton UPS" },
    ]);
  });

  it("keeps a verbatim mention and drops one the output guard would flag", () => {
    const reply = "Business Laptop Class is the profile to start with.";
    const cards = resolveChatProductCards(
      reply,
      [{ ref: "hac-ltp-001", mention: "the profile to start with" }],
      CATALOGUE,
    );
    expect(cards).toEqual([
      { name: "Business Laptop Class", mention: "the profile to start with" },
    ]);

    const priced = resolveChatProductCards(
      "Business Laptop Class is ₱1250.",
      [{ ref: "HAC-LTP-001", mention: "₱1250" }],
      CATALOGUE,
    );
    expect(priced).toEqual([{ name: "Business Laptop Class" }]);
  });

  it("returns no cards when the visitor is shown the safe reply instead", () => {
    expect(resolveChatProductCards(AI_SAFE_REPLY, [{ ref: "HAC-LTP-001" }], CATALOGUE)).toEqual([]);
  });

  it("does not copy price fields off a catalogue row", () => {
    const dirty = [
      { id: "HAC-LTP-001", slug: "business-laptop-16gb", name: "Business Laptop Class", price: 1250 },
    ] as unknown as ChatCatalogueEntry[];
    const cards = resolveChatProductCards("Business Laptop Class.", [{ ref: "HAC-LTP-001" }], dirty);
    expect(cards).toEqual([{ name: "Business Laptop Class" }]);
    expect(Object.keys(cards[0] ?? {})).toEqual(["name"]);
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
  it("drops a stored card whose name is not in the bubble, and any extra fields", () => {
    const visible = cardsVisibleInReply("See Business Laptop Class.", [
      { name: "Business Laptop Class", mention: "See", priceCents: 100 },
      { name: "Cisco Catalyst 9300" },
    ]);
    expect(visible).toEqual([{ name: "Business Laptop Class", mention: "See" }]);
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
