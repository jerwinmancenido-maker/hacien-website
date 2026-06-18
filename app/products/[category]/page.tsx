import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { categories, getCategory, getProductsByCategory } from "@/data/products";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  return {
    title: category ? category.name : "Product Category",
    description: category?.summary ?? "Browse HACIEN product categories and request a quotation.",
  };
}

export default async function ProductCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) notFound();

  const items = getProductsByCategory(category.slug);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Product Category"
          as="h1"
          title={category.name}
          description={`${category.summary} Prices are indicative and subject to supplier availability.`}
        />
        <div className="mt-10">
          <ProductGrid products={items} />
        </div>
      </div>
    </section>
  );
}
