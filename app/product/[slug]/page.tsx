import { notFound, permanentRedirect, redirect } from "next/navigation";
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
    };
  }

  const product = getProduct(slug);
  return {
    title: product ? product.name : "Product Detail",
    description: product?.shortDescription ?? "View HACIEN product details and request a quotation.",
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
    const target = `/products/${category.slug}/${product.slug}`;
    if (slug !== product.slug) permanentRedirect(target);
    redirect(target);
  }

  return (
    <section className="bg-white">
      <ProductDetail product={product} />
    </section>
  );
}
