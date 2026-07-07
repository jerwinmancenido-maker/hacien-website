import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import {
  CTABand,
  ErpPreviewV3,
  PremiumStatementBand,
  ProductCatalogV3,
  SolutionsV3,
  TechnologyEcosystem,
  TrustV3,
} from "@/components/HomeV3Sections";

export const metadata: Metadata = {
  title: "Enterprise Technology With Operational Clarity",
  description:
    "HACIEN provides enterprise technology, infrastructure, software, government procurement support, managed services, and a connected operating model for Philippine organizations.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <PremiumStatementBand />
      <TechnologyEcosystem />
      <SolutionsV3 />
      <ProductCatalogV3 />
      <ErpPreviewV3 />
      <TrustV3 />
      <CTABand />
    </>
  );
}
