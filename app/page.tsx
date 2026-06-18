import Link from "next/link";
import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { QuoteRequestForm } from "@/components/QuoteRequestForm";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { AnimatedCard, AnimatedSection, StaggerContainer } from "@/components/motion";
import { CTABand } from "@/components/CTABand";
import { categories, products } from "@/data/products";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = {
  title: "IT Infrastructure and Procurement Solutions",
  description:
    "HACIEN provides IT procurement, infrastructure, systems integration, and government procurement support for Philippine organizations.",
};

export default function Home() {
  return (
    <>
      <Hero />

      <AnimatedSection className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why HACIEN"
            title="Built for procurement-heavy IT projects."
            description="HACIEN combines product sourcing, technical matching, supplier coordination, and implementation support for organizations that need dependable IT delivery."
          />
          <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-3">
            {solutions.slice(0, 6).map((solution) => (
              <Link key={solution.slug} href={`/solutions/${solution.slug}`} className="block">
                <ServiceCard title={solution.title} description={solution.summary} points={solution.outcomes} />
              </Link>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Company Profile"
            title="HACIEN INFORMATION TECHNOLOGY SOLUTIONS"
            description="A nationally registered business name supporting IT infrastructure, procurement, systems integration, and technology sourcing requirements across the Philippines."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Business focus", "IT infrastructure, product sourcing, systems integration, and project-based technology support."],
              ["Service area", "National scope for Philippine organizations, subject to project location and delivery requirements."],
              ["Business address", "Unit D, 6th Floor, Suntree Tower, 13 Meralco Avenue, Ortigas Center, San Antonio, Pasig City."],
              ["Procurement posture", "Supplier readiness and government procurement support. Accreditation claims will be published only when finalized."],
            ].map(([title, text]) => (
              <AnimatedCard key={title} className="rounded border border-slate-200 bg-white p-5">
                <div className="font-bold text-slate-950">{title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Product Catalog"
            title="Procurement-ready product categories."
            description="Browse common IT product lines and prepare a quote request. Prices are indicative and subject to supplier availability."
          />
          <StaggerContainer className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 7).map((category) => (
              <Link
                key={category.slug}
                href={`/products/${category.slug}`}
                className="surface lift rounded-lg p-5"
              >
                <div className="h-2 w-16 rounded-full" style={{ backgroundColor: category.accent }} />
                <h3 className="mt-5 font-bold text-slate-950">{category.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{category.summary}</p>
              </Link>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Featured Products" title="Commonly requested IT items." />
          <div className="mt-10">
            <ProductGrid products={products.filter((product) => product.featured)} />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-[#071426] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
              Government Procurement Capability
            </div>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Sourcing and documentation support for bid-driven IT requirements.
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-slate-300">
              HACIEN is preparing supplier-ready operations for government and institutional buyers,
              including specification review, equivalent matching, quotation packages, and delivery coordination.
            </p>
            <Link href="/government-procurement" className="interactive-link mt-7 inline-flex rounded bg-white px-5 py-3 text-sm font-bold text-[#071426]">
              View procurement capability
            </Link>
          </div>
          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {["Government agencies", "Schools and institutions", "SMEs and offices", "IT integrators"].map((industry) => (
              <div key={industry} className="rounded border border-white/15 bg-white/8 p-5">
                <div className="font-bold">{industry}</div>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Coming Soon"
              title="HACIEN ERP Platform"
              description="A future ERP platform for IT integrators, distributors, trading companies, and project-based businesses."
            />
            <Link href="/erp-platform" className="interactive-link mt-6 inline-flex rounded border border-slate-300 px-5 py-3 text-sm font-bold text-slate-900 hover:border-[#1457d9]">
              Preview ERP roadmap
            </Link>
          </div>
          <QuoteRequestForm />
        </div>
      </AnimatedSection>

      <CTABand />
    </>
  );
}
