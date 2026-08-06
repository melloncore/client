import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProcessSteps from "@/components/sections/ProcessSteps";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";
import { services, processSteps } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Product engineering, cloud infrastructure, AI & automation, product design, data & analytics, and technical consulting — explore what Nexlayer builds.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-16 sm:py-24">
          <Badge tone="coral" dot>
            Services
          </Badge>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Six practices. One accountable team.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Engage us for a single service or the full build — either way,
            the same senior engineers stay on the project from kickoff to
            hand-off.
          </p>
        </Container>
      </section>

      <Container as="section" className="py-16 sm:py-24">
        <ServicesGrid services={services} />
      </Container>

      <div className="border-y border-line bg-surface">
        <Container as="section" className="py-16 sm:py-24">
          <SectionHeading
            eyebrow="Engagement model"
            eyebrowTone="teal"
            title="How an engagement actually runs"
            description="The same four stages apply whether you're hiring us for a two-week audit or a year-long build."
          />
          <div className="mt-12">
            <ProcessSteps steps={processSteps} />
          </div>
        </Container>
      </div>

      <CTASection
        title="Not sure which service fits?"
        description="Send us a short brief and we'll tell you honestly which practice — or combination — makes sense, no obligation."
      />
    </>
  );
}
