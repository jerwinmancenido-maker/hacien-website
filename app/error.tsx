"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="motion-slide-up flex min-h-[65vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="surface mx-auto max-w-lg rounded p-8 text-center sm:p-12">
        <div className="mx-auto flex flex-col items-center gap-4">
          <BrandLogo variant="icon" height={56} />
          <span className="inline-flex items-center rounded bg-danger-bg px-3.5 py-1 text-xs font-semibold text-danger ring-1 ring-inset ring-danger/10">
            System Alert
          </span>
        </div>
        <h1 className="font-display mt-6 text-2xl tracking-tight text-ink sm:text-3xl">Something went wrong</h1>
        <p className="mt-4 text-sm leading-6 text-grey-600">
          An unexpected error occurred while loading this page. Please try again or return to the home page.
        </p>
        <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="cursor-pointer rounded bg-blue px-6 py-3 text-sm font-medium text-white transition duration-200 hover:bg-blue-dark"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded border border-grey-200 px-6 py-3 text-center text-sm font-medium text-grey-700 transition duration-200 hover:border-blue/50 hover:bg-grey-100"
          >
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}
