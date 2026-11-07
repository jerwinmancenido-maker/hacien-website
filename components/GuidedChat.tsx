"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuoteCart } from "@/components/QuoteCartProvider";
import { sendInquiryEmail } from "@/app/actions/send-inquiry";
import { parseDocument } from "@/app/actions/parse-document";
import { replyTime } from "@/data/companyContact";
import { TurnstileField } from "@/components/TurnstileField";
import {
  CHAT_PATHS,
  getChatPath,
  validateStepAnswer,
  type ChatPathId,
  type ChatStep,
  type ChatStepKind,
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
  const [confirmationSent, setConfirmationSent] = useState(false);
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
    setConfirmationSent(false);
    setTurnstileResetSignal((value) => value + 1);
    setStartedAt(null);
  }

  function choosePath(id: ChatPathId, prefill?: GuidedChatAnswers) {
    setPathId(id);
    setStepIndex(0);
    setAnswers(prefill ?? {});
    setDraft("");
    setFieldError("");
  }

  /** A typed message on the path screen starts the inquiry path with the
   *  text already recorded as the answer to "What do you need?" — the
   *  customer then picks the inquiry type and the need step is skipped. */
  function startInquiryWithMessage(text: string) {
    if (!text.trim()) return;
    if (startedAt === null) setStartedAt(Date.now());
    choosePath("inquiry", { need: text.trim() });
  }

  function answerStep(step: ChatStep, value: string) {
    const error = validateStepAnswer(step, value);
    if (error) {
      setFieldError(error);
      return;
    }
    const nextAnswers = { ...answers, [step.id]: value.trim() };
    setAnswers(nextAnswers);
    setDraft("");
    setFieldError("");
    if (!pathId) return;
    // Skip past any step already answered (e.g. the need, pre-filled from
    // a typed message on the path screen) instead of asking it again.
    const pathSteps = getChatPath(pathId).steps;
    let next = stepIndex + 1;
    while (next < pathSteps.length && nextAnswers[pathSteps[next].id]) next += 1;
    setStepIndex(next);
  }

  function skipStep(step: ChatStep) {
    setAnswers((current) => {
      const next = { ...current, [step.id]: "" };
      // Skipping the document step drops the file details too, so a
      // skipped-then-submitted request never carries a stale attachment.
      if (step.id === "attachment") {
        next.attachmentName = "";
        next.attachmentType = "";
        next.attachmentSizeKb = "";
      }
      return next;
    });
    setDraft("");
    setFieldError("");
    setStepIndex((current) => current + 1);
  }

  /** The quote path's optional document step: the existing parse-document
   *  action checks the file and names its likely kind from the filename —
   *  it does not read the contents. The request carries the file details
   *  (name, size, type), exactly like the full form's attachment. */
  async function uploadAttachment(step: ChatStep, file: File) {
    setFieldError("");
    const data = new FormData();
    data.append("document", file);
    const result = await parseDocument(data);
    if (!result.success) {
      setFieldError(result.message);
      return;
    }
    const sizeKb = Math.round(file.size / 1024);
    const nextAnswers = {
      ...answers,
      [step.id]: `${file.name} — ${result.extractedFields.documentType}`,
      attachmentName: file.name,
      attachmentType: file.type,
      attachmentSizeKb: String(sizeKb),
    };
    setAnswers(nextAnswers);
    setDraft("");
    setFieldError("");
    if (!pathId) return;
    const pathSteps = getChatPath(pathId).steps;
    let next = stepIndex + 1;
    while (next < pathSteps.length && nextAnswers[pathSteps[next].id]) next += 1;
    setStepIndex(next);
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
      setConfirmationSent(result.confirmationSent === true);
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
          <MessageComposer
            id="guided-chat-message"
            label="Type your message"
            kind="text"
            value={draft}
            onChange={setDraft}
            onSubmit={startInquiryWithMessage}
            placeholder="Type your message…"
            required
            autoFocus={false}
          />
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
            {answers.attachmentName ? (
              <div className="border-b border-grey-200 pb-3 text-sm">
                <div className="font-semibold text-grey-700">Attached document</div>
                <div className="mt-1 text-ink">{answers.attachmentName}</div>
                <p className="mt-2 text-xs text-grey-600">
                  HACIEN reviews the document with your request.
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
            onUpload={(file) => uploadAttachment(steps[stepIndex], file)}
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
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue text-sm font-bold text-white" aria-hidden="true">
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
      <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue text-xs font-bold text-white" aria-hidden="true">
        H
      </div>
      <p className="min-w-0 max-w-[85%] rounded-3xl rounded-tl-md bg-grey-100 px-4 py-3 text-base leading-7 text-ink">{text}</p>
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
  onUpload,
  onSkip,
  onBack,
}: {
  step: ChatStep;
  draft: string;
  onDraftChange: (value: string) => void;
  fieldError: string;
  onAnswer: (value: string) => void;
  onUpload: (file: File) => void;
  onSkip: () => void;
  onBack: () => void;
}) {
  if (step.kind === "file") {
    return <FileStepInput step={step} fieldError={fieldError} onUpload={onUpload} onSkip={onSkip} onBack={onBack} />;
  }

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
      <MessageComposer
        id={`guided-chat-${step.id}`}
        label={step.question}
        kind={step.kind}
        value={draft}
        onChange={onDraftChange}
        onSubmit={onAnswer}
        placeholder={step.placeholder}
        required={step.required}
        autoFocus
      />
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
    </div>
  );
}

