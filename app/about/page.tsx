import type { Metadata } from "next";
import Link from "next/link";
import { CTABand } from "@/components/CTABand";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedCard, AnimatedSection, StaggerContainer } from "@/components/motion";

export const metadata: Metadata = {
  title: "About HACIEN | IT Procurement & Technology Solutions",
  description:
    "HACIEN Information Technology Solutions is a Philippine IT procurement and technology sourcing company supporting business and institutional buyers with systems integration, supplier coordination, and government procurement support.",
};

const coreValues = [
  {
    name: "Practical Reliability",
    description:
      "We prioritize equipment and solutions that perform in real Philippine operating environments—not just on spec sheets. Every recommendation considers availability, serviceability, and warranty support.",
  },
  {
    name: "Procurement Integrity",
    description:
      "We do not inflate specifications, misrepresent stock availability, or claim partnerships and accreditations we do not hold. Quotations are based on verified supplier conditions.",
  },
  {
    name: "Customer Accountability",
    description:
      "When we commit to a delivery timeline, specification, or quotation, we follow through. If conditions change, we communicate proactively—not after a deadline passes.",
  },
  {
    name: "Technical Clarity",
    description:
      "We translate complex IT specifications into clear, buyer-friendly language. Our quotations, comparisons, and project documentation are written for decision-makers, not just engineers.",
  },
  {
    name: "Continuous Improvement",
    description:
      "Our processes, tools, and internal platform are continuously being refined. The HACIEN ERP system under development reflects this commitment to building better procurement and operations workflows.",
  },
];

