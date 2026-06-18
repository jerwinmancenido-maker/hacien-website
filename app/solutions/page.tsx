import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { AnimatedSection, StaggerContainer } from "@/components/motion";
import { CTABand } from "@/components/CTABand";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "HACIEN solutions include IT infrastructure, procurement, systems integration, managed support, and project-based IT delivery.",
};

export default function SolutionsPage() {
  return (
    <>
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Solutions"
          as="h1"
          title="Technology solutions for procurement, deployment, and operations."
          description="HACIEN serves as a bridge between business requirements, supplier availability, and implementation realities."
        />
        <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2">
          {solutions.map((solution) => (
            <Link key={solution.slug} href={`/solutions/${solution.slug}`} className="block">
              <ServiceCard title={solution.title} description={solution.summary} points={solution.outcomes} />
            </Link>
          ))}
        </StaggerContainer>
        <AnimatedSection className="mt-14 rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-bold text-slate-950">How HACIEN moves IT requirements forward.</h2>
          <div className="progress-line mt-8 grid gap-5 md:grid-cols-4 md:[&::before]:hidden">
            {[
              ["Source", "Clarify requirements and find viable product/service options."],
              ["Procure", "Coordinate supplier availability, warranty, and formal quotation support."],
              ["Integrate", "Support deployment planning, configuration, and project documentation."],
              ["Support", "Assist with lifecycle needs, replacements, and follow-up requests."],
            ].map(([step, text], index) => (
              <div key={step} className="relative rounded border border-slate-200 bg-slate-50 p-5">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#1457d9] text-sm font-bold text-white">{index + 1}</div>
                <div className="mt-4 font-bold text-slate-950">{step}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
    <CTABand />
    </>
  );
}
