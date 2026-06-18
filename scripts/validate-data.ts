import { categories, products } from "../data/products";
import { solutions } from "../data/solutions";

function main() {
  let errors = 0;

  console.log("Validating data...\n");

  // Validate categories
  const categorySlugs = new Set(categories.map((c) => c.slug));
  console.log(`Categories: ${categories.length}`);

  for (const cat of categories) {
    if (!cat.slug || !cat.name) {
      console.error(`  ERROR: Category missing slug or name: ${JSON.stringify(cat)}`);
      errors++;
    }
  }

  // Validate products
  const productSlugs = new Set<string>();
  const productIds = new Set<string>();
  console.log(`Products: ${products.length}`);

  for (const product of products) {
    if (!product.id) {
      console.error(`  ERROR: Product missing id`);
      errors++;
      continue;
    }
    if (productIds.has(product.id)) {
      console.error(`  ERROR: Duplicate product id: ${product.id}`);
      errors++;
    }
    productIds.add(product.id);

    if (!product.slug) {
      console.error(`  ERROR: Product ${product.id} missing slug`);
      errors++;
    }
    if (productSlugs.has(product.slug)) {
      console.error(`  ERROR: Duplicate product slug: ${product.slug}`);
      errors++;
    }
    productSlugs.add(product.slug);

    if (!categorySlugs.has(product.categorySlug)) {
      console.error(
        `  ERROR: Product ${product.id} references unknown category: ${product.categorySlug}`,
      );
      errors++;
    }

    if (!product.name) {
      console.error(`  ERROR: Product ${product.id} missing name`);
      errors++;
    }

    if (typeof product.estimatedPrice !== "number" || product.estimatedPrice <= 0) {
      console.error(`  ERROR: Product ${product.id} has invalid price: ${product.estimatedPrice}`);
      errors++;
    }
  }

  // Validate solutions
  const solutionSlugs = new Set<string>();
  console.log(`Solutions: ${solutions.length}`);

  for (const solution of solutions) {
    if (!solution.slug) {
      console.error(`  ERROR: Solution missing slug`);
      errors++;
      continue;
    }
    if (solutionSlugs.has(solution.slug)) {
      console.error(`  ERROR: Duplicate solution slug: ${solution.slug}`);
      errors++;
    }
    solutionSlugs.add(solution.slug);

    if (!solution.title) {
      console.error(`  ERROR: Solution ${solution.slug} missing title`);
      errors++;
    }
  }

  console.log(`\nValidation complete. ${errors} error(s) found.`);

  if (errors > 0) {
    process.exit(1);
  }
}

main();