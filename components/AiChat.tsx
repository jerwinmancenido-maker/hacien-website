"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useQuoteCart } from "@/components/QuoteCartProvider";
import { sendAiChatDocument, sendAiChatMessage } from "@/app/actions/ai-chat";
import { lookupCompanyFromEmail } from "@/app/actions/company-lookup";
import { emailDomain, isFreeMailDomain } from "@/lib/ai/company-lookup";
import { AI_DOCUMENT_ACCEPT, validateAiDocument } from "@/lib/ai/document";
import { sendInquiryEmail } from "@/app/actions/send-inquiry";
import { replyTime } from "@/data/companyContact";
import { AgentMessage, MessageComposer, UserBubble } from "@/components/GuidedChat";
import { TurnstileField } from "@/components/TurnstileField";
import { getChatPath } from "@/lib/guided-chat/steps";
import {
  buildCallbackPayload,
  buildInquiryPayload,
  buildQuotePayload,
  findTrackUrl,
  type GuidedChatAnswers,
} from "@/lib/guided-chat/payloads";
import type { AiChatPath } from "@/lib/ai/intake";

/** The AI conversation for the website chat panel.
 *
 * The assistant answers questions and collects the same intake fields
 * the guided steps collect (see lib/ai/intake). When the intake is
 * complete, the visitor checks the SAME review card the guided chat
 * shows and the request is submitted through the SAME sendInquiryEmail
 * action — same Gateway record, reference number, and emails.
 *
 * Failure is a mode switch, never a dead end: no API key, the daily
 * cap, or an API error hands the visitor to the guided questions.
 */

const MIN_SUBMIT_TIME_MS = 3000;
const MIN_SENDING_MS = 700;
/** Staged progress cards (document reading, company lookup) stay on
 *  screen at least this long so their step animation plays properly
 *  instead of flashing past when the work is fast (owner request,
 *  2026-11-08). */
const MIN_STAGED_VIEW_MS = 2_000;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const SUCCESS_TITLES: Record<AiChatPath, string> = {
  quote: "Quotation request received",
  inquiry: "Inquiry sent",
  callback: "Callback request received",
};

