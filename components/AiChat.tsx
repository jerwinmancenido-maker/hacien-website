"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useQuoteCart } from "@/components/QuoteCartProvider";
import { sendAiChatMessage } from "@/app/actions/ai-chat";
import { sendInquiryEmail } from "@/app/actions/send-inquiry";
import { replyTime } from "@/data/companyContact";
import { AgentMessage, MessageComposer, UserBubble } from "@/components/GuidedChat";
import { TurnstileField } from "@/components/TurnstileField";
import { CHAT_PATHS, getChatPath, type ChatPathId } from "@/lib/guided-chat/steps";
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

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  trackUrl?: string;
};

const PATH_STARTERS: Record<ChatPathId, string> = {
  quote: "I'd like a quotation.",
  inquiry: "I have a question for the team.",
  callback: "Please call me back.",
  track: "I want to track my request.",
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

  const turnstilePending = Boolean(turnstileSiteKey) && turnstileToken.length === 0;
  const started = messages.length > 0;

  // Keep the newest message in view: after every reply (and every
  // panel state change), scroll the chat panel's scroll area to the
  // bottom sentinel.
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = bottomRef.current;
    if (!node) return;
    const container = node.closest<HTMLElement>("[data-chat-scroll]");
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    } else if (typeof node.scrollIntoView === "function") {
      node.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, sending, readyToReview, submitStatus, notice]);

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
  }

  async function send(rawText: string) {
    const text = rawText.trim();
    if (!text || sending) return;
    if (startedAt === null) setStartedAt(Date.now());
    setDraft("");
    setNotice("");
    const history: ChatMessage[] = [...messages, { role: "user", text }];
    setMessages(history);

    // A reference number mentioned anywhere in the message is answered
    // locally with its tracking link — no API call, no guessing at
    // statuses, and no lead details are ever revealed in chat.
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

    setSending(true);
    const result = await sendAiChatMessage({
      messages: history.map((message) => ({ role: message.role, content: message.text })),
      path,
      fields,
    });
    setSending(false);

    if (!result.ok) {
      if (result.reason === "not-configured") {
        onUnavailable();
        setNotice(
          "The AI assistant isn't available right now. The guided questions take your request the same way.",
        );
      } else if (result.reason === "daily-cap") {
        setNotice(
          "The AI assistant has reached today's limit. The guided questions take your request the same way.",
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

  return (
    <div className="mx-auto max-w-3xl">
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
        <div className="mt-6 space-y-6">
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

          {!started ? (
            <div className="grid gap-2">
              {CHAT_PATHS.map((candidate) => (
                <button
                  key={candidate.id}
                  type="button"
                  onClick={() => send(PATH_STARTERS[candidate.id])}
                  className="flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-2xl border border-grey-200 bg-white px-5 py-4 text-left shadow-sm hover:border-blue hover:shadow"
                >
                  <span>
                    <span className="block font-bold text-ink">{candidate.label}</span>
                    <span className="mt-0.5 block text-sm text-grey-600">{candidate.description}</span>
                  </span>
                  <span aria-hidden="true" className="shrink-0 text-xl font-bold text-blue">
                    →
                  </span>
                </button>
              ))}
            </div>
          ) : null}

          {sending ? <p className="ml-11 text-sm text-grey-600">Typing…</p> : null}

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
                <div className="mt-4">
                  <TurnstileField
                    siteKey={turnstileSiteKey}
                    resetSignal={turnstileResetSignal}
                    onTokenChange={setTurnstileToken}
                  />
                </div>
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
              <MessageComposer
                id="ai-chat-message"
                label="Type your message"
                kind="text"
                value={draft}
                onChange={setDraft}
                onSubmit={send}
                placeholder="Type your message…"
                required
                autoFocus={false}
              />
              <button
                type="button"
                onClick={onUseGuided}
                className="cursor-pointer text-sm font-bold text-blue hover:underline"
              >
                Prefer step-by-step questions?
              </button>
            </>
          )}
          <div ref={bottomRef} aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
