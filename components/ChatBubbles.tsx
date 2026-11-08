"use client";

import type { ChatStepKind } from "@/lib/guided-chat/steps";

/** Shared chat building blocks for the AI chat panel: the agent's grey
 *  bubble, the visitor's blue bubble, and the rounded composer with its
 *  blue send button. These lived in the old guided chat component until
 *  the guided questions were removed (owner decision, 2026-11-08); the
 *  AI chat is now the panel's only mode. */

export function AgentMessage({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue text-xs font-bold text-white" aria-hidden="true">
        H
      </div>
      <p className="min-w-0 max-w-[85%] rounded-3xl rounded-tl-md bg-grey-100 px-4 py-3 text-base leading-7 text-ink">{text}</p>
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
