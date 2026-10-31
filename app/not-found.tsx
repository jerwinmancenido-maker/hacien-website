import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

export default function NotFoundPage() {
  return (
    <section className="motion-slide-up flex min-h-[65vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="surface mx-auto max-w-2xl rounded p-8 text-center sm:p-12">
        <div className="mx-auto flex flex-col items-center gap-4">
          <BrandLogo variant="icon" height={56} />
          <span className="inline-flex items-center rounded bg-blue-tint px-3.5 py-1 text-xs font-semibold text-blue ring-1 ring-inset ring-blue/10">
            Error Code 404
          </span>
        </div>
        <h1 className="font-display mt-6 text-3xl tracking-tight text-ink sm:text-3xl">
          This room is not available.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-grey-600">
          The page may have moved, or the address may not be part of the public HACIEN headquarters.
        </p>
        <div className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded bg-blue px-6 py-3 text-sm font-medium text-white transition duration-200 hover:bg-blue-dark"
          >
            Return to headquarters
          </Link>
          <Link
            href="/search"
            className="rounded border border-grey-200 px-6 py-3 text-center text-sm font-medium text-grey-700 transition duration-200 hover:border-blue/50 hover:bg-grey-100"
          >
            Search Headquarters
          </Link>
          <Link
            href="/support"
            className="rounded border border-grey-200 px-6 py-3 text-center text-sm font-medium text-grey-700 transition duration-200 hover:border-blue/50 hover:bg-grey-100"
          >
            Support Desk
          </Link>
        </div>
      </div>
    </section>
  );
}
