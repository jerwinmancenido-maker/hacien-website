import Image from "next/image";
import Link from "next/link";
import { founderLine, showroomNote } from "@/data/companyContact";
import { getCmsMediaRecord, getCmsMediaSourceMap, type CmsMediaKey } from "@/lib/cms/media";

export const enterpriseImages = getCmsMediaSourceMap();

export const enterpriseMediaQuality = 70;

/** Full-bleed page heroes (only these should pass priority). Cap desktop src near source width. */
export const enterpriseHeroSizes = "(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1440px";

/** Large photo panels beside copy (~half viewport on desktop). */
export const enterprisePanelSizes = "(max-width: 1024px) 100vw, 50vw";

/** Card / tile photo bands in grids. */
export const enterpriseCardSizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw";

/** Small thumbnails beside list copy. */
export const enterpriseThumbSizes = "(max-width: 640px) 80px, 96px";

export function EnterpriseMediaImage({
  image,
  priority = false,
  sizes,
  className = "",
}: {
  image: CmsMediaKey | keyof typeof enterpriseImages;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  const record = getCmsMediaRecord(image as CmsMediaKey);

  return (
    <Image
      src={record.source}
      alt={record.alt}
      fill
      priority={priority}
      quality={enterpriseMediaQuality}
      sizes={sizes}
      className={`object-cover ${className}`}
    />
  );
}

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
      className={`relative min-h-[220px] overflow-hidden rounded-lg bg-[#0A0A0A] shadow-2xl shadow-slate-950/18 sm:min-h-[270px] ${className}`}
    >
      <div className="cinematic-photo absolute inset-0">
        <EnterpriseMediaImage image={image} sizes={enterprisePanelSizes} />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.74))",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.72),transparent_54%)]" />
      <div className="cinematic-lines pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative flex min-h-[220px] flex-col justify-end p-4 text-white sm:min-h-[270px] sm:p-5">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-300">{eyebrow}</div>
        <h3 className="mt-3 max-w-xl text-xl font-bold tracking-tight sm:text-2xl">{title}</h3>
        {caption ? <p className="mt-3 max-w-lg text-sm leading-6 text-grey-200">{caption}</p> : null}
      </div>
    </div>
  );
}

export function PremiumStatementBand() {
  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#fafafa_100%)] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-700">Company</div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            About HACIEN.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            {founderLine}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/quote" className="button-glow rounded bg-[#0A0A0A] px-5 py-3 text-center text-sm font-bold text-white">
              Request a Quote
            </Link>
            <Link href="/contact" className="interactive-link rounded border border-slate-300 px-5 py-3 text-center text-sm font-bold text-slate-900">
              Contact
            </Link>
          </div>
        </div>
        <EnterprisePhotoPanel
          image="network"
          eyebrow="Appointments"
          title={showroomNote}
          caption=""
        />
      </div>
    </section>
  );
}
