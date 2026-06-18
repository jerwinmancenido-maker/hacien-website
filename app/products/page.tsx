import Link from "next/link";
import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedSection, StaggerContainer } from "@/components/motion";
import { CTABand } from "@/components/CTABand";
import { categories, products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse HACIEN product categories and request quotations for computers, servers, networking, software, security, and IT accessories.",
};

export default function ProductsPage() {
  return (
    <>
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Products"
          as="h1"
          title="RFQ procurement catalog for IT requirements."
          description="Select requirements for RFQ. HACIEN will validate exact brand/model, stock, warranty, supplier quotation, and delivery terms before issuing a formal offer."
        />
        <StaggerContainer className="mt-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link key={category.slug} href={`/products/${category.slug}`} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-[#1457d9] hover:text-[#1457d9]">
              {category.name}
            </Link>
          ))}
        </StaggerContainer>
        <AnimatedSection className="mt-10">
          <ProductGrid products={products} />
        </AnimatedSection>
      </div>
    </section>
    <CTABand title="Building a bill of materials or supplier comparison list?" />
    </>
  );
}
