import Link from "next/link";
import { getHomepageContent } from "@/lib/cms/content";

export function Hero() {
  const content = getHomepageContent();

  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-grey-600">
          {content.hero.eyebrow}
        </div>
        <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
          {content.hero.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-grey-700">
          {content.hero.description}
        </p>
        <div className="mt-7 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
          <Link
            href={content.hero.primaryAction.href}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-blue px-6 py-3 text-center text-sm font-medium text-white hover:bg-blue-dark"
          >
            {content.hero.primaryAction.label}
          </Link>
          {content.hero.secondaryAction ? (
            <Link
              href={content.hero.secondaryAction.href}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-grey-300 bg-white px-6 py-3 text-center text-sm font-medium text-ink hover:bg-grey-50"
            >
              {content.hero.secondaryAction.label}
            </Link>
          ) : null}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-grey-200 bg-grey-50 p-5 sm:p-6">
        <div className="space-y-5">
          {content.heroSignals.map((item, index) => (
            <div key={item.title}>
              <div className="text-sm font-bold text-blue">{String(index + 1).padStart(2, "0")}</div>
              <div className="mt-1 text-sm font-bold text-ink">{item.title}</div>
              <p className="mt-1 text-sm leading-6 text-grey-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
