import { categories, products } from "../data/products";
import { solutions } from "../data/solutions";
import { governmentTopics } from "../data/governmentTopics";
import { insights } from "../data/insights";

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
    if (!cat.seoTitle) {
      console.error(`  ERROR: Category ${cat.slug} missing seoTitle`);
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

    if (!product.unit) {
      console.error(`  ERROR: Product ${product.id} missing unit`);
      errors++;
    }

    if (!product.procurementNotes) {
      console.error(`  ERROR: Product ${product.id} missing procurement notes`);
      errors++;
    }

    if (!Array.isArray(product.specs) || product.specs.length === 0) {
      console.error(`  ERROR: Product ${product.id} missing specs`);
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
    if (!solution.seoTitle) {
      console.error(`  ERROR: Solution ${solution.slug} missing seoTitle`);
      errors++;
    }
    if (!solution.sections || solution.sections.length === 0) {
      console.error(`  ERROR: Solution ${solution.slug} missing sections`);
      errors++;
    }
  }

  // Validate government topics
  const topicSlugs = new Set<string>();
  console.log(`Government Topics: ${governmentTopics.length}`);

  for (const topic of governmentTopics) {
    if (!topic.slug) {
      console.error(`  ERROR: Government topic missing slug`);
      errors++;
      continue;
    }
    if (topicSlugs.has(topic.slug)) {
      console.error(`  ERROR: Duplicate government topic slug: ${topic.slug}`);
      errors++;
    }
    topicSlugs.add(topic.slug);

    if (!topic.title) {
      console.error(`  ERROR: Government topic ${topic.slug} missing title`);
      errors++;
    }
    if (!topic.seoTitle) {
      console.error(`  ERROR: Government topic ${topic.slug} missing seoTitle`);
      errors++;
    }
    if (!topic.checklist || topic.checklist.length === 0) {
      console.error(`  ERROR: Government topic ${topic.slug} missing checklist`);
      errors++;
    }
  }

  // Validate insights
  const insightSlugs = new Set<string>();
  console.log(`Insights: ${insights.length}`);

  for (const insight of insights) {
    if (!insight.slug) {
      console.error(`  ERROR: Insight missing slug`);
      errors++;
      continue;
    }
    if (insightSlugs.has(insight.slug)) {
      console.error(`  ERROR: Duplicate insight slug: ${insight.slug}`);
      errors++;
    }
    insightSlugs.add(insight.slug);

    if (!insight.title) {
      console.error(`  ERROR: Insight ${insight.slug} missing title`);
      errors++;
    }
    if (!insight.seoTitle) {
      console.error(`  ERROR: Insight ${insight.slug} missing seoTitle`);
      errors++;
    }
    if (!insight.sections || insight.sections.length === 0) {
      console.error(`  ERROR: Insight ${insight.slug} missing sections`);
      errors++;
    }
    if (!insight.checklist || insight.checklist.length === 0) {
      console.error(`  ERROR: Insight ${insight.slug} missing checklist`);
      errors++;
    }
  }

  console.log(`\nValidation complete. ${errors} error(s) found.`);

  if (errors > 0) {
    process.exit(1);
  }
}

main();
