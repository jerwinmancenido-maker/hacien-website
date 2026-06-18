import type { Metadata } from "next";
import { CTABand } from "@/components/CTABand";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedCard, StaggerContainer } from "@/components/motion";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about HACIEN INFORMATION TECHNOLOGY SOLUTIONS, a Philippine IT solutions provider focused on procurement-ready technology delivery.",
};

export default function AboutPage() {
  return (
    <>
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About HACIEN"
          as="h1"
          title="A Philippine IT solutions provider for practical, procurement-ready technology delivery."
          description="HACIEN Information Technology Solutions supports organizations that need reliable sourcing, specification matching, implementation coordination, and project-based IT execution."
        />
        <StaggerContainer className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            ["Procurement-aware", "We help buyers and project teams translate requirements into clear product and service requests."],
            ["Implementation-focused", "We support delivery, setup, coordination, and documentation beyond simple product selling."],
            ["ERP-minded", "Our internal platform roadmap is designed around real IT trading, procurement, and project workflows."],
          ].map(([title, text]) => (
            <AnimatedCard key={title} className="surface rounded-lg p-6">
              <h2 className="text-lg font-bold text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </AnimatedCard>
          ))}
        </StaggerContainer>
        <div className="surface mt-10 rounded-lg p-6">
          <h2 className="text-xl font-bold text-slate-950">Company profile</h2>
          <div className="mt-5 grid gap-4 text-sm leading-6 text-slate-700 md:grid-cols-2">
            <p>
              <strong className="text-slate-950">Registered business name:</strong>{" "}
              HACIEN INFORMATION TECHNOLOGY SOLUTIONS.
            </p>
            <p>
              <strong className="text-slate-950">Scope:</strong> National business name registration for Philippine operations.
            </p>
            <p>
              <strong className="text-slate-950">Business address:</strong> Unit D, 6th Floor,
              Suntree Tower, 13 Meralco Avenue, Ortigas Center, San Antonio, Pasig City.
            </p>
            <p>
              <strong className="text-slate-950">Positioning:</strong> IT infrastructure provider,
              government procurement support partner, systems integrator, and technology solutions provider.
            </p>
          </div>
        </div>
      </div>
    </section>
    <CTABand title="Need an IT supplier that understands procurement workflows?" />
    </>
  );
}
