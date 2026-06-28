"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="surface mx-auto max-w-lg rounded-lg p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-red-50 text-2xl font-bold text-red-600">
          !
        </div>
        <h1 className="mt-6 text-2xl font-bold text-slate-950">
          Something went wrong
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          An unexpected error occurred while loading this page. Please try again
          or return to the home page.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="button-glow rounded bg-[#1457d9] px-5 py-3 text-sm font-bold text-white hover:bg-[#0f46b4]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="interactive-link rounded border border-slate-300 px-5 py-3 text-center text-sm font-bold text-slate-700 hover:border-[#1457d9]"
          >
            Return home
          </Link>
        </div>
        <p className="mt-6 text-xs text-slate-400">
          If the problem persists, return to Support and choose the closest inquiry path.
        </p>
      </div>
    </section>
  );
}
