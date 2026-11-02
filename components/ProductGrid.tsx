import type { Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { StaggerContainer } from "@/components/motion";

export function ProductGrid({ products }: { products: Product[] }) {
  const count = products.length;
  const gridCols =
    count === 1
      ? "grid-cols-1 max-w-xl"
      : count === 2
        ? "grid-cols-1 sm:grid-cols-2 max-w-4xl"
        : count === 3
          ? "grid-cols-1 md:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <StaggerContainer className={`grid gap-6 ${gridCols}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </StaggerContainer>
  );
}
