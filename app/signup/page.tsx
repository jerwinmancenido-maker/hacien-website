import Link from "next/link";
import type { Metadata } from "next";

import { SignupForm } from "@/components/account/SignupForm";
import { GradientBackground } from "@/app/components/reactbits";

export const metadata: Metadata = {
  title: "Request Customer Access",
  description:
    "Create an open customer account request for HACIEN. This remains a request/verification flow while ERP integration is prepared.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupPage() {
  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-12">
      <GradientBackground />
      <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-grey-600">Customer Access Request</p>
          <h1 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">Request customer portal access</h1>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Submit a request for HACIEN customer portal access. Submitting this form does not create an account. Customer accounts are by request: our team reviews each request, and sign-in opens for approved accounts when the Customer Workspace launches; we'll let you know.
          </p>
          <div className="mt-8">
            <Link
              href="/customer-workspace"
              className="inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-slate-900"
            >
              Already requested access?
            </Link>
          </div>
        </div>

        <SignupForm />
      </div>
    </section>
  );
}
