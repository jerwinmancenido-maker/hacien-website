import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CTABand } from "@/components/CTABand";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AnimatedSection } from "@/components/motion";
import { ProductGrid } from "@/components/ProductGrid";
import { RequirementBuilder } from "@/components/RequirementBuilder";
import { categories, getCategory, getProductsByCategory } from "@/data/products";
import { listErpCatalog } from "@/lib/erp/ecommerce-client";
import { erpCatalogToWebsiteProducts } from "@/lib/erp/catalog-products";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

async function getErpProducts() {
  try {
    const catalog = await listErpCatalog();
    return erpCatalogToWebsiteProducts(catalog.items || []);
  } catch {
    return [];
  }
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
  const erpProducts = await getErpProducts();
  const categoryProducts =
    erpProducts.length > 0
      ? erpProducts.filter((product) => product.categorySlug === category.slug)
      : getProductsByCategory(category.slug);
  const isErpCatalog = erpProducts.length > 0;

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
          {categoryProducts.length > 0 ? (
            <div className="mt-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                    {isErpCatalog ? "ERP-published products" : "Example RFQ-ready profiles"}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    {isErpCatalog
                      ? "These items come from ERP publication settings. Manual payment review and sandbox signals appear only when enabled in ERP."
                      : "These examples show the kind of sourcing targets HACIEN can review. Final brand, model, warranty, lead time, and commercial terms are confirmed through formal quotation."}
                  </p>
                </div>
                <div className="rounded border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-bold text-[#1457d9]">
                  {categoryProducts.length} profile{categoryProducts.length === 1 ? "" : "s"}
                </div>
              </div>
              <div className="mt-6">
                <ProductGrid products={categoryProducts} />
              </div>
            </div>
          ) : null}
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
