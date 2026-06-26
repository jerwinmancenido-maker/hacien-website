import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { CustomerJourneyConfidence } from "@/components/TrustConfidence";
import {
  CTABand,
  ErpPreviewV3,
  ExistingCustomerV3,
  GovernmentV3,
  HowHacienWorks,
  ProductCatalogV3,
  SolutionsV3,
  TechnologyEcosystem,
  TrustV3,
} from "@/components/HomeV3Sections";

export const metadata: Metadata = {
  title: "IT Infrastructure and Procurement Solutions",
  description:
    "HACIEN provides IT procurement, infrastructure, systems integration, and government procurement support for Philippine organizations.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <TechnologyEcosystem />
      <HowHacienWorks />
      <CustomerJourneyConfidence />
      <SolutionsV3 />
      <ProductCatalogV3 />
      <ErpPreviewV3 />
      <GovernmentV3 />
      <TrustV3 />
      <ExistingCustomerV3 />
      <CTABand />
    </>
  );
}
