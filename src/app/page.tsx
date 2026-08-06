import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProcessSteps from "@/components/sections/ProcessSteps";
import Testimonials from "@/components/sections/Testimonials";
import BlogGrid from "@/components/sections/BlogGrid";
import CTASection from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { services, processSteps, testimonials, blogPosts } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} — Software, Cloud & AI Engineering Studio`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />

      <Container as="section" className="py-20 sm:py-28">
        <SectionHeading
          eyebrow="What we do"
          title="Six practices, one team that ships them together"
          description="We don't hand projects between siloed teams. The same people who design the system build it and keep it running."
        />
        <div className="mt-12">
          <ServicesGrid services={services} />
        </div>
        <div className="mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink link-underline"
          >
            View all services
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </Container>

      <div className="border-y border-line bg-surface">
        <Container as="section" className="py-20 sm:py-28">
          <SectionHeading
            eyebrow="How we work"
            eyebrowTone="teal"
            title="A process built to be predictable, not a black box"
            description="Every engagement runs on the same four-stage cycle so you always know what's happening and why."
          />
          <div className="mt-12">
            <ProcessSteps steps={processSteps} />
          </div>
        </Container>
      </div>

      <Container as="section" className="py-20 sm:py-28">
        <SectionHeading
          eyebrow="Client results"
          eyebrowTone="brand"
          title="What teams say after we hand off"
          align="center"
          className="mx-auto"
        />
        <div className="mt-12">
          <Testimonials testimonials={testimonials} />
        </div>
      </Container>

      <div className="border-y border-line bg-surface">
        <Container as="section" className="py-20 sm:py-28">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="From the blog"
              title="Notes on shipping software that lasts"
            />
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-ink link-underline"
            >
              All articles
              <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="mt-12">
            <BlogGrid posts={blogPosts.slice(0, 3)} />
          </div>
        </Container>
      </div>

      <CTASection
        title="Have a project in mind?"
        description="Tell us where you're stuck or what you're building. We'll reply within one business day with next steps, not a sales deck."
      />
    </>
  );
}
