import { FaqSearch, type FaqSection } from "@/components/FaqSearch";
import { PremiumPageHero } from "@/components/PremiumPageHero";
import { getFaqContent } from "@/lib/cms/content";
import { getCmsMetadata } from "@/lib/cms/seo";

export const metadata = getCmsMetadata("faq");

export default function FaqPage() {
  const content = getFaqContent();

  return (
    <>
      <PremiumPageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
        image={content.hero.image}
        primaryAction={content.hero.primaryAction}
        secondaryAction={content.hero.secondaryAction}
        highlights={content.hero.highlights}
      />
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <FaqSearch sections={content.faqSections as FaqSection[]} />
        </div>
      </section>
    </>
  );
}
