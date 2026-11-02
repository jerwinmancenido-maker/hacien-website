import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { siteFooterPolicyLinks } from "@/app/policies/_lib/links";
import { companyContact } from "@/data/companyContact";
import { getNavigationContent } from "@/lib/cms/content";

/** Second caption line. Shown even when BIR_RSN is unset. */
export const birRmcCaption = "per BIR RMC No. 38-2026";

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
    <footer className="relative z-10 border-t border-grey-200 bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[1.05fr_1.6fr] lg:items-start">
          <div>
            {/*
              Full white lockup on ink. Width ≥ 200px (handoff min).
              230px on narrow viewports, 280px from sm up — both above the 200px floor.
              BrandLogo adds clear space X = 0.286×CH. Never retype HACIEN — SVG only.
            */}
            <BrandLogo variant="full-white" width={280} />
            {navigationContent.footer.statement ? (
              <p className="mt-4 max-w-lg text-sm leading-6 text-grey-300">
                {navigationContent.footer.statement}
              </p>
            ) : null}
          </div>

          <div className="rounded border border-white/10 bg-white/[0.04] p-5 text-sm text-grey-300">
            <address className="not-italic leading-6">
              <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-grey-300">
                {companyContact.addressLabel}
              </span>
              <span>{companyContact.addressLines.join(", ")}</span>
              <span className="mt-2 block">
                <a href={`mailto:${companyContact.email}`} className="text-white hover:underline">
                  {companyContact.email}
                </a>
              </span>
            </address>
          </div>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {groups.map((group) => (
            <div key={group.title}>
              <div className="text-sm font-medium text-white">{group.title}</div>
              <div className="mt-4 grid gap-1 text-sm text-grey-300 sm:gap-3">
                {group.links.map((link) => (
                  <Link
                    key={`${group.title}-${link.href}`}
                    href={link.href}
                    className="inline-flex min-h-11 items-center hover:text-white sm:min-h-0"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
          <Link href="/compliance" className="inline-flex max-w-full">
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
          <p className="text-sm leading-5 text-grey-300">
            <span className="block whitespace-nowrap">{birBadgeLabel()}</span>
            <span className="block whitespace-nowrap">{birRmcCaption}</span>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-grey-300">
        <span>© {new Date().getFullYear()} HACIEN Information Technology Solutions. All rights reserved.</span>
      </div>
    </footer>
  );
}
