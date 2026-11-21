import { Hero } from "@/components/Hero";
import { PremiumStatementBand } from "@/components/EnterpriseImagery";
import { TrustV3 } from "@/components/HomeV3Sections";
import {
  HomeBrandsSection,
  HomeBuyingSteps,
  HomeCTABand,
  HomeDeliveryWarranty,
} from "@/components/HomeVariantASections";
import { getCmsMetadata } from "@/lib/cms/seo";

export const metadata = getCmsMetadata("homepage");

export default function Home() {
  return (
    <div className="bg-[#0B0C10]">
      <Hero />
      <PremiumStatementBand />
      <HomeBuyingSteps />
      <HomeBrandsSection />
      <TrustV3 />
      <HomeDeliveryWarranty />
      <HomeCTABand />
    </div>
  );
}
