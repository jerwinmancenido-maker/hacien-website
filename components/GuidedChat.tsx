"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuoteCart } from "@/components/QuoteCartProvider";
import { sendInquiryEmail } from "@/app/actions/send-inquiry";
import { replyTime } from "@/data/companyContact";
import { TurnstileField } from "@/components/TurnstileField";
import {
  CHAT_PATHS,
  getChatPath,
  validateStepAnswer,
  type ChatPathId,
  type ChatStep,
} from "@/lib/guided-chat/steps";
import {
  buildCallbackPayload,
  buildInquiryPayload,
  buildQuotePayload,
  buildTrackUrl,
  type GuidedChatAnswers,
} from "@/lib/guided-chat/payloads";

/** Minimum time between starting the chat and submitting, matching the
 *  server's anti-spam check (3 seconds). The chat enforces it client-side
 *  by waiting out the remainder instead of failing the submit. */
const MIN_SUBMIT_TIME_MS = 3000;

/** Shortest time the "Sending your request" line stays visible, so the
 *  handover reads as a process instead of a flash. The send itself is real. */
const MIN_SENDING_MS = 700;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const SUCCESS_TITLES: Record<Exclude<ChatPathId, "track">, string> = {
  quote: "Quotation request received",
  inquiry: "Inquiry sent",
  callback: "Callback request received",
};

type ProcessingPhase = "checking" | "sending" | null;

