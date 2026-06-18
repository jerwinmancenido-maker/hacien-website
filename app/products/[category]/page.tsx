import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { categories, getCategory, getProductsByCategory } from "@/data/products";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export default async function ProductCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) notFound();

  const items = getProductsByCategory(category.slug);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Product Category" title={category.name} description={category.summary} />
        <div className="mt-10">
          <ProductGrid products={items} />
        </div>
      </div>
    </section>
  );
}
