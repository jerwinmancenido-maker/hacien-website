"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useQuoteCart } from "@/components/QuoteCartProvider";
import { sendAiChatDocument, sendAiChatMessage } from "@/app/actions/ai-chat";
import { lookupCompanyFromEmail } from "@/app/actions/company-lookup";
import { emailDomain, isFreeMailDomain } from "@/lib/ai/company-lookup";
import { AI_DOCUMENT_ACCEPT, validateAiDocument } from "@/lib/ai/document";
import { sendInquiryEmail } from "@/app/actions/send-inquiry";
import { replyTime } from "@/data/companyContact";
import {
  AgentMessage,
  ChatChoiceBox,
  MessageComposer,
  TypingAgentMessage,
  UserBubble,
} from "@/components/ChatBubbles";
import { TurnstileField } from "@/components/TurnstileField";
import { CALLBACK_TIME_OPTIONS, getChatPath } from "@/lib/guided-chat/steps";
import {
  buildCallbackPayload,
  buildInquiryPayload,
  buildQuotePayload,
  findTrackUrl,
  type GuidedChatAnswers,
} from "@/lib/guided-chat/payloads";
import type { AiChatPath } from "@/lib/ai/intake";

/** The AI conversation for the website chat panel — its only mode
 *  (owner decision, 2026-11-08: the guided questions were removed).
 *
 *  The panel opens on the agreement gate (owner + lawyer decision,
 *  2026-11-08, Privacy Policy v2.5): the visitor ticks the Terms of
 *  Use / Privacy Policy agreement and presses Continue — the bot
 *  check completes at that press — and only then does the Tourly-
 *  style start appear: one centered question — the visitor's work
 *  email — with one input. The email becomes the
 *  first message of the thread, pinned at its top, and everything
 *  after is messaging. The assistant answers questions and collects
 *  the intake fields (see lib/ai/intake). When the intake is
 *  complete, the visitor checks the review card and the request is
 *  submitted through sendInquiryEmail — the same Gateway record,
 *  reference number, and emails as every other path.
 *
 *  Failure is stated honestly in the thread, never hidden: no API
 *  key shows the unavailable message with the team's email address;
 *  an API error or the conversation cap tells the visitor to retry,
 *  start over, or email the team.
 */

const MIN_SUBMIT_TIME_MS = 3000;
const MIN_SENDING_MS = 700;
/** Staged progress cards (document reading, company lookup) stay on
 *  screen at least this long so their step animation plays properly
 *  instead of flashing past when the work is fast (owner request,
 *  2026-11-08). */
const MIN_STAGED_VIEW_MS = 2_000;
/** Never lose the chat (owner decision, 2026-11-09): the thread is
 *  kept in the tab's session storage so closing the panel — or
 *  moving to another page and back — restores it as it was. The
 *  signed gate pass and the bot-check token are deliberately NOT
 *  stored: a restored chat re-verifies silently through the widget
 *  before its next turn, exactly like a first turn. */
const CHAT_STORAGE_KEY = "hacien-ai-chat-v1";

