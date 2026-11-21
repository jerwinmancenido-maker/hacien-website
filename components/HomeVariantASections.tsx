import Link from "next/link";
import { buyingSteps } from "@/components/BuyingTimeline";
import {
  brandsList,
  deliveryClauses,
  replyTime,
} from "@/data/companyContact";
import { projectIntegration } from "@/data/buyerCopy";
import {
  VA_BTN_PRIMARY_52,
  VA_BTN_SECONDARY_52,
  VA_CARD,
  VA_CARD_TEXT,
  VA_FOCUS_ON_CANVAS,
  VA_H2,
  VA_H3,
  VA_LEAD,
  VA_PANEL,
  VA_SECTION,
  VA_WRAP,
} from "@/lib/variant-a";

/**
 * Home-only Variant A sections (REQ-WEB-RESTYLE-001).
 *
 * These are home-specific variants: the shared BuyingTimeline and CTABand
 * components are used by other routes and are NOT edited for this restyle.
 */

export function HomeBuyingSteps() {
  return (
    <section className={VA_SECTION}>
      <div className={VA_WRAP}>
        <h2 className={VA_H2}>How buying from HACIEN works</h2>
        <div className="mt-[30px] grid gap-[14px] min-[561px]:grid-cols-3">
          {buyingSteps.map((step) => (
            <div key={step.title} className={VA_CARD}>
              <h3 className={VA_H3}>{step.title}</h3>
              <p className={`${VA_CARD_TEXT} mt-2`}>{step.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-[22px] text-sm text-[#9AA1B1]">
          Full detail is in the{" "}
          <Link
            href="/terms-of-sale"
            className={`font-semibold text-[#6692F1] hover:underline ${VA_FOCUS_ON_CANVAS}`}
          >
            Terms of Sale
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

export function HomeBrandsSection() {
  const featured = brandsList.filter((brand) => brand.featured);
  return (
    <section className={VA_SECTION}>
      <div className={VA_WRAP}>
        <div className="max-w-[760px]">
          <h2 className={VA_H2}>Brands we carry</h2>
          <p className={`${VA_LEAD} mt-2.5`}>
            Technology, office and business products from the names you know — more than 70
            brands, sourced per order and quoted by our team.
          </p>
        </div>
        <div className="mt-[26px] grid grid-cols-3 gap-2 min-[561px]:grid-cols-4 min-[561px]:gap-[10px] lg:grid-cols-6">
          {featured.map((brand) => (
            <div
              key={brand.name}
              className="flex h-[58px] min-w-0 items-center justify-center overflow-hidden rounded-[14px] bg-[#F5F5F5] p-2 min-[561px]:h-16 min-[561px]:rounded-2xl min-[561px]:p-[10px]"
            >
              {brand.logo ? (
                // eslint-disable-next-line @next/next/no-img-element -- brand logo SVGs stay vector; next/image rasterizes them
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-[21px] w-auto max-w-[80%] min-[561px]:max-h-[26px]"
                  loading="lazy"
                  decoding="async"
                />
              ) : brand.wordmark ? (
                <div
                  className="text-center text-[13.5px] leading-[1.1] font-bold tracking-[0.01em] text-[#0A0A0A] min-[561px]:text-[16.5px]"
                  style={{
                    color: brand.wordmark.color,
                    letterSpacing: brand.wordmark.letterSpacing,
                  }}
                >
                  {brand.wordmark.text}
                  {brand.wordmark.small ? (
                    <small className="mt-[2px] block text-[8.5px] font-semibold tracking-[0.14em] text-[#525252] min-[561px]:text-[10.5px]">
                      {brand.wordmark.small}
                    </small>
                  ) : null}
                </div>
              ) : (
                <div className="text-center text-[13.5px] leading-[1.1] font-bold text-[#0A0A0A] min-[561px]:text-[16.5px]">
                  {brand.name}
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="mt-[22px] max-w-[820px] text-[14.5px] leading-[1.55] text-[#C3C8D2]">
          Every item is genuine, covered by the official brand warranty, and sourced per order
          by our team.
        </p>
        <div className="mt-[18px]">
          <Link href="/brands" className={VA_BTN_PRIMARY_52}>
            See all brands
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HomeDeliveryWarranty() {
  const warrantyText = projectIntegration.phases.find(
    (phase) => phase.step === "After-sales",
  )?.detail;
  return (
    <section className={VA_SECTION}>
      <div className={VA_WRAP}>
        <div className="grid gap-[14px] min-[561px]:grid-cols-2">
          <div className={VA_PANEL}>
            <h2 className="text-2xl font-extrabold leading-[1.18] tracking-normal text-[#F4F6FA]">
              Delivery
            </h2>
            {deliveryClauses.map((clause) => (
              <p key={clause} className={`${VA_CARD_TEXT} mt-2`}>
                {clause}
              </p>
            ))}
          </div>
          <div className={VA_PANEL}>
            <h2 className="text-2xl font-extrabold leading-[1.18] tracking-normal text-[#F4F6FA]">
              Warranty
            </h2>
            {warrantyText ? <p className={`${VA_CARD_TEXT} mt-2`}>{warrantyText}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeCTABand() {
  return (
    <div className={VA_WRAP}>
      <div className="mt-16 rounded-[24px] bg-[#060F23] px-[22px] py-9 text-center min-[561px]:px-10 min-[561px]:py-12">
        <h2 className={VA_H2}>Request a quotation</h2>
        <p className={`${VA_LEAD} mt-3`}>{replyTime}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/quote" className={VA_BTN_PRIMARY_52}>
            Request a Quote
          </Link>
          <Link href="/contact" className={VA_BTN_SECONDARY_52}>
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
