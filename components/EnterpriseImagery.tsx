import Link from "next/link";

const sourcePhotos = {
  // Kevin Ache, Unsplash: https://unsplash.com/photos/2JJ3wBHu4_0
  serverRack:
    "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1800",
  // Alesia Kazantceva, Unsplash: https://unsplash.com/photos/VWcPlbHglYc
  officeDesk:
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1800",
  // Huy Phan, Unsplash: https://unsplash.com/photos/GLhDVcndCLg
  workstation:
    "https://images.unsplash.com/photo-1722159475028-d38e511f7853?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1800",
  // Deliberate Directions, Unsplash: https://unsplash.com/photos/K9DZz7B8sCU
  modernOffice:
    "https://images.unsplash.com/photo-1746021535490-cd4d7fe7ab2a?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1800",
  // Jakub Zerdzicki, Unsplash: https://unsplash.com/photos/xzmuvPQt6KM
  documents:
    "https://images.unsplash.com/photo-1706508156658-f246b0c8753c?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1800",
};

export const enterpriseImages = {
  dataCenter: sourcePhotos.serverRack,
  silicon: sourcePhotos.officeDesk,
  office: sourcePhotos.modernOffice,
  workstation: sourcePhotos.workstation,
  network: sourcePhotos.modernOffice,
  commandCenter: sourcePhotos.modernOffice,
  cybersecurity: sourcePhotos.officeDesk,
  cloud: sourcePhotos.officeDesk,
  cabling: sourcePhotos.documents,
  storage: sourcePhotos.serverRack,
  documentation: sourcePhotos.documents,
  knowledge: sourcePhotos.officeDesk,
  strategy: sourcePhotos.modernOffice,
  workspace: sourcePhotos.officeDesk,
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
      className={`relative min-h-[260px] overflow-hidden rounded-lg bg-slate-950 shadow-2xl shadow-slate-950/18 sm:min-h-[320px] ${className}`}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(7, 20, 38, 0.08), rgba(7, 20, 38, 0.74)), url(${enterpriseImages[image]})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,20,38,0.72),transparent_54%)]" />
      <div className="cinematic-lines pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative flex min-h-[260px] flex-col justify-end p-5 text-white sm:min-h-[320px] sm:p-6">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">{eyebrow}</div>
        <h3 className="mt-3 max-w-xl text-2xl font-bold tracking-tight">{title}</h3>
        <p className="mt-3 max-w-lg text-sm leading-6 text-slate-200">{caption}</p>
      </div>
    </div>
  );
}

export function PremiumStatementBand() {
  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f5fbfc_100%)] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Enterprise Technology</div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Start with the operating need, then choose the right technology.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            HACIEN keeps the public site useful without pretending it is a checkout or price list.
            Brands, models, pricing, and commercial terms are confirmed only after RFQ review.
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
          eyebrow="Review-ready context"
          title="Clear requests make better supplier conversations possible."
          caption="A short requirement, a BOQ, or even a rough description can become useful when the assumptions and missing details are visible."
        />
      </div>
    </section>
  );
}
