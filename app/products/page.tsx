import Link from "next/link";
import type { Metadata } from "next";
import { AnimatedContent, BorderGlow, SpotlightCard } from "@/app/components/reactbits";
import {
  EnterpriseMediaImage,
  enterpriseCardSizes,
  enterpriseImages,
} from "@/components/EnterpriseImagery";
import { PremiumPageHero } from "@/components/PremiumPageHero";
import { ProductGrid } from "@/components/ProductGrid";
import { RequirementBuilder } from "@/components/RequirementBuilder";
import { categories } from "@/data/products";
import { listErpCatalog } from "@/lib/erp/ecommerce-client";
import { erpCatalogToWebsiteProducts } from "@/lib/erp/catalog-products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Build one RFQ package with multiple technology requirements, optional brand preferences, and supporting details before sending it to HACIEN.",
};

const supportNotes = [
  ["Not an online store", "This page explains the kinds of technology HACIEN can help source or coordinate. It does not publish prices or guarantee stock."],
  ["Quote-first review", "Exact models, quantities, warranty, lead time, delivery conditions, and commercial terms are confirmed through formal quotation."],
  ["Open-ended requirements", "Customers may send a product name, BOQ, specification, existing quote, picture, spreadsheet, or a plain description of the need."],
];

const categoryImages: Record<string, keyof typeof enterpriseImages> = {
  "computers-laptops": "workstation",
  "servers-storage": "storage",
  "network-equipment": "network",
  "printers-peripherals": "office",
  "licensed-software": "cloud",
  "security-surveillance": "cybersecurity",
  "accessories-consumables": "cabling",
  "power-ups": "dataCenter",
  "general-merchandise": "documentation",
};

async function getErpProducts() {
  try {
    const catalog = await listErpCatalog();
    return erpCatalogToWebsiteProducts(catalog.items || []);
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const erpProducts = await getErpProducts();

  return (
    <>
      <PremiumPageHero
        eyebrow="Technology RFQ Builder"
        title="Build one request from many technology needs."
        description="Add endpoints, servers, networking, software, power, cabling, services, files, or anything not listed into one RFQ package. HACIEN reviews the requirement before formal quotation."
        image="workstation"
        primaryAction={{ href: "/quote", label: "Submit RFQ Package" }}
        secondaryAction={{ href: "/technology", label: "Explore Technology" }}
        highlights={[
          { label: "Multiple Blocks", text: "Combine different requirements into one request." },
          { label: "Optional Brands", text: "Choose a preference or keep HACIEN flexible." },
          { label: "Files Welcome", text: "Attach BOQ, specs, images, Excel, or PDF." },
          { label: "Not Listed", text: "Describe the need even when no category fits." },
        ]}
      />

      <section className="bg-slate-50 px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {erpProducts.length > 0 ? (
            <div className="mb-12">
              <AnimatedContent>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">ERP-published catalog</div>
                <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Products currently published from HACIEN ERP.
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                  These items come from ERP publication settings. RFQ, order intent, manual payment review, and sandbox signals appear only when enabled in ERP.
                </p>
              </AnimatedContent>
              <div className="mt-8">
                <ProductGrid products={erpProducts} />
              </div>
            </div>
          ) : null}
          <RequirementBuilder initialCategory="computers-laptops" />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">Technology Areas</div>
            <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Common categories HACIEN can discuss with customers.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
              These categories are examples of supported technology areas. They are not a complete catalog and do not limit what customers may request.
            </p>
          </AnimatedContent>
          <div className="mt-6 grid gap-3 md:mt-10 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {categories.map((category, index) => (
              <AnimatedContent key={category.slug} delay={Math.min(index * 45, 320)}>
                <Link href={`/products/${category.slug}`} className="group block h-full">
                  <SpotlightCard className="h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-slate-950/10">
                    <div className="relative min-h-[118px] overflow-hidden sm:min-h-[190px]">
                      <EnterpriseMediaImage
                        image={categoryImages[category.slug] || "dataCenter"}
                        sizes={enterpriseCardSizes}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "linear-gradient(180deg, rgba(7, 20, 38, 0.03), rgba(7, 20, 38, 0.78))",
                        }}
                      />
                      <div className="absolute bottom-4 left-4 rounded border border-white/16 bg-white/12 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
                        Supported Area
                      </div>
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg font-bold text-slate-950 group-hover:text-[#2563EB] sm:text-xl">{category.name}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 sm:mt-3 sm:line-clamp-none">{category.summary}</p>
                      <div className="mt-3 text-sm font-bold text-[#2563EB] sm:mt-5">See example details</div>
                    </div>
                  </SpotlightCard>
                </Link>
              </AnimatedContent>
            ))}
          </div>
          <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:mt-8 sm:p-5">
            <h3 className="text-lg font-bold text-slate-950">Need a different category?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Use the RFQ form and describe the outcome. HACIEN can review mixed requirements without making this page a full catalog.
            </p>
            <Link href="/quote" className="mt-3 inline-flex text-sm font-bold text-[#2563EB]">
              Describe the requirement
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
        <AnimatedContent className="mx-auto max-w-7xl">
          <BorderGlow className="relative overflow-hidden rounded-lg bg-white p-5 shadow-sm sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">
                  How to start
                </div>
                <h2 className="mt-3 max-w-3xl text-xl font-bold tracking-tight text-slate-950 sm:mt-4 sm:text-3xl">
                  You can request help even if the exact product is not listed.
                </h2>
                <div className="mt-4 grid gap-3 md:mt-6 md:grid-cols-3 md:gap-4">
                  {supportNotes.map(([title, text]) => (
                    <div key={title} className="rounded border border-slate-200 bg-slate-50 p-3 sm:p-4">
                      <div className="font-bold text-slate-950">{title}</div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/quote"
                className="button-glow focus-ring rounded bg-[#2563EB] px-6 py-3 text-center text-sm font-bold text-white"
              >
                Send a Requirement
              </Link>
            </div>
          </BorderGlow>
        </AnimatedContent>
      </section>
    </>
  );
}
