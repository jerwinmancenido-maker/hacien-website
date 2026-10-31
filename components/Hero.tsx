import Link from "next/link";
import { enterpriseImages } from "@/components/EnterpriseImagery";
import { FadeIn, SlideUp } from "@/components/motion";
import { getHomepageContent } from "@/lib/cms/content";

export function Hero() {
  const content = getHomepageContent();

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] text-white">
      <div
        className="cinematic-photo absolute inset-0 opacity-80"
        style={{
          backgroundImage: `linear-gradient(105deg, rgba(5, 16, 28, 0.98), rgba(8, 45, 62, 0.76) 48%, rgba(132, 91, 44, 0.22)), url(${enterpriseImages[content.hero.image]})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="cinematic-aurora pointer-events-none absolute inset-0" />
      <div className="cinematic-lines pointer-events-none absolute inset-0 opacity-30" />
      <div className="cinematic-sweep pointer-events-none absolute inset-y-0 left-0 w-[74%] opacity-0" />
      {/* Handoff: do not place the logo over the hero photo. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      <div className="relative mx-auto grid min-h-[450px] max-w-7xl items-center gap-5 px-4 py-7 sm:min-h-[520px] sm:gap-8 sm:px-6 sm:py-9 lg:min-h-[560px] lg:grid-cols-[1fr_0.86fr] lg:gap-10 lg:px-8 lg:py-12">
        <div className="flex flex-col justify-center">
          <FadeIn>
            <div className="mb-3 inline-flex w-fit rounded border border-blue-300/30 bg-white/8 px-3 py-1.5 text-xs font-semibold text-blue-100 backdrop-blur sm:mb-5">
              {content.hero.eyebrow}
            </div>
          </FadeIn>
          <SlideUp delay={80}>
            <h1 className="font-display max-w-4xl text-balance text-2xl tracking-tight sm:text-4xl lg:text-5xl">
              {content.hero.title}
            </h1>
          </SlideUp>
          <SlideUp delay={170}>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:mt-5 sm:text-base sm:leading-7">
              {content.hero.description}
            </p>
          </SlideUp>
          <SlideUp delay={260}>
            <div className="mt-5 flex flex-col gap-2 sm:mt-7 sm:flex-row sm:gap-3">
              <Link
                href={content.hero.primaryAction.href}
                className="rounded bg-blue px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-dark sm:px-6 sm:py-3"
              >
                {content.hero.primaryAction.label}
              </Link>
              {content.hero.secondaryAction ? (
                <Link
                  href={content.hero.secondaryAction.href}
                  className="interactive-link rounded border border-white/25 bg-transparent px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-white/5 sm:px-6 sm:py-3"
                >
                  {content.hero.secondaryAction.label}
                </Link>
              ) : null}
            </div>
          </SlideUp>
        </div>

        <SlideUp delay={220} className="hidden h-full md:block">
          <div className="relative overflow-hidden rounded-lg border border-white/15 bg-white/[0.08] p-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-blue-500/10" />
            <div className="relative space-y-3">
              <div className="rounded-lg border border-white/12 bg-white/10 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">First response focus</div>
                <p className="mt-3 text-sm leading-6 text-slate-200">
                  The website captures the request. HACIEN checks it before any formal quote, delivery, payment, or
                  document commitment exists.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {content.heroSignals.map((item, index) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-white/12 bg-white/10 p-3 backdrop-blur transition-transform duration-200 hover:-translate-y-1"
                  >
                    <div className="text-xs font-bold text-blue-200">{String(index + 1).padStart(2, "0")}</div>
                    <div className="mt-2 text-sm font-bold text-white">{item.title}</div>
                    <p className="mt-2 text-xs leading-5 text-slate-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
