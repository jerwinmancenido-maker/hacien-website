"use client";

/** Pages that send visitors into the chat dispatch this event; FloatingChat
 *  listens for it and opens the panel. */
export const OPEN_CHAT_EVENT = "hacien:open-chat";

/** The invitation card that replaces the old full forms on /quote, /contact,
 *  and /support. The floating chat panel opens by itself on those pages —
 *  this card is what a visitor sees, and can act on, if they closed it. */
export function ChatInvitation({
  heading,
  text,
  buttonLabel,
  note,
}: {
  heading: string;
  text: string;
  buttonLabel: string;
  note?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-grey-200 bg-white p-6 text-center shadow-sm sm:p-10">
      <h2 className="text-2xl font-bold tracking-tight text-ink">{heading}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-grey-700 sm:text-base sm:leading-7">
        {text}
      </p>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event(OPEN_CHAT_EVENT))}
        className="mt-6 min-h-11 cursor-pointer rounded-full bg-blue px-6 py-3 text-sm font-bold text-white hover:bg-blue-dark"
      >
        {buttonLabel}
      </button>
      {note ? <p className="mt-4 text-xs leading-5 text-grey-600 sm:text-sm">{note}</p> : null}
    </div>
  );
}