export function GuidedChat({
  turnstileSiteKey,
  form,
}: {
  turnstileSiteKey: string;
  /** The full form, shown when the visitor prefers it over the chat. */
  form: React.ReactNode;
}) {
  const { requirements, clearRequirements } = useQuoteCart();
  const [mode, setMode] = useState<"chat" | "form">("chat");
  const [pathId, setPathId] = useState<ChatPathId | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<GuidedChatAnswers>({});
  const [draft, setDraft] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [processing, setProcessing] = useState<ProcessingPhase>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);

  function resetAll() {
    setPathId(null);
    setStepIndex(0);
    setAnswers({});
    setDraft("");
    setFieldError("");
    setStatus("idle");
    setProcessing(null);
    setErrorMessage("");
    setReferenceNumber("");
    setTurnstileResetSignal((value) => value + 1);
    setStartedAt(null);
  }

  function choosePath(id: ChatPathId) {
    setPathId(id);
    setStepIndex(0);
    setAnswers({});
    setDraft("");
    setFieldError("");
  }

  function answerStep(step: ChatStep, value: string) {
    const error = validateStepAnswer(step, value);
    if (error) {
      setFieldError(error);
      return;
    }
    setAnswers((current) => ({ ...current, [step.id]: value.trim() }));
    setDraft("");
    setFieldError("");
    setStepIndex((current) => current + 1);
  }

  function skipStep(step: ChatStep) {
    setAnswers((current) => ({ ...current, [step.id]: "" }));
    setDraft("");
    setFieldError("");
    setStepIndex((current) => current + 1);
  }

  function editStep(index: number) {
    if (!pathId) return;
    const step = getChatPath(pathId).steps[index];
    setStepIndex(index);
    setDraft(answers[step.id] || "");
    setFieldError("");
  }

  async function handleConfirm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!pathId || pathId === "track") return;
    const data = new FormData(event.currentTarget);
    if (data.get("_website")) return;
    if (!startedAt) {
      setStatus("error");
      setErrorMessage("Please start again.");
      return;
    }
    setStatus("sending");
    setProcessing("checking");
    const elapsed = Date.now() - startedAt;
    if (elapsed < MIN_SUBMIT_TIME_MS) await sleep(MIN_SUBMIT_TIME_MS - elapsed);

    const meta = {
      website: "",
      formStartedAt: String(startedAt),
      turnstileToken: String(data.get("cf-turnstile-response") || ""),
    };
    const payload =
      pathId === "quote"
        ? buildQuotePayload(answers, requirements, meta)
        : pathId === "inquiry"
          ? buildInquiryPayload(answers, meta)
          : buildCallbackPayload(answers, meta);

    setProcessing("sending");
    const sendStartedAt = Date.now();
    const result = await sendInquiryEmail(payload);
    const sendElapsed = Date.now() - sendStartedAt;
    if (sendElapsed < MIN_SENDING_MS) await sleep(MIN_SENDING_MS - sendElapsed);

    setProcessing(null);
    if (result.success) {
      setReferenceNumber(result.referenceNumber || "");
      setStatus("success");
      if (pathId === "quote") clearRequirements();
      setTurnstileResetSignal((value) => value + 1);
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Unable to send. Please try again later.");
      setTurnstileResetSignal((value) => value + 1);
    }
  }

  if (mode === "form") {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <button
          type="button"
          onClick={() => setMode("chat")}
          className="min-h-11 cursor-pointer rounded-full border border-grey-200 bg-white px-4 py-2 text-sm font-bold text-ink hover:bg-grey-50"
        >
          Back to the guided chat
        </button>
        {form}
      </div>
    );
  }

  const path = pathId ? getChatPath(pathId) : null;
  const steps = path?.steps ?? [];
  const isConfirm = path !== null && stepIndex >= steps.length;
  const totalSteps = steps.length + 1;
  const progress = path ? Math.round(((stepIndex + (isConfirm ? 1 : 0)) / totalSteps) * 100) : 0;

  return (
    <div className="mx-auto max-w-3xl">
      <ChatHeader path={path} progress={progress} stepIndex={stepIndex} totalSteps={totalSteps} onStartOver={resetAll} />

      {status === "success" && pathId && pathId !== "track" ? (
        <div className="mt-6 space-y-6">
          <AgentMessage
            text={`Thanks${answers.name ? `, ${answers.name}` : ""} — we've got your request. A member of the HACIEN team will review it and reply.`}
          />
          <div className="rounded-3xl border border-grey-200 bg-grey-50 p-6 text-center">
            <div className="text-sm font-bold uppercase tracking-[0.18em] text-grey-600">
              {SUCCESS_TITLES[pathId]}
            </div>
            <p className="mt-3 text-sm text-grey-600">{replyTime}</p>
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
      ) : status === "error" ? (
        <div className="mt-6 space-y-6">
          <AgentMessage text="Something went wrong sending that. Your answers are still here — you can try again." />
          <p className="text-sm font-semibold text-red-600" role="alert">
            {errorMessage}
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setTurnstileResetSignal((value) => value + 1);
            }}
            className="min-h-11 cursor-pointer rounded-full border border-danger px-6 py-3 text-sm font-semibold text-red-700 hover:bg-red-100"
          >
            Try again
          </button>
        </div>
      ) : !path ? (
        <div className="mt-6 space-y-6">
          <AgentMessage text="Hi, this is the HACIEN team. Tell me what you need and I'll make sure it reaches the right person." />
          <p className="ml-11 -mt-3 text-sm text-grey-600">
            A real person from the HACIEN team reads every request.
          </p>
          <div className="grid gap-2">
            {CHAT_PATHS.map((candidate) => (
              <button
                key={candidate.id}
                type="button"
                onClick={() => {
                  if (startedAt === null) setStartedAt(Date.now());
                  choosePath(candidate.id);
                }}
                className="flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-2xl bg-grey-50 px-5 py-4 text-left hover:bg-grey-100"
              >
                <span>
                  <span className="block font-bold text-ink">{candidate.label}</span>
                  <span className="mt-0.5 block text-sm text-grey-600">{candidate.description}</span>
                </span>
                <span aria-hidden="true" className="shrink-0 text-lg font-bold text-grey-600">
                  →
                </span>
              </button>
            ))}
          </div>
          <FormSwitch onSwitch={() => setMode("form")} />
        </div>
      ) : status === "sending" ? (
        <div className="mt-6 space-y-6">
          {steps.map((step) => {
            const value = answers[step.id] || "";
            if (!value) return null;
            return (
              <div key={step.id}>
                <AgentMessage text={step.question} />
                <UserBubble value={value} />
              </div>
            );
          })}
          <ProcessingView phase={processing} />
        </div>
      ) : path.id === "track" && answers.reference ? (
        <div className="mt-6 space-y-6">
          <AgentMessage text={path.steps[0].question} />
          <UserBubble value={answers.reference} />
          <TrackResult reference={answers.reference} onStartOver={resetAll} />
          <FormSwitch onSwitch={() => setMode("form")} />
        </div>
      ) : isConfirm ? (
        <form onSubmit={handleConfirm} className="mt-6 space-y-6">
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label>
              Website
              <input type="text" name="_website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <input type="hidden" name="formStartedAt" value={startedAt ? String(startedAt) : ""} readOnly />

          {steps.map((step, index) => {
            const value = answers[step.id] || "";
            if (!value) return null;
            return (
              <div key={step.id}>
                <AgentMessage text={step.question} />
                <UserBubble value={value} onEdit={() => editStep(index)} />
              </div>
            );
          })}

          <AgentMessage text="Here's what I have — does this look right?" />
          <div className="rounded-3xl bg-grey-50 p-5">
            {path.id === "quote" && requirements.length > 0 ? (
              <div className="border-b border-grey-200 pb-3 text-sm">
                <div className="font-semibold text-grey-700">Requirement package ({requirements.length})</div>
                {requirements.map((requirement) => (
                  <div key={requirement.id} className="mt-1 text-ink">
                    {requirement.categoryLabel} — {requirement.quantity}
                  </div>
                ))}
                <p className="mt-2 text-xs text-grey-600">
                  Sent with this request. To change items, use the full form below.
                </p>
              </div>
            ) : null}
            <p className="pt-3 text-xs leading-5 text-grey-600">
              No online payment is collected. Every request receives a reference number and is reviewed before a quotation is prepared.
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
              <TurnstileField siteKey={turnstileSiteKey} resetSignal={turnstileResetSignal} />
            </div>
            <button
              type="submit"
              className="button-glow mt-4 min-h-11 cursor-pointer rounded-full bg-blue px-6 py-3 text-sm font-bold text-white"
            >
              Looks good — send request
            </button>
          </div>
          <FormSwitch onSwitch={() => setMode("form")} />
        </form>
      ) : (
        <div className="mt-6 space-y-6">
          {steps.slice(0, stepIndex).map((answeredStep, index) => {
            const value = answers[answeredStep.id] || "";
            if (!value) return null;
            return (
              <div key={answeredStep.id}>
                <AgentMessage text={answeredStep.question} />
                <UserBubble value={value} onEdit={() => editStep(index)} />
              </div>
            );
          })}
          <ChatStepInput
            step={steps[stepIndex]}
            draft={draft}
            onDraftChange={setDraft}
            fieldError={fieldError}
            onAnswer={(value) => answerStep(steps[stepIndex], value)}
            onSkip={() => skipStep(steps[stepIndex])}
            onBack={() => {
              if (stepIndex === 0) {
                setPathId(null);
                setDraft("");
                setFieldError("");
              } else {
                editStep(stepIndex - 1);
              }
            }}
          />
          <FormSwitch onSwitch={() => setMode("form")} />
        </div>
      )}
    </div>
  );
}

