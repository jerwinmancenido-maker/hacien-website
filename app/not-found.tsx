import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="motion-slide-up flex min-h-[65vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="surface mx-auto max-w-2xl rounded p-8 text-center sm:p-12">
        <div className="mx-auto flex flex-col items-center gap-4">
          {/*
            Inline SVG (same paths as /brand/icon.svg) instead of BrandLogo <img>.
            Next 16 preloads <img> assets from the root notFound slot on every
            route via Flight :HL links; /brand/icon.svg was then unused on real
            pages and triggered the console preload warning. Favicons stay on
            metadata.icons / file-convention icons.
          */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 240 240"
            width={56}
            height={56}
            className="block"
            aria-hidden="true"
          >
            <title>HACIEN</title>
            <rect width="240" height="240" fill="#FFFFFF" />
            <g transform="translate(-97.0 51.5)">
              <path
                fill="#0A0A0A"
                d="M147 140L217.0 -3L287 140H242.465L217.0 87.979L191.535 140z"
              />
              <rect x="207.0" y="120" width="20" height="20" fill="#2563EB" />
            </g>
          </svg>
          <span className="inline-flex items-center rounded border border-grey-200 bg-grey-50 px-3.5 py-1 text-xs font-semibold text-grey-700">
            Error Code 404
          </span>
        </div>
        <h1 className="font-display mt-6 text-3xl tracking-tight text-ink sm:text-3xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-grey-600">
          Sorry, we couldn&apos;t find that page.
        </p>
        <div className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded bg-blue px-6 py-3 text-sm font-medium text-white transition duration-200 hover:bg-blue-dark"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="rounded border border-grey-200 px-6 py-3 text-center text-sm font-medium text-grey-700 transition duration-200 hover:border-blue/50 hover:bg-grey-100"
          >
            Products
          </Link>
          <Link
            href="/contact"
            className="rounded border border-grey-200 px-6 py-3 text-center text-sm font-medium text-grey-700 transition duration-200 hover:border-blue/50 hover:bg-grey-100"
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
