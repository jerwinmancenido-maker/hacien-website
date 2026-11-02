"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { replyToClarification } from "@/app/actions/reply-clarification";
import { replyTime } from "@/data/companyContact";

export function ClarificationReplyForm({ referenceNumber }: { referenceNumber: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const startedAtRef = useRef(0);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const result = await replyToClarification({
      referenceNumber,
      message: data.get("message"),
      website: data.get("website"),
      formStartedAt: String(startedAtRef.current),
    });

    if (result.success) {
      setStatus("success");
      form.reset();
      router.refresh();
      return;
    }

    setStatus("error");
    setErrorMessage(result.error || "Unable to receive the clarification. Please try again.");
  }

  const baseId = useId();

  return (
    <form onSubmit={handleSubmit} className="mt-5 rounded border border-grey-200 bg-grey-50 p-4">
      <label htmlFor={`${baseId}-website`} className="sr-only">
        Website
      </label>
      <input id={`${baseId}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label htmlFor={`${baseId}-message`} className="text-sm font-bold text-ink">
        Reply to HACIEN <span className="text-grey-600">*</span>
      </label>
      <p className="mt-2 text-sm leading-6 text-grey-600">
        Add the requested information using the same reference. HACIEN will continue review after receiving your reply.
      </p>
      <p className="mt-1 text-xs text-grey-600">{replyTime}</p>
      <p className="mt-1 text-xs text-grey-600">* required</p>
      <textarea
        id={`${baseId}-message`}
        name="message"
        required
        aria-required="true"
        rows={4}
        className="mt-4 w-full rounded border border-grey-200 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-grey-200"
        placeholder="Provide the requested clarification..."
      />
      {status === "error" ? (
        <p className="mt-3 text-sm font-semibold text-red-700">{errorMessage}</p>
      ) : null}
      {status === "success" ? (
        <p className="mt-3 text-sm font-semibold text-ink">
          Clarification received. HACIEN will continue the review.
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 inline-flex rounded bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-blue disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send clarification"}
      </button>
    </form>
  );
}