function ChatHeader({
  path,
  progress,
  stepIndex,
  totalSteps,
  onStartOver,
}: {
  path: { id: ChatPathId } | null;
  progress: number;
  stepIndex: number;
  totalSteps: number;
  onStartOver: () => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-white" aria-hidden="true">
          H
        </div>
        <div>
          <div className="font-bold text-ink">HACIEN Team</div>
          <div className="text-xs text-grey-600">Guided chat · {replyTime}</div>
        </div>
      </div>
      {path ? (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-semibold text-grey-600">
            <span>
              Step {Math.min(stepIndex + 1, totalSteps)} of {totalSteps}
            </span>
            <button type="button" onClick={onStartOver} className="cursor-pointer font-bold text-blue hover:underline">
              Start over
            </button>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-grey-200" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full rounded-full bg-blue transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function AgentMessage({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-white" aria-hidden="true">
        H
      </div>
      <p className="min-w-0 pt-1 text-base leading-7 text-ink">{text}</p>
    </div>
  );
}

function UserBubble({ value, onEdit }: { value: string; onEdit?: () => void }) {
  return (
    <div className="mt-2 flex flex-col items-end gap-1">
      <div className="max-w-[85%] rounded-3xl rounded-br-md bg-blue px-4 py-2.5 text-sm leading-6 text-white">
        {value}
      </div>
      {onEdit ? (
        <button type="button" onClick={onEdit} className="cursor-pointer pr-1 text-xs font-bold text-blue hover:underline">
          Edit
        </button>
      ) : null}
    </div>
  );
}

function FormSwitch({ onSwitch }: { onSwitch: () => void }) {
  return (
    <div className="text-center">
      <button type="button" onClick={onSwitch} className="min-h-11 cursor-pointer text-sm font-bold text-blue hover:underline">
        Prefer the full form?
      </button>
    </div>
  );
}

function ChatStepInput({
  step,
  draft,
  onDraftChange,
  fieldError,
  onAnswer,
  onSkip,
  onBack,
}: {
  step: ChatStep;
  draft: string;
  onDraftChange: (value: string) => void;
  fieldError: string;
  onAnswer: (value: string) => void;
  onSkip: () => void;
  onBack: () => void;
}) {
  if (step.kind === "options") {
    return (
      <div>
        <AgentMessage text={step.question} />
        {step.hint ? <p className="ml-11 mt-1 text-sm text-grey-600">{step.hint}</p> : null}
        <div className="ml-11 mt-3 flex flex-wrap gap-2">
          {step.options?.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onAnswer(option)}
              className="min-h-11 cursor-pointer rounded-full border border-grey-200 bg-white px-4 py-2 text-sm font-semibold text-ink hover:border-blue hover:text-blue"
            >
              {option}
            </button>
          ))}
        </div>
        <div className="ml-11 mt-3 flex gap-4">
          {!step.required ? (
            <button type="button" onClick={onSkip} className="cursor-pointer text-sm font-bold text-blue hover:underline">
              Skip
            </button>
          ) : null}
          <button type="button" onClick={onBack} className="cursor-pointer text-sm font-bold text-grey-700 hover:underline">
            Back
          </button>
        </div>
        {fieldError ? (
          <p className="ml-11 mt-2 text-sm font-semibold text-red-600" role="alert">
            {fieldError}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      <AgentMessage text={step.question} />
      {step.hint ? <p className="ml-11 mt-1 text-sm text-grey-600">{step.hint}</p> : null}
      <form
        className="sticky bottom-4 mt-3"
        onSubmit={(event) => {
          event.preventDefault();
          onAnswer(draft);
        }}
      >
        <div className="flex items-end gap-2 rounded-3xl border border-grey-200 bg-white p-2 shadow-sm focus-within:border-blue">
          <label htmlFor={`guided-chat-${step.id}`} className="sr-only">
            {step.question}
          </label>
          {step.kind === "textarea" ? (
            <textarea
              id={`guided-chat-${step.id}`}
              key={step.id}
              autoFocus
              required={step.required}
              aria-required={step.required}
              rows={3}
              value={draft}
              onChange={(event) => onDraftChange(event.currentTarget.value)}
              placeholder={step.placeholder}
              className="min-w-0 flex-1 resize-none bg-transparent px-3 py-2 text-sm leading-6 outline-none"
            />
          ) : (
            <input
              id={`guided-chat-${step.id}`}
              key={step.id}
              autoFocus
              required={step.required}
              aria-required={step.required}
              type={step.kind === "date" ? "date" : step.kind}
              value={draft}
              onChange={(event) => onDraftChange(event.currentTarget.value)}
              placeholder={step.placeholder}
              autoComplete={step.kind === "email" ? "email" : step.kind === "tel" ? "tel" : undefined}
              className="min-h-11 min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"
            />
          )}
          <button
            type="submit"
            aria-label="Send"
            className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full bg-blue text-white hover:bg-blue-dark"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        {fieldError ? (
          <p className="mt-2 text-sm font-semibold text-red-600" role="alert">
            {fieldError}
          </p>
        ) : null}
        <div className="mt-2 flex gap-4 pl-1">
          {!step.required ? (
            <button type="button" onClick={onSkip} className="cursor-pointer text-sm font-bold text-blue hover:underline">
              Skip
            </button>
          ) : null}
          <button type="button" onClick={onBack} className="cursor-pointer text-sm font-bold text-grey-700 hover:underline">
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

function ProcessingView({ phase }: { phase: ProcessingPhase }) {
  const lines = [
    { id: "checking" as const, text: "Checking your answers…" },
    { id: "sending" as const, text: "Sending your request…" },
  ];
  return (
    <div className="space-y-3">
      {lines.map((line) => {
        const done = phase === "sending" && line.id === "checking";
        const active = phase === line.id;
        if (!done && !active) return null;
        return (
          <div key={line.id} className="flex items-center gap-3">
            {done ? (
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue text-xs font-bold text-white" aria-hidden="true">
                ✓
              </span>
            ) : (
              <span className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-grey-300 border-t-blue" aria-hidden="true" />
            )}
            <p className="text-sm text-grey-700">{line.text}</p>
          </div>
        );
      })}
    </div>
  );
}

function TrackResult({ reference, onStartOver }: { reference: string; onStartOver: () => void }) {
  const url = buildTrackUrl(reference);
  if (!url) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-center">
        <p className="text-sm font-semibold text-red-700" role="alert">
          That reference does not look right. It starts with RFQ- and comes from your confirmation message.
        </p>
        <button
          type="button"
          onClick={onStartOver}
          className="mt-3 min-h-11 cursor-pointer rounded-full border border-danger px-5 py-3 text-sm font-semibold text-red-700 hover:bg-red-100"
        >
          Try again
        </button>
      </div>
    );
  }
  return (
    <div className="rounded-3xl border border-grey-200 bg-grey-50 p-5 text-center">
      <p className="text-sm text-grey-700">
        Reference <span className="font-bold text-ink">{reference.trim().toUpperCase()}</span>
      </p>
      <Link
        href={url}
        className="button-glow mt-4 inline-flex min-h-11 items-center rounded-full bg-blue px-6 py-3 text-sm font-bold text-white"
      >
        Track request
      </Link>
      <div>
        <button
          type="button"
          onClick={onStartOver}
          className="mt-3 min-h-11 cursor-pointer text-sm font-bold text-blue hover:underline"
        >
          Start over
        </button>
      </div>
    </div>
  );
}
