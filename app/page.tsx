import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import {
  CTABand,
  PremiumStatementBand,
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
      <TrustV3 />
      <CTABand />
    </>
  );
}