const operatingPrinciples = [
  {
    name: "Quote-first procurement",
    description:
      "Every engagement starts with a formal quotation process. We do not accept verbal orders or unstructured purchases. Requirements are documented before supplier coordination begins.",
  },
  {
    name: "Supplier availability validation",
    description:
      "Before issuing any quotation, HACIEN validates product availability, lead time, and pricing with suppliers. We do not quote items we cannot source or deliver.",
  },
  {
    name: "Approved equivalent review",
    description:
      "When specified brands or models are unavailable, we identify technically equivalent alternatives and document the comparison for buyer review and acceptance.",
  },
  {
    name: "Documentation-aware support",
    description:
      "We prepare procurement documentation—quotation packages, product data sheets, warranty certificates, and delivery records—as a standard part of every engagement.",
  },
  {
    name: "Project delivery coordination",
    description:
      "Procurement support extends through delivery, acceptance, and handover. We coordinate logistics, support inspection, and prepare closeout documentation.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Company Overview */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="About HACIEN"
            as="h1"
            title="A Philippine IT procurement and technology solutions company built around practical sourcing, supplier coordination, and project delivery."
            description="HACIEN Information Technology Solutions helps organizations translate IT requirements into supplier-ready procurement packages—covering hardware, software, networking, security, general merchandise, and project-based deployments across the Philippines."
          />
          <StaggerContainer className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              [
                "Procurement-aware",
                "We help buyers and project teams translate requirements into clear, supplier-ready product and service requests—not generic catalogs.",
              ],
              [
                "Implementation-focused",
                "We support delivery, setup coordination, and documentation beyond simple product selling. Procurement to handover is a single workflow.",
              ],
              [
                "ERP-minded",
                "Our internal platform roadmap is designed around real IT trading, procurement, and project workflows—future-proofing our operations.",
              ],
            ].map(([title, text]) => (
              <AnimatedCard key={title} className="surface rounded-lg p-6">
                <h2 className="text-lg font-bold text-slate-950">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </AnimatedCard>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* What HACIEN Does */}
      <AnimatedSection className="bg-[#071426] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
            What HACIEN Does
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Technology sourcing and procurement support for Philippine organizations.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["IT Procurement", "RFQ-ready sourcing for hardware, software, accessories, warranties, and project materials."],
              ["Technology Sourcing", "Endpoint, server, network, security, and cloud technology sourcing with supplier coordination."],
              ["Systems Integration", "Project coordination for IT rollouts, device deployment, systems setup, and documentation."],
              ["Infrastructure Support", "Endpoint, switching, wireless, firewall, server, storage, and site connectivity support."],
              ["Government Procurement Support", "Specification review, approved equivalent matching, quotation support, and delivery coordination."],
              ["Supplier Coordination", "Multi-supplier management for availability validation, lead-time confirmation, and pricing coordination."],
              ["General Merchandise", "Non-IT goods, office supplies, and general items for mixed institutional procurement packages."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-lg border border-white/12 bg-white/[0.06] p-5">
                <div className="font-bold">{title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Mission & Vision */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <AnimatedSection className="surface rounded-lg p-8">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
              Mission
            </div>
            <h2 className="text-2xl font-bold text-slate-950">Our mission</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              To help Philippine organizations source, evaluate, procure, and deploy reliable
              technology solutions through practical procurement support, supplier coordination,
              and systems integration—making IT purchasing transparent, documentation-aware,
              and delivery-focused for businesses, institutions, and government buyers.
            </p>
          </AnimatedSection>
          <AnimatedSection className="surface rounded-lg p-8">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
              Vision
            </div>
            <h2 className="text-2xl font-bold text-slate-950">Our vision</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              To become a trusted technology procurement and operations platform for Philippine
              organizations—where IT requirements are translated into supplier-ready packages,
              procurement workflows are documentation-complete, and future ERP-enabled systems
              connect sourcing, quotation, delivery, and operations into a single integrated
              experience.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Core Values */}
      <AnimatedSection className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Core Values"
            title="What drives how HACIEN works."
            description="Five values that shape our procurement approach, customer relationships, and internal operations."
          />
          <StaggerContainer className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, index) => (
              <AnimatedCard key={value.name} className="rounded-lg border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1457d9] text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-950">{value.name}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{value.description}</p>
              </AnimatedCard>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* Operating Principles */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Operating Principles"
            title="How every HACIEN engagement is conducted."
            description="These principles define the minimum standard for every procurement workflow, quotation, and delivery engagement."
          />
          <div className="progress-line mt-10 grid gap-5">
            {operatingPrinciples.map((principle, index) => (
              <AnimatedSection key={principle.name} className="relative rounded-lg border border-slate-200 bg-white p-6">
                <div className="flex gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#071426] text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950">{principle.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{principle.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Procurement Focus */}
      <AnimatedSection className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Procurement Focus"
            title="Where HACIEN concentrates its sourcing capabilities."
          />
          <StaggerContainer className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[
              "Computers & Laptops",
              "Servers & Storage",
              "Network Equipment",
              "Printers & Peripherals",
              "Licensed Software",
              "Security & Surveillance",
              "Power & UPS",
              "Accessories & Consumables",
              "General Merchandise",
              "Office Supplies & Furniture",
              "Project Deployment Materials",
              "IT Service Coordination",
            ].map((area) => (
              <AnimatedCard
                key={area}
                className="rounded border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-800"
              >
                {area}
              </AnimatedCard>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* Future HACIEN ERP */}
      <AnimatedSection className="bg-[#0b1220] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                Future HACIEN ERP
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                An internal procurement and operations platform in active development.
              </h2>
              <p className="mt-5 leading-7 text-slate-300">
                HACIEN ERP is being built as the future operations backbone for our procurement
                workflows—covering lead tracking, supplier canvass, quotation management, awards,
                purchase orders, delivery receipts, billing, and collections. It is not marketed
                as a production-ready SaaS product yet, but reflects our commitment to
                technology-driven operations.
              </p>
              <Link
                href="/erp-platform"
                className="button-glow mt-8 inline-flex rounded bg-white px-5 py-3 text-sm font-bold text-[#071426]"
              >
                Preview ERP roadmap
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["Lead", "Quotation", "PO", "Delivery", "Invoice", "Inventory", "Canvass", "Reports"].map(
                (step, index) => (
                  <div key={step} className="rounded border border-white/12 bg-white/[0.07] p-4">
                    <div className="text-xs font-bold text-blue-200">0{index + 1}</div>
                    <div className="mt-2 text-sm font-bold">{step}</div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Company Profile Link */}
      <AnimatedSection className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="surface rounded-lg p-6">
            <h2 className="text-xl font-bold text-slate-950">Company profile</h2>
            <div className="mt-5 grid gap-4 text-sm leading-6 text-slate-700 md:grid-cols-2">
              <p>
                <strong className="text-slate-950">Registered business name:</strong>{" "}
                HACIEN INFORMATION TECHNOLOGY SOLUTIONS.
              </p>
              <p>
                <strong className="text-slate-950">Scope:</strong> National business name
                registration for Philippine operations.
              </p>
              <p>
                <strong className="text-slate-950">Business address:</strong> Unit D, 6th
                Floor, Suntree Tower, 13 Meralco Avenue, Ortigas Center, San Antonio, Pasig
                City.
              </p>
              <p>
                <strong className="text-slate-950">Positioning:</strong> IT procurement,
                technology sourcing, systems integration, infrastructure support, government
                procurement support, supplier coordination, and general merchandise procurement.
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/about/company-profile"
                className="interactive-link text-sm font-bold text-[#1457d9] hover:underline"
              >
                Read full company profile →
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact CTA */}
      <CTABand title="Need an IT supplier that understands procurement workflows?" />
    </>
  );
}
