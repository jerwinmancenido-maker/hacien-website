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

const capabilityMap = [
  "IT Infrastructure",
  "Systems Integration",
  "Structured Cabling",
  "Networking",
  "CCTV & Security",
  "Servers & Storage",
  "Cloud & Software Licensing",
  "Managed IT",
  "Project Delivery",
];

const workflow = [
  ["Clarify", "Understand the requirement, site, deadline, budget context, and approval path."],
  ["Specify", "Translate the need into products, services, installation materials, and support scope."],
  ["Review", "Review supplier options, warranty terms, stock, lead time, and approved equivalents where inputs are available."],
  ["Deliver", "Support quotation, procurement, delivery coordination, handover, and follow-up."],
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

      <section className="bg-[#071426] px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Technology Layers</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
              HACIEN supports the operational layers behind modern IT environments.
            </h2>
          </AnimatedContent>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {capabilityMap.map((item, index) => (
              <AnimatedContent key={item} delay={index * 55}>
                <div className="rounded border border-white/12 bg-white/[0.06] p-4 text-sm font-bold text-slate-100">
                  {item}
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Active Solution Areas</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Pick the closest area, then describe the requirement.
            </h2>
          </AnimatedContent>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, index) => (
              <AnimatedContent key={solution.slug} delay={index * 45}>
                <Link href={`/solutions/${solution.slug}`} className="group block h-full">
                  <SpotlightCard className="h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-slate-950/10">
                    <div
                      className="h-44 bg-slate-950"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(7, 20, 38, 0.04), rgba(7, 20, 38, 0.72)), url(${enterpriseImages[solutionImages[solution.slug] || "network"]})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    />
                    <div className="p-6">
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1457d9]">{solution.category}</div>
                    <h3 className="mt-4 text-lg font-bold text-slate-950 group-hover:text-[#1457d9]">
                      {solution.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{solution.summary}</p>
                    <div className="mt-5 text-sm font-bold text-[#1457d9]">View capability</div>
                    </div>
                  </SpotlightCard>
                </Link>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">How Work Moves</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              A simple path from technical need to reviewed next step.
            </h2>
          </AnimatedContent>
          <div className="mt-12 overflow-x-auto pb-4">
            <div className="grid min-w-[760px] grid-cols-4 gap-4 lg:min-w-0">
            {workflow.map(([step, text], index) => (
              <AnimatedContent key={step} delay={index * 70}>
                <BorderGlow className="h-full rounded-lg bg-white p-5 shadow-sm">
                  <div className="flex h-full flex-col">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#1457d9] text-sm font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-5">
                      <h3 className="font-bold text-slate-950">{step}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                    </div>
                  </div>
                </BorderGlow>
              </AnimatedContent>
            ))}
            </div>
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
