import Link from "next/link";
import {
  brandCategories,
  featuredBrandNames,
  type CarriedBrand,
} from "@/data/companyContact";

/** One brand tile: the held logo file in true colours, or a styled
 *  wordmark, on the light compact tile from the approved brands mock. */
export function BrandTile({ brand }: { brand: CarriedBrand }) {
  return (
    <div className="flex h-16 min-w-0 items-center justify-center overflow-hidden rounded-2xl bg-grey-100 p-2.5 max-sm:h-[58px] max-sm:rounded-[14px] max-sm:p-2">
      {brand.logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- held brand SVG, same pattern as BrandLogo
        <img
          src={`/brand/logos/${brand.logo}`}
          alt={brand.name}
          loading="lazy"
          className="max-h-[26px] w-auto max-w-[80%] max-sm:max-h-[21px]"
        />
      ) : (
        <div
          className="text-center text-[16.5px] font-bold leading-[1.1] tracking-[0.01em] text-ink max-sm:text-[13.5px]"
          style={{
            color: brand.color,
            letterSpacing: brand.spacing,
          }}
        >
          {brand.display ?? brand.name}
          {brand.sub ? (
            <small className="mt-0.5 block text-[10.5px] font-semibold tracking-[0.14em] text-grey-600 max-sm:text-[8.5px] max-sm:tracking-[0.1em]">
              {brand.sub}
            </small>
          ) : null}
        </div>
      )}
    </div>
  );
}

export function BrandGrid({ brands }: { brands: readonly CarriedBrand[] }) {
  return (
    <div className="mt-[26px] grid grid-cols-3 gap-2 min-[561px]:gap-2.5 md:grid-cols-4 lg:grid-cols-6 [&>*]:min-w-0">
      {brands.map((brand, index) => (
        <BrandTile key={`${brand.name}-${index}`} brand={brand} />
      ))}
    </div>
  );
}

const brandByName = new Map<string, CarriedBrand>(
  brandCategories.flatMap((category) => category.brands.map((brand) => [brand.name, brand] as const)),
);

const featuredBrands = featuredBrandNames
  .map((name) => brandByName.get(name))
  .filter((brand): brand is CarriedBrand => Boolean(brand));

/** Homepage "Brands we carry" section — compact treatment from the
 *  approved brands mock, fed by the shared structured list. */
export function BrandsSection() {
  return (
    <section className="bg-white px-4 pb-1 pt-12 sm:px-6 sm:pt-12 lg:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="max-w-[720px]">
          <h2 className="text-[30px] font-extrabold leading-[1.15] tracking-[-0.01em] text-ink max-sm:text-[25px]">
            Brands we carry
          </h2>
          <p className="mt-2.5 text-[15.5px] leading-[1.5] text-grey-600">
            Technology, office and business products from the names you know — more than 70 brands,
            sourced per order and quoted by our team.
          </p>
        </div>
        <BrandGrid brands={featuredBrands} />
        <p className="mt-[22px] max-w-[820px] text-sm leading-[1.55] text-grey-600">
          Every item is <strong className="font-[650] text-ink">genuine, covered by the official brand warranty</strong>,
          and sourced per order by our team.
        </p>
        <div className="mt-[18px]">
          <Link
            href="/brands"
            className="inline-flex h-[52px] items-center justify-center rounded-full bg-blue px-7 text-[15.5px] font-semibold text-white hover:bg-blue-dark"
          >
            See all brands
          </Link>
        </div>
      </div>
    </section>
  );
}
