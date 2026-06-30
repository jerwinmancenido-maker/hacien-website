import Link from "next/link";
import type { Metadata } from "next";
import { AnimatedContent, BorderGlow, GradientBackground, SplitText, SpotlightCard } from "@/app/components/reactbits";
import { EnterprisePhotoPanel } from "@/components/EnterpriseImagery";
import { categories } from "@/data/products";

export const metadata: Metadata = {
  title: "Technology HACIEN Can Support",
  description:
    "Review the technology areas HACIEN can support, including computing, networking, software, security, storage, power, peripherals, and procurement-related requirements.",
};

const supportNotes = [
  ["Not an online store", "This page explains the kinds of technology HACIEN can help source or coordinate. It does not publish prices or guarantee stock."],
  ["Quote-first review", "Exact models, quantities, warranty, lead time, delivery conditions, and commercial terms are confirmed through formal quotation."],
  ["Open-ended requirements", "Customers may send a product name, BOQ, specification, existing quote, picture, spreadsheet, or a plain description of the need."],
];

const serviceExamples = [
  "Office laptops and desktops",
  "Workstations and business endpoints",
  "Servers, NAS, and storage",
  "Switches, routers, firewalls, and wireless",
  "Productivity and security software",
  "UPS and power protection",
  "Printers, scanners, monitors, and peripherals",
  "CCTV, access control, and site security",
  "Structured cabling and network room materials",
  "Mixed procurement packages",
];

export default function ProductsPage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <GradientBackground />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <AnimatedContent className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
              Technology Support
            </AnimatedContent>
            <SplitText
              as="h1"
              text="Technology HACIEN can help you source, review, and coordinate."
              className="mt-5 max-w-5xl text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
            />
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              HACIEN can support many enterprise, office, institutional, and project technology requirements.
              You do not need to know the exact model before sending a request.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="button-glow focus-ring rounded bg-[#1457d9] px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-900/15"
              >
                Request Quote
              </Link>
              <Link
                href="/technology"
                className="interactive-link focus-ring rounded border border-slate-300 bg-white/80 px-5 py-3 text-center text-sm font-bold text-slate-900"
              >
                Explore Technology
              </Link>
            </div>
          </div>

          <EnterprisePhotoPanel
            image="workstation"
            eyebrow="Technology Areas"
            title="Tell HACIEN what you need to accomplish."
            caption="Products, brands, equivalents, lead times, warranty, and delivery details are reviewed after the requirement is understood."
          />
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Technology Areas</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Common categories HACIEN can discuss with customers.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
              These categories are examples of supported technology areas. They are not a complete catalog and do not limit what customers may request.
            </p>
          </AnimatedContent>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <AnimatedContent key={category.slug} delay={index * 45}>
                <Link href={`/products/${category.slug}`} className="group block h-full">
                  <SpotlightCard className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1457d9]">Supported Area</div>
                    <h3 className="mt-4 text-xl font-bold text-slate-950 group-hover:text-[#1457d9]">{category.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{category.summary}</p>
                    <div className="mt-5 text-sm font-bold text-[#1457d9]">See example context</div>
                  </SpotlightCard>
                </Link>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071426] px-4 py-18 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr]">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Examples</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              If it belongs in an organization&apos;s technology environment, HACIEN can review the request.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              Send whatever context you have. HACIEN will clarify the requirement before formal quotation.
            </p>
          </AnimatedContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {serviceExamples.map((item) => (
              <div key={item} className="rounded border border-white/12 bg-white/[0.06] p-4 text-sm font-bold text-slate-100">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <AnimatedContent className="mx-auto max-w-7xl">
          <BorderGlow className="relative overflow-hidden rounded-lg bg-white p-8 shadow-sm sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
                  How to start
                </div>
                <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  You can request help even if the exact product is not listed.
                </h2>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {supportNotes.map(([title, text]) => (
                    <div key={title} className="rounded border border-slate-200 bg-slate-50 p-4">
                      <div className="font-bold text-slate-950">{title}</div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/quote"
                className="button-glow focus-ring rounded bg-[#1457d9] px-6 py-3 text-center text-sm font-bold text-white"
              >
                Send a Requirement
              </Link>
            </div>
          </BorderGlow>
        </AnimatedContent>
      </section>
    </>
  );
}
