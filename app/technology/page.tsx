import type { Metadata } from "next";
import Link from "next/link";
import { EnterprisePhotoPanel } from "@/components/EnterpriseImagery";
import { AnimatedCard, AnimatedSection, StaggerContainer } from "@/components/motion";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Enterprise Technology | HACIEN",
  description:
    "Explore HACIEN enterprise technology domains including computing, networking, cybersecurity, cloud, software, storage, power, structured cabling, and professional services.",
};

const technologyDomains = [
  ["Enterprise Computing", "Business endpoints, workstations, servers, and computing environments for serious operations.", "computers-laptops"],
  ["Networking", "Reliable connectivity for offices, facilities, campuses, and institutional environments.", "network-equipment"],
  ["Cybersecurity", "Security technologies that help protect users, devices, networks, and critical operations.", "security-surveillance"],
  ["Cloud", "Cloud services, backup, SaaS, storage, and hybrid technology environments.", "licensed-software"],
  ["Software", "Business software, productivity platforms, security licensing, and professional software sourcing.", "licensed-software"],
  ["Storage", "Data storage, backup, continuity, and scalable infrastructure foundations.", "servers-storage"],
  ["Power", "UPS, rack power, and continuity equipment for technology environments.", "power-ups"],
  ["Structured Cabling", "Cabling, racks, cabinets, network rooms, and physical infrastructure coordination.", "network-equipment"],
  ["Professional Services", "Specification review, procurement support, deployment coordination, and lifecycle assistance.", null],
];

export default function TechnologyPage() {
  return (
    <>
      <section className="bg-[#071426] px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Technology</div>
            <h1 className="mt-5 max-w-5xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Enterprise technology domains, not an online catalog.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              HACIEN helps organizations define, source, and coordinate technology requirements across infrastructure,
              software, security, cloud, and operating environments. Exact products are reviewed through formal RFQ.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="button-glow rounded-full bg-white px-6 py-3 text-center text-sm font-bold text-[#071426]">
                Request Quote
              </Link>
              <Link href="/solutions" className="interactive-link rounded-full border border-white/25 px-6 py-3 text-center text-sm font-bold text-white">
                View Solutions
              </Link>
            </div>
          </div>
          <EnterprisePhotoPanel
            image="dataCenter"
            eyebrow="Enterprise Capability"
            title="Technology should support the organization before it becomes a specification."
            caption="HACIEN reviews requirements, environment, warranty expectations, availability, and delivery context before formal quotation."
          />
        </div>
      </section>

      <AnimatedSection className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Domains"
            title="Technology presented by operating need."
            description="These domains help customers describe what they need without forcing them to know model numbers, prices, or exact specifications before HACIEN reviews the requirement."
          />
          <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {technologyDomains.map(([title, text, categorySlug]) => (
              <AnimatedCard key={title} className="h-full rounded-lg border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1457d9]">Technology Domain</div>
                <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{text}</p>
                {categorySlug ? (
                  <Link href={`/products/${categorySlug}`} className="mt-7 inline-flex text-sm font-bold text-[#1457d9] hover:underline">
                    View representative category
                  </Link>
                ) : (
                  <Link href="/quote" className="mt-7 inline-flex text-sm font-bold text-[#1457d9] hover:underline">
                    Describe a service requirement
                  </Link>
                )}
              </AnimatedCard>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      <section className="bg-slate-50 px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-lg border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Product references remain optional</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950">
              Customers may submit a product, a category, a specification, a BOQ, an image, or only an idea.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
              HACIEN’s Gateway reviews the requirement first. The product catalog helps describe context; it never limits the relationship.
            </p>
          </div>
          <Link href="/quote" className="button-glow rounded-full bg-[#1457d9] px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-900/15">
            Start with Request Quote
          </Link>
        </div>
      </section>
    </>
  );
}
