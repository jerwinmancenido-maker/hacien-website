import Link from "next/link";

export const enterpriseImages = {
  dataCenter:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2400&q=90",
  silicon:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=90",
  office:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2400&q=90",
  workstation:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2400&q=90",
  network:
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=2400&q=90",
};

export function EnterprisePhotoPanel({
  image,
  eyebrow,
  title,
  caption,
  className = "",
}: {
  image: keyof typeof enterpriseImages;
  eyebrow: string;
  title: string;
  caption: string;
  className?: string;
}) {
  return (
    <div
      className={`relative min-h-[420px] overflow-hidden rounded-lg bg-slate-950 shadow-2xl shadow-slate-950/18 ${className}`}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(7, 20, 38, 0.08), rgba(7, 20, 38, 0.74)), url(${enterpriseImages[image]})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,20,38,0.72),transparent_54%)]" />
      <div className="relative flex min-h-[420px] flex-col justify-end p-6 text-white sm:p-8">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">{eyebrow}</div>
        <h3 className="mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">{title}</h3>
        <p className="mt-4 max-w-lg text-sm leading-6 text-slate-200">{caption}</p>
      </div>
    </div>
  );
}

export function PremiumStatementBand() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Enterprise Technology</div>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Technology first. Products only when useful.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            HACIEN presents technology as business context: infrastructure, security, connectivity,
            continuity, and operating confidence. Exact brands, models, pricing, and commercial terms
            are confirmed through RFQ review.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/technology" className="button-glow rounded-full bg-[#071426] px-5 py-3 text-center text-sm font-bold text-white">
              Explore Technology
            </Link>
            <Link href="/quote" className="interactive-link rounded-full border border-slate-300 px-5 py-3 text-center text-sm font-bold text-slate-900">
              Submit an RFQ
            </Link>
          </div>
        </div>
        <EnterprisePhotoPanel
          image="network"
          eyebrow="Connected Infrastructure"
          title="Modern organizations need dependable technology foundations."
          caption="From workstations to networks, storage, security, and software, HACIEN helps translate requirements into supplier-ready sourcing work."
        />
      </div>
    </section>
  );
}
