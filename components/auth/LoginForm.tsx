"use client";

import { useState } from "react";

import { loginCustomer } from "@/app/actions/auth";

type LoginResult = {
  success: boolean;
  message: string;
  nextUrl?: string;
};

export function LoginForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [nextUrl, setNextUrl] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    const result: LoginResult = await loginCustomer(formData);
    setStatus(result.success ? "success" : "error");
    setMessage(result.message);
    setNextUrl(result.success ? result.nextUrl ?? "" : result.nextUrl ?? "");
  }

  return (
    <form action={handleSubmit} className="surface grid gap-4 rounded-2xl p-6">
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Work email
        <input
          type="email"
          name="email"
          required
          autoComplete="username"
          className="focus-ring min-h-12 rounded-xl border border-slate-300 bg-white px-4"
          placeholder="name@company.com"
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Password
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="focus-ring min-h-12 rounded-xl border border-slate-300 bg-white px-4"
          placeholder="••••••••"
        />
      </label>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="button-glow rounded-full bg-[#1457d9] px-5 py-3 text-sm font-bold text-white disabled:bg-slate-300"
      >
        {status === "submitting" ? "Checking account..." : "Sign In"}
      </button>

      {message ? (
        <p className={status === "error" ? "text-sm font-semibold text-red-600" : "text-sm font-semibold text-emerald-700"}>
          {message}
        </p>
      ) : null}

      {nextUrl ? (
        <p className="text-sm text-slate-600">
          Next step: <a href={nextUrl} className="font-semibold text-[#1457d9]">continue</a>
        </p>
      ) : null}
    </form>
  );
}
