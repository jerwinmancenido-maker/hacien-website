import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const bubbles = readFileSync("components/ChatBubbles.tsx", "utf8");
const aiChat = readFileSync("components/AiChat.tsx", "utf8");
const floating = readFileSync("components/FloatingChat.tsx", "utf8");
const knowledge = readFileSync("lib/ai/knowledge.ts", "utf8");

describe("chat choice boxes (owner design, 2026-11-09)", () => {
  it("provides one shared choice-box component with rows, a caption slot, and an attach icon", () => {
    expect(bubbles).toContain("export function ChatChoiceBox");
    expect(bubbles).toContain('icon?: "attach"');
    expect(bubbles).toContain("caption");
  });

  it("the what-do-you-need box is Variant B: attach, type, or callback", () => {
    expect(aiChat).toContain('label: "Attach a document or photo"');
    expect(aiChat).toContain('icon: "attach"');
    expect(aiChat).toContain('label: "I\'ll type it"');
    expect(aiChat).toContain('label: "Arrange a callback instead"');
    expect(aiChat).toContain('void send("Arrange a callback")');
    // The caption still names what attach accepts.
    expect(aiChat).toContain("a bill of quantities, a specification sheet, or a photo of your list");
    // Attach is an action (opens the picker), not a sent message.
    expect(aiChat).toContain("fileInputRef.current?.click()");
  });

  it("covers the path, callback-timing, and document-confirm moments", () => {
    expect(aiChat).toContain('label: "Quotation request"');
    expect(aiChat).toContain('label: "General inquiry"');
    expect(aiChat).toContain('label: "Arrange a callback"');
    expect(aiChat).toContain("CALLBACK_TIME_OPTIONS.map");
    expect(aiChat).toContain('label: "Looks right"');
    expect(aiChat).toContain('label: "Needs changes"');
  });

  it("derives every box from turn state, never from the reply's wording", () => {
    expect(aiChat).toContain("needBoxIndex === messages.length - 1");
    expect(aiChat).toContain("docConfirmPending");
    expect(aiChat).toContain("!fields.bestTime");
    expect(aiChat).toContain("Boolean(fields.need)");
    // The box is owed by the company-confirmation sends specifically.
    expect(aiChat).toContain("needReplyRef.current = true");
    expect(aiChat).toContain("if (file) setDocConfirmPending(true)");
  });

  it("the assistant no longer spells the options out in prose", () => {
    expect(knowledge).not.toContain("tap the paperclip to attach");
    expect(knowledge).toContain("tappable choices under that reply");
  });
});

describe("never lose the chat (owner decision, 2026-11-09)", () => {
  it("keeps the panel mounted after the first open — closing only hides it", () => {
    expect(floating).toContain("hasOpened");
    expect(floating).toContain("{hasOpened ? (");
    expect(floating).toContain('${open ? "flex" : "hidden"}');
  });

  it("persists the thread in session storage under a versioned key", () => {
    expect(aiChat).toContain('CHAT_STORAGE_KEY = "hacien-ai-chat-v1"');
    expect(aiChat).toContain("window.sessionStorage.setItem(CHAT_STORAGE_KEY");
    expect(aiChat).toContain("window.sessionStorage.getItem(CHAT_STORAGE_KEY)");
    // Start over clears the stored thread as well.
    expect(aiChat).toContain("window.sessionStorage.removeItem(CHAT_STORAGE_KEY)");
  });

  it("never stores the gate pass or the bot-check token", () => {
    const start = aiChat.indexOf("const snapshot: ChatSnapshot = {");
    const end = aiChat.indexOf("};", start);
    expect(start).toBeGreaterThan(-1);
    const snapshotLiteral = aiChat.slice(start, end);
    // The gatePassed boolean is fine to store; the pass string itself
    // (a `gatePass` key) and the token must never appear.
    expect(snapshotLiteral).not.toContain("gatePass,");
    expect(snapshotLiteral).not.toContain("gatePass:");
    expect(snapshotLiteral).not.toContain("turnstileToken");
    expect(snapshotLiteral).toContain("gatePassed");
    expect(snapshotLiteral).toContain("messages");
    expect(snapshotLiteral).toContain("acceptedAt");
  });

  it("restores only a well-shaped snapshot", () => {
    expect(aiChat).toContain("parsed.v === 1");
    expect(aiChat).toContain("Array.isArray(parsed.messages)");
    // Saving stays off until the restore read has run.
    expect(aiChat).toContain("restoreDoneRef");
  });
});
