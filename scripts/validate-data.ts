import { categories, products } from "../data/products";
import { solutions } from "../data/solutions";
import { insights } from "../data/insights";
import { getPublishedCmsContent, validateCmsContent } from "../lib/cms/content";
import { getCmsInventory, validateCmsInventory } from "../lib/cms/inventory";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const unsafeProductNamePatterns = [
  /\bauthorized\b/i,
  /\bofficial\b/i,
  /\bcertified\b/i,
  /\bpartner\b/i,
  /\breseller\b/i,
];

function main() {
  let errors = 0;

  console.log("Validating data...\n");

  // Validate categories
  const categorySlugs = new Set<string>();
  console.log(`Categories: ${categories.length}`);

  for (const cat of categories) {
    if (!cat.slug || !cat.name) {
      console.error(`  ERROR: Category missing slug or name: ${JSON.stringify(cat)}`);
      errors++;
    }
    if (cat.slug && !slugPattern.test(cat.slug)) {
      console.error(`  ERROR: Category ${cat.slug} is not URL-safe kebab-case`);
      errors++;
    }
    if (categorySlugs.has(cat.slug)) {
      console.error(`  ERROR: Duplicate category slug: ${cat.slug}`);
      errors++;
    }
    categorySlugs.add(cat.slug);
    if (!cat.seoTitle) {
      console.error(`  ERROR: Category ${cat.slug} missing seoTitle`);
      errors++;
    }
    if (!cat.seoDescription) {
      console.error(`  ERROR: Category ${cat.slug} missing seoDescription`);
      errors++;
    }
  }

  // Validate products
  const productSlugs = new Set<string>();
  const productIds = new Set<string>();
  const productsByCategory = new Map<string, number>();
  console.log(`Products: ${products.length}`);

  if (products.length < 15) {
    console.error(`  ERROR: Expected at least 15 product profiles, found ${products.length}`);
    errors++;
  }

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
    if (product.slug && !slugPattern.test(product.slug)) {
      console.error(`  ERROR: Product ${product.id} slug is not URL-safe kebab-case: ${product.slug}`);
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
    productsByCategory.set(product.categorySlug, (productsByCategory.get(product.categorySlug) || 0) + 1);

    if (!product.name) {
      console.error(`  ERROR: Product ${product.id} missing name`);
      errors++;
    }
    if (unsafeProductNamePatterns.some((pattern) => pattern.test(product.name))) {
      console.error(`  ERROR: Product ${product.id} name implies an unsupported brand relationship: ${product.name}`);
      errors++;
    }
    if (!product.shortDescription) {
      console.error(`  ERROR: Product ${product.id} missing shortDescription`);
      errors++;
    }
    if (!product.longDescription) {
      console.error(`  ERROR: Product ${product.id} missing longDescription`);
      errors++;
    }

    if (!product.unit) {
      console.error(`  ERROR: Product ${product.id} missing unit`);
      errors++;
    }

    if (product.purchaseMode !== "rfq" && product.purchaseMode !== "checkout" && product.purchaseMode !== "hybrid") {
      console.error(`  ERROR: Product ${product.id} has invalid purchaseMode: ${product.purchaseMode}`);
      errors++;
    }

    if (product.currency !== "PHP") {
      console.error(`  ERROR: Product ${product.id} currency must be PHP`);
      errors++;
    }

    if (product.fulfillmentType !== "manual" && product.fulfillmentType !== "digital" && product.fulfillmentType !== "license" && product.fulfillmentType !== "shipment" && product.fulfillmentType !== "service") {
      console.error(`  ERROR: Product ${product.id} has invalid fulfillmentType: ${product.fulfillmentType}`);
      errors++;
    }

    if (product.inventoryPolicy !== "not_tracked" && product.inventoryPolicy !== "track_stock" && product.inventoryPolicy !== "preorder" && product.inventoryPolicy !== "rfq_required") {
      console.error(`  ERROR: Product ${product.id} has invalid inventoryPolicy: ${product.inventoryPolicy}`);
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
    if (!Array.isArray(product.technicalSpecs) || product.technicalSpecs.length < 4) {
      console.error(`  ERROR: Product ${product.id} must include at least 4 technical spec rows`);
      errors++;
    } else {
      const specLabels = new Set<string>();
      for (const spec of product.technicalSpecs) {
        if (!spec.label || !spec.value) {
          console.error(`  ERROR: Product ${product.id} has an incomplete technical spec row`);
          errors++;
        }
        if (specLabels.has(spec.label)) {
          console.error(`  ERROR: Product ${product.id} has duplicate technical spec label: ${spec.label}`);
          errors++;
        }
        specLabels.add(spec.label);
      }
    }

    if (product.purchaseMode === "checkout" && product.priceCents == null) {
      console.error(`  ERROR: Checkout product ${product.id} must include priceCents`);
      errors++;
    }

    if (product.priceCents != null && product.priceCents < 1) {
      console.error(`  ERROR: Product ${product.id} has invalid priceCents`);
      errors++;
    }
  }

  for (const category of categories) {
    if (!productsByCategory.has(category.slug)) {
      console.error(`  ERROR: Category ${category.slug} has no product profiles`);
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

  // Validate CMS read-layer content
  const cmsContent = getPublishedCmsContent();
  console.log(`CMS content: ${cmsContent.length}`);

  for (const entry of cmsContent) {
    if (!entry.slug) {
      console.error("  ERROR: CMS content missing slug");
      errors++;
    }
    if (entry.status !== "published") {
      console.error(`  ERROR: CMS content ${entry.slug} must be published for public read layer`);
      errors++;
    }
    if (!entry.hero?.title || !entry.hero.description) {
      console.error(`  ERROR: CMS content ${entry.slug} missing hero title or description`);
      errors++;
    }

    const result = validateCmsContent(entry);
    if (!result.ok) {
      console.error(`  ERROR: CMS content ${entry.slug} includes blocked public claims`);
      for (const blockedClaim of result.blockedClaims) {
        console.error(`    - ${blockedClaim.text}`);
      }
      errors++;
    }
  }

  const cmsInventory = getCmsInventory();
  const cmsInventoryResult = validateCmsInventory(cmsInventory);
  console.log(`CMS inventory records: ${cmsInventory.length}`);

  if (!cmsInventoryResult.ok) {
    if (cmsInventoryResult.missingExpectedKeys.length > 0) {
      console.error(
        `  ERROR: CMS inventory missing expected keys: ${cmsInventoryResult.missingExpectedKeys.join(", ")}`,
      );
      errors++;
    }

    if (cmsInventoryResult.missingPublicRouteOwnership.length > 0) {
      console.error(
        `  ERROR: CMS inventory missing public route ownership: ${cmsInventoryResult.missingPublicRouteOwnership
          .map((rule) => rule.route)
          .join(", ")}`,
      );
      errors++;
    }

    if (cmsInventoryResult.missingStaticSitemapOwnership.length > 0) {
      console.error(
        `  ERROR: CMS inventory missing static sitemap ownership: ${cmsInventoryResult.missingStaticSitemapOwnership.join(", ")}`,
      );
      errors++;
    }

    if (cmsInventoryResult.missingDynamicSitemapOwnership.length > 0) {
      console.error(
        `  ERROR: CMS inventory missing dynamic sitemap ownership: ${cmsInventoryResult.missingDynamicSitemapOwnership.join(", ")}`,
      );
      errors++;
    }

    if (cmsInventoryResult.sitemapRuleDrift.length > 0) {
      console.error(`  ERROR: CMS route ownership rules missing from sitemap: ${cmsInventoryResult.sitemapRuleDrift.join(", ")}`);
      errors++;
    }

    if (cmsInventoryResult.blockedRoutesInSitemap.length > 0) {
      console.error(`  ERROR: Blocked routes are present in sitemap ownership: ${cmsInventoryResult.blockedRoutesInSitemap.join(", ")}`);
      errors++;
    }

    if (cmsInventoryResult.duplicateKeys.length > 0) {
      console.error(`  ERROR: CMS inventory duplicate keys: ${cmsInventoryResult.duplicateKeys.join(", ")}`);
      errors++;
    }

    for (const item of cmsInventoryResult.invalidItems) {
      console.error(`  ERROR: CMS inventory item ${item.key || "(missing key)"} is incomplete`);
      errors++;
    }

    for (const item of cmsInventoryResult.incompleteMetadataItems) {
      console.error(`  ERROR: CMS inventory item ${item.key} is missing required metadata tracking`);
      errors++;
    }

    for (const item of cmsInventoryResult.blockedOwnershipErrors) {
      console.error(`  ERROR: CMS inventory item ${item.key} has blocked risk but unsafe owner ${item.ownerType}`);
      errors++;
    }
  }

  console.log(`\nValidation complete. ${errors} error(s) found.`);

  if (errors > 0) {
    process.exit(1);
  }
}

main();
