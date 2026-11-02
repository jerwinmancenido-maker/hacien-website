import Link from "next/link";
import {
  EnterpriseMediaImage,
  enterpriseHeroSizes,
  enterpriseImages,
} from "@/components/EnterpriseImagery";
import { getHomepageContent } from "@/lib/cms/content";

export function Hero() {
  const content = getHomepageContent();

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] text-white">
      <div className="cinematic-photo absolute inset-0 opacity-80">
        <EnterpriseMediaImage
          image={content.hero.image as keyof typeof enterpriseImages}
          priority
          sizes={enterpriseHeroSizes}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(105deg, rgba(10, 10, 10, 0.96) 0%, rgba(10, 10, 10, 0.82) 48%, rgba(10, 10, 10, 0.35) 100%)",
          }}
        />
      </div>
      <div className="cinematic-aurora pointer-events-none absolute inset-0" />
      <div className="cinematic-lines pointer-events-none absolute inset-0 opacity-30" />
      <div className="cinematic-sweep pointer-events-none absolute inset-y-0 left-0 w-[74%] opacity-0" />
      {/* Handoff: do not place the logo over the hero photo. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      <div className="relative mx-auto grid min-h-[450px] max-w-7xl items-center gap-5 px-4 py-7 sm:min-h-[520px] sm:gap-8 sm:px-6 sm:py-9 lg:min-h-[560px] lg:grid-cols-[1.22fr_1fr] lg:gap-10 lg:px-8 lg:py-12">
        <div className="flex flex-col justify-center">
          <div className="mb-3 inline-flex w-fit rounded border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur sm:mb-5">
            {content.hero.eyebrow}
          </div>
          <h1 className="font-display max-w-4xl text-balance text-2xl tracking-tight hyphens-none sm:text-4xl lg:text-5xl">
            {content.hero.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-grey-200 sm:mt-5 sm:text-base sm:leading-7">
            {content.hero.description}
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:mt-7 sm:flex-row sm:gap-3">
            <Link
              href={content.hero.primaryAction.href}
              className="rounded bg-blue px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-dark sm:px-6 sm:py-3 cursor-pointer"
            >
              {content.hero.primaryAction.label}
            </Link>
            {content.hero.secondaryAction ? (
              <Link
                href={content.hero.secondaryAction.href}
                className="interactive-link rounded border border-white/25 bg-transparent px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-white/5 sm:px-6 sm:py-3 cursor-pointer"
              >
                {content.hero.secondaryAction.label}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="h-full">
          <div className="relative overflow-hidden rounded-lg border border-white/15 bg-[#0A0A0A] p-3 shadow-2xl shadow-black/40 sm:p-4">
            <div className="relative space-y-3">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {content.heroSignals.map((item, index) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-white/12 bg-[#141414] p-3 sm:p-4 transition-transform duration-200 hover:-translate-y-1"
                  >
                    <div className="text-xs font-bold text-grey-300">{String(index + 1).padStart(2, "0")}</div>
                    <div className="mt-2 text-sm font-bold text-white hyphens-none">{item.title}</div>
                    <p className="mt-2 text-xs leading-5 text-grey-200 hyphens-none sm:text-sm sm:leading-6">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
