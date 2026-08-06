import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import type { BadgeTone } from "@/components/ui/Badge";
import BlogGrid from "@/components/sections/BlogGrid";
import CTASection from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";
import { blogPosts, getPostBySlug } from "@/lib/data";

interface BlogPostPageProps {
  params: { slug: string };
}

const categoryTone: Record<string, BadgeTone> = {
  Cloud: "brand",
  AI: "coral",
  Design: "teal",
  Engineering: "brand",
  Process: "coral",
  Data: "teal",
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return buildMetadata({
      title: "Article not found",
      description: "This article could not be found.",
      path: `/blog/${params.slug}`,
      noIndex: true,
    });
  }
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  const fallbackRelated = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);
  const relatedPosts = related.length > 0 ? related : fallbackRelated;

  return (
    <>
      <article>
        <section className="border-b border-line bg-paper">
          <Container className="py-16 sm:py-24">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink"
            >
              <ArrowLeft size={15} />
              All articles
            </Link>

            <div className="mt-6">
              <Badge tone={categoryTone[post.category] ?? "neutral"}>
                {post.category}
              </Badge>
            </div>

            <h1 className="mt-6 max-w-3xl font-display text-3xl font-medium leading-[1.15] tracking-tight text-ink sm:text-5xl">
              {post.title}
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6 text-sm text-ink-muted">
              <span className="flex items-center gap-1.5">
                <User size={14} />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readTime}
              </span>
            </div>
          </Container>
        </section>

        <Container as="section" className="py-16 sm:py-24">
          <div className="mx-auto max-w-2xl">
            <p className="text-lg leading-relaxed text-ink-soft">
              {post.excerpt}
            </p>

            <div className="prose-content mt-8 space-y-6 text-base leading-relaxed text-ink">
              <p>
                This is a sample article body for the Nexlayer blog. In a
                production build, this section would be populated from a CMS
                or MDX file with the full write-up — covering the specific
                trade-offs, decisions and lessons referenced in the
                introduction above.
              </p>
              <p>
                Structuring the page this way keeps the article template
                fully reusable: swap in real Markdown or CMS-driven content
                here and every other part of the layout — the header, the
                author metadata, the related-articles section — keeps
                working without changes.
              </p>
              <p>
                If you're wiring this project up to a real content source,
                this is the spot to render your parsed Markdown/MDX or
                CMS-fetched rich text.
              </p>
            </div>
          </div>
        </Container>
      </article>

      <div className="border-y border-line bg-surface">
        <Container as="section" className="py-16 sm:py-24">
          <h2 className="font-display text-2xl text-ink">
            More from the blog
          </h2>
          <div className="mt-8">
            <BlogGrid posts={relatedPosts} />
          </div>
        </Container>
      </div>

      <CTASection
        eyebrow="Let's talk"
        title="Have a similar problem to solve?"
        description="We're happy to talk through what worked for other teams and whether it applies to your situation."
      />
    </>
  );
}
