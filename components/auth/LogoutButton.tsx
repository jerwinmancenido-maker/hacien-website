"use client";

import { useState } from "react";

import { logoutCustomer } from "@/app/actions/auth";

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);
    await logoutCustomer();
    window.location.href = "/";
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:bg-slate-50 disabled:opacity-60"
    >
      {isLoading ? "Signing out..." : "Sign Out"}
    </button>
  );
}
