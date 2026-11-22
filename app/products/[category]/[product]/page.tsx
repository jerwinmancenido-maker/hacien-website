import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetail } from "@/components/ProductDetail";
import { getCategory, getProduct, products } from "@/data/products";
import { getErpCatalogProduct } from "@/lib/erp/ecommerce-client";
import { erpCatalogProductToWebsiteProduct } from "@/lib/erp/catalog-products";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export function generateStaticParams() {
  return products.flatMap((product) => {
    const category = getCategory(product.categorySlug);
    if (!category) return [];
    return [{ category: category.slug, product: product.slug }];
  });
}

async function resolveErpProduct(slug: string) {
  try {
    const erpProduct = await getErpCatalogProduct(slug);
    return erpCatalogProductToWebsiteProduct(erpProduct.item);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}): Promise<Metadata> {
  const { category: categorySlug, product: productSlug } = await params;
  const path = `/products/${categorySlug}/${productSlug}`;
  const category = getCategory(categorySlug);
  const erpProduct = await resolveErpProduct(productSlug);
  if (erpProduct?.categorySlug === categorySlug) {
    return buildPageMetadata({
      title: erpProduct.name,
      description: erpProduct.shortDescription,
      path,
    });
  }

  const product = getProduct(productSlug);

  // Same missing check as the page — fallback metadata here would commit HTTP 200
  // before notFound() runs, producing a soft-404 (404 UI with status 200).
  // resolveErpProduct swallows fetch failures to null; a known local product still
  // resolves below, so a transient ERP outage is not turned into notFound().
  if (!category || !product || product.categorySlug !== category.slug) {
    notFound();
  }

  return buildPageMetadata({
    title: product.name,
    description: product.shortDescription,
    path,
  });
}

export default async function ProductCategoryProductPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category: categorySlug, product: productSlug } = await params;
  const category = getCategory(categorySlug);
  const erpProduct = await resolveErpProduct(productSlug);
  if (erpProduct?.categorySlug === categorySlug) {
    return <ProductDetail product={erpProduct} />;
  }

  const product = getProduct(productSlug);

  if (!category || !product || product.categorySlug !== category.slug) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
