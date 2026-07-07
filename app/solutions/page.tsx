import type { Metadata } from "next";
import Link from "next/link";
import {
  AnimatedContent,
  BorderGlow,
  GradientBackground,
  SpotlightCard,
} from "@/app/components/reactbits";
import { enterpriseImages } from "@/components/EnterpriseImagery";
import { PremiumPageHero } from "@/components/PremiumPageHero";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = {
  title: "IT Solutions and Systems Integration Philippines | HACIEN",
  description:
    "HACIEN provides IT infrastructure, systems integration, networking, cybersecurity, servers, storage, cloud, software licensing, managed IT, and project delivery support in the Philippines.",
};

const capabilityGroups = [
  {
    title: "Infrastructure requests need context.",
    text: "Devices, servers, storage, network equipment, and power needs are easier to review when usage, site, and scale are clear.",
  },
  {
    title: "Integration is more than equipment.",
    text: "Cabling, network, security, cloud, and software work better when scope and handover assumptions are visible early.",
  },
  {
    title: "Follow-up should not restart the story.",
    text: "Renewals, replacements, warranty context, and support questions should stay connected to the original request.",
  },
];

const solutionImages: Record<string, keyof typeof enterpriseImages> = {
  "it-infrastructure": "dataCenter",
  "hardware-software-procurement": "workstation",
  "systems-integration": "commandCenter",
  "managed-it-support": "office",
  "network-connectivity": "network",
  "servers-storage": "storage",
  "cloud-productivity": "cloud",
  cybersecurity: "cybersecurity",
  "security-surveillance": "cabling",
  "software-licensing": "silicon",
  "general-merchandise-procurement": "documentation",
  "project-delivery-support": "workspace",
};

const prioritySolutions = solutions.slice(0, 6);

export default function SolutionsPage() {
  return (
    <>
      <PremiumPageHero
        eyebrow="Solutions"
        title="IT solution areas for clearer requests."
        description="Use these pages to describe the work HACIEN should review: infrastructure, integration, workplace technology, software, security, and support context."
        image="commandCenter"
        primaryAction={{ href: "/quote", label: "Start an RFQ" }}
        secondaryAction={{ href: "/technology", label: "Explore Technology" }}
        highlights={[
          { label: "Infrastructure", text: "Endpoints, servers, networks, power, and site context." },
          { label: "Integration", text: "Materials, setup needs, and handover assumptions." },
          { label: "Sourcing", text: "Requirements, equivalents, and supplier inputs when available." },
          { label: "Continuity", text: "Follow-up, renewal, replacement, and support context." },
        ]}
      />

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">What Solutions Mean</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Not a menu of promises. A way to describe work clearly.
            </h2>
          </AnimatedContent>
          <div className="grid gap-5">
            {capabilityGroups.map((item, index) => (
              <AnimatedContent key={item.title} delay={index * 80}>
                <SpotlightCard className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Active Solution Areas</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Pick the closest area, then describe the requirement.
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Start with the closest area. If the request is unusual, describe it in the RFQ instead of searching through every possible category.
            </p>
          </AnimatedContent>
          <div className="grid gap-3 md:grid-cols-2">
            {prioritySolutions.map((solution, index) => (
              <AnimatedContent key={solution.slug} delay={index * 45}>
                <Link href={`/solutions/${solution.slug}`} className="group block h-full">
                  <SpotlightCard className="h-full rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-slate-950/10">
                    <div className="flex gap-3">
                      <div
                        className="h-16 w-20 shrink-0 rounded bg-slate-950"
                        style={{
                          backgroundImage: `linear-gradient(180deg, rgba(7, 20, 38, 0.04), rgba(7, 20, 38, 0.72)), url(${enterpriseImages[solutionImages[solution.slug] || "network"]})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#1457d9]">{solution.category}</div>
                        <h3 className="mt-1 text-base font-bold text-slate-950 group-hover:text-[#1457d9]">
                          {solution.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-600">{solution.summary}</p>
                        <div className="mt-3 text-sm font-bold text-[#1457d9]">View capability</div>
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </AnimatedContent>
            ))}
            <AnimatedContent delay={320} className="md:col-span-2">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-base font-bold text-slate-950">Do not see the exact area?</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Use the RFQ form. HACIEN reviews the requirement context before treating any solution path as final.
                </p>
                <Link href="/quote" className="mt-3 inline-flex text-sm font-bold text-[#1457d9]">
                  Describe the requirement
                </Link>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <AnimatedContent className="mx-auto max-w-7xl">
          <BorderGlow className="relative overflow-hidden rounded-lg bg-[#071426] p-8 text-white shadow-2xl shadow-slate-950/18 sm:p-10">
            <GradientBackground className="opacity-[0.36]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                  Source with structure
                </div>
                <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                  Have a requirement that needs sourcing, validation, and quotation support?
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">
                  Send HACIEN your requirement list and context. We will help shape the next review-ready RFQ step.
                </p>
              </div>
              <Link
                href="/quote"
                className="button-glow focus-ring rounded bg-white px-6 py-3 text-center text-sm font-bold text-[#071426]"
              >
                Submit RFQ
              </Link>
            </div>
          </BorderGlow>
        </AnimatedContent>
      </section>
    </>
  );
}
