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
  title: "Technology Sourcing From Request to Handover",
  description:
    "HACIEN helps organizations turn IT requirements, BOQs, supplier quotes, and rough ideas into review-ready RFQ conversations.",
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
