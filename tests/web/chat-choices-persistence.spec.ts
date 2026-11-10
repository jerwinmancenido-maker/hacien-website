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

  it("never stores the gate pass or the bot-check token, and includes agreedVersions in snapshot", () => {
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
    expect(snapshotLiteral).toContain("agreedVersions");
  });

  it("Start over clears the whole stored chat including agreement and prevents saving at empty gate", () => {
    const resetStart = aiChat.indexOf("function resetAll() {");
    const resetEnd = aiChat.indexOf("}", aiChat.indexOf("removeItem(CHAT_STORAGE_KEY)", resetStart));
    expect(resetStart).toBeGreaterThan(-1);
    const resetBody = aiChat.slice(resetStart, resetEnd + 1);

    expect(resetBody).toContain("setAgreed(false)");
    expect(resetBody).toContain('setAcceptedAt("")');
    expect(resetBody).toContain("setGatePassed(false)");
    expect(resetBody).toContain("window.sessionStorage.removeItem(CHAT_STORAGE_KEY)");

    // removeItem is called after the agreement state is reset so the removed key stays removed
    expect(resetBody.indexOf("setGatePassed(false)")).toBeLessThan(
      resetBody.indexOf("window.sessionStorage.removeItem"),
    );

    // Comment at L282-288 no longer says resetAll deliberately leaves this state untouched
    expect(aiChat).not.toContain("resetAll deliberately leaves this state untouched");
    expect(aiChat).not.toContain("Start over returns to the email step, not the gate");

    // The save effect does not persist when back at the empty gate
    expect(aiChat).toContain("if (!gatePassed && messages.length === 0) return;");
  });

  it("restores only a well-shaped snapshot", () => {
    expect(aiChat).toContain("parsed.v === 1");
    expect(aiChat).toContain("Array.isArray(parsed.messages)");
    // Saving stays off until the restore read has run.
    expect(aiChat).toContain("restoreDoneRef");
  });

  it("version re-prompt discards stored snapshot when version is old/missing/mismatched and restores when matching", () => {
    // Assert partial agreementValid restoration is gone
    expect(aiChat).not.toContain("agreementValid");

    // Assert restore code removes the key and sets snapshot null when version is not matching
    const restoreStart = aiChat.indexOf("let snapshot: ChatSnapshot | null = null;");
    const restoreEnd = aiChat.indexOf("restoreDoneRef.current = true;", restoreStart);
    expect(restoreStart).toBeGreaterThan(-1);
    const restoreBlock = aiChat.slice(restoreStart, restoreEnd);

    expect(restoreBlock).toContain("parsed.v === 2 && parsed.agreedVersions === AGREEMENT_POLICY_VERSIONS");
    expect(restoreBlock).toContain("window.sessionStorage.removeItem(CHAT_STORAGE_KEY)");
    expect(restoreBlock).toContain("snapshot = null");

    // Extract AGREEMENT_POLICY_VERSIONS from AiChat.tsx
    const match = aiChat.match(/const AGREEMENT_POLICY_VERSIONS = "([^"]+)";/);
    expect(match).not.toBeNull();
    const currentVersions = match![1];
    expect(currentVersions).toBe("terms:v2.1, privacy:v2.7");

    // Helper simulating AiChat's restore path
    type SimMessage = { role: "user" | "assistant"; text: string };
    type SimSnapshot = {
      v?: number;
      messages: SimMessage[];
      fields: Record<string, unknown>;
      path: "quote" | "inquiry" | "callback" | "track" | null;
      agreed?: boolean;
      agreedVersions?: string;
      gatePassed?: boolean;
      acceptedAt?: string;
      submitStatus?: "idle" | "success" | "error";
    };

    function simulateRestore(parsed: SimSnapshot) {
      let snapshot: SimSnapshot | null = null;
      let removedKey: string | null = null;
      const fakeStorage = {
        removeItem: (k: string) => {
          removedKey = k;
        },
      };

      if (
        parsed &&
        (parsed.v === 1 || parsed.v === 2) &&
        Array.isArray(parsed.messages) &&
        parsed.messages.every(
          (message) =>
            message &&
            (message.role === "user" || message.role === "assistant") &&
            typeof message.text === "string",
        ) &&
        parsed.fields &&
        typeof parsed.fields === "object" &&
        (parsed.path === null ||
          parsed.path === "quote" ||
          parsed.path === "inquiry" ||
          parsed.path === "callback" ||
          parsed.path === "track")
      ) {
        if (parsed.v === 2 && parsed.agreedVersions === currentVersions) {
          snapshot = {
            v: 2,
            messages: parsed.messages,
            fields: parsed.fields,
            path: parsed.path ?? null,
            agreed: Boolean(parsed.agreed),
            acceptedAt: parsed.acceptedAt ?? "",
            agreedVersions: parsed.agreedVersions,
            gatePassed: Boolean(parsed.gatePassed),
            submitStatus: parsed.submitStatus ?? "idle",
          };
        } else {
          fakeStorage.removeItem("hacien-ai-chat-v1");
          snapshot = null;
        }
      }

      return { snapshot, removedKey };
    }

    const sampleMessages: SimMessage[] = [{ role: "assistant", text: "Welcome to HACIEN." }];
    const sampleFields = { company: "Acme Corp" };

    // Old v1 snapshot -> fresh state at the gate (no restore of submitStatus/messages); storage key removed
    const v1Result = simulateRestore({
      v: 1,
      messages: sampleMessages,
      fields: sampleFields,
      path: "quote",
      agreed: true,
      gatePassed: true,
      acceptedAt: "2026-11-08T00:00:00.000Z",
      submitStatus: "success",
    });
    expect(v1Result.snapshot).toBeNull();
    expect(v1Result.removedKey).toBe("hacien-ai-chat-v1");

    // v2 snapshot with old/mismatched agreedVersions -> fresh state at the gate; storage key removed
    const oldVersionResult = simulateRestore({
      v: 2,
      messages: sampleMessages,
      fields: sampleFields,
      path: "quote",
      agreed: true,
      gatePassed: true,
      agreedVersions: "terms:v2.1, privacy:v2.5",
      acceptedAt: "2026-11-08T00:00:00.000Z",
      submitStatus: "success",
    });
    expect(oldVersionResult.snapshot).toBeNull();
    expect(oldVersionResult.removedKey).toBe("hacien-ai-chat-v1");

    // v2 snapshot with missing agreedVersions -> fresh state at the gate; storage key removed
    const missingVersionResult = simulateRestore({
      v: 2,
      messages: sampleMessages,
      fields: sampleFields,
      path: "quote",
      agreed: true,
      gatePassed: true,
      acceptedAt: "2026-11-08T00:00:00.000Z",
      submitStatus: "success",
    });
    expect(missingVersionResult.snapshot).toBeNull();
    expect(missingVersionResult.removedKey).toBe("hacien-ai-chat-v1");

    // Matching agreedVersions restores full snapshot including submitStatus and messages
    const matchingResult = simulateRestore({
      v: 2,
      messages: sampleMessages,
      fields: sampleFields,
      path: "quote",
      agreed: true,
      gatePassed: true,
      agreedVersions: currentVersions,
      acceptedAt: "2026-11-09T08:00:00.000Z",
      submitStatus: "success",
    });
    expect(matchingResult.snapshot).not.toBeNull();
    expect(matchingResult.removedKey).toBeNull();
    expect(matchingResult.snapshot?.agreed).toBe(true);
    expect(matchingResult.snapshot?.gatePassed).toBe(true);
    expect(matchingResult.snapshot?.submitStatus).toBe("success");
    expect(matchingResult.snapshot?.messages).toEqual(sampleMessages);
    expect(matchingResult.snapshot?.acceptedAt).toBe("2026-11-09T08:00:00.000Z");
  });
});
