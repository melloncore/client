import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import BlogGrid from "@/components/sections/BlogGrid";
import CTASection from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Notes on product engineering, cloud infrastructure, AI, design systems and running technical teams — from the Nexlayer team.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-16 sm:py-24">
          <Badge tone="teal" dot>
            Blog
          </Badge>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Notes from inside the build.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Practical write-ups on the decisions, trade-offs and mistakes
            behind the products we ship — written by the engineers and
            designers who worked on them.
          </p>
        </Container>
      </section>

      <Container as="section" className="py-16 sm:py-24">
        <BlogGrid posts={blogPosts} />
      </Container>

      <CTASection
        eyebrow="Stay in the loop"
        title="Want notes like these in your inbox?"
        description="One email a month, no more. Practical write-ups only — never a newsletter that's secretly a sales pitch."
        primaryLabel="Get in touch"
        secondaryLabel="Explore services"
      />
    </>
  );
}
