import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetail } from "@/components/ProductDetail";
import { getCategory, getProduct, products } from "@/data/products";
import { getErpCatalogProduct } from "@/lib/erp/ecommerce-client";
import { erpCatalogProductToWebsiteProduct } from "@/lib/erp/catalog-products";

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
  const category = getCategory(categorySlug);
  const erpProduct = await resolveErpProduct(productSlug);
  if (erpProduct?.categorySlug === categorySlug) {
    return {
      title: `${erpProduct.name} | HACIEN`,
      description: erpProduct.shortDescription,
    };
  }

  const product = getProduct(productSlug);

  if (!category || !product) {
    return {
      title: "Product Detail",
      description: "Product profile not found.",
    };
  }

  if (product.categorySlug !== category.slug) {
    return {
      title: "Product Detail",
      description: "Product not found in this category.",
    };
  }

  return {
    title: `${product.name} | HACIEN`,
    description: product.shortDescription,
  };
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
