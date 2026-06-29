"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { replyToClarification } from "@/app/actions/reply-clarification";

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

  return (
    <form onSubmit={handleSubmit} className="mt-5 rounded border border-amber-200 bg-amber-50 p-4">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label htmlFor="clarification-message" className="text-sm font-bold text-slate-950">
        Reply to HACIEN
      </label>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Add the requested information using the same reference. HACIEN will continue review after receiving your reply.
      </p>
      <textarea
        id="clarification-message"
        name="message"
        required
        rows={4}
        className="mt-4 w-full rounded border border-amber-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#1457d9] focus:ring-2 focus:ring-blue-100"
        placeholder="Provide the requested clarification..."
      />
      {status === "error" ? (
        <p className="mt-3 text-sm font-semibold text-red-700">{errorMessage}</p>
      ) : null}
      {status === "success" ? (
        <p className="mt-3 text-sm font-semibold text-emerald-700">
          Clarification received. HACIEN will continue the review.
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 inline-flex rounded bg-[#071426] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1457d9] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send clarification"}
      </button>
    </form>
  );
}
