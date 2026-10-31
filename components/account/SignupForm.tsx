"use client";

import { useState } from "react";
import { submitCustomerSignup } from "@/app/actions/customer-signup";

type SignupStatus = "idle" | "submitting" | "success" | "error";

export function SignupForm() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SignupStatus>("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    const result = await submitCustomerSignup(formData);
    setStatus(result.success ? "success" : "error");
    setMessage(result.message);
  }

  return (
    <form action={handleSubmit} className="surface grid gap-4 rounded p-6">
      <input type="hidden" name="sourceUrl" value="/signup" />
      <label className="grid gap-2 text-sm font-semibold text-grey-700">
        Contact name
        <input
          name="contactName"
          required
          autoComplete="name"
          className="focus-ring min-h-12 rounded border border-grey-200 bg-white px-4"
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-grey-700">
        Work email
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="focus-ring min-h-12 rounded border border-grey-200 bg-white px-4"
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-grey-700">
        Company or agency
        <input
          name="organizationName"
          required
          autoComplete="organization"
          className="focus-ring min-h-12 rounded border border-grey-200 bg-white px-4"
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-grey-700">
        Phone
        <input
          name="phone"
          autoComplete="tel"
          className="focus-ring min-h-12 rounded border border-grey-200 bg-white px-4"
        />
      </label>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="button-glow rounded bg-blue px-5 py-3 text-sm font-bold text-white disabled:bg-slate-300"
      >
        {status === "submitting" ? "Submitting..." : "Create account request"}
      </button>
      {message ? (
        <p
          className={
            status === "error"
              ? "text-sm font-semibold text-red-700"
              : "text-sm font-semibold text-emerald-700"
          }
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
