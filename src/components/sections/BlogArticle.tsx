"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, User } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import type { BadgeTone } from "@/components/ui/Badge";
import BlogGrid from "@/components/sections/BlogGrid";
import CTASection from "@/components/sections/CTASection";
import { blogApi } from "@/lib/api/blog";
import { ApiError } from "@/lib/api/http";
import { blogPosts } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

const categoryTone: Record<string, BadgeTone> = {
  Cloud: "brand",
  AI: "coral",
  Design: "teal",
  Engineering: "brand",
  Process: "coral",
  Data: "teal",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogArticle({ slug }: { slug: string }) {
  const postQuery = useQuery({
    queryKey: ["public-blog-post", slug],
    queryFn: () => blogApi.getPublished(slug),
    initialData: blogPosts.find((item) => item.slug === slug),
    initialDataUpdatedAt: 0,
    staleTime: 60_000,
  });
  const postsQuery = useQuery({
    queryKey: ["public-blog-posts"],
    queryFn: blogApi.listPublished,
    initialData: blogPosts,
    initialDataUpdatedAt: 0,
    staleTime: 60_000,
  });
  const postNotFound = postQuery.error instanceof ApiError && postQuery.error.status === 404;
  const post = postNotFound ? undefined : postQuery.data;

  if (!post && postQuery.isLoading) {
    return (
      <Container className="py-24 text-center text-sm text-ink-muted">
        Loading article…
      </Container>
    );
  }

  if (!post) {
    return (
      <Container className="py-24 text-center">
        <h1 className="font-display text-3xl text-ink">
          {postNotFound ? "Article not found" : "Article unavailable"}
        </h1>
        <p className="mt-3 text-sm text-ink-soft">
          {postNotFound
            ? "This article is not published or does not exist."
            : "This article could not be loaded. Please try again shortly."}
        </p>
        <Link href="/blog" className="mt-6 inline-block text-sm font-medium text-ink underline">
          Back to all articles
        </Link>
      </Container>
    );
  }

  const related = postsQuery.data
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .slice(0, 3);
  const relatedPosts = related.length > 0
    ? related
    : postsQuery.data.filter((item) => item.slug !== post.slug).slice(0, 3);
  const articleUrl = `${siteConfig.url}/blog/${post.slug}`;

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
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readTime}
              </span>
            </div>
          </Container>
        </section>

        {postQuery.isError && (
          <Container className="pt-6">
            <p role="status" className="rounded-lg border border-coral-200 bg-coral-50 px-4 py-3 text-sm text-coral-800">
              Could not refresh this article. Showing the available copy for now.
            </p>
          </Container>
        )}

        <Container as="section" className="py-16 sm:py-24">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div className="min-w-0">
              <p className="text-lg leading-relaxed text-ink-soft">{post.excerpt}</p>

              {post.images && post.images.length > 0 && (
                <div className={`mt-8 grid gap-4 ${post.images.length > 1 ? "sm:grid-cols-2" : ""}`}>
                  {post.images.map((image, index) => (
                    <figure key={image.url} className={index === 0 && post.images?.length === 3 ? "sm:col-span-2" : ""}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="max-h-[560px] w-full rounded-2xl object-cover"
                      />
                    </figure>
                  ))}
                </div>
              )}

              {post.content ? (
                <div
                  className="prose-content mt-8 space-y-6 text-base leading-relaxed text-ink"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <div className="mt-8 space-y-10 text-base leading-relaxed text-ink">
                  {(post.sections ?? []).map((section) => (
                    <section
                      key={section.id}
                      id={section.id}
                      className="scroll-mt-24"
                      aria-labelledby={`${section.id}-heading`}
                    >
                      <h2
                        id={`${section.id}-heading`}
                        className="font-display text-2xl font-medium tracking-tight text-ink"
                      >
                        {section.heading}
                      </h2>
                      <div className="mt-4 space-y-4 text-ink-soft">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                      {section.takeaways && (
                        <ul className="mt-5 space-y-2 rounded-xl border border-line bg-surface p-5 text-sm text-ink">
                          {section.takeaways.map((takeaway) => (
                            <li key={takeaway} className="flex gap-3">
                              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-500" />
                              {takeaway}
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </div>
              )}

              <div className="mt-12 border-t border-line pt-6">
                <h2 className="font-display text-lg text-ink">Share this article</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-ink hover:border-ink"
                  >
                    LinkedIn <ArrowUpRight size={14} />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(articleUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-ink hover:border-ink"
                  >
                    X <ArrowUpRight size={14} />
                  </a>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(articleUrl)}`}
                    className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-ink hover:border-ink"
                  >
                    Email article
                  </a>
                </div>
              </div>
            </div>

            {post.sections && post.sections.length > 0 && (
              <aside className="h-fit lg:sticky lg:top-8">
                <h2 className="font-display text-sm font-medium uppercase tracking-wide text-ink">
                  In this article
                </h2>
                <nav aria-label="Article contents" className="mt-4 border-l border-line">
                  <ul className="space-y-3">
                    {post.sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="block border-l-2 border-transparent py-0.5 pl-4 text-sm text-ink-muted transition-colors hover:border-coral-500 hover:text-ink"
                        >
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            )}
          </div>
        </Container>
      </article>

      {relatedPosts.length > 0 && (
        <div className="border-y border-line bg-surface">
          <Container as="section" className="py-16 sm:py-24">
            <h2 className="font-display text-2xl text-ink">More from the blog</h2>
            <div className="mt-8">
              <BlogGrid posts={relatedPosts} />
            </div>
          </Container>
        </div>
      )}

      <CTASection
        eyebrow="Let's talk"
        title="Have a similar problem to solve?"
        description="We're happy to talk through what worked for other teams and whether it applies to your situation."
      />
    </>
  );
}
