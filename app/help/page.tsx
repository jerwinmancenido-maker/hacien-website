import type { Metadata } from "next";
import Link from "next/link";
import { AiDocumentParser } from "@/components/AiDocumentParser";
import { PremiumPageHero } from "@/components/PremiumPageHero";
import { getHelpContent } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Help Center | HACIEN",
  description: "HACIEN help center for RFQ preparation, request tracking, and prototype document parsing.",
};

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
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            {content.tiles.map((tile) => (
              <Link key={tile.title} href={tile.href} className="lift rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-base font-bold text-slate-950">{tile.title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{tile.text}</p>
              </Link>
            ))}
          </div>
          <AiDocumentParser />
        </div>
      </section>
    </>
  );
}
