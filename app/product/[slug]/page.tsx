import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetail } from "@/components/ProductDetail";
import { getCategory, getProduct, products } from "@/data/products";
import { getErpCatalogProduct } from "@/lib/erp/ecommerce-client";
import { erpCatalogProductToWebsiteProduct } from "@/lib/erp/catalog-products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

async function resolveErpProduct(slug: string) {
  try {
    const erpProduct = await getErpCatalogProduct(slug);
    return erpCatalogProductToWebsiteProduct(erpProduct.item);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const erpProduct = await resolveErpProduct(slug);
  if (erpProduct) {
    return {
      title: erpProduct.name,
      description: erpProduct.shortDescription,
      robots: { index: false, follow: false },
    };
  }

  const product = getProduct(slug);
  // PR #102 pattern (R5-FIX-5): an unknown slug gets the real not-found
  // response — title included — instead of a generic "Product Detail"
  // title on the 404 page. The ERP branch above is untouched.
  if (!product) notFound();
  return {
    title: product.name,
    description: product?.shortDescription ?? "View HACIEN product details and request a quotation.",
    robots: { index: false, follow: false },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const erpProduct = await resolveErpProduct(slug);
  if (erpProduct) {
    return (
      <section className="bg-white">
        <ProductDetail product={erpProduct} />
      </section>
    );
  }

  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  if (category) {
    permanentRedirect(`/products/${category.slug}/${product.slug}`);
  }

  return (
    <section className="bg-white">
      <ProductDetail product={product} />
    </section>
  );
}
