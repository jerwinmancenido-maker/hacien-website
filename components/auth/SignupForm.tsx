"use client";

import { useState } from "react";

import { registerCustomerAccount } from "@/app/actions/auth";

type SignupResult = {
  success: boolean;
  message: string;
};

export function SignupForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    const result: SignupResult = await registerCustomerAccount(formData);
    setStatus(result.success ? "success" : "error");
    setMessage(result.message);
  }

  return (
    <form action={handleSubmit} className="surface grid gap-4 rounded-2xl p-6">
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Contact name
        <input
          name="contactName"
          required
          autoComplete="name"
          className="focus-ring min-h-12 rounded-xl border border-slate-300 bg-white px-4"
          placeholder="Maria Santos"
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Work email
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="focus-ring min-h-12 rounded-xl border border-slate-300 bg-white px-4"
          placeholder="name@company.com"
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Company / organization
        <input
          name="organizationName"
          required
          autoComplete="organization"
          className="focus-ring min-h-12 rounded-xl border border-slate-300 bg-white px-4"
          placeholder="Company Name"
        />
      </label>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="button-glow rounded-full bg-[#1457d9] px-5 py-3 text-sm font-bold text-white disabled:bg-slate-300"
      >
        {status === "submitting" ? "Creating request..." : "Create Customer Account Request"}
      </button>

      {message ? (
        <p className={status === "error" ? "text-sm font-semibold text-red-600" : "text-sm font-semibold text-emerald-700"}>
          {message}
        </p>
      ) : null}
    </form>
  );
}

