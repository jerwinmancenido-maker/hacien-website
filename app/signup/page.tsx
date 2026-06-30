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
  title: "Contact HACIEN | Customer Access",
  description:
    "Contact HACIEN about customer access, RFQ follow-up, software subscriptions, support coordination, and account context.",
};

const accountBenefits = [
  ["Company-first access", "Customer accounts should be tied to verified customer organizations and purchasing context."],
  ["Procurement continuity", "RFQs, quotations, orders, invoices, subscriptions, and support should stay connected."],
  ["Support without restarting", "Customers should be able to continue conversations from existing procurement history."],
];

const inquiryTypes = ["Customer portal access", "RFQ follow-up", "Software subscriptions", "Support coordination"];

export default function SignupPage() {
  const erpUrl =
    process.env.NEXT_PUBLIC_ERP_URL?.trim() || "https://erp.haciensolutions.com/login";
  const isErpExternal = erpUrl.startsWith("http");

  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <GradientBackground />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <AnimatedContent className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
              Request Access
            </AnimatedContent>
            <SplitText
              as="h1"
                text="Request the right HACIEN access path."
              className="mt-5 max-w-5xl text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
            />
            <BlurReveal delay={160}>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                HACIEN starts with the relationship and the requirement. Use RFQ for new needs,
                support for follow-up, and contact for customer access questions.
              </p>
            </BlurReveal>
            <AnimatedContent delay={260} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="button-glow focus-ring rounded bg-[#1457d9] px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-900/15"
              >
                Contact HACIEN
              </Link>
              <Link
                href={erpUrl}
                target={isErpExternal ? "_blank" : undefined}
                rel={isErpExternal ? "noopener noreferrer" : undefined}
                className="interactive-link focus-ring rounded border border-slate-300 bg-white/80 px-5 py-3 text-center text-sm font-bold text-slate-900"
              >
                Authorized ERP Sign In
              </Link>
            </AnimatedContent>
          </div>

          <AnimatedContent delay={140} direction="left">
            <BorderGlow className="rounded-lg bg-white/[0.86] p-6 shadow-2xl shadow-slate-950/10">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
                Access Inquiry
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-950 sm:text-2xl">
                Customer access is handled by conversation.
              </h2>
              <div className="mt-7 grid gap-3" aria-describedby="signup-status">
                {inquiryTypes.map((type) => (
                  <div key={type} className="rounded border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800">
                    {type}
                  </div>
                ))}
              </div>
              <p id="signup-status" className="mt-4 text-sm leading-6 text-slate-600">
                Submit an RFQ or contact HACIEN so the correct access path can be reviewed.
              </p>
            </BorderGlow>
          </AnimatedContent>
        </div>
      </section>

      <section className="bg-[#071426] px-4 py-18 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Relationship-first access</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
              Customer accounts should support procurement relationships and controlled continuity.
            </h2>
          </AnimatedContent>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {accountBenefits.map(([title, text], index) => (
              <AnimatedContent key={title} delay={index * 80}>
                <SpotlightCard
                  className="h-full rounded-lg border border-white/12 bg-white/[0.06] p-6"
                  spotlightColor="rgba(96, 165, 250, 0.14)"
                >
                  <h3 className="text-xl font-bold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
