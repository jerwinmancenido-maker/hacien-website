"use client";

import { useEffect, useRef, useState } from "react";
import { UNLISTED_HINT } from "@/lib/ai/chat-product-cards";
import type { ChatStepKind } from "@/lib/guided-chat/steps";

/** Shared chat building blocks for the AI chat panel: the agent's grey
 *  bubble, the visitor's blue bubble, and the rounded composer with its
 *  blue send button. These lived in the old guided chat component until
 *  the guided questions were removed (owner decision, 2026-11-08); the
 *  AI chat is now the panel's only mode. */

export function AgentMessage({ text, showAvatar = true }: { text: string; showAvatar?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      {showAvatar ? (
        <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue text-xs font-bold text-white" aria-hidden="true">
          H
        </div>
      ) : (
        <div className="h-8 w-8 shrink-0" aria-hidden="true" />
      )}
      <p className="min-w-0 max-w-[85%] rounded-3xl rounded-tl-md bg-grey-100 px-4 py-3 text-base leading-7 text-ink">{text}</p>
    </div>
  );
}

/** The agent's bubble with a typewriter reveal (owner request,
 *  2026-11-09). The reply arrives whole — it is safety-checked on the
 *  server before it is ever shown — and is then revealed character by
 *  character so the chat feels typed rather than pasted in. The reveal
 *  takes about the same time whatever the reply's length (the step
 *  grows with the text), tapping the bubble completes it at once, and
 *  visitors who prefer reduced motion get the full text immediately.
 *  Screen readers always get the full text. */
export function TypingAgentMessage({
  text,
  showAvatar = true,
  onTick,
  onDone,
}: {
  text: string;
  showAvatar?: boolean;
  onTick?: () => void;
  onDone: () => void;
}) {
  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [count, setCount] = useState(() => (reducedMotion ? text.length : 0));
  const timerRef = useRef<number | null>(null);
  const onTickRef = useRef(onTick);
  const onDoneRef = useRef(onDone);
  // Keep the latest callbacks in refs (refs may not be written during
  // render); this sync runs before the typing effect below.
  useEffect(() => {
    onTickRef.current = onTick;
    onDoneRef.current = onDone;
  });

  useEffect(() => {
    if (reducedMotion) {
      onDoneRef.current();
      return;
    }
    let shown = 0;
    const step = Math.max(1, Math.ceil(text.length / 60));
    timerRef.current = window.setInterval(() => {
      shown = Math.min(text.length, shown + step);
      setCount(shown);
      onTickRef.current?.();
      if (shown >= text.length) {
        if (timerRef.current) window.clearInterval(timerRef.current);
        onDoneRef.current();
      }
    }, 30);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [text, reducedMotion]);

  function finish() {
    if (timerRef.current) window.clearInterval(timerRef.current);
    setCount(text.length);
    onDoneRef.current();
  }

  return (
    <div className="flex items-start gap-3" onClick={finish}>
      {showAvatar ? (
        <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue text-xs font-bold text-white" aria-hidden="true">
          H
        </div>
      ) : (
        <div className="h-8 w-8 shrink-0" aria-hidden="true" />
      )}
      <p className="min-w-0 max-w-[85%] rounded-3xl rounded-tl-md bg-grey-100 px-4 py-3 text-base leading-7 text-ink">
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">{text.slice(0, count)}</span>
      </p>
    </div>
  );
}

export function UserBubble({ value, onEdit }: { value: string; onEdit?: () => void }) {
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

/** The chat composer: rounded input with a blue send button, sticky to
 *  the bottom of the thread so the conversation always reads as a chat. */
export function MessageComposer({
  id,
  label,
  kind,
  value,
  onChange,
  onSubmit,
  placeholder,
  required,
  autoFocus,
  onAttach,
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
  /** When given, a paperclip button sits inside the composer and
   *  stages a document for the next message. */
  onAttach?: () => void;
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
        {onAttach ? (
          <button
            type="button"
            onClick={onAttach}
            aria-label="Attach a document (BOQ, RFQ, or photo)"
            className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full border border-grey-200 bg-white text-grey-700 hover:border-blue hover:text-blue"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}
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

/** One tappable choice in a ChatChoiceBox. `icon: "attach"` marks the
 *  row as the document action, drawn with the paperclip in a circle. */
export type ChatChoice = {
  label: string;
  icon?: "attach";
  onPick: () => void;
};

/** The choice box (owner design, 2026-11-09): at the chat's decision
 *  points the visitor answers by tapping a row instead of reading the
 *  options spelled out in the assistant's prose. The box renders under
 *  the latest assistant message; an optional caption at its foot names
 *  what an action accepts (the attach row's document kinds). Tapping a
 *  row either sends its label as the visitor's message or fires an
 *  action (attach opens the file picker) — the caller decides. */
export function ChatChoiceBox({ choices, caption }: { choices: ChatChoice[]; caption?: string }) {
  return (
    <div className="ml-11 overflow-hidden rounded-2xl border border-grey-300 bg-white shadow-sm">
      <div className="divide-y divide-grey-200">
        {choices.map((choice) => (
          <button
            key={choice.label}
            type="button"
            onClick={choice.onPick}
            className="flex w-full cursor-pointer items-center gap-2.5 px-4 py-3 text-left text-sm font-semibold text-ink transition hover:bg-grey-50 hover:text-blue"
          >
            {choice.icon === "attach" ? (
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-grey-200 text-blue">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            ) : null}
            <span>{choice.label}</span>
            <span aria-hidden="true" className="ml-auto text-lg leading-none text-grey-400">
              ›
            </span>
          </button>
        ))}
      </div>
      {caption ? (
        <p className="border-t border-grey-200 bg-grey-50 px-4 py-2.5 text-xs leading-5 text-grey-600">{caption}</p>
      ) : null}
    </div>
  );
}

/** Catalogue cards for this reply. A tap sends the product name.
 *  The hint under them is how a visitor names something that is not listed.
 *  No price, stock, or lead time. */
export function ChatProductCards({
  cards,
  tappedName,
  disabled,
  onPick,
}: {
  cards: { name: string; mention?: string }[];
  tappedName?: string;
  disabled?: boolean;
  onPick: (name: string) => void;
}) {
  if (cards.length === 0) return null;
  return (
    <div role="group" aria-label="Products mentioned in this reply" className="ml-11 flex flex-col gap-2">
      {cards.map((card) => {
        const tapped = tappedName === card.name;
        return (
          <button
            key={card.name}
            type="button"
            disabled={disabled}
            aria-pressed={tapped}
            onClick={() => onPick(card.name)}
            className={`focus-ring flex min-h-11 w-full items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-left shadow-sm transition disabled:cursor-not-allowed ${
              tapped ? "border-2 border-blue" : "border-grey-200 hover:border-blue"
            }`}
          >
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold break-words text-ink">{card.name}</span>
              {card.mention ? (
                <span className="mt-0.5 block text-sm leading-5 break-words text-grey-600">{card.mention}</span>
              ) : null}
            </span>
            <span aria-hidden="true" className="text-lg leading-none text-grey-400">
              ›
            </span>
          </button>
        );
      })}
      <p className="px-1 text-sm leading-5 text-grey-600">{UNLISTED_HINT}</p>
    </div>
  );
}
