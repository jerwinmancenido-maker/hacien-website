import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "HACIEN solutions include IT infrastructure, procurement, systems integration, managed support, and project-based IT delivery.",
};

const solutions = [
  ["IT Infrastructure", "Endpoint, network, server, storage, and facility technology sourcing.", ["Endpoint packages", "Network design support", "Storage and backup planning"]],
  ["Hardware & Software Procurement", "Procurement support for approved equivalents, warranty options, and vendor availability.", ["Product matching", "License sourcing", "Quotation packages"]],
  ["Systems Integration", "Coordination and technical support for deployment and rollout projects.", ["Site rollout", "Configuration", "Documentation"]],
  ["Managed IT Support", "Practical ongoing support for office users, devices, and basic infrastructure.", ["Maintenance", "Troubleshooting", "Lifecycle planning"]],
];

export default function SolutionsPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Solutions"
          title="Technology solutions for procurement, deployment, and operations."
          description="HACIEN serves as a bridge between business requirements, supplier availability, and implementation realities."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {solutions.map(([title, description, points]) => (
            <ServiceCard key={title as string} title={title as string} description={description as string} points={points as string[]} />
          ))}
        </div>
      </div>
    </section>
  );
}
