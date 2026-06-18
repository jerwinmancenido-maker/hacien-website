import type { Metadata } from "next";
import Link from "next/link";
import { CTABand } from "@/components/CTABand";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedSection } from "@/components/motion";

export const metadata: Metadata = {
  title: "Company Profile | HACIEN Information Technology Solutions",
  description:
    "Formal company profile of HACIEN Information Technology Solutions — a Philippine IT procurement, technology sourcing, and systems integration company serving business, institutional, and government buyers.",
};

export default function CompanyProfilePage() {
  return (
    <>
      <article className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            items={[
              { label: "About", href: "/about" },
              { label: "Company Profile" },
            ]}
          />

          <SectionHeading
            eyebrow="Company Profile"
            as="h1"
            title="HACIEN Information Technology Solutions"
            description="A Philippine IT procurement and technology solutions company providing sourcing, supplier coordination, systems integration, and project delivery support for business, institutional, and government buyers."
          />

          {/* Who HACIEN Is */}
          <div className="mt-12 space-y-10">
            <section>
              <h2 className="text-xl font-bold text-slate-950">Who HACIEN is</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                HACIEN Information Technology Solutions is a Philippine IT procurement and
                technology sourcing company based in Pasig City, Metro Manila. HACIEN supports
                organizations that need reliable sourcing, specification matching, supplier
                coordination, and project-based IT execution. The company serves private
                businesses, educational institutions, and government buyers who require
                procurement-aware, documentation-complete technology solutions.
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                HACIEN operates with a quote-first procurement model—every engagement begins
                with documented requirements, verified supplier availability, and formal
                quotation preparation. This approach ensures that buyers receive accurate,
                comparable, and actionable quotation packages suitable for business purchasing
                and institutional procurement.
              </p>
            </section>

            {/* What HACIEN Provides */}
            <section>
              <h2 className="text-xl font-bold text-slate-950">What HACIEN provides</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                HACIEN's services center on IT procurement support and technology sourcing—bridging
                the gap between buyer requirements and supplier-ready procurement packages. The
                company provides:
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  ["IT Procurement", "RFQ-ready sourcing for hardware, software, networking equipment, security systems, peripherals, and accessories—with supplier availability validation and formal quotation preparation."],
                  ["Technology Sourcing", "Identification, comparison, and specification matching of technology products across endpoint computing, servers, networking, security, cloud, and productivity categories."],
                  ["Systems Integration Support", "Project coordination for IT rollouts, device deployments, systems setup, configuration planning, and handover documentation—bridging procurement and implementation."],
                  ["Government Procurement Support", "Specification review, approved equivalent matching, supplier coordination, quotation support, delivery coordination, and documentation preparation for government and institutional buyers."],
                  ["Supplier Coordination", "Multi-supplier management covering availability validation, lead-time confirmation, warranty verification, pricing coordination, and product data sheet collection."],
                  ["General Merchandise Procurement", "Sourcing of non-IT goods, office supplies, furniture, safety equipment, and general merchandise for organizations with mixed procurement requirements."],
                  ["Project Delivery Support", "Delivery scheduling, logistics coordination, acceptance inspection support, serial number recording, warranty documentation, and project closeout."],
                ].map(([title, text]) => (
                  <li key={title} className="flex gap-3 text-sm text-slate-700">
                    <span className="mt-0.5 shrink-0 text-[#1457d9]">•</span>
                    <span>
                      <strong className="text-slate-950">{title}:</strong> {text}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Target Customers */}
            <section>
              <h2 className="text-xl font-bold text-slate-950">Target customers</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                HACIEN serves a range of organizations across the Philippines:
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Small and medium businesses requiring IT equipment sourcing and lifecycle support",
                  "Corporate IT departments needing supplier coordination and multi-vendor procurement management",
                  "Government agencies and local government units (LGUs) requiring specification-compliant IT sourcing",
                  "Educational institutions procuring classroom, laboratory, and administrative technology",
                  "Organizations implementing infrastructure upgrades, office buildouts, or branch deployments",
                  "Buyers with mixed IT and general merchandise procurement requirements",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-slate-700">
                    <span className="mt-0.5 shrink-0 text-[#1457d9]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Procurement Workflow */}
            <AnimatedSection className="rounded-lg border border-blue-100 bg-blue-50/60 p-6">
              <h2 className="text-xl font-bold text-slate-950">Procurement workflow</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                HACIEN follows a structured procurement workflow for every engagement:
              </p>
              <div className="progress-line mt-6 grid gap-4">
                {[
                  ["Requirements Gathering", "Capture business need, technical specifications, quantities, delivery location, budget range, and timeline."],
                  ["Product Matching", "Translate buyer requirements into viable branded or approved equivalent technology options."],
                  ["Supplier Coordination", "Validate availability, lead time, warranty terms, and pricing with suppliers."],
                  ["Quotation Preparation", "Prepare formal quotation package with specifications, pricing, warranty, and delivery terms."],
                  ["Award Support", "Support buyer-side comparison and selected offer documentation."],
                  ["Procurement & Fulfillment", "Coordinate ordering, fulfillment readiness, and project delivery materials."],
                  ["Delivery & Handover", "Schedule delivery, support acceptance inspection, record serial numbers, and prepare closeout documentation."],
                ].map(([step, text], index) => (
                  <div key={step} className="relative rounded border border-white bg-white/90 p-5">
                    <div className="flex gap-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#071426] text-sm font-bold text-white">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-bold text-slate-950">{step}</div>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Technology Categories */}
            <section>
              <h2 className="text-xl font-bold text-slate-950">Technology categories</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                HACIEN sources and procures across the following technology categories:
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Computers & Laptops",
                  "Servers & Storage",
                  "Network Equipment",
                  "Printers & Peripherals",
                  "Licensed Software",
                  "Security & Surveillance",
                  "Power & UPS",
                  "Accessories & Consumables",
                  "Cloud & Productivity Tools",
                ].map((cat) => (
                  <div
                    key={cat}
                    className="rounded border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-800"
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </section>

            {/* General Merchandise */}
            <section>
              <h2 className="text-xl font-bold text-slate-950">General merchandise procurement</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Beyond IT products, HACIEN supports procurement of general merchandise and
                office supplies commonly required alongside technology projects. This includes
                office furniture, cleaning supplies, safety equipment, consumables, and other
                non-IT items that appear in combined procurement packages—particularly for
                government and institutional buyers who issue mixed purchase requests.
              </p>
            </section>

            {/* Future ERP */}
            <section>
              <h2 className="text-xl font-bold text-slate-950">Future ERP direction</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                HACIEN is developing an internal Enterprise Resource Planning (ERP) platform
                designed around IT procurement and trading workflows. The HACIEN ERP system
                covers lead tracking, supplier canvass, quotation management, awards, purchase
                orders, delivery receipts, inventory management, billing, and collections. The
                platform is in active development and is not currently marketed as production-ready
                SaaS software. It reflects HACIEN's long-term commitment to building
                technology-driven operations infrastructure.
              </p>
              <Link
                href="/erp-platform"
                className="interactive-link mt-3 inline-flex text-sm font-bold text-[#1457d9] hover:underline"
              >
                Preview HACIEN ERP roadmap →
              </Link>
            </section>

            {/* Company Details */}
            <AnimatedSection className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-bold text-slate-950">Company details</h2>
              <div className="mt-4 grid gap-4 text-sm leading-6 text-slate-700 md:grid-cols-2">
                <p>
                  <strong className="text-slate-950">Registered business name:</strong>{" "}
                  HACIEN INFORMATION TECHNOLOGY SOLUTIONS
                </p>
                <p>
                  <strong className="text-slate-950">Business scope:</strong> National
                  business name registration for Philippine operations
                </p>
                <p>
                  <strong className="text-slate-950">Business address:</strong> Unit D,
                  6th Floor, Suntree Tower, 13 Meralco Avenue, Ortigas Center, San Antonio,
                  Pasig City, Metro Manila, Philippines
                </p>
                <p>
                  <strong className="text-slate-950">Email:</strong>{" "}
                  sales@haciensolutions.com
                </p>
                <p>
                  <strong className="text-slate-950">Website:</strong>{" "}
                  <Link
                    href="https://haciensolutions.com"
                    className="text-[#1457d9] hover:underline"
                  >
                    haciensolutions.com
                  </Link>
                </p>
                <p>
                  <strong className="text-slate-950">Focus areas:</strong> IT procurement,
                  technology sourcing, systems integration, infrastructure support, government
                  procurement support, supplier coordination, and general merchandise procurement
                </p>
              </div>
            </AnimatedSection>

            {/* Business Readiness Note */}
            <div className="rounded border border-amber-100 bg-amber-50/60 p-5">
              <p className="text-sm leading-7 text-amber-900">
                <strong>Business readiness note:</strong> HACIEN is continuously completing
                business readiness, supplier coordination, and documentation processes as
                the company grows. Product availability, supplier terms, and service scope
                are confirmed during the formal quotation process for each engagement.
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/quote"
              className="button-glow rounded bg-[#1457d9] px-5 py-3 text-center text-sm font-bold text-white"
            >
              Submit RFQ
            </Link>
            <Link
              href="/about"
              className="interactive-link rounded border border-slate-300 px-5 py-3 text-center text-sm font-bold text-slate-900"
            >
              Back to About
            </Link>
            <Link
              href="/contact"
              className="interactive-link rounded border border-slate-300 px-5 py-3 text-center text-sm font-bold text-slate-900"
            >
              Contact HACIEN
            </Link>
          </div>
        </div>
      </article>

      <CTABand title="Ready to start a procurement conversation?" />
    </>
  );
}
