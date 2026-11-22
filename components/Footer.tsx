import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { siteFooterPolicyLinks } from "@/app/policies/_lib/links";
import { companyContact } from "@/data/companyContact";
import { getNavigationContent } from "@/lib/cms/content";
import { CookieSettingsButton } from "@/components/CookieNotice";
import { isValidGaId } from "@/lib/ga4";
import { VA_FOCUS_ON_BAND, VA_WRAP } from "@/lib/variant-a";

/** Second caption line. Shown even when BIR_RSN is unset. */
export const birRmcCaption = "Issued under BIR RMC No. 38-2026";

/** BIR registration serial, read at build time. Unset omits the RSN. */
export function birBadgeLabel(rsn: string | undefined = process.env.BIR_RSN) {
  const value = typeof rsn === "string" ? rsn.trim() : "";
  if (!value) return "BIR Registered";
  return `BIR Registered · RSN ${value}`;
}

export function birBadgeAlt(rsn: string | undefined = process.env.BIR_RSN) {
  const value = typeof rsn === "string" ? rsn.trim() : "";
  if (!value) return "BIR Registration Seal Badge";
  return `BIR Registration Seal Badge, RSN ${value}`;
}

export function Footer() {
  const navigationContent = getNavigationContent();
  const groups = navigationContent.footer.groups.some((group) => group.title === "Legal")
    ? navigationContent.footer.groups.map((group) =>
        group.title === "Legal" ? { ...group, links: [...siteFooterPolicyLinks] } : group,
      )
    : [...navigationContent.footer.groups, { title: "Legal", links: [...siteFooterPolicyLinks] }];

  return (
    <footer className="relative z-10 bg-[#060F23] text-[#C3C8D2]">
      <div className={`${VA_WRAP} pt-14`}>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_1.6fr] lg:items-start">
          <div>
            {/*
              White wordmark-only variant at 40px tall, full contrast, never dimmed.
              (The full lockup cannot render at this height — its 200px minimum
              width puts it at ~54px tall — so the shell uses the wordmark.)
            */}
            <Link
              href="/"
              className={`inline-flex items-center rounded-full ${VA_FOCUS_ON_BAND}`}
              aria-label="HACIEN home"
            >
              <BrandLogo variant="wordmark-white" height={40} />
            </Link>
            {navigationContent.footer.statement ? (
              <p className="mt-4 max-w-[480px] text-sm leading-[1.6]">
                {navigationContent.footer.statement}
              </p>
            ) : null}
          </div>

          <div className="rounded-[20px] bg-[#15171D] p-[22px] text-sm leading-[1.65]">
            <address className="not-italic">
              <span className="mb-1.5 block text-[13.5px] font-semibold text-[#F4F6FA]">
                {companyContact.addressLabel}
              </span>
              <span>{companyContact.addressOneLine}</span>
              <span className="mt-2 block">
                <a
                  href={`mailto:${companyContact.email}`}
                  className={`font-semibold text-white hover:underline ${VA_FOCUS_ON_BAND}`}
                >
                  {companyContact.email}
                </a>
              </span>
            </address>
          </div>
        </div>

        <div className="mt-11 grid grid-cols-2 gap-7 min-[561px]:grid-cols-3 lg:grid-cols-5">
          {groups.map((group) => (
            <div key={group.title}>
              <div className="mb-3.5 text-sm font-semibold text-[#F4F6FA]">{group.title}</div>
              <div className="grid text-sm">
                {group.links.map((link) => (
                  <Link
                    key={`${group.title}-${link.href}`}
                    href={link.href}
                    className={`block rounded py-[5px] transition-colors hover:text-[#F4F6FA] ${VA_FOCUS_ON_BAND}`}
                  >
                    {link.label}
                  </Link>
                ))}
                {group.title === "Legal" && isValidGaId(process.env.NEXT_PUBLIC_HACIEN_GA4_ID) ? (
                  <CookieSettingsButton />
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3">
          <Link href="/compliance" className={`inline-flex max-w-full rounded ${VA_FOCUS_ON_BAND}`}>
            {/* Official BIR seal. Scale only: the file is served unaltered so the QR stays scannable. */}
            {/* eslint-disable-next-line @next/next/no-img-element -- BIR RMC No. 38-2026 requires the seal unaltered; next/image recompresses it */}
            <img
              src="/brand/bir-registration-badge.png"
              alt={birBadgeAlt()}
              width={1626}
              height={582}
              className="block h-auto w-auto max-h-[120px] max-w-full"
              decoding="async"
            />
          </Link>
          <p className="text-[13.5px] leading-[1.5]">
            <span className="block whitespace-nowrap">{birBadgeLabel()}</span>
            <span className="block whitespace-nowrap">{birRmcCaption}</span>
          </p>
        </div>
      </div>
      <div className="mt-9 px-6 pt-[18px] pb-[22px] text-center text-[12.5px] text-[#9AA1B1] shadow-[0_-1px_0_rgba(255,255,255,0.08)]">
        <span>© {new Date().getFullYear()} HACIEN Information Technology Solutions. All rights reserved.</span>
      </div>
    </footer>
  );
}
