import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedContent, BorderGlow, SpotlightCard } from "@/app/components/reactbits";
import { ContactForm } from "@/components/ContactForm";
import { enterpriseImages } from "@/components/EnterpriseImagery";
import { PremiumPageHero } from "@/components/PremiumPageHero";
import { brandsLine, companyContact, deliveryLine } from "@/data/companyContact";

export const metadata: Metadata = {
  title: "Contact",
  description: companyContact.replyTime,
};

const contactPaths = [
  {
    title: "Request a quotation",
    text: "For an item list, specifications, files, or a quotation.",
    href: "/quote",
    action: "Request a Quote",
    image: "documentation",
  },
  {
    title: "Ask for support",
    text: "For follow-up on an existing request, a delivery detail, or a warranty question.",
    href: "/support",
    action: "Open Support",
    image: "workspace",
  },
  {
    title: "Send a business inquiry",
    text: "For supplier introductions, partnership questions, and company questions.",
    href: "#contact-form",
    action: "Use Contact Form",
    image: "office",
  },
];

const communicationStandards = [
  "Use Request a Quote when you need pricing, an item list, or files.",
  "Use Support when the question continues an existing request, a delivery detail, or a warranty question.",
  "Use Contact for a business message that is not yet a quotation request or a support question.",
];

export default function ContactPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY || "";

  return (
    <>
      <PremiumPageHero
        eyebrow="Contact"
        title="Contact HACIEN."
        description={companyContact.replyTime}
        image="office"
        primaryAction={{ href: "/quote", label: "Request a Quote" }}
        secondaryAction={{ href: "#contact-form", label: "Send Inquiry" }}
        highlights={[
          { label: "Brands", text: brandsLine },
          { label: "Delivery", text: deliveryLine },
        ]}
      />

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-600">Contact Paths</div>
            <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Choose the route that matches the work.
            </h2>
          </AnimatedContent>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {contactPaths.map((path, index) => (
              <AnimatedContent key={path.title} delay={index * 70}>
                <Link href={path.href} className="group block h-full">
                  <SpotlightCard className="h-full overflow-hidden rounded border border-slate-200 bg-white shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-slate-950/10">
                    <div
                      className="relative min-h-[190px]"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.74)), url(${enterpriseImages[path.image as keyof typeof enterpriseImages]})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="absolute bottom-4 left-4 rounded-full border border-white/16 bg-white/12 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-950">{path.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{path.text}</p>
                      <div className="mt-5 text-sm font-bold text-slate-950">{path.action}</div>
                    </div>
                  </SpotlightCard>
                </Link>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-400">
              Communication Standard
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              Clear details help HACIEN respond with the right next step.
            </h2>
          </AnimatedContent>
          <div className="grid gap-4">
            {communicationStandards.map((standard, index) => (
              <AnimatedContent key={standard} delay={index * 70}>
                <div className="rounded border border-white/12 bg-white/[0.07] p-5 backdrop-blur">
                  <div className="flex gap-4">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-sm font-bold text-[#0A0A0A]">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-slate-200">{standard}</p>
                  </div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-form" className="scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <AnimatedContent>
            <BorderGlow className="rounded bg-white p-6 shadow-sm sm:p-8">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">
                Public Inquiry
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
                Send a business inquiry.
              </h2>

              <div className="mt-8 grid gap-5 text-sm leading-7 text-slate-700">
                <div className="rounded border border-slate-200 bg-slate-50 p-5">
                  <div className="font-bold text-slate-950">Appointments</div>
                  <p className="mt-2">{companyContact.showroomNote}</p>
                </div>

                <div className="rounded border border-slate-200 bg-slate-50 p-5">
                  <div className="font-bold text-slate-950">{companyContact.addressLabel}</div>
                  <address className="mt-2 not-italic text-slate-700">
                    {companyContact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>

                <div className="rounded border border-slate-200 bg-slate-50 p-5">
                  <div className="font-bold text-slate-950">General contact</div>
                  <p className="mt-2">
                    <a href={`mailto:${companyContact.email}`} className="font-medium text-[#2563EB] hover:underline">
                      {companyContact.email}
                    </a>
                  </p>
                </div>

                <div className="rounded border border-slate-200 bg-slate-50 p-5">
                  <div className="font-bold text-slate-950">Formal legal notices</div>
                  <p className="mt-2">
                    Formal legal notices must follow the published Legal page requirements.
                  </p>
                  <Link href="/legal" className="mt-3 inline-flex text-sm font-bold text-slate-950">
                    Review Legal Information
                  </Link>
                </div>
              </div>
            </BorderGlow>
          </AnimatedContent>

          <ContactForm turnstileSiteKey={turnstileSiteKey} />
        </div>
      </section>
    </>
  );
}
