import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CTABand } from "@/components/CTABand";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AnimatedSection } from "@/components/motion";
import { RequirementBuilder } from "@/components/RequirementBuilder";
import { categories, getCategory } from "@/data/products";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  return {
    title: category ? category.seoTitle.replace("Products", "Technology") : "Technology Category | HACIEN",
    description: category?.seoDescription ?? "Review HACIEN technology categories and request a quotation.",
  };
}

export default async function ProductCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) notFound();

  return (
    <>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb items={[{ label: "Technology", href: "/technology" }, { label: category.name }]} />
          <SectionHeading
            eyebrow="Technology Category"
            as="h1"
            title={category.name}
            description={category.heroCopy}
          />
          <div className="mt-10">
            <RequirementBuilder initialCategory={category.slug} />
          </div>
          <AnimatedSection className="mt-12 rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <strong className="text-slate-800">Procurement note:</strong>{" "}
            {category.summary} You may choose a preferred brand, select any suitable option, describe a specification, or add details that are not listed. Final pricing is confirmed through formal quotation after supplier availability, equivalent options, warranty terms, and delivery requirements are reviewed.
          </AnimatedSection>
        </div>
      </section>
      <CTABand title={`Need help sourcing ${category.name.toLowerCase()}?`} />
    </>
  );
}
