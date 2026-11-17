import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getStaffCard, type StaffCard } from "@/data/staffCards";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const card = getStaffCard(id);
  if (!card) return { title: "Contact card" };

  const description = `${card.fullName}, ${card.title} at ${card.organization}. ${card.statusLine}.`;
  return {
    // The root layout's title template appends "| HACIEN" — don't repeat it.
    title: `${card.fullName} — ${card.title}`,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title: `${card.fullName} — ${card.title}`,
      description,
      url: `https://haciensolutions.com/c/${card.id}`,
      siteName: "HACIEN Information Technology Solutions",
      images: [
        {
          url: "/brand/logo-full-600.png",
          width: 600,
          height: 162,
          alt: "HACIEN Information Technology Solutions",
        },
      ],
      locale: "en_PH",
      type: "profile",
    },
  };
}

const linkButtonClass =
  "block w-full rounded-full border border-white/25 bg-white/5 px-5 py-3.5 text-center text-base font-semibold text-white transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function socialLinks(card: StaffCard) {
  const links: { label: string; href: string }[] = [];
  if (card.socials?.facebook) links.push({ label: "Facebook", href: card.socials.facebook });
  if (card.socials?.linkedin) links.push({ label: "LinkedIn", href: card.socials.linkedin });
  if (card.socials?.tiktok) links.push({ label: "TikTok", href: card.socials.tiktok });
  return links;
}

export default async function StaffCardPage({ params }: PageProps) {
  const { id } = await params;
  const card = getStaffCard(id);
  if (!card) notFound();

  const socials = socialLinks(card);

  return (
    <main className="bg-[#0B2545] text-white">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 py-10">
        <div className="flex flex-col items-center text-center">
          {/* Official logo from /public/brand — never redrawn. */}
          <Image
            src="/brand/logo-full-white.svg"
            alt="HACIEN Information Technology Solutions"
            width={819}
            height={221}
            priority
            className="h-16 w-auto"
          />
          <h1 className="mt-8 text-3xl font-bold tracking-tight">{card.fullName}</h1>
          <p className="mt-2 text-lg text-white/85">{card.title}</p>
          <p className="mt-1 text-base text-white/70">{card.organization}</p>
          <p className="mt-4 text-sm font-semibold tracking-wide text-white">
            {card.statusLine}
          </p>
          <p className="mt-1 text-sm text-white/70">We source all brands.</p>
        </div>

        <a
          href={`/c/${card.id}/vcf`}
          className="mt-9 block w-full rounded-full bg-[#2563EB] px-5 py-4 text-center text-lg font-bold text-white transition hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Save contact
        </a>

        <nav aria-label="Contact links" className="mt-5 flex flex-col gap-3">
          <a href={`tel:${card.mobileIntl}`} className={linkButtonClass}>
            Call {card.mobileDisplay}
          </a>
          <div className="grid grid-cols-2 gap-3">
            <a href={`sms:${card.mobileIntl}`} className={linkButtonClass}>
              SMS
            </a>
            <a
              href={`viber://chat?number=${encodeURIComponent(card.mobileIntl)}`}
              className={linkButtonClass}
            >
              Viber
            </a>
          </div>
          {card.emails.map((email) => (
            <a key={email.address} href={`mailto:${email.address}`} className={linkButtonClass}>
              {email.label}
            </a>
          ))}
          <a href={card.website} className={linkButtonClass}>
            Website
          </a>
          <a href={card.mapsUrl} target="_blank" rel="noreferrer" className={linkButtonClass}>
            Google Maps — Suntree Tower
          </a>
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className={linkButtonClass}
            >
              {social.label}
            </a>
          ))}
        </nav>

        <p className="mt-8 text-center text-sm leading-6 text-white/60">{card.address.oneLine}</p>

        <footer className="mt-auto pt-10 text-center text-xs text-white/50">
          © HACIEN Information Technology Solutions.
        </footer>
      </div>
    </main>
  );
}
