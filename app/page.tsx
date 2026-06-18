import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { QuoteRequestForm } from "@/components/QuoteRequestForm";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { categories, products } from "@/data/products";

const services = [
  {
    title: "IT Procurement",
    description: "Sourcing, equivalent matching, and quotation preparation for hardware, software, and project materials.",
    points: ["RFQ support", "Supplier coordination", "Specification matching"],
  },
  {
    title: "Systems Integration",
    description: "Practical implementation support for networks, endpoints, servers, surveillance, and business systems.",
    points: ["Network rollout", "Endpoint deployment", "Project documentation"],
  },
  {
    title: "Project-Based IT Support",
    description: "Flexible support for IT integrators, contractors, distributors, and government project requirements.",
    points: ["BOQ review", "Delivery coordination", "After-sales support"],
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why HACIEN"
            title="Built for procurement-heavy IT projects."
            description="HACIEN combines product sourcing, technical matching, supplier coordination, and implementation support for organizations that need dependable IT delivery."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Product Catalog"
            title="Procurement-ready product categories."
            description="Browse common IT product lines and prepare a quote request. Final pricing depends on availability, approved equivalent specifications, and delivery requirements."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Featured Products" title="Commonly requested IT items." />
          <div className="mt-10">
            <ProductGrid products={products.filter((product) => product.featured)} />
          </div>
        </div>
      </section>

      <section className="bg-[#071426] px-4 py-16 text-white sm:px-6 lg:px-8">
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
            <Link href="/government-procurement" className="mt-7 inline-flex rounded bg-white px-5 py-3 text-sm font-bold text-[#071426]">
              View procurement capability
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {["Government agencies", "Schools and institutions", "SMEs and offices", "IT integrators"].map((industry) => (
              <div key={industry} className="rounded border border-white/15 bg-white/8 p-5">
                <div className="font-bold">{industry}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Coming Soon"
              title="HACIEN ERP Platform"
              description="A future ERP platform for IT integrators, distributors, trading companies, and project-based businesses."
            />
            <Link href="/erp-platform" className="mt-6 inline-flex rounded border border-slate-300 px-5 py-3 text-sm font-bold text-slate-900 hover:border-[#1457d9]">
              Preview ERP roadmap
            </Link>
          </div>
          <QuoteRequestForm />
        </div>
      </section>
    </>
  );
}
