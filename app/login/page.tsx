import Link from "next/link";
import type { Metadata } from "next";

import { GradientBackground } from "@/app/components/reactbits";

export const metadata: Metadata = {
  title: "Customer Login",
  description:
    "Customer account sign-in preview for HACIEN. Public access to RFQ and workspace request paths remains active.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  const workspaceUrl = process.env.NEXT_PUBLIC_ERP_URL?.trim() || "https://erp.haciensolutions.com/login";
  const isErpExternal = workspaceUrl.startsWith("http");

  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-12">
      <GradientBackground />
      <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-grey-600">Customer Access</p>
          <h1 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">Customer access is being prepared</h1>
          <p id="login-status" className="mt-4 text-sm leading-6 text-slate-600">
            Customer account login will use HACIEN ERP-backed access after account verification. Existing workspace users should use the workspace login.
          </p>
          <div className="mt-8">
            <Link
              href={workspaceUrl}
              target={isErpExternal ? "_blank" : undefined}
              rel={isErpExternal ? "noopener noreferrer" : undefined}
              className="inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-slate-900"
            >
              Open Workspace Access
            </Link>
          </div>
        </div>

        <aside className="surface grid gap-4 rounded p-6" aria-labelledby="login-accounts-heading">
          <h2 id="login-accounts-heading" className="text-lg font-bold tracking-tight text-slate-950">
            Customer accounts are not open yet
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            To reach us today, request a quotation or send an account request — we reply within 1 business day.
          </p>
          <div className="grid gap-3 sm:flex">
            <Link
              href="/quote"
              className="inline-flex justify-center rounded bg-[#2563EB] px-5 py-3 text-sm font-bold text-white"
            >
              Request a quotation
            </Link>
            <Link
              href="/signup"
              className="inline-flex justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-slate-900"
            >
              Send an account request
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
