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
import { ContactForm } from "@/components/ContactForm";
import { QuoteRequestForm } from "@/components/QuoteRequestForm";

export const metadata: Metadata = {
  title: "Contact HACIEN | Request a Quote",
  description:
    "Contact HACIEN for request for quotation support, government procurement, supplier and partnership inquiries, support coordination, and IT sourcing in the Philippines.",
};

const inquiryRoutes = [
  ["Quotation", "Send a product list, BOQ, technical specification, deadline, or delivery context for RFQ review.", "/quote"],
  ["Government", "Ask about specification review, equivalent matching, documentation support, and institutional procurement.", "/government-procurement"],
  ["Supplier / Partner", "Introduce authorized supply, implementation, fulfillment, warranty, delivery support, or collaboration capability.", "/support"],
  ["General Business", "Ask about company information, project coordination, recurring sourcing, or business communication.", "/support"],
  ["Existing Customer Support", "Request follow-up for procurement, delivery, warranty, replacement, or post-delivery coordination.", "/support"],
];

const responseSignals = [
  "Clear product or service requirement",
  "Quantity, timeline, and delivery location",
  "Warranty or support expectations",
  "Government or institutional documentation needs",
  "Existing BOQ, technical specification, or attachment context",
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <GradientBackground />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <AnimatedContent className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
              Contact HACIEN
            </AnimatedContent>
            <SplitText
              as="h1"
              text="Start the right procurement conversation."
              className="mt-5 max-w-5xl text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
            />
            <BlurReveal delay={160}>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Contact converts interest into a clear next step: quotation, government procurement,
                supplier inquiry, partnership, or support direction.
              </p>
            </BlurReveal>
            <AnimatedContent delay={260} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="button-glow focus-ring rounded bg-[#1457d9] px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-900/15"
              >
                Start an RFQ
              </Link>
              <Link
                href="/support"
                className="interactive-link focus-ring rounded border border-slate-300 bg-white/80 px-5 py-3 text-center text-sm font-bold text-slate-900"
              >
                Support desk
              </Link>
            </AnimatedContent>
          </div>

          <AnimatedContent delay={140} direction="left">
            <BorderGlow className="rounded-lg bg-white/[0.86] p-6 shadow-2xl shadow-slate-950/10">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
                Faster Response
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-950 sm:text-2xl">
                The more complete the context, the cleaner the sourcing and quotation path.
              </h2>
              <div className="mt-8 grid gap-3">
                {responseSignals.map((signal, index) => (
                  <div key={signal} className="flex items-center gap-3 rounded border border-slate-200 bg-slate-50 px-4 py-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#071426] text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm font-bold text-slate-800">{signal}</span>
                  </div>
                ))}
              </div>
            </BorderGlow>
          </AnimatedContent>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Inquiry Routing</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Choose the path that matches the work.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              HACIEN keeps inquiry routing structured because each path requires different review,
              documentation, supplier coordination, and follow-up.
            </p>
          </AnimatedContent>
          <div className="grid gap-5 md:grid-cols-2">
            {inquiryRoutes.map(([title, text, href], index) => (
              <AnimatedContent key={title} delay={index * 60}>
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

      <section className="bg-[#071426] px-4 py-18 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Formal RFQ</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Send a structured requirement for review.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">
              Use this for product sourcing, software licensing, infrastructure projects,
              CCTV/security requirements, government procurement support, and project delivery coordination.
            </p>
            <p className="mt-5 max-w-2xl rounded border border-white/12 bg-white/[0.06] p-4 text-sm leading-6 text-slate-300">
              Current requests move through RFQ review, direct communication, and formal quotation follow-up.
            </p>
          </AnimatedContent>
          <QuoteRequestForm />
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <ContactForm />
          <AnimatedContent>
            <BorderGlow className="rounded-lg bg-white p-6 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
                Direct Contact
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
                For general inquiries, start here.
              </h2>
              <div className="mt-6 grid gap-5 text-sm leading-7 text-slate-700">
                <div>
                  <div className="font-bold text-slate-950">Current contact channel</div>
                  <p>Use the RFQ or contact forms while HACIEN verifies public email, phone, and address details.</p>
                </div>
                <div>
                  <div className="font-bold text-slate-950">Current website behavior</div>
                  <p>No online payment is collected through Contact. Product requests move through RFQ review and formal quotation.</p>
                </div>
              </div>
            </BorderGlow>
          </AnimatedContent>
        </div>
      </section>
    </>
  );
}
