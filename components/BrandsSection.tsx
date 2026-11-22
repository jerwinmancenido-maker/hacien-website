import { type CarriedBrand } from "@/data/companyContact";

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
