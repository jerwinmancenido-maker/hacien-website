import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedContent, BorderGlow, SpotlightCard } from "@/app/components/reactbits";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Support",
  description:
    "HACIEN support entry point for RFQ follow-up, procurement coordination, warranty questions, delivery questions, supplier inquiries, and general business support.",
};

const supportPaths = [
  ["RFQ follow-up", "Clarify submitted requirements, quantities, deadlines, or product context.", "/quote"],
  ["Procurement question", "Ask about supplier availability, equivalent options, or quotation assumptions.", "/contact"],
  ["Delivery coordination", "Share delivery context or handover requirements for review.", "/contact"],
  ["Warranty or replacement", "Route post-delivery questions for review without assuming a published warranty policy.", "/contact"],
  ["Supplier or partner", "Introduce supply, fulfillment, implementation, or service capability.", "/contact"],
  ["Policy question", "Review the Trust Center status before relying on a commercial term.", "/trust-center"],
];

const expectations = [
  "Support starts with clear context, not a ticket number promise.",
  "No unsupported SLA is published while operating policies are still being verified.",
  "Payment, warranty, delivery, and return commitments must come from formal documents or verified policies.",
  "Use RFQ for new requirements and Contact for follow-up context.",
];

export default function SupportPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY || "";

  return (
    <>
      <section className="relative overflow-hidden bg-[#071426] px-4 py-18 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="absolute inset-0 hq-grid opacity-80" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <AnimatedContent className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
              Support Desk
            </AnimatedContent>
            <h1 className="mt-5 max-w-5xl text-5xl font-bold tracking-tight sm:text-6xl">
              Support begins by routing the question correctly.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              HACIEN support is designed around procurement context: RFQ review, quotation assumptions, delivery coordination, warranty questions, and post-delivery follow-up.
            </p>
          </div>
          <BorderGlow tone="dark" className="rounded-lg bg-white/[0.07] p-6">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">Current Support Status</div>
            <h2 className="mt-4 text-2xl font-bold">Inquiry routing is available. SLA claims are not published yet.</h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Use this page to choose the correct path. Formal response times, warranty terms, and escalation commitments will be published only after policy verification.
            </p>
          </BorderGlow>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Support Paths</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Choose the path that matches the work.
            </h2>
          </AnimatedContent>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {supportPaths.map(([title, text, href], index) => (
              <AnimatedContent key={title} delay={index * 55}>
                <Link href={href} className="group block h-full">
                  <SpotlightCard className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-950 group-hover:text-[#1457d9]">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                    <div className="mt-5 text-sm font-bold text-[#1457d9]">Continue</div>
                  </SpotlightCard>
                </Link>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Expectations</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Clear support is better than unsupported promises.
            </h2>
          </AnimatedContent>
          <div className="grid gap-4">
            {expectations.map((expectation, index) => (
              <AnimatedContent key={expectation} delay={index * 70}>
                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex gap-4">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded bg-[#071426] text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-slate-700">{expectation}</p>
                  </div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Contact Form</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Send the context HACIEN needs to respond usefully.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Include RFQ reference, products, quantity, date, delivery context, quotation reference, or the policy area you need clarified.
            </p>
          </AnimatedContent>
          <ContactForm turnstileSiteKey={turnstileSiteKey} />
        </div>
      </section>
    </>
  );
}
