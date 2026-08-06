import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import type { Service } from "@/types";

const toneMap = {
  coral: { bg: "bg-coral-50", text: "text-coral-600" },
  teal: { bg: "bg-teal-50", text: "text-teal-700" },
  brand: { bg: "bg-brand-50", text: "text-brand-700" },
} as const;

interface ServicesGridProps {
  services: Service[];
  compact?: boolean;
}

export default function ServicesGrid({
  services,
  compact = false,
}: ServicesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} compact={compact} />
      ))}
    </div>
  );
}

function ServiceCard({
  service,
  compact,
}: {
  service: Service;
  compact: boolean;
}) {
  const tone = toneMap[service.color];

  return (
    <Card hoverLift className="group flex h-full flex-col">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone.bg} ${tone.text}`}
      >
        <Icon name={service.icon as never} size={20} />
      </div>
      <h3 className="mt-5 font-display text-xl text-ink">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
        {service.shortDescription}
      </p>
      {!compact && (
        <Link
          href={`/services/${service.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink link-underline"
        >
          Learn more
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      )}
    </Card>
  );
}
