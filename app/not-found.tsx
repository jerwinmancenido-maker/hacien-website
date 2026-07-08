import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

export default function NotFoundPage() {
  return (
    <section className="motion-slide-up flex min-h-[65vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="surface mx-auto max-w-2xl rounded-2xl p-8 sm:p-12 text-center">
        <div className="mx-auto flex flex-col items-center gap-4">
          <BrandMark size={56} className="shadow-lg shadow-slate-950/8" />
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold text-[#1457d9] ring-1 ring-inset ring-[#1457d9]/10">
            Error Code 404
          </span>
        </div>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
          This room is not available.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-600">
          The page may have moved, or the address may not be part of the public HACIEN headquarters.
        </p>
        <div className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="button-glow rounded-full bg-[#1457d9] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 hover:bg-[#0f46b4] hover:shadow-xl hover:shadow-blue-700/25 transition duration-200"
          >
            Return to headquarters
          </Link>
          <Link
            href="/search"
            className="rounded-full border border-slate-300/80 px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:border-[#1457d9]/50 hover:bg-slate-50 transition duration-200"
          >
            Search Headquarters
          </Link>
          <Link
            href="/support"
            className="rounded-full border border-slate-300/80 px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:border-[#1457d9]/50 hover:bg-slate-50 transition duration-200"
          >
            Support Desk
          </Link>
        </div>
      </div>
    </section>
  );
}
