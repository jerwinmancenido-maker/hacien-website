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
  title: "Technology Procurement Clarified Before Quoting",
  description:
    "HACIEN helps organizations turn IT requirements, BOQs, supplier quotes, and rough ideas into usable RFQ conversations.",
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
