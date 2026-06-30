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
import { solutions } from "@/data/solutions";

export const metadata: Metadata = {
  title: "IT Solutions and Systems Integration Philippines | HACIEN",
  description:
    "HACIEN provides IT infrastructure, systems integration, networking, cybersecurity, servers, storage, cloud, software licensing, managed IT, and project delivery support in the Philippines.",
};

const capabilityGroups = [
  {
    title: "Infrastructure should be specified before it is sourced.",
    text: "Workstations, servers, storage, network devices, UPS, and deployment materials need clear usage context before supplier canvass starts.",
  },
  {
    title: "Integration should connect products to outcomes.",
    text: "Systems integration, structured cabling, CCTV, networking, cloud, and cybersecurity work better when equipment, scope, and handover are planned together.",
  },
  {
    title: "Support should continue after delivery.",
    text: "Managed IT, project delivery, renewals, replacements, and warranty follow-up keep procurement from becoming a one-time transaction.",
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
  ["Source", "Coordinate supplier options, warranty terms, stock, lead time, and approved equivalents."],
  ["Deliver", "Support quotation, procurement, delivery coordination, handover, and follow-up."],
];

export default function SolutionsPage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <GradientBackground />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <AnimatedContent className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
              Solutions
            </AnimatedContent>
            <SplitText
              as="h1"
              text="How HACIEN turns technology requirements into workable procurement."
              className="mt-5 max-w-5xl text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
            />
            <BlurReveal delay={160}>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Solutions explain how HACIEN supports infrastructure, integration, sourcing,
                delivery, and lifecycle needs without repeating the company story.
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
                href="/technology"
                className="interactive-link focus-ring rounded border border-slate-300 bg-white/80 px-5 py-3 text-center text-sm font-bold text-slate-900"
              >
                Explore Technology
              </Link>
            </AnimatedContent>
          </div>

          <AnimatedContent delay={140} direction="left">
            <BorderGlow className="rounded-lg bg-white/[0.86] p-6 shadow-2xl shadow-slate-950/10">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
                Capability Flow
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-950 sm:text-2xl">
                From requirement to deployment, every capability is tied to procurement clarity.
              </h2>
              <div className="mt-8 grid gap-3">
                {["Infrastructure", "Integration", "Licensing", "Delivery", "Support"].map((step, index) => (
                  <div key={step} className="flex items-center gap-3 rounded border border-slate-200 bg-slate-50 px-4 py-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#071426] text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm font-bold text-slate-800">{step}</span>
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
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">What Solutions Mean</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Not just services. A structured way to move IT work forward.
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

      <section className="bg-[#071426] px-4 py-18 text-white sm:px-6 lg:px-8">
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

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Active Solution Areas</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Each solution has its own procurement context.
            </h2>
          </AnimatedContent>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, index) => (
              <AnimatedContent key={solution.slug} delay={index * 45}>
                <Link href={`/solutions/${solution.slug}`} className="group block h-full">
                  <SpotlightCard className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1457d9]">{solution.category}</div>
                    <h3 className="mt-4 text-lg font-bold text-slate-950 group-hover:text-[#1457d9]">
                      {solution.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{solution.summary}</p>
                    <div className="mt-5 text-sm font-bold text-[#1457d9]">View capability</div>
                  </SpotlightCard>
                </Link>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">How Work Moves</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              A simple path from technical need to supported delivery.
            </h2>
          </AnimatedContent>
          <div className="progress-line mt-12 grid gap-4">
            {workflow.map(([step, text], index) => (
              <AnimatedContent key={step} delay={index * 70}>
                <BorderGlow className="rounded-lg bg-white p-5 shadow-sm">
                  <div className="flex gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#1457d9] text-sm font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-950">{step}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                    </div>
                  </div>
                </BorderGlow>
              </AnimatedContent>
            ))}
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
                  Send HACIEN your requirement list and context. We will help shape the next supplier-ready RFQ step.
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
