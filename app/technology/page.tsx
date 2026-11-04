import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import {
  EnterpriseMediaImage,
  enterpriseCardSizes,
  enterpriseImages,
} from "@/components/EnterpriseImagery";
import { AnimatedCard, AnimatedSection, StaggerContainer } from "@/components/motion";
import { PremiumPageHero } from "@/components/PremiumPageHero";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = buildPageMetadata({
  title: "Enterprise Technology",
  description:
    "Explore HACIEN enterprise technology domains including computing, networking, cybersecurity, cloud, software, storage, power, structured cabling, and professional services.",
  path: "/technology",
});

const technologyDomains = [
  ["Enterprise Computing", "Business endpoints, workstations, and servers for offices and facilities.", "computers-laptops"],
  ["Networking", "Switches, wireless access points, firewalls, and structured cabling for offices, facilities, and campuses.", "network-equipment"],
  ["Cybersecurity", "Endpoint protection, firewall appliances, and network security devices.", "security-surveillance"],
  ["Cloud", "Cloud services, backup, SaaS, and storage subscriptions, quoted by user count.", "/solutions/cloud-productivity"],
  ["Software", "Licensed business software, productivity platforms, and security licensing.", "licensed-software"],
  ["Storage", "Servers, NAS, backup storage, and rack equipment sized to your workload.", "servers-storage"],
  ["Power", "UPS and rack power equipment for continuity.", "power-ups"],
  ["Structured Cabling", "Cabling, racks, cabinets, and network rooms.", "network-equipment"],
  ["Professional Services", "Specification review, procurement support, deployment coordination, and lifecycle assistance.", null],
];

const technologyImages: Record<string, keyof typeof enterpriseImages> = {
  "Enterprise Computing": "workstation",
  Networking: "network",
  Cybersecurity: "cybersecurity",
  Cloud: "cloud",
  Software: "silicon",
  Storage: "storage",
  Power: "dataCenter",
  "Structured Cabling": "cabling",
  "Professional Services": "documentation",
};

const priorityTechnologyDomains = technologyDomains.slice(0, 6);

export default function TechnologyPage() {
  return (
    <>
      <PremiumPageHero
        eyebrow="Technology"
        title="Technology is what a solution is built from."
        description="These are the products and domains behind the work: computing, networking, security, cloud, software, storage, power, and cabling. If you need a full job done rather than a product list, see Solutions."
        image="silicon"
        primaryAction={{ href: "/quote", label: "Request a Quote" }}
        secondaryAction={{ href: "/solutions", label: "View Solutions" }}
        highlights={[
          { label: "Computing", text: "Endpoints, workstations, servers, and user needs." },
          { label: "Networking", text: "Connectivity, site layout, and reliability needs." },
          { label: "Cybersecurity", text: "Protection requirements and operating risk." },
          { label: "Cloud & Software", text: "Licensing, backup, SaaS, and hybrid needs." },
        ]}
      />

      <AnimatedSection className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Domains"
            title="Choose the language closest to your requirement."
            description="You do not need a perfect specification to start. Choose the category that fits, then add the details HACIEN should review."
          />
          <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {priorityTechnologyDomains.map(([title, text, categorySlug]) => (
              <AnimatedCard key={title} className="h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10">
                <div className="relative h-36 overflow-hidden bg-slate-950">
                  <EnterpriseMediaImage
                    image={technologyImages[String(title)] || "dataCenter"}
                    sizes={enterpriseCardSizes}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.72))",
                    }}
                  />
                </div>
                <div className="p-7">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-grey-600">Technology Domain</div>
                <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{text}</p>
                {categorySlug ? (
                  <Link
                    href={categorySlug.startsWith("/") ? categorySlug : `/products/${categorySlug}`}
                    className="mt-7 inline-flex text-sm font-bold text-[#2563EB] hover:underline"
                  >
                    Build this requirement
                  </Link>
                ) : (
                  <Link href="/quote" className="mt-7 inline-flex text-sm font-bold text-[#2563EB] hover:underline">
                    Describe a service requirement
                  </Link>
                )}
                </div>
              </AnimatedCard>
            ))}
          </StaggerContainer>
          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-bold text-slate-950">Need cabling, power, services, or something not listed?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Use the RFQ path and describe the outcome. HACIEN reviews the details before treating any product or service path as final.
            </p>
            <Link href="/quote" className="mt-3 inline-flex text-sm font-bold text-[#2563EB] hover:underline">
              Describe the requirement
            </Link>
          </div>
        </div>
      </AnimatedSection>

      <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-600">Product references remain optional</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950">
              Start with a product, a category, a BOQ, a photo, or only the outcome.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
              HACIEN&apos;s Gateway reviews the requirement first. The catalog helps describe the request; it does not limit what you can ask.
            </p>
          </div>
          <Link href="/quote" className="button-glow rounded bg-[#2563EB] px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-black/10">
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
