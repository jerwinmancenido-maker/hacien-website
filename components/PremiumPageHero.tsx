import Link from "next/link";
import { enterpriseImages } from "@/components/EnterpriseImagery";

type HeroAction = {
  href: string;
  label: string;
};

type HeroHighlight = {
  label: string;
  text: string;
};

export function PremiumPageHero({
  eyebrow,
  title,
  description,
  image,
  primaryAction,
  secondaryAction,
  highlights,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: keyof typeof enterpriseImages;
  primaryAction: HeroAction;
  secondaryAction?: HeroAction;
  highlights: HeroHighlight[];
}) {
  return (
    <section className="relative overflow-hidden bg-[#071426] text-white">
      <div
        className="absolute inset-0 opacity-82"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(7, 20, 38, 0.96), rgba(7, 20, 38, 0.68), rgba(7, 20, 38, 0.24)), url(${enterpriseImages[image]})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_14%,rgba(42,120,255,0.26),transparent_32%)]" />
      <div className="relative mx-auto grid min-h-[660px] max-w-7xl items-center gap-12 px-4 py-18 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit rounded border border-blue-300/30 bg-white/8 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur">
            {eyebrow}
          </div>
          <h1 className="max-w-5xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={primaryAction.href} className="button-glow rounded-full bg-white px-6 py-3 text-center text-sm font-bold text-[#071426] shadow-xl shadow-blue-950/30">
              {primaryAction.label}
            </Link>
            {secondaryAction ? (
              <Link href={secondaryAction.href} className="interactive-link rounded-full border border-white/25 bg-white/8 px-6 py-3 text-center text-sm font-bold text-white backdrop-blur hover:border-blue-200">
                {secondaryAction.label}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="relative min-h-[440px] overflow-hidden rounded-lg border border-white/15 bg-white/[0.08] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-blue-500/10" />
          <div className="relative grid h-full grid-cols-2 gap-3">
            {highlights.map((item, index) => (
              <div key={item.label} className="rounded-lg border border-white/12 bg-white/10 p-5 backdrop-blur transition-transform duration-200 hover:-translate-y-1">
                <div className="text-xs font-bold text-blue-200">{String(index + 1).padStart(2, "0")}</div>
                <div className="mt-8 font-bold text-white">{item.label}</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
