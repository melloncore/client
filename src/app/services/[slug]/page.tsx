import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import CTASection from "@/components/sections/CTASection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import { buildMetadata } from "@/lib/seo";
import { services, getServiceBySlug } from "@/lib/data";

interface ServicePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) {
    return buildMetadata({
      title: "Service not found",
      description: "This service could not be found.",
      path: `/services/${params.slug}`,
      noIndex: true,
    });
  }
  return buildMetadata({
    title: service.title,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
  });
}

const toneMap = {
  coral: { bg: "bg-coral-50", text: "text-coral-600" },
  teal: { bg: "bg-teal-50", text: "text-teal-700" },
  brand: { bg: "bg-brand-50", text: "text-brand-700" },
} as const;

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const tone = toneMap[service.color];
  const related = services
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-16 sm:py-24">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink"
          >
            <ArrowLeft size={15} />
            All services
          </Link>

          <div className="mt-6 flex items-center gap-4">
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${tone.bg} ${tone.text}`}
            >
              <Icon name={service.icon as never} size={22} />
            </span>
            <Badge tone={service.color}>Service</Badge>
          </div>

          <h1 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {service.description}
          </p>
          <div className="mt-8">
            <Button href="/contact" icon={<ArrowUpRight size={16} />}>
              Discuss this service
            </Button>
          </div>
        </Container>
      </section>

      <Container as="section" className="py-16 sm:py-24">
        <h2 className="font-display text-2xl text-ink">
          What's included
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {service.deliverables.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl border border-line bg-surface px-5 py-4"
            >
              <Check size={18} className="mt-0.5 shrink-0 text-teal-600" />
              <span className="text-sm text-ink">{item}</span>
            </li>
          ))}
        </ul>
      </Container>

      <div className="border-y border-line bg-surface">
        <Container as="section" className="py-16 sm:py-24">
          <h2 className="font-display text-2xl text-ink">
            Other ways we can help
          </h2>
          <div className="mt-8">
            <ServicesGrid services={related} compact />
          </div>
        </Container>
      </div>

      <CTASection
        title={`Ready to talk about ${service.title.toLowerCase()}?`}
        description="Share a few details about your project and we'll follow up with next steps within one business day."
      />
    </>
  );
}
