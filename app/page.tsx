import { Hero } from "@/components/Hero";
import {
  CTABand,
  PremiumStatementBand,
  SolutionsV3,
  TechnologyEcosystem,
  TrustV3,
} from "@/components/HomeV3Sections";
import { getCmsMetadata } from "@/lib/cms/seo";

export const metadata = getCmsMetadata("homepage");

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
