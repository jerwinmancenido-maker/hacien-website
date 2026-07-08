"use client";

import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="motion-slide-up flex min-h-[65vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="surface mx-auto max-w-lg rounded-2xl p-8 sm:p-12 text-center">
        <div className="mx-auto flex flex-col items-center gap-4">
          <BrandMark size={56} className="opacity-85 shadow-lg shadow-slate-950/8" />
          <span className="inline-flex items-center rounded-full bg-rose-50 px-3.5 py-1 text-xs font-semibold text-rose-700 ring-1 ring-inset ring-rose-600/10">
            System Alert
          </span>
        </div>
        <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
          Something went wrong
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          An unexpected error occurred while loading this page. Please try again
          or return to the home page.
        </p>
        <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="button-glow rounded-full bg-[#1457d9] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 hover:bg-[#0f46b4] hover:shadow-xl hover:shadow-blue-700/25 transition duration-200 cursor-pointer"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-slate-300/80 px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:border-[#1457d9]/50 hover:bg-slate-50 transition duration-200"
          >
            Return home
          </Link>
        </div>
        <p className="mt-8 text-xs text-slate-400">
          If the problem persists, return to Support and choose the closest inquiry path.
        </p>
      </div>
    </section>
  );
}