/** The quote path's document step: a file picker, not a text box. The
 *  chosen file is checked by the parse-document action; only its details
 *  travel with the request, so the customer is told plainly that HACIEN
 *  follows up for the file itself. */
function FileStepInput({
  step,
  fieldError,
  onUpload,
  onSkip,
  onBack,
}: {
  step: ChatStep;
  fieldError: string;
  onUpload: (file: File) => void;
  onSkip: () => void;
  onBack: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  return (
    <div>
      <AgentMessage text={step.question} />
      {step.hint ? <p className="ml-11 mt-1 text-sm text-grey-600">{step.hint}</p> : null}
      <div className="ml-11 mt-3 space-y-3">
        <label className="block min-h-11 cursor-pointer rounded-2xl border border-grey-200 bg-white px-4 py-3 text-sm font-semibold text-ink hover:border-blue">
          {file ? file.name : "Choose a file"}
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.txt"
            className="sr-only"
            onChange={(event) => setFile(event.currentTarget.files?.[0] ?? null)}
          />
        </label>
        {file ? (
          <p className="text-sm text-grey-600">
            {file.name} ({Math.round(file.size / 1024)} KB)
          </p>
        ) : null}
        <p className="text-xs leading-5 text-grey-600">
          The file details go with your request; HACIEN will ask for the file itself if needed.
        </p>
        <button
          type="button"
          disabled={!file || uploading}
          onClick={async () => {
            if (!file) return;
            setUploading(true);
            await onUpload(file);
            setUploading(false);
          }}
          className="button-glow min-h-11 cursor-pointer rounded-full bg-blue px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? "Checking your file…" : "Upload and continue"}
        </button>
        <div className="flex gap-4">
          {!step.required ? (
            <button type="button" onClick={onSkip} className="cursor-pointer text-sm font-bold text-blue hover:underline">
              Skip
            </button>
          ) : null}
          <button type="button" onClick={onBack} className="cursor-pointer text-sm font-bold text-grey-700 hover:underline">
            Back
          </button>
        </div>
      </div>
      {fieldError ? (
        <p className="ml-11 mt-2 text-sm font-semibold text-red-600" role="alert">
          {fieldError}
        </p>
      ) : null}
    </div>
  );
}

/** The chat composer: rounded input with a blue send button. Shared by the
 *  step input and the message box on the path screen, so the chat always
 *  looks like a chat — a text box is visible from the first screen. */
function MessageComposer({
  id,
  label,
  kind,
  value,
  onChange,
  onSubmit,
  placeholder,
  required,
  autoFocus,
}: {
  id: string;
  label: string;
  kind: ChatStepKind | "text";
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
}) {
  return (
    <form
      className="sticky bottom-4 mt-3"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(value);
      }}
    >
      <div className="flex items-end gap-2 rounded-3xl border border-grey-200 bg-white p-2 shadow-sm focus-within:border-blue">
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        {kind === "textarea" ? (
          <textarea
            id={id}
            key={id}
            autoFocus={autoFocus}
            required={required}
            aria-required={required}
            rows={3}
            value={value}
            onChange={(event) => onChange(event.currentTarget.value)}
            placeholder={placeholder}
            className="min-w-0 flex-1 resize-none bg-transparent px-3 py-2 text-sm leading-6 outline-none"
          />
        ) : (
          <input
            id={id}
            key={id}
            autoFocus={autoFocus}
            required={required}
            aria-required={required}
            type={kind === "date" ? "date" : kind}
            value={value}
            onChange={(event) => onChange(event.currentTarget.value)}
            placeholder={placeholder}
            autoComplete={kind === "email" ? "email" : kind === "tel" ? "tel" : undefined}
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
    </form>
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
