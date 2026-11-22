import Link from "next/link";
import { EnterpriseMediaFrame } from "@/components/EnterpriseMediaFrame";
import { founderLine, showroomNote } from "@/data/companyContact";
import {
  VA_BTN_PRIMARY_52,
  VA_BTN_SECONDARY_52,
  VA_H2,
  VA_LEAD,
  VA_PANEL,
  VA_SECTION,
  VA_WRAP,
} from "@/lib/variant-a";
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
    <EnterpriseMediaFrame
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
    <section className={VA_SECTION}>
      <div className={VA_WRAP}>
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className={VA_H2}>About HACIEN</h2>
          <p className={`${VA_LEAD} mt-3.5`}>{founderLine}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/quote" className={VA_BTN_PRIMARY_52}>
              Request a Quote
            </Link>
            <Link href="/contact" className={VA_BTN_SECONDARY_52}>
              Contact
            </Link>
          </div>
        </div>
        <div className={`${VA_PANEL} mt-9 text-center`}>
          <p className="text-[15.5px] font-semibold text-[#F4F6FA]">{showroomNote}</p>
        </div>
      </div>
    </section>
  );
}