type ChatSnapshot = {
  v: 2;
  messages: ChatMessage[];
  fields: GuidedChatAnswers;
  path: AiChatPath | null;
  readyToReview: boolean;
  startedAt: number | null;
  pinnedEmail: string;
  agreed: boolean;
  acceptedAt: string;
  agreedVersions?: string;
  gatePassed: boolean;
  submitStatus: "idle" | "success" | "error";
  referenceNumber: string;
  confirmationSent: boolean;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const SUCCESS_TITLES: Record<AiChatPath, string> = {
  quote: "Quotation request received",
  inquiry: "Inquiry sent",
  callback: "Callback request received",
};

/** The Tourly-style start: one question, one input, centered. The
 *  email is the first thing the assistant works with — it keys the
 *  company lookup and the eventual request. */
const START_TITLE = "Let's get started.";
const START_TEXT =
  "I'm the HACIEN AI assistant. Start with your work email, and I'll take it from there — a quotation, a question, or a follow-up on an earlier request. A real person from the HACIEN team reads every submitted request.";

/** The agreement gate that opens the panel, before the email step. */
const GATE_TITLE = "Before we start.";
const GATE_TEXT =
  "I'm the HACIEN AI assistant. One quick step first — please confirm the two policies, and you're in.";
/** The lawyer-approved helper line on the gate screen (2026-11-08). */
const GATE_HELPER =
  "AI replies are for product guidance only and are not an official quotation. Please do not enter government IDs, tax papers, or passwords.";
/** Policy versions recorded with the agreement (the lawyer's
 *  recording for Privacy Policy v2.7): the tick's ISO timestamp and
 *  this version string travel with the submitted request. */
const AGREEMENT_POLICY_VERSIONS = "terms:v2.1, privacy:v2.7";

/** Mirrors the plausible-email check the server runs (lib/ai/intake). */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const UNAVAILABLE_TEXT =
  "The AI assistant isn't available right now — sorry about that. Email us at sales@haciensolutions.com and we'll take your request from there. We reply within 1 business day.";

/** Staged progress for work the chat does between messages — the
 *  same honest staging as the guided chat's processing view: the
 *  steps advance while the work is genuinely in flight and complete
 *  when the result lands. No percentage — there is no truthful one. */
const DOCUMENT_STAGES = [
  "Uploading your document",
  "Reading the document",
  "Extracting the items and quantities",
  "Preparing your summary",
];

const COMPANY_LOOKUP_STAGES = [
  "Checking the email domain",
  "Visiting the company website",
  "Reading the company name",
];

function StagedProgressView({ label, stages }: { label: string; stages: string[] }) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setStage((value) => Math.min(value + 1, stages.length - 1));
    }, 650);
    return () => clearInterval(timer);
  }, [stages.length]);
  return (
    <div className="ml-11 rounded-3xl border border-grey-200 bg-white p-4">
      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-grey-600">{label}</div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-grey-100">
        <div className="h-full w-1/3 animate-pulse rounded-full bg-blue" />
      </div>
      <ul className="mt-3 space-y-2">
        {stages.map((stageLabel, index) => (
          <li
            key={stageLabel}
            className={`flex items-center gap-2 text-sm ${index <= stage ? "text-ink" : "text-grey-400"}`}
          >
            {index < stage ? (
              <span
                className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue text-[11px] font-bold text-white"
                aria-hidden="true"
              >
                ✓
              </span>
            ) : index === stage ? (
              <span
                className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-grey-200 border-t-blue"
                aria-hidden="true"
              />
            ) : (
              <span className="h-5 w-5 shrink-0 rounded-full border border-grey-200" aria-hidden="true" />
            )}
            {stageLabel}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DocumentProcessingView() {
  return <StagedProgressView label="Reading · Your document" stages={DOCUMENT_STAGES} />;
}

/** The one processing indicator for the whole chat (owner decision,
 *  2026-11-08): the same blue ring the staged cards use, shown while
 *  the assistant replies and while the final request sends — the old
 *  "Typing…" text and the plain sending bubble are gone. */
function ProcessingRow({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3" role="status">
      <div
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue text-xs font-bold text-white"
        aria-hidden="true"
      >
        H
      </div>
      <span
        className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-grey-200 border-t-blue"
        aria-hidden="true"
      />
      {label ? <span className="text-sm text-grey-700">{label}</span> : null}
    </div>
  );
}

type CompanyLookupState =
  | { status: "idle" }
  | { status: "searching"; email: string }
  | { status: "confirming"; email: string; companyName: string; domain: string }
  | { status: "done"; email: string };

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  trackUrl?: string;
};

export function AiChat({
  turnstileSiteKey,
  aiConfigured,
}: {
  turnstileSiteKey: string;
  /** Whether the server has an AI key (a boolean only, never the key).
   *  When false, the panel shows the unavailable message instead of
   *  the start screen. */
  aiConfigured: boolean;
}) {
  const { requirements, clearRequirements } = useQuoteCart();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  // The index of the assistant message currently being typed out
  // (typewriter reveal), or -1 when no reveal is running.
  const [typingIndex, setTypingIndex] = useState(-1);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [path, setPath] = useState<AiChatPath | null>(null);
  const [fields, setFields] = useState<GuidedChatAnswers>({});
  const [readyToReview, setReadyToReview] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [notice, setNotice] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState("");
  /** Signed pass the server issues after the first verified turn;
   *  while it is held, later turns skip the bot check. */
  const [gatePass, setGatePass] = useState("");
  /** True while the widget is showing a "Verify you are human" box
   *  (reported by TurnstileField); used to guide the visitor at the
   *  review step, where the box — at the top of the chat — is what
   *  the send is waiting on. */
  const [sendChallengeVisible, setSendChallengeVisible] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachError, setAttachError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [readingDocument, setReadingDocument] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [companyLookup, setCompanyLookup] = useState<CompanyLookupState>({ status: "idle" });
  const lookupAttemptedFor = useRef<string | null>(null);
  /** The send's fresh token is requested once, when the review step
   *  is first reached — never mid-conversation. */
  const reviewRefreshRef = useRef(false);
  /** Choice boxes (owner design, 2026-11-09): the index of the
   *  assistant message the "what do you need" box belongs to — set
   *  when the reply to a company confirmation lands; -1 when the box
   *  is not owed. The box renders only while that message is still
   *  the latest one, so any reply from the visitor retires it. */
  const [needBoxIndex, setNeedBoxIndex] = useState(-1);
  const needReplyRef = useRef(false);
  /** A document turn has landed and its extracted list is waiting
   *  for the visitor's Looks right / Needs changes tap. */
  const [docConfirmPending, setDocConfirmPending] = useState(false);
  /** Session restore runs once on mount; saving stays off until it
   *  has run, so the empty initial state never overwrites a stored
   *  thread before it is read. */
  const restoreDoneRef = useRef(false);
  /** Tourly start state: the email is collected on the centered start
   *  screen before the thread begins, then pinned as its first
   *  message and kept in the intake fields from the first turn. */
  const [emailDraft, setEmailDraft] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pinnedEmail, setPinnedEmail] = useState("");
  /** Pre-chat agreement gate (lawyer-approved, Privacy Policy v2.7):
   *  the panel opens on the gate and the email step appears only
   *  after the agreement is ticked and Continue is pressed. The
   *  tick's timestamp is recorded and travels with the submission.
   *  Start over clears the whole chat including the agreement, so
   *  the visitor returns to the gate and must confirm again. */
  const [agreed, setAgreed] = useState(false);
  const [acceptedAt, setAcceptedAt] = useState("");
  const [gatePassed, setGatePassed] = useState(false);
  /** The gate's security wait has run long (see the timer below):
   *  the spinner row under Continue stops calling it a check in
   *  progress and names the missing tick instead. */
  const [gateWaitLong, setGateWaitLong] = useState(false);
  /** The server reported the AI unconfigured mid-conversation. */
  const [runtimeUnavailable, setRuntimeUnavailable] = useState(false);
  const unavailable = !aiConfigured || runtimeUnavailable;

  /** Stage one file for the next message. The same validation runs
   *  again on the server — this check is only for fast feedback. */
  function stageFile(file: File | null) {
    if (!file) return;
    const check = validateAiDocument({
      fileName: file.name || "attachment",
      declaredType: file.type || "",
      size: file.size,
    });
    if (!check.ok) {
      setAttachError(check.message);
      setAttachment(null);
      return;
    }
    setAttachError("");
    setAttachment(file);
  }

  const turnstilePending = Boolean(turnstileSiteKey) && turnstileToken.length === 0;
  const started = messages.length > 0;

  /** Choice-box visibility, all derived from the turn state (never
   *  from the reply's wording): a box shows only under the latest
   *  assistant message, after its typewriter reveal has finished,
   *  and only while its question is still open. At most one shows —
   *  the checks below are ordered by which moment owns the thread. */
  const lastIsAssistant = messages[messages.length - 1]?.role === "assistant";
  const boxIdle = started && lastIsAssistant && !sending && typingIndex < 0 && submitStatus !== "success";
  const showNeedChoices =
    boxIdle && needBoxIndex === messages.length - 1 && !fields.need && !readyToReview && !attachment;
  const showDocChoices = boxIdle && docConfirmPending && !readyToReview && !showNeedChoices;
  const showPathChoices =
    boxIdle && !path && Boolean(fields.need) && !readyToReview && !showNeedChoices && !showDocChoices;
  const showCallbackChoices =
    boxIdle &&
    path === "callback" &&
    !fields.bestTime &&
    !readyToReview &&
    !showNeedChoices &&
    !showDocChoices;

  /** Both gate ticks are in when the agreement is ticked and the
   *  security token exists (or no check is configured). Continue
   *  stays disabled until then — the previous press-and-park wait
   *  read as a hang (owner report, 2026-11-09: the button said the
   *  check was "completing" while it actually waited for the
   *  visitor's tick on the Cloudflare box). */
  const gateTokenReady = !turnstileSiteKey || gatePass.length > 0 || turnstileToken.length > 0;
  const gateWaiting = agreed && !gateTokenReady && !gatePassed;
  // A short wait is the check loading silently; past two seconds it
  // almost always means Cloudflare wants a tick, so the spinner
  // row's label escalates to say so (and the field highlights it).
  useEffect(() => {
    if (!gateWaiting) return;
    const timer = setTimeout(() => setGateWaitLong(true), 2000);
    return () => clearTimeout(timer);
  }, [gateWaiting]);

  // Keep the newest message in view: after every reply (and every
  // panel state change), scroll the chat panel's scroll area to the
  // bottom sentinel.
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollThreadToBottom = useCallback(() => {
    const node = bottomRef.current;
    if (!node) return;
    const container = node.closest<HTMLElement>("[data-chat-scroll]");
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    } else if (typeof node.scrollIntoView === "function") {
      node.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);
  useEffect(() => {
    // Before the first message the start screen must stay where it
    // opened (the lowered, centred greeting) — scrolling on mount
    // pushed the greeting out of view.
    if (!started) return;
    scrollThreadToBottom();
  }, [messages, sending, readyToReview, submitStatus, notice, companyLookup, started, scrollThreadToBottom]);

  // Restore a stored thread once, on mount. The read is synchronous
  // and unlocks saving before it returns, so the empty initial state
  // can never overwrite the stored thread; the state itself is
  // applied a tick later (the codebase's pattern for mount state).
  useEffect(() => {
    let snapshot: ChatSnapshot | null = null;
    try {
      const raw = window.sessionStorage.getItem(CHAT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Omit<ChatSnapshot, "v">> & { v?: number };
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
          // Version re-prompt: restore fully only when AGREEMENT_POLICY_VERSIONS matches.
          // Old v1 snapshots or snapshots missing/mismatched agreedVersions
          // discard the stored thread entirely so visitor starts fresh at the gate;
          // prevents success/error chrome from stacking over the re-prompt gate.
          if (parsed.v === 2 && parsed.agreedVersions === AGREEMENT_POLICY_VERSIONS) {
            snapshot = {
              v: 2,
              messages: parsed.messages,
              fields: parsed.fields,
              path: parsed.path ?? null,
              readyToReview: Boolean(parsed.readyToReview),
              startedAt: parsed.startedAt ?? null,
              pinnedEmail: parsed.pinnedEmail ?? "",
              agreed: Boolean(parsed.agreed),
              acceptedAt: parsed.acceptedAt ?? "",
              agreedVersions: parsed.agreedVersions,
              gatePassed: Boolean(parsed.gatePassed),
              submitStatus: parsed.submitStatus ?? "idle",
              referenceNumber: parsed.referenceNumber ?? "",
              confirmationSent: Boolean(parsed.confirmationSent),
            };
          } else {
            window.sessionStorage.removeItem(CHAT_STORAGE_KEY);
            snapshot = null;
          }
        }
      }
    } catch {
      snapshot = null;
    }
    restoreDoneRef.current = true;
    if (!snapshot) return;
    const restored = snapshot;
    const timer = setTimeout(() => {
      setMessages(restored.messages);
      setFields(restored.fields);
      setPath(restored.path);
      setReadyToReview(restored.readyToReview);
      setStartedAt(restored.startedAt);
      setPinnedEmail(restored.pinnedEmail);
      setAgreed(restored.agreed);
      setAcceptedAt(restored.acceptedAt);
      setGatePassed(restored.gatePassed);
      setSubmitStatus(restored.submitStatus);
      setReferenceNumber(restored.referenceNumber);
      setConfirmationSent(restored.confirmationSent);
      if (restored.fields.company) lookupAttemptedFor.current = restored.pinnedEmail || null;
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Keep the stored thread current. The bot-check token and the
  // signed gate pass never enter it (see CHAT_STORAGE_KEY).
  useEffect(() => {
    if (!restoreDoneRef.current) return;
    if (!gatePassed && messages.length === 0) return;
    const snapshot: ChatSnapshot = {
      v: 2,
      messages,
      fields,
      path,
      readyToReview,
      startedAt,
      pinnedEmail,
      agreed,
      acceptedAt,
      agreedVersions: agreed ? AGREEMENT_POLICY_VERSIONS : "",
      gatePassed,
      submitStatus: submitStatus === "sending" ? "idle" : submitStatus,
      referenceNumber,
      confirmationSent,
    };
    try {
      window.sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(snapshot));
    } catch {
      // Storage can be unavailable (private mode, quota) — the chat
      // simply will not restore next time; nothing else changes.
    }
  }, [
    messages,
    fields,
    path,
    readyToReview,
    startedAt,
    pinnedEmail,
    agreed,
    acceptedAt,
    gatePassed,
    submitStatus,
    referenceNumber,
    confirmationSent,
  ]);

  function resetAll() {
    setMessages([]);
    setTypingIndex(-1);
    setDraft("");
    setPath(null);
    setFields({});
    setReadyToReview(false);
    setStartedAt(null);
    setNotice("");
    setSubmitStatus("idle");
    setSubmitError("");
    setReferenceNumber("");
    setConfirmationSent(false);
    setTurnstileResetSignal((value) => value + 1);
    setTurnstileToken("");
    reviewRefreshRef.current = false;
    setSendChallengeVisible(false);
    setAttachment(null);
    setAttachError("");
    setReadingDocument(false);
    setCompanyLookup({ status: "idle" });
    lookupAttemptedFor.current = null;
    setEmailDraft("");
    setEmailError("");
    setPinnedEmail("");
    setRuntimeUnavailable(false);
    setNeedBoxIndex(-1);
    needReplyRef.current = false;
    setDocConfirmPending(false);
    setAgreed(false);
    setAcceptedAt("");
    setGatePassed(false);
    // Start over clears the stored thread too — the next visit opens
    // on the agreement gate, not on the conversation just discarded.
    try {
      window.sessionStorage.removeItem(CHAT_STORAGE_KEY);
    } catch {
      // Nothing to clear when storage is unavailable.
    }
  }

  /** After a quote turn collects a work email but no company yet,
   *  look the company up from the email's domain and ask the visitor
   *  to confirm it. Personal-mail domains are skipped — the model
   *  asks for the company name itself there (see the prompt rules). */
  async function maybeLookupCompany(
    turn: { path: AiChatPath | null; fields: GuidedChatAnswers },
    historyWithReply: ChatMessage[],
  ) {
    const email = typeof turn.fields.email === "string" ? turn.fields.email : "";
    if (turn.path !== "quote" || !email || turn.fields.company) return;
    if (lookupAttemptedFor.current === email) return;
    const domain = emailDomain(email);
    if (!domain || isFreeMailDomain(domain)) return;
    lookupAttemptedFor.current = email;
    setCompanyLookup({ status: "searching", email });
    const lookupStartedAt = Date.now();
    const result = await lookupCompanyFromEmail(email);
    // The staged card stays up at least MIN_STAGED_VIEW_MS so its
    // step animation actually plays — a fast lookup would otherwise
    // flash past in a blink (owner request, 2026-11-08).
    const lookupElapsed = Date.now() - lookupStartedAt;
    if (lookupElapsed < MIN_STAGED_VIEW_MS) await sleep(MIN_STAGED_VIEW_MS - lookupElapsed);
    if (result.found) {
      setCompanyLookup({
        status: "confirming",
        email,
        companyName: result.companyName,
        domain: result.domain,
      });
    } else {
      setCompanyLookup({ status: "done", email });
      setMessages([
        ...historyWithReply,
        {
          role: "assistant",
          text: "I couldn't identify your company from that email. Which company or organization is this quotation for?",
        },
      ]);
    }
  }

  /** The Tourly beat: the moment the email is in, the assistant
   *  looks the company up from its domain — before the visitor has
   *  said anything else (owner decision, 2026-11-08: look it up
   *  right at the email step). A found company gets the confirm
   *  card; a miss stays silent here — if a quotation follows, the
   *  assistant asks for the company in conversation, and the
   *  quote-path lookup above remains as the backstop for any email
   *  given later. Personal-mail domains are skipped. */
  async function lookupCompanyAtStart(email: string) {
    if (lookupAttemptedFor.current === email) return;
    const domain = emailDomain(email);
    if (!domain || isFreeMailDomain(domain)) return;
    lookupAttemptedFor.current = email;
    setCompanyLookup({ status: "searching", email });
    const lookupStartedAt = Date.now();
    const result = await lookupCompanyFromEmail(email);
    const lookupElapsed = Date.now() - lookupStartedAt;
    if (lookupElapsed < MIN_STAGED_VIEW_MS) await sleep(MIN_STAGED_VIEW_MS - lookupElapsed);
    if (result.found) {
      setCompanyLookup({
        status: "confirming",
        email,
        companyName: result.companyName,
        domain: result.domain,
      });
    } else {
      setCompanyLookup({ status: "done", email });
    }
  }

  function confirmCompany() {
    if (companyLookup.status !== "confirming") return;
    const nextFields = { ...fields, company: companyLookup.companyName };
    setFields(nextFields);
    setCompanyLookup({ status: "done", email: companyLookup.email });
    needReplyRef.current = true;
    void send(`Yes — ${companyLookup.companyName} is my company.`, nextFields);
  }

  function declineCompany() {
    if (companyLookup.status !== "confirming") return;
    setCompanyLookup({ status: "done", email: companyLookup.email });
    needReplyRef.current = true;
    void send("No, that's not my company.");
  }

  async function send(rawText: string, fieldsOverride?: GuidedChatAnswers) {
    const file = attachment;
    const text = rawText.trim() || (file ? "I've attached our requirements document — please read it." : "");
    if (!text || sending) return;
    // Front gate: without a gate pass, the first AI turn needs the
    // Turnstile token the widget prepares in the background. If it is
    // not ready yet, hold the message in the composer and say so —
    // the model is never called unverified.
    if (!gatePass && turnstileSiteKey && !turnstileToken) {
      setNotice("One moment — completing the security check. If a \u2018Verify you are human\u2019 box appears above, tick it, then press send again.");
      return;
    }
    if (startedAt === null) setStartedAt(Date.now());
    setDraft("");
    setNotice("");
    setAttachment(null);
    setAttachError("");
    const displayText = file ? `${text}\n📎 ${file.name}` : text;
    const history: ChatMessage[] = [...messages, { role: "user", text: displayText }];
    setMessages(history);
    // A new send finishes any reply still being typed out.
    setTypingIndex(-1);

    // A reference number mentioned anywhere in the message is answered
    // locally with its tracking link — no API call, no guessing at
    // statuses, and no lead details are ever revealed in chat.
    if (!file) {
      const trackUrl = findTrackUrl(text);
      if (trackUrl) {
        setMessages([
          ...history,
          {
            role: "assistant",
            text: "Here's the tracking page for that reference:",
            trackUrl,
          },
        ]);
        return;
      }
    }

    setDocConfirmPending(false);
    setSending(true);
    setReadingDocument(Boolean(file));
    const turnStartedAt = Date.now();
    const apiMessages = history.map((message) => ({ role: message.role, content: message.text }));
    const baseFields = fieldsOverride ?? fields;
    const turnFields: GuidedChatAnswers =
      pinnedEmail && !baseFields.email ? { ...baseFields, email: pinnedEmail } : baseFields;
    let result;
    if (file) {
      const formData = new FormData();
      formData.set("document", file);
      formData.set(
        "payload",
        JSON.stringify({
          messages: apiMessages,
          path,
          fields: turnFields,
          turnstileToken,
          gatePass,
        }),
      );
      result = await sendAiChatDocument(formData);
    } else {
      result = await sendAiChatMessage({
        messages: apiMessages,
        path,
        fields: turnFields,
        turnstileToken,
        gatePass,
      });
    }
    // A document read keeps its staged card up for the same minimum
    // time as the company lookup, so the steps play properly even
    // when the read itself is fast.
    if (file) {
      const turnElapsed = Date.now() - turnStartedAt;
      if (turnElapsed < MIN_STAGED_VIEW_MS) await sleep(MIN_STAGED_VIEW_MS - turnElapsed);
    }
    setSending(false);
    setReadingDocument(false);

    // A fresh gate pass means the token above was just consumed by
    // the verification: keep the pass for later turns. The widget is
    // NOT reset here — a reset re-evaluates at once, and when
    // Cloudflare wants a tick for the re-issue, its box appears in
    // the middle of the conversation, where it reads as a step the
    // chat is waiting on (owner report, 2026-11-09). The send's own
    // fresh token is requested later, when the review step arrives.
    if (result.gatePass) {
      setGatePass(result.gatePass);
      setTurnstileToken("");
    }

    if (!result.ok) {
      if (result.reason === "not-configured") {
        setRuntimeUnavailable(true);
      } else if (result.reason === "verification-failed") {
        setTurnstileResetSignal((value) => value + 1);
        setTurnstileToken("");
        setNotice(
          "The security check didn't go through that time. Please press send again — if it keeps happening, email us at sales@haciensolutions.com and we'll take your request there.",
        );
      } else if (result.reason === "turn-limit") {
        setNotice(
          "This conversation has gone quite long. If your request is complete, its summary is ready above — or you can start over, or email sales@haciensolutions.com and we'll take it from there.",
        );
      } else {
        setNotice(
          "I'm having trouble answering right now. Please try sending that again — or email sales@haciensolutions.com.",
        );
      }
      return;
    }

    setMessages([...history, { role: "assistant", text: result.turn.reply }]);
    setTypingIndex(history.length);
    // The reply to a company confirmation carries the "what do you
    // need" choice box (owner design, 2026-11-09); a document turn's
    // reply carries the confirm-the-list box. Both key off the state
    // of this send, never off the reply's wording.
    if (needReplyRef.current) {
      needReplyRef.current = false;
      setNeedBoxIndex(history.length);
    }
    if (file) setDocConfirmPending(true);
    setPath(result.turn.path);
    setFields(
      pinnedEmail && !result.turn.fields.email
        ? { ...result.turn.fields, email: pinnedEmail }
        : result.turn.fields,
    );
    setReadyToReview(result.turn.readyToReview);
    // The review step's send needs its own fresh token (the gate
    // token was spent on the first turn) — ask the widget for it
    // only now, so a challenge lands in the send's context instead
    // of mid-conversation (owner call, 2026-11-09). Once per chat:
    // later turn results keep reporting readyToReview.
    if (result.turn.readyToReview && !reviewRefreshRef.current) {
      reviewRefreshRef.current = true;
      setTurnstileResetSignal((value) => value + 1);
    }
    void maybeLookupCompany(result.turn, [...history, { role: "assistant", text: result.turn.reply }]);
  }

  function toggleAgreed(checked: boolean) {
    setAgreed(checked);
    setGateWaitLong(false);
    // The lawyer's recording: the ISO timestamp of the tick itself.
    setAcceptedAt(checked ? new Date().toISOString() : "");
  }

  /** The gate's one action: it can only fire with both ticks in —
   *  the agreement and the security token — because the button
   *  stays disabled otherwise; there is no press-and-wait state.
   *  The server still verifies the token before the first AI
   *  turn — this only sequences the screens. */
  function submitGate() {
    if (!agreed || !gateTokenReady) return;
    setGatePassed(true);
  }

  /** The widget's token callback: a token arriving ends the
   *  gate's security wait (Continue lights up); losing one (expiry,
   *  error, reset) restarts the wait from the short form. */
  function handleTurnstileToken(token: string) {
    setTurnstileToken(token);
    setGateWaitLong(false);
  }

  /** The Tourly start's one action: validate the email, hold for the
   *  security check if it is still running, then open the thread with
   *  the email as its first (pinned) message and let the AI reply. */
  async function submitEmail() {
    const email = emailDraft.trim();
    if (!EMAIL_PATTERN.test(email)) {
      setEmailError("That email doesn't look complete — check it and try again.");
      return;
    }
    setEmailError("");
    if (!gatePass && turnstileSiteKey && !turnstileToken) {
      setNotice(
        "One moment — completing the security check. If a \u2018Verify you are human\u2019 box appears below, tick it, then press Go again.",
      );
      return;
    }
    setNotice("");
    setPinnedEmail(email);
    setFields({ email });
    await send(email, { email });
    void lookupCompanyAtStart(email);
  }

  async function handleConfirm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!path || !readyToReview) return;
    const data = new FormData(event.currentTarget);
    if (data.get("_website")) return;
    if (!startedAt) {
      setSubmitStatus("error");
      setSubmitError("Please start again.");
      return;
    }
    setSubmitStatus("sending");
    const elapsed = Date.now() - startedAt;
    if (elapsed < MIN_SUBMIT_TIME_MS) await sleep(MIN_SUBMIT_TIME_MS - elapsed);

    const meta = {
      website: "",
      formStartedAt: String(startedAt),
      turnstileToken: turnstileToken || String(data.get("cf-turnstile-response") || ""),
      agreementAcceptedAt: acceptedAt,
      agreementPolicyVersions: AGREEMENT_POLICY_VERSIONS,
    };
    const payload =
      path === "quote"
        ? buildQuotePayload(fields, requirements, meta)
        : path === "inquiry"
          ? buildInquiryPayload(fields, meta)
          : buildCallbackPayload(fields, meta);

    const sendStartedAt = Date.now();
    const result = await sendInquiryEmail(payload);
    const sendElapsed = Date.now() - sendStartedAt;
    if (sendElapsed < MIN_SENDING_MS) await sleep(MIN_SENDING_MS - sendElapsed);

    if (result.success) {
      setReferenceNumber(result.referenceNumber || "");
      setConfirmationSent(result.confirmationSent === true);
      setSubmitStatus("success");
      if (path === "quote") clearRequirements();
      setTurnstileResetSignal((value) => value + 1);
      setTurnstileToken("");
    } else {
      setSubmitStatus("error");
      setSubmitError(
        result.error || "Unable to send just now. Please try again in a moment — or email sales@haciensolutions.com and we'll take it from there.",
      );
      setTurnstileResetSignal((value) => value + 1);
      setTurnstileToken("");
    }
  }

  const reviewSteps = path ? getChatPath(path).steps : [];
  // `started` (above) drives the Tourly-style start: before the first
  // message the panel shows the centered email start; once the email
  // is sent, the thread takes over, the composer settled under the
  // messages like a chat app. The header above the thread never
  // scrolls (owner screenshot, 2026-11-08: Start over clipped at the
  // panel top when the whole panel shared one scroll area).

  // The gate's intro (title block + helper line) renders around the
  // panel's one Turnstile widget mount — see the scroll area below.
  // (Success and error both imply the gate already passed, so only
  // the unavailable screen needs an explicit exclusion here.)
  const showGateIntro = !gatePassed && !(unavailable && !started);
  // While the gate pass is held and the review step is not yet
  // reached, the widget has no job — but left drawn it keeps its
  // last frame on screen (the ticked "Success!" bar) for the whole
  // conversation, reading as a step the chat is stuck on (owner
  // report, 2026-11-09). Its wrapper is hidden for that window
  // instead: the widget stays mounted, so nothing re-evaluates,
  // and it reappears at the review step together with the send's
  // fresh-token refresh.
  const widgetDormant = gatePass.length > 0 && !readyToReview;

  return (
    <div
      className="relative flex min-h-0 flex-1 flex-col"
      onDragOver={(event) => {
        event.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragOver(false);
        stageFile(event.dataTransfer.files?.[0] ?? null);
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={AI_DOCUMENT_ACCEPT}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
        onChange={(event) => {
          stageFile(event.currentTarget.files?.[0] ?? null);
          event.currentTarget.value = "";
        }}
      />
      {dragOver ? (
        <div
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-ink/20 p-6"
          aria-hidden="true"
        >
          <div className="w-full max-w-sm rounded-3xl border-2 border-dashed border-blue bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-grey-200 bg-white text-2xl shadow-sm">
              📎
            </div>
            <div className="mt-4 text-lg font-bold text-ink">Drop your file here</div>
            <p className="mt-1 text-sm leading-6 text-grey-600">
              BOQ, RFQ, or a photo of your list
              <br />
              PDF or image · up to 10 MB · one file
            </p>
          </div>
        </div>
      ) : null}
      {/* Right padding keeps the title and Start over clear of the
          panel's close button, which floats over the top-right
          corner (owner screenshot, 2026-11-08: it clipped the
          Start over label). */}
      <div className="flex shrink-0 items-center gap-3 pt-4 pr-12 pl-4 sm:pt-5 sm:pl-5">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue text-sm font-bold text-white" aria-hidden="true">
          H
        </div>
        <div className="font-bold whitespace-nowrap text-ink">HACIEN AI assistant</div>
        {started && submitStatus !== "success" ? (
          <button
            type="button"
            onClick={resetAll}
            className="ml-auto cursor-pointer text-xs font-bold text-blue hover:underline"
          >
            Start over
          </button>
        ) : null}
      </div>

      <div data-chat-scroll className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 sm:px-5 sm:pb-5">
        {/* While the gate is up, its intro renders around the widget
            mount below: the title block, then the helper line in the
            gate column. */}
        {showGateIntro ? (
          <>
            <div className="mt-6 pt-[6vh]">
              <div className="text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-blue text-base font-bold text-white" aria-hidden="true">
                  H
                </div>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink">{GATE_TITLE}</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-grey-700">{GATE_TEXT}</p>
              </div>
            </div>
            <div className="mx-auto mt-6 max-w-md">
              <p className="text-[13px] leading-5 text-grey-600">{GATE_HELPER}</p>
            </div>
          </>
        ) : null}

        {/* The panel's ONE Turnstile widget, in a fixed mount that
            never moves for the whole session: its first token gates
            the first AI turn (verified on the server before the model
            is called), and a fresh token from the same widget later
            gates the send. Interaction-only appearance — invisible
            unless Cloudflare challenges. A mount that MOVES remounts
            the widget, and Cloudflare treats the remount as a new
            widget and challenges the visitor a second time at the
            email step (owner report, 2026-11-09; an earlier build
            swapped this mount between two positions) — so the gate
            is built around this fixed spot instead: while the gate
            is up, the wrapper takes the gate column's width, which
            puts a challenged box directly above the agreement tick
            in the branch below; while the gate pass is held and the
            review step is still ahead, the wrapper is hidden (see
            widgetDormant above). A class change does not remount. */}
        <div className={showGateIntro ? "mx-auto max-w-md" : widgetDormant ? "hidden" : undefined}>
          <TurnstileField
            siteKey={turnstileSiteKey}
            resetSignal={turnstileResetSignal}
            onTokenChange={handleTurnstileToken}
            highlight={gateWaiting && gateWaitLong}
            onChallengeVisible={setSendChallengeVisible}
          />
        </div>

        {submitStatus === "success" && path ? (
          <div className="mt-6 space-y-6">
            <AgentMessage
              text={`Thanks${fields.name ? `, ${fields.name}` : ""} — we've got your request. A member of the HACIEN team will review it and reply.`}
            />
            <div className="rounded-3xl border border-grey-200 bg-grey-50 p-6 text-center">
              <div className="text-sm font-bold uppercase tracking-[0.18em] text-grey-600">
                {SUCCESS_TITLES[path]}
              </div>
              <p className="mt-3 text-sm text-grey-600">{replyTime}</p>
              {confirmationSent ? (
                <p className="mt-2 text-sm text-grey-600">A confirmation email is on its way to your inbox.</p>
              ) : null}
              {referenceNumber ? (
                <div className="mx-auto mt-5 max-w-sm rounded-2xl border border-grey-200 bg-white p-4 text-sm text-ink">
                  Reference: <span className="font-bold">{referenceNumber}</span>
                  <Link href={`/track/${referenceNumber}`} className="ml-3 font-bold text-blue hover:underline">
                    Track request
                  </Link>
                </div>
              ) : null}
            </div>
            <button
              type="button"
              onClick={resetAll}
              className="button-glow min-h-11 cursor-pointer rounded-full bg-blue px-6 py-3 text-sm font-bold text-white"
            >
              Start another request
            </button>
          </div>
        ) : submitStatus === "error" ? (
          <div className="mt-6 space-y-6">
            <AgentMessage text="Something went wrong sending that. Your answers are still here — you can try again, or email sales@haciensolutions.com and we'll pick it up from there." />
            <p className="text-sm font-semibold text-red-600" role="alert">
              {submitError}
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitStatus("idle");
                setTurnstileResetSignal((value) => value + 1);
              }}
              className="min-h-11 cursor-pointer rounded-full border border-danger px-6 py-3 text-sm font-semibold text-red-700 hover:bg-red-100"
            >
              Try again
            </button>
          </div>
        ) : unavailable && !started ? (
          <div className="mt-6 space-y-6 pt-[6vh]">
            <AgentMessage text={UNAVAILABLE_TEXT} />
          </div>
        ) : !gatePassed ? (
          // The gate's lower half — its intro and the security-check
          // box render above, around the fixed widget mount. This
          // arm carries the agreement tick, Continue, and the wait.
          <div className="mx-auto max-w-md">
            <label
              htmlFor="ai-chat-agree"
              className="mt-4 flex cursor-pointer items-start gap-2.5 text-sm leading-6 text-ink"
            >
              <input
                id="ai-chat-agree"
                type="checkbox"
                checked={agreed}
                onChange={(event) => toggleAgreed(event.currentTarget.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#2563EB]"
              />
              <span>
                I agree to the{" "}
                <Link href="/terms" className="font-semibold text-blue hover:underline">
                  Terms of Use
                </Link>{" "}
                and have read the{" "}
                <Link href="/privacy" className="font-semibold text-blue hover:underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            <button
              type="button"
              onClick={submitGate}
              disabled={!agreed || !gateTokenReady}
              className={
                agreed && gateTokenReady
                  ? "button-glow mt-5 min-h-11 w-full cursor-pointer rounded-full bg-blue px-6 text-sm font-bold text-white hover:bg-blue-dark"
                  : "mt-5 min-h-11 w-full cursor-not-allowed rounded-full bg-grey-200 px-6 text-sm font-bold text-grey-600"
              }
            >
              Continue
            </button>
            {gateWaiting ? (
              // The chat's own processing row carries the wait —
              // one loading style for the whole panel. Past two
              // seconds its label names the missing tick instead of
              // calling the wait a check in progress.
              <div className="mt-4">
                <ProcessingRow
                  label={
                    gateWaitLong
                      ? "Tick the \u2018Verify you are human\u2019 box above to continue"
                      : "Completing security check…"
                  }
                />
              </div>
            ) : null}
          </div>
        ) : !started ? (
          <div className="mt-6 space-y-6 pt-[6vh]">
            <div className="text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-blue text-base font-bold text-white" aria-hidden="true">
                H
              </div>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink">{START_TITLE}</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-grey-700">{START_TEXT}</p>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void submitEmail();
              }}
              className="mx-auto max-w-md"
            >
              <div className="flex items-end gap-2 rounded-full border border-grey-200 bg-white p-2 shadow-sm focus-within:border-blue">
                <label htmlFor="ai-chat-email" className="sr-only">
                  Work email
                </label>
                <input
                  id="ai-chat-email"
                  type="email"
                  autoComplete="email"
                  value={emailDraft}
                  onChange={(event) => setEmailDraft(event.currentTarget.value)}
                  placeholder="you@company.com"
                  className="min-h-11 min-w-0 flex-1 bg-transparent px-4 text-sm outline-none"
                />
                <button
                  type="submit"
                  className="button-glow min-h-11 shrink-0 cursor-pointer rounded-full bg-blue px-6 text-sm font-bold text-white hover:bg-blue-dark"
                >
                  Go
                </button>
              </div>
              {emailError ? (
                <p className="mt-2 text-center text-sm font-semibold text-red-600" role="alert">
                  {emailError}
                </p>
              ) : null}
            </form>
            {notice ? <AgentMessage text={notice} /> : null}
            {requirements.length > 0 ? (
              <p className="text-center text-sm text-grey-700">
                Your list of {requirements.length} item{requirements.length === 1 ? "" : "s"} from Products will be
                attached to your request.
              </p>
            ) : null}
            <p className="text-center text-xs leading-5 text-grey-600">
              We look up your company from a work email — a personal email works too.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {messages.map((message, index) =>
              message.role === "user" ? (
                // Every message scrolls normally — the first one (the
                // email) was pinned to the thread top in the Tourly
                // build; the owner asked for the pin to go (2026-11-08).
                <UserBubble key={index} value={message.text} />
              ) : (
                <div key={index} className="space-y-2">
                  {index === typingIndex ? (
                    <TypingAgentMessage
                      text={message.text}
                      showAvatar={messages[index - 1]?.role !== "assistant"}
                      onTick={scrollThreadToBottom}
                      onDone={() => setTypingIndex(-1)}
                    />
                  ) : (
                    <AgentMessage text={message.text} showAvatar={messages[index - 1]?.role !== "assistant"} />
                  )}
                  {message.trackUrl ? (
                    <Link
                      href={message.trackUrl}
                      className="ml-11 inline-block rounded-full border border-grey-200 bg-white px-4 py-2 text-sm font-bold text-blue shadow-sm hover:border-blue"
                    >
                      Open tracking page →
                    </Link>
                  ) : null}
                </div>
              ),
            )}

            {sending ? (
              readingDocument ? (
                <DocumentProcessingView />
              ) : (
                <ProcessingRow />
              )
            ) : null}
            {!sending && companyLookup.status === "searching" ? (
              <StagedProgressView label="Looking up · Your company" stages={COMPANY_LOOKUP_STAGES} />
            ) : null}
            {companyLookup.status === "confirming" ? (
              <div>
                <AgentMessage
                  text={`I found ${companyLookup.companyName} at ${companyLookup.domain} — is this your company?`}
                />
                <div className="ml-11 mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={confirmCompany}
                    className="cursor-pointer rounded-full border border-grey-200 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-blue hover:text-blue"
                  >
                    Yes, that&rsquo;s my company
                  </button>
                  <button
                    type="button"
                    onClick={declineCompany}
                    className="cursor-pointer rounded-full border border-grey-200 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-blue hover:text-blue"
                  >
                    No, I&rsquo;ll type it
                  </button>
                </div>
              </div>
            ) : null}

            {showNeedChoices ? (
              <ChatChoiceBox
                caption="Attach works for an RFQ, a bill of quantities, a specification sheet, or a photo of your list — we read it into the request."
                choices={[
                  {
                    label: "Attach a document or photo",
                    icon: "attach",
                    onPick: () => {
                      setNeedBoxIndex(-1);
                      fileInputRef.current?.click();
                    },
                  },
                  {
                    label: "I'll type it",
                    onPick: () => {
                      setNeedBoxIndex(-1);
                      document.getElementById("ai-chat-message")?.focus();
                    },
                  },
                  {
                    label: "Arrange a callback instead",
                    onPick: () => {
                      setNeedBoxIndex(-1);
                      void send("Arrange a callback");
                    },
                  },
                ]}
              />
            ) : null}
            {showDocChoices ? (
              <ChatChoiceBox
                choices={[
                  { label: "Looks right", onPick: () => void send("Looks right") },
                  { label: "Needs changes", onPick: () => void send("Needs changes") },
                ]}
              />
            ) : null}
            {showPathChoices ? (
              <ChatChoiceBox
                choices={[
                  { label: "Quotation request", onPick: () => void send("Quotation request") },
                  { label: "General inquiry", onPick: () => void send("General inquiry") },
                  { label: "Arrange a callback", onPick: () => void send("Arrange a callback") },
                ]}
              />
            ) : null}
            {showCallbackChoices ? (
              <ChatChoiceBox
                choices={CALLBACK_TIME_OPTIONS.map((option) => ({
                  label: option,
                  onPick: () => void send(option),
                }))}
              />
            ) : null}

            {notice ? <AgentMessage text={notice} /> : null}

            {unavailable ? (
              <AgentMessage text={UNAVAILABLE_TEXT} />
            ) : readyToReview && path && submitStatus !== "sending" ? (
              <form onSubmit={handleConfirm} className="space-y-6">
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label>
                    Website
                    <input type="text" name="_website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
                <input type="hidden" name="formStartedAt" value={startedAt ? String(startedAt) : ""} readOnly />
                <AgentMessage text="Here's what I'll send — please check it:" />
                <div className="rounded-3xl border border-grey-200 bg-white p-5">
                  <p className="text-sm font-semibold text-ink">
                    Please confirm these details are correct before sending.
                  </p>
                  {reviewSteps.map((step) => {
                    const value = fields[step.id] || "";
                    if (!value) return null;
                    return (
                      <div key={step.id} className="border-b border-grey-200 py-3 text-sm last:border-0">
                        <div className="font-semibold text-grey-700">{step.question}</div>
                        <div className="mt-1 text-ink">{value}</div>
                      </div>
                    );
                  })}
                  {path === "quote" && requirements.length > 0 ? (
                    <div className="py-3 text-sm">
                      <div className="font-semibold text-grey-700">Requirement package</div>
                      <div className="mt-1 text-ink">
                        {requirements.length} item{requirements.length === 1 ? "" : "s"} from the quote page will be
                        sent with this request.
                      </div>
                    </div>
                  ) : null}
                  <p className="pt-3 text-xs leading-5 text-grey-600">
                    No online payment is collected. Every request receives a reference number and is reviewed before a
                    quotation is prepared.
                  </p>
                  <p className="mt-2 text-xs text-grey-600">
                    By submitting, you agree to our{" "}
                    <Link href="/privacy" className="font-semibold text-blue hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="/terms" className="font-semibold text-blue hover:underline">
                      Terms of Use
                    </Link>
                    .
                  </p>
                  <button
                    type="submit"
                    disabled={turnstilePending}
                    className={`button-glow mt-4 min-h-11 rounded-full bg-blue px-6 py-3 text-sm font-bold text-white ${turnstilePending ? "cursor-wait opacity-60" : "cursor-pointer"}`}
                  >
                    {turnstilePending ? "Completing security check…" : "Looks good — send request"}
                  </button>
                  {turnstilePending && sendChallengeVisible ? (
                    <p className="mt-3 text-xs leading-5 text-grey-600">
                      A &lsquo;Verify you are human&rsquo; box is showing at the top of this chat — tick it, and this
                      button will be ready to send.
                    </p>
                  ) : null}
                </div>
              </form>
            ) : submitStatus === "sending" ? (
              <ProcessingRow label="Sending your request…" />
            ) : (
              <>
                {attachment ? (
                  <div className="rounded-2xl border border-grey-200 bg-grey-50 px-4 py-2">
                    <div className="flex items-center gap-2 text-sm text-ink">
                      <span aria-hidden="true">📎</span>
                      <span className="min-w-0 flex-1 truncate font-semibold">{attachment.name}</span>
                      <span className="shrink-0 text-xs text-grey-600">
                        {(attachment.size / 1024).toFixed(0)} KB — read when you send
                      </span>
                      <button
                        type="button"
                        onClick={() => setAttachment(null)}
                        className="shrink-0 cursor-pointer font-bold text-blue hover:underline"
                        aria-label="Remove attachment"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-grey-600">
                      Read only to prepare your request. Please don&rsquo;t attach IDs or tax papers.
                    </p>
                  </div>
                ) : null}
                {attachError ? (
                  <p className="text-sm font-semibold text-red-600" role="alert">
                    {attachError}
                  </p>
                ) : null}
                <MessageComposer
                  id="ai-chat-message"
                  label="Type your message"
                  kind="text"
                  value={draft}
                  onChange={setDraft}
                  onSubmit={send}
                  placeholder="Type your message…"
                  autoFocus={false}
                  onAttach={() => fileInputRef.current?.click()}
                />
              </>
            )}
            <div ref={bottomRef} aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );
}
