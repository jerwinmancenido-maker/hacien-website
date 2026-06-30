import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="surface mx-auto max-w-2xl rounded-lg p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded bg-slate-100 text-2xl font-bold text-slate-400">
          404
        </div>
        <h1 className="mt-6 text-3xl font-bold text-slate-950">This room is not available.</h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          The page may have moved, or the address may not be part of the public HACIEN headquarters.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="button-glow focus-ring rounded bg-[#1457d9] px-5 py-3 text-sm font-bold text-white hover:bg-[#0f46b4]"
          >
            Return to headquarters
          </Link>
          <Link
            href="/search"
            className="interactive-link focus-ring rounded border border-slate-300 px-5 py-3 text-center text-sm font-bold text-slate-700 hover:border-[#1457d9]"
          >
            Search
          </Link>
          <Link
            href="/support"
            className="interactive-link focus-ring rounded border border-slate-300 px-5 py-3 text-center text-sm font-bold text-slate-700 hover:border-[#1457d9]"
          >
            Support
          </Link>
        </div>
      </div>
    </section>
  );
}
