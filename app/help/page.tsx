import Link from "next/link";
import { PremiumPageHero } from "@/components/PremiumPageHero";
import { getHelpContent } from "@/lib/cms/content";
import { getCmsMetadata } from "@/lib/cms/seo";

export const metadata = getCmsMetadata("help");

export default function HelpPage() {
  const content = getHelpContent();

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
        <div className="mx-auto grid max-w-3xl gap-4">
          {content.tiles.map((tile) => (
            <Link key={tile.title} href={tile.href} className="lift rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-base font-bold text-slate-950">{tile.title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{tile.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