const GREETING =
  "Hi, I'm the HACIEN AI assistant. Ask me about what we supply, delivery, or how quoting works — or just tell me what you need and I'll prepare your request. A real person from the HACIEN team reads every submitted request.";

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
  onUseGuided,
  onUnavailable,
}: {
  turnstileSiteKey: string;
  /** Switch the panel to the guided questions. */
  onUseGuided: () => void;
  /** The AI is not configured at all — the panel should stop offering it. */
  onUnavailable: () => void;
}) {
  const { requirements, clearRequirements } = useQuoteCart();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
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
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachError, setAttachError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [readingDocument, setReadingDocument] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [companyLookup, setCompanyLookup] = useState<CompanyLookupState>({ status: "idle" });
  const lookupAttemptedFor = useRef<string | null>(null);

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

  // Keep the newest message in view: after every reply (and every
  // panel state change), scroll the chat panel's scroll area to the
  // bottom sentinel.
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Before the first message the start screen must stay where it
    // opened (the lowered, centred greeting) — scrolling on mount
    // pushed the greeting out of view.
    if (!started) return;
    const node = bottomRef.current;
    if (!node) return;
    const container = node.closest<HTMLElement>("[data-chat-scroll]");
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    } else if (typeof node.scrollIntoView === "function") {
      node.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, sending, readyToReview, submitStatus, notice, companyLookup, started]);

  function resetAll() {
    setMessages([]);
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
    setAttachment(null);
    setAttachError("");
    setReadingDocument(false);
    setCompanyLookup({ status: "idle" });
    lookupAttemptedFor.current = null;
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

  function confirmCompany() {
    if (companyLookup.status !== "confirming") return;
    const nextFields = { ...fields, company: companyLookup.companyName };
    setFields(nextFields);
    setCompanyLookup({ status: "done", email: companyLookup.email });
    void send(`Yes — ${companyLookup.companyName} is my company.`, nextFields);
  }

  function declineCompany() {
    if (companyLookup.status !== "confirming") return;
    setCompanyLookup({ status: "done", email: companyLookup.email });
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
      setNotice("One moment — completing the security check. Press send again in a few seconds.");
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

    setSending(true);
    setReadingDocument(Boolean(file));
    const turnStartedAt = Date.now();
    const apiMessages = history.map((message) => ({ role: message.role, content: message.text }));
    let result;
    if (file) {
      const formData = new FormData();
      formData.set("document", file);
      formData.set(
        "payload",
        JSON.stringify({
          messages: apiMessages,
          path,
          fields: fieldsOverride ?? fields,
          turnstileToken,
          gatePass,
        }),
      );
      result = await sendAiChatDocument(formData);
    } else {
      result = await sendAiChatMessage({
        messages: apiMessages,
        path,
        fields: fieldsOverride ?? fields,
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
    // the verification: keep the pass for later turns and let the
    // widget issue a fresh token for the eventual send.
    if (result.gatePass) {
      setGatePass(result.gatePass);
      setTurnstileResetSignal((value) => value + 1);
      setTurnstileToken("");
    }

    if (!result.ok) {
      if (result.reason === "not-configured") {
        onUnavailable();
        setNotice(
          "The AI assistant isn't available right now. The guided questions take your request the same way.",
        );
      } else if (result.reason === "verification-failed") {
        setTurnstileResetSignal((value) => value + 1);
        setTurnstileToken("");
        setNotice(
          "We couldn't complete the security check. Please press send again, or switch to the guided questions.",
        );
      } else if (result.reason === "turn-limit") {
        setNotice(
          "This conversation has gone quite long. You can start over, or switch to the guided questions to send your request.",
        );
      } else {
        setNotice(
          "I'm having trouble answering right now. You can retry, or switch to the guided questions.",
        );
      }
      return;
    }

    setMessages([...history, { role: "assistant", text: result.turn.reply }]);
    setPath(result.turn.path);
    setFields(result.turn.fields);
    setReadyToReview(result.turn.readyToReview);
    void maybeLookupCompany(result.turn, [...history, { role: "assistant", text: result.turn.reply }]);
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
      setSubmitError(result.error || "Unable to send. Please try again later.");
      setTurnstileResetSignal((value) => value + 1);
      setTurnstileToken("");
    }
  }

  const reviewSteps = path ? getChatPath(path).steps : [];
  // `started` (above) drives the Tourly-style start: before the first
  // message the greeting + composer group sits lowered; on the first
  // send the padding glides away and the conversation takes the full
  // column, the composer settling under the messages like a chat app.

  return (
    <div
      className={`mx-auto max-w-3xl rounded-3xl ${dragOver ? "outline-2 outline-dashed outline-blue" : ""}`}
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
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue text-sm font-bold text-white" aria-hidden="true">
          H
        </div>
        <div>
          <div className="font-bold text-ink">HACIEN AI assistant</div>
          <div className="text-xs text-grey-600">AI chat · {replyTime}</div>
        </div>
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
          <AgentMessage text="Something went wrong sending that. Your answers are still here — you can try again." />
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
      ) : (
        <div className={`mt-6 space-y-6 transition-[padding] duration-500 ${started ? "pt-0" : "pt-[9vh]"}`}>
          <AgentMessage text={GREETING} />
          {messages.map((message, index) =>
            message.role === "user" ? (
              <UserBubble key={index} value={message.text} />
            ) : (
              <div key={index} className="space-y-2">
                <AgentMessage text={message.text} />
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
              <p className="ml-11 text-sm text-grey-600">Typing…</p>
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

          {notice ? (
            <div className="space-y-3">
              <AgentMessage text={notice} />
              <button
                type="button"
                onClick={onUseGuided}
                className="ml-11 min-h-11 cursor-pointer rounded-full bg-blue px-6 py-3 text-sm font-bold text-white"
              >
                Use guided questions
              </button>
            </div>
          ) : null}

          {/* The one Turnstile widget for the whole panel, mounted
              from the start: its first token gates the first AI turn
              (verified on the server before the model is called), and
              a fresh token from the same widget later gates the send.
              Interaction-only appearance — invisible unless Cloudflare
              challenges this visitor. */}
          <TurnstileField
            siteKey={turnstileSiteKey}
            resetSignal={turnstileResetSignal}
            onTokenChange={setTurnstileToken}
          />

          {readyToReview && path && submitStatus !== "sending" ? (
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
              </div>
            </form>
          ) : submitStatus === "sending" ? (
            <AgentMessage text="Sending your request…" />
          ) : (
            <>
              {attachment ? (
                <div className="flex items-center gap-2 rounded-2xl border border-grey-200 bg-grey-50 px-4 py-2 text-sm text-ink">
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
              />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer text-sm font-bold text-blue hover:underline"
                >
                  📎 Attach a document (BOQ, RFQ, or photo)
                </button>
                <button
                  type="button"
                  onClick={onUseGuided}
                  className="cursor-pointer text-sm font-bold text-blue hover:underline"
                >
                  Prefer step-by-step questions?
                </button>
              </div>
              <p className="text-xs text-grey-600">
                Documents are read only to prepare your quotation request. Please do not attach IDs or tax papers.
              </p>
            </>
          )}
          <div ref={bottomRef} aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
