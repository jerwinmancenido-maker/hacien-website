import { Hero } from "@/components/Hero";
import { BuyingTimeline } from "@/components/BuyingTimeline";
import { ProjectIntegration } from "@/components/ProjectIntegration";
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
      <ProjectIntegration />
      <TechnologyEcosystem />
      <TrustV3 />
      <BuyingTimeline />
      <CTABand
        title="Request a quotation."
        description={replyTime}
      />
    </>
  );
}
