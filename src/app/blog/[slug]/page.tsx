import type { Metadata } from "next";
import BlogArticle from "@/components/sections/BlogArticle";
import { buildMetadata } from "@/lib/seo";
import { blogPosts, getPostBySlug } from "@/lib/data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const metadata = buildMetadata({
    title: post?.title ?? "Blog article",
    description: post?.excerpt ?? "Insights and ideas from Mellon Strata Core.",
    path: `/blog/${slug}`,
  });
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      ...(post ? {
        publishedTime: post.date,
        authors: [post.author],
        tags: [post.category],
      } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  return <BlogArticle slug={slug} />;
}
