import { categories, products } from "../data/products";
import { assertDatabaseConfigured, prisma } from "../lib/db";

async function main() {
  assertDatabaseConfigured();

  console.log(`Seed categories: ${categories.length}`);
  const categoryRecords = new Map<string, { id: string; slug: string }>();

  for (const category of categories) {
    console.log(`Seed category: ${category.slug}`);
    const record = await prisma.productCategory.upsert({
      where: { slug: category.slug },
      create: {
        slug: category.slug,
        name: category.name,
        summary: category.summary,
        heroCopy: category.heroCopy,
        seoTitle: category.seoTitle,
        seoDescription: category.seoDescription,
      },
      update: {
        name: category.name,
        summary: category.summary,
        heroCopy: category.heroCopy,
        seoTitle: category.seoTitle,
        seoDescription: category.seoDescription,
      },
    });
    categoryRecords.set(category.slug, { id: record.id, slug: category.slug });
  }

  console.log(`Seed products: ${products.length}`);
  for (const product of products) {
    const category = categoryRecords.get(product.categorySlug);
    if (!category) {
      throw new Error(`Missing category for product seed: ${product.slug}`);
    }
    console.log(`Seed RFQ product: ${product.slug}`);

    const seededProduct = await prisma.product.upsert({
      where: { slug: product.slug },
      create: {
        slug: product.slug,
        name: product.name,
        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
        specs: JSON.stringify(product.specs),
        technicalSpecs: JSON.stringify(product.technicalSpecs),
        procurementNotes: product.procurementNotes,
        purchaseMode: "rfq",
        status: "published",
        fulfillmentType: "manual",
        inventoryPolicy: "rfq_required",
        taxMode: "not_configured",
        unit: product.unit,
        availability: product.availability,
        sourceSystem: "website_seed",
        sourceProductId: product.id,
        sourcePublicationId: null,
        sourceSyncedAt: null,
        category: { connect: { id: category.id } },
      },
      update: {
        name: product.name,
        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
        specs: JSON.stringify(product.specs),
        technicalSpecs: JSON.stringify(product.technicalSpecs),
        procurementNotes: product.procurementNotes,
        status: "published",
        unit: product.unit,
        availability: product.availability,
        sourceSystem: "website_seed",
        sourcePublicationId: null,
      },
    });

    await prisma.productVariant.upsert({
      where: { sku: product.id },
      create: {
        sku: product.id,
        name: `${product.name} — RFQ profile`,
        isDefault: true,
        isActive: true,
        unitPriceCents: null,
        priceCents: null,
        product: { connect: { id: seededProduct.id } },
      },
      update: {
        name: `${product.name} — RFQ profile`,
        isDefault: true,
        isActive: true,
      },
    });
  }
}

main()
  .then(() => {
    console.log("Seed complete.");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
