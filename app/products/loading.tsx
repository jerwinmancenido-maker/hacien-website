export default function ProductsLoading() {
  return (
    <div role="status" className="va-scope">
      <span className="sr-only">Loading…</span>

      <section className="relative overflow-hidden bg-[#0A0A0A]">
        <div className="relative mx-auto grid min-h-[400px] max-w-7xl items-center gap-5 px-4 py-7 sm:min-h-[500px] sm:gap-8 sm:px-6 sm:py-9 lg:min-h-[540px] lg:grid-cols-[1fr_0.88fr] lg:px-8 lg:py-12">
          <div>
            <div className="h-7 w-40 animate-pulse rounded border border-white/20 bg-white/10" />
            <div className="mt-5 h-10 w-full max-w-md animate-pulse rounded bg-white/10 sm:h-12" />
            <div className="mt-4 h-4 w-full max-w-lg animate-pulse rounded bg-white/10" />
            <div className="mt-2 h-4 w-[85%] max-w-md animate-pulse rounded bg-white/10" />
            <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:gap-3">
              <div className="h-11 w-full animate-pulse rounded bg-white/15 sm:w-40" />
              <div className="h-11 w-full animate-pulse rounded border border-white/20 bg-white/5 sm:w-40" />
            </div>
          </div>
          <div className="hidden h-full rounded-lg border border-white/15 bg-[#0A0A0A] p-4 lg:block">
            <div className="grid grid-cols-2 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-24 animate-pulse rounded border border-white/10 bg-white/5" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-grey-100 px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-3 w-40 animate-pulse rounded bg-grey-200" />
          <div className="mt-4 h-8 w-full max-w-xl animate-pulse rounded bg-grey-200" />
          <div className="mt-6 grid gap-3 md:mt-10 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-lg border border-grey-200 bg-white shadow-sm"
              >
                <div className="min-h-[118px] animate-pulse bg-grey-200 sm:min-h-[190px]" />
                <div className="space-y-3 p-4 sm:p-6">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-grey-100" />
                  <div className="h-3.5 w-full animate-pulse rounded bg-grey-100" />
                  <div className="h-3.5 w-[70%] animate-pulse rounded bg-grey-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
