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
  silicon: sourcePhotos.workstation,
  office: sourcePhotos.modernOffice,
  workstation: sourcePhotos.workstation,
  network: sourcePhotos.serverRack,
  commandCenter: sourcePhotos.modernOffice,
  cybersecurity: sourcePhotos.serverRack,
  cloud: sourcePhotos.officeDesk,
  cabling: sourcePhotos.serverRack,
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
      className={`relative min-h-[320px] overflow-hidden rounded-lg bg-slate-950 shadow-2xl shadow-slate-950/18 sm:min-h-[380px] ${className}`}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(7, 20, 38, 0.08), rgba(7, 20, 38, 0.74)), url(${enterpriseImages[image]})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,20,38,0.72),transparent_54%)]" />
      <div className="relative flex min-h-[320px] flex-col justify-end p-5 text-white sm:min-h-[380px] sm:p-7">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">{eyebrow}</div>
        <h3 className="mt-3 max-w-xl text-2xl font-bold tracking-tight sm:text-3xl">{title}</h3>
        <p className="mt-3 max-w-lg text-sm leading-6 text-slate-200">{caption}</p>
      </div>
    </div>
  );
}

export function PremiumStatementBand() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
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
          caption="From workstations to networks, storage, security, and software, HACIEN helps translate requirements into review-ready sourcing context."
        />
      </div>
    </section>
  );
}
