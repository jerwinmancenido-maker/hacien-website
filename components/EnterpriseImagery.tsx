import Link from "next/link";
import { getCmsMediaSourceMap } from "@/lib/cms/media";

export const enterpriseImages = getCmsMediaSourceMap();

export function EnterprisePhotoPanel({
  image,
  eyebrow,
  title,
  caption,
  className = "",
}: {
  image: keyof typeof enterpriseImages;
  eyebrow: string;
  title: string;
  caption: string;
  className?: string;
}) {
  return (
    <div
      className={`relative min-h-[220px] overflow-hidden rounded-lg bg-slate-950 shadow-2xl shadow-slate-950/18 sm:min-h-[270px] ${className}`}
    >
      <div
        className="cinematic-photo absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(7, 20, 38, 0.08), rgba(7, 20, 38, 0.74)), url(${enterpriseImages[image]})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,20,38,0.72),transparent_54%)]" />
      <div className="cinematic-lines pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative flex min-h-[220px] flex-col justify-end p-4 text-white sm:min-h-[270px] sm:p-5">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">{eyebrow}</div>
        <h3 className="mt-3 max-w-xl text-xl font-bold tracking-tight sm:text-2xl">{title}</h3>
        <p className="mt-3 max-w-lg text-sm leading-6 text-slate-200">{caption}</p>
      </div>
    </div>
  );
}

export function PremiumStatementBand() {
  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f5fbfc_100%)] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">Enterprise Technology</div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Start with the operating need, then choose the right technology.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            HACIEN keeps the public site useful without pretending it is a checkout or price list.
            Brands, models, pricing, and commercial terms are confirmed only after RFQ review.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/technology" className="button-glow rounded bg-[#0A0A0A] px-5 py-3 text-center text-sm font-bold text-white">
              Explore Technology
            </Link>
            <Link href="/quote" className="interactive-link rounded-full border border-slate-300 px-5 py-3 text-center text-sm font-bold text-slate-900">
              Submit an RFQ
            </Link>
          </div>
        </div>
        <EnterprisePhotoPanel
          image="network"
          eyebrow="RFQ-ready details"
          title="Clear requests make better supplier conversations possible."
          caption="A short requirement, a BOQ, or even a rough description can become useful when the assumptions and missing details are visible."
        />
      </div>
    </section>
  );
}
