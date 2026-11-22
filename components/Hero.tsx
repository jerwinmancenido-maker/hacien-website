import Link from "next/link";
import { getHomepageContent } from "@/lib/cms/content";
import {
  VA_BTN_PRIMARY_52,
  VA_BTN_SECONDARY_52,
  VA_CARD_TEXT,
  VA_H1,
  VA_H3,
  VA_LEAD,
  VA_PANEL,
  VA_WRAP,
} from "@/lib/variant-a";

export function Hero() {
  const content = getHomepageContent();

  return (
    <section className="pt-14 pb-2">
      <div className={VA_WRAP}>
        <div className="mx-auto max-w-[760px] text-center">
          <h1 className={VA_H1}>{content.hero.title}</h1>
          <p className={`${VA_LEAD} mt-4`}>{content.hero.description}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href={content.hero.primaryAction.href} className={VA_BTN_PRIMARY_52}>
              {content.hero.primaryAction.label}
            </Link>
            {content.hero.secondaryAction ? (
              <Link href={content.hero.secondaryAction.href} className={VA_BTN_SECONDARY_52}>
                {content.hero.secondaryAction.label}
              </Link>
            ) : null}
          </div>
        </div>

        <div className={`${VA_PANEL} mt-10`}>
          <div className="grid gap-[14px] min-[561px]:grid-cols-2">
            {content.heroSignals.map((item) => (
              <div key={item.title}>
                <h3 className={VA_H3}>{item.title}</h3>
                <p className={`${VA_CARD_TEXT} mt-2`}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
