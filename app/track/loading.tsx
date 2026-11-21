export default function TrackLoading() {
  return (
    <div role="status">
      <span className="sr-only">Loading…</span>
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="max-w-3xl">
          <div className="h-3 w-36 animate-pulse rounded bg-grey-100" />
          <div className="mt-4 h-10 w-full max-w-lg animate-pulse rounded bg-grey-100 sm:h-12" />
          <div className="mt-4 h-4 w-full max-w-md animate-pulse rounded bg-grey-100" />
          <div className="mt-2 h-4 w-[88%] max-w-sm animate-pulse rounded bg-grey-100" />
        </div>

        <div className="mt-6 rounded-lg border border-grey-200 bg-white/80 p-4 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <div className="h-3 w-32 animate-pulse rounded bg-grey-100" />
              <div className="mt-2 h-12 w-full animate-pulse rounded border border-grey-200 bg-grey-100" />
            </div>
            <div className="h-12 w-full animate-pulse rounded bg-grey-200 sm:w-36" />
          </div>
          <div className="mt-4 h-3 w-3/4 max-w-md animate-pulse rounded bg-grey-100" />
        </div>
      </section>
    </div>
  );
}
