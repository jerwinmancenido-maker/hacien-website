import type { Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { StaggerContainer } from "@/components/motion";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </StaggerContainer>
  );
}
