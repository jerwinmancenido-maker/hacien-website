import type { Product } from "@/data/products";

export function canCheckout(product: Product) {
  return product.purchaseMode === "checkout" || product.purchaseMode === "hybrid";
}

export function canRequestQuote(product: Product) {
  return product.purchaseMode === "rfq" || product.purchaseMode === "hybrid";
}

export function formatPrice(product: Product) {
  if (!product.priceCents) {
    return null;
  }

  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: product.currency,
  }).format(product.priceCents / 100);
}
