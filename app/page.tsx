import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import {
  CTABand,
  ErpPreviewV3,
  PremiumStatementBand,
  ProductCatalogV3,
  SolutionsV3,
  TrustV3,
} from "@/components/HomeV3Sections";
import { RemotionCinematicPreviewWrapper } from "@/components/visual/RemotionCinematicPreviewWrapper";

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
      <section className="bg-[#071426] px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <RemotionCinematicPreviewWrapper />
        </div>
      </section>
      <SolutionsV3 />
      <ProductCatalogV3 />
      <ErpPreviewV3 />
      <TrustV3 />
      <CTABand />
    </>
  );
}
