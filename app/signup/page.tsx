import Link from "next/link";
import type { Metadata } from "next";

import { SignupForm } from "@/components/account/SignupForm";
import { GradientBackground } from "@/app/components/reactbits";

export const metadata: Metadata = {
  title: "Customer Signup | HACIEN",
  description:
    "Create an open customer account request for HACIEN. This remains a request/verification flow while ERP integration is prepared.",
};

export default function SignupPage() {
  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-12">
      <GradientBackground />
      <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Open Account</p>
          <h1 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">Create your customer account request</h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Create a HACIEN customer access request. Signup is open, and sensitive account records become visible only after email and organization verification.
          </p>
          <div className="mt-8">
            <Link
              href="/login"
              className="inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-slate-900"
            >
              Already have access?
            </Link>
          </div>
        </div>

        <SignupForm />
      </div>
    </section>
  );
}
