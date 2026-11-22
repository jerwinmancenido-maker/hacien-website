import type { Metadata } from "next";
import Link from "next/link";
import { BrandGrid } from "@/components/BrandsSection";
import { brandCategories } from "@/data/companyContact";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Brands we carry",
  description:
    "More than 70 brands across computing, networking, security, printing, power and software — Every item is genuine, covered by the official brand warranty, and sourced per order by our team.",
  path: "/brands",
});

export default function BrandsPage() {
  return (
    <>
      <section className="bg-ink px-4 py-[42px] text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1180px]">
          <h1 className="text-[32px] font-extrabold leading-[1.12] tracking-[-0.01em] max-sm:text-[27px]">
            Brands we carry
          </h1>
          <p className="mt-3 max-w-[760px] text-[15.5px] leading-[1.5] text-[#D6D6D6]">
            More than 70 brands across computing, networking, security, printing, power and software —
            Every item is genuine, covered by the official brand warranty, and sourced per order by our team.
          </p>
        </div>
      </section>

      {brandCategories.map((category) => (
        <section key={category.name} className="px-4 pb-1 pt-[34px] max-sm:pt-7 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1180px]">
            <h2 className="text-[21.5px] font-bold tracking-[-0.01em] text-ink">{category.name}</h2>
            <p className="mt-1 text-sm text-grey-600">{category.description}</p>
            <BrandGrid brands={category.brands} />
          </div>
        </section>
      ))}

      <section className="mt-12 bg-ink px-4 pb-12 pt-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="text-[26px] font-extrabold">Need a quote?</h2>
          <p className="mt-2.5 text-[15.5px] leading-[1.55] text-[#D6D6D6]">
            Send us your requirements and we will reply with a formal quotation.
          </p>
          <div className="mt-[26px] flex flex-wrap items-center gap-3.5">
            <Link
              href="/quote"
              className="inline-flex h-[52px] items-center justify-center rounded-full bg-blue px-7 text-[15.5px] font-semibold text-white hover:bg-blue-dark"
            >
              Request a quotation
            </Link>
            <a href="mailto:sales@haciensolutions.com" className="text-[15.5px] font-semibold text-white">
              sales@haciensolutions.com
            </a>
          </div>
          <p className="mt-[22px] max-w-[820px] text-sm leading-[1.55] text-[#D6D6D6]">
            HACIEN is <strong className="font-[650] text-white">PhilGEPS-registered</strong>.
          </p>
        </div>
      </section>
    </>
  );
}
