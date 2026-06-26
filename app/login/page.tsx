import type { Metadata } from "next";
import Link from "next/link";
import {
  AnimatedContent,
  BlurReveal,
  BorderGlow,
  GradientBackground,
  SplitText,
  SpotlightCard,
} from "@/app/components/reactbits";

export const metadata: Metadata = {
  title: "Customer Login Roadmap | HACIEN",
  description:
    "HACIEN customer login is in development for future RFQ tracking, quotation history, order visibility, invoice downloads, software subscriptions, support tickets, and account management.",
};

const workspaceFeatures = [
  "Track RFQs",
  "Review Quotations",
  "Monitor Orders",
  "Download Invoices",
  "Manage Software Subscriptions",
  "Access Support",
];

export default function LoginPage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <GradientBackground />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <AnimatedContent className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
              Customer Login
            </AnimatedContent>
            <SplitText
              as="h1"
              text="Access your HACIEN workspace."
              className="mt-5 max-w-5xl text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
            />
            <BlurReveal delay={160}>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Login previews the future customer workspace: a place to continue RFQs,
                quotation follow-up, order visibility, invoices, subscriptions, and support.
              </p>
            </BlurReveal>
            <AnimatedContent delay={260} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="button-glow focus-ring rounded bg-[#1457d9] px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-900/15"
              >
                Request Access
              </Link>
              <Link
                href="/contact"
                className="interactive-link focus-ring rounded border border-slate-300 bg-white/80 px-5 py-3 text-center text-sm font-bold text-slate-900"
              >
                Contact HACIEN
              </Link>
            </AnimatedContent>
          </div>

          <AnimatedContent delay={140} direction="left">
            <BorderGlow className="rounded-lg bg-white/[0.86] p-6 shadow-2xl shadow-slate-950/10">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
                Coming Soon
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-950 sm:text-2xl">
                Customer accounts are currently in development.
              </h2>
              <form className="mt-7 grid gap-4" aria-describedby="login-status">
                <label className="grid gap-2 text-sm font-bold text-slate-800">
                  Work email
                  <input
                    disabled
                    type="email"
                    placeholder="name@company.com"
                    className="rounded border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-500"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-slate-800">
                  Password
                  <input
                    disabled
                    type="password"
                    placeholder="Password access coming soon"
                    className="rounded border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-500"
                  />
                </label>
                <button disabled type="button" className="rounded bg-slate-300 px-5 py-3 text-sm font-bold text-slate-600">
                  Sign in coming soon
                </button>
              </form>
              <p id="login-status" className="mt-4 text-sm leading-6 text-slate-600">
                This preview does not sign users in, store credentials, or create accounts.
              </p>
            </BorderGlow>
          </AnimatedContent>
        </div>
      </section>

      <section className="bg-[#071426] px-4 py-18 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Planned Workspace</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
              Future account access should make procurement history easier to continue.
            </h2>
          </AnimatedContent>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {workspaceFeatures.map((feature, index) => (
              <AnimatedContent key={feature} delay={index * 55}>
                <SpotlightCard
                  className="h-full rounded-lg border border-white/12 bg-white/[0.06] p-5"
                  spotlightColor="rgba(96, 165, 250, 0.14)"
                >
                  <div className="text-sm font-bold text-white">{feature}</div>
                  <p className="mt-2 text-xs leading-5 text-slate-300">Planned customer workspace capability.</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
