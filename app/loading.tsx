export default function Loading() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-[#0B0C10] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <div className="flex items-center gap-3">
          <span
            className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-[#2A2E38] border-t-blue"
            aria-hidden="true"
          />
          <p className="text-sm text-[#C3C8D2]">Loading page…</p>
        </div>
      </div>
    </section>
  );
}
