export function GlassmorphicSkeleton({ label = "Loading visual preview" }: { label?: string }) {
  return (
    <div className="grid min-h-[360px] place-items-center rounded-lg border border-white/18 bg-white/[0.08] p-8 text-center text-white shadow-2xl shadow-slate-950/20 backdrop-blur">
      <div>
        <div className="mx-auto h-14 w-14 rounded-full border border-white/20 border-t-white animate-spin" />
        <div className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-grey-300">{label}</div>
        <p className="mt-2 max-w-sm text-sm leading-6 text-grey-300">
          A browser-rendered 3D preview is preparing. Static page content remains available.
        </p>
      </div>
    </div>
  );
}
