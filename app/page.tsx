import { Hero } from "@/components/Hero";
import { replyTime } from "@/data/companyContact";
import {
  CTABand,
  PremiumStatementBand,
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
      <TrustV3 />
      <CTABand
        title="Request a quotation."
        description={replyTime}
      />
    </>
  );
}
