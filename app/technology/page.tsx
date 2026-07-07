import type { Metadata } from "next";
import Link from "next/link";
import { enterpriseImages } from "@/components/EnterpriseImagery";
import { AnimatedCard, AnimatedSection, StaggerContainer } from "@/components/motion";
import { PremiumPageHero } from "@/components/PremiumPageHero";
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

const technologyImages: Record<string, keyof typeof enterpriseImages> = {
  "Enterprise Computing": "workstation",
  Networking: "network",
  Cybersecurity: "cybersecurity",
  Cloud: "cloud",
  Software: "silicon",
  Storage: "storage",
  Power: "dataCenter",
  "Structured Cabling": "cabling",
  "Professional Services": "documentation",
};

const priorityTechnologyDomains = technologyDomains.slice(0, 6);

export default function TechnologyPage() {
  return (
    <>
      <PremiumPageHero
        eyebrow="Technology"
        title="Technology categories for describing the work."
        description="Use this page to frame the request. HACIEN reviews the context before any model, price, delivery, or commercial term is treated as confirmed."
        image="silicon"
        primaryAction={{ href: "/quote", label: "Request Quote" }}
        secondaryAction={{ href: "/solutions", label: "View Solutions" }}
        highlights={[
          { label: "Computing", text: "Endpoints, workstations, servers, and user needs." },
          { label: "Networking", text: "Connectivity, site layout, and reliability context." },
          { label: "Cybersecurity", text: "Protection requirements and operating risk." },
          { label: "Cloud & Software", text: "Licensing, backup, SaaS, and hybrid needs." },
        ]}
      />

      <AnimatedSection className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Domains"
            title="Choose the language closest to your requirement."
            description="You do not need a perfect specification to start. Choose the category that fits, then add the context HACIEN should review."
          />
          <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {priorityTechnologyDomains.map(([title, text, categorySlug]) => (
              <AnimatedCard key={title} className="h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10">
                <div
                  className="h-36 bg-slate-950"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(7, 20, 38, 0.04), rgba(7, 20, 38, 0.72)), url(${enterpriseImages[technologyImages[String(title)] || "dataCenter"]})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />
                <div className="p-7">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1457d9]">Technology Domain</div>
                <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{text}</p>
                {categorySlug ? (
                  <Link href={`/products/${categorySlug}`} className="mt-7 inline-flex text-sm font-bold text-[#1457d9] hover:underline">
                    Build this requirement
                  </Link>
                ) : (
                  <Link href="/quote" className="mt-7 inline-flex text-sm font-bold text-[#1457d9] hover:underline">
                    Describe a service requirement
                  </Link>
                )}
                </div>
              </AnimatedCard>
            ))}
          </StaggerContainer>
          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-bold text-slate-950">Need cabling, power, services, or something not listed?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Use the RFQ path and describe the outcome. HACIEN reviews the context before treating any product or service path as final.
            </p>
            <Link href="/quote" className="mt-3 inline-flex text-sm font-bold text-[#1457d9] hover:underline">
              Describe the requirement
            </Link>
          </div>
        </div>
      </AnimatedSection>

      <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Product references remain optional</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950">
              Start with a product, a category, a BOQ, a photo, or only the outcome.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
              HACIEN&apos;s Gateway reviews the requirement first. The catalog helps describe context; it does not limit what you can ask.
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
