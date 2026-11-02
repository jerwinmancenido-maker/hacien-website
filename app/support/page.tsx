import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedContent, SpotlightCard } from "@/app/components/reactbits";
import { ContactForm } from "@/components/ContactForm";
import { enterpriseImages } from "@/components/EnterpriseImagery";
import { PremiumPageHero } from "@/components/PremiumPageHero";

export const metadata: Metadata = {
  title: "Support",
  description:
    "HACIEN support entry point for RFQ follow-up, warranty questions tied to formal documents, delivery details, supplier inquiries, and general business support.",
};

const supportPaths = [
  ["RFQ follow-up", "Clarify submitted requirements, quantities, deadlines, or product details.", "/quote", "documentation"],
  ["Procurement question", "Ask about supplier availability, equivalent options, or quotation assumptions for review.", "/contact", "network"],
  ["Delivery coordination", "Share delivery details or receiver requirements for review.", "/contact", "cabling"],
  ["Warranty or replacement", "Route questions with the product, quotation, supplier, and delivery details available for review.", "/contact", "storage"],
  ["Supplier or partner", "Introduce supply, fulfillment, implementation, or service capability.", "/contact", "workspace"],
  ["Policy question", "Review Trust & Compliance before relying on a commercial term.", "/trust-center", "cybersecurity"],
];

const expectations = [
  "Support starts with clear details, not a ticket number promise.",
  "Response expectations are confirmed through the active support conversation or formal business communication.",
  "Payment, warranty, delivery, tax, and return commitments must come from formal documents or verified policies.",
  "Use RFQ for new requirements and Contact for follow-up details.",
];

export default function SupportPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY || "";

  return (
    <>
      <PremiumPageHero
        eyebrow="Support Desk"
        title="Support begins by routing the question correctly."
        description="HACIEN support is designed around RFQ review, quotation assumptions, delivery details, warranty questions tied to documents, and follow-up."
        image="workspace"
        primaryAction={{ href: "#support-form", label: "Contact Support" }}
        secondaryAction={{ href: "/quote", label: "Request Quote" }}
        highlights={[
          { label: "RFQ Follow-Up", text: "Continue from a reference or submitted requirement." },
          { label: "Delivery", text: "Share receiver, schedule, and site access details." },
          { label: "Warranty", text: "Route warranty questions with product, supplier, and quote details." },
          { label: "Supplier", text: "Introduce capability through the right business channel." },
        ]}
      />

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-600">Support Paths</div>
            <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Choose the path that matches the work.
            </h2>
          </AnimatedContent>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {supportPaths.map(([title, text, href, image], index) => (
              <AnimatedContent key={title} delay={index * 55}>
                <Link href={href} className="group block h-full">
                  <SpotlightCard className="h-full overflow-hidden rounded border border-slate-200 bg-white shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-slate-950/10">
                    <div
                      className="relative min-h-[170px]"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.76)), url(${enterpriseImages[image as keyof typeof enterpriseImages]})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="absolute bottom-4 left-4 rounded border border-white/16 bg-white/12 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
                        Support Path
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-950 group-hover:text-[#2563EB]">{title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                      <div className="mt-5 text-sm font-bold text-[#2563EB]">Continue</div>
                    </div>
                  </SpotlightCard>
                </Link>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-600">Expectations</div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Clear support keeps each request moving with the right details.
            </h2>
          </AnimatedContent>
          <div className="grid gap-4">
            {expectations.map((expectation, index) => (
              <AnimatedContent key={expectation} delay={index * 70}>
                <div className="rounded border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex gap-4">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded bg-[#0A0A0A] text-sm font-bold text-white">
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

      <section id="support-form" className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-600">Contact Form</div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Send the details HACIEN needs to respond usefully.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Include RFQ reference, products, quantity, date, delivery details, quotation reference, or the policy area you need clarified.
            </p>
          </AnimatedContent>
          <ContactForm turnstileSiteKey={turnstileSiteKey} />
        </div>
      </section>
    </>
  );
}
