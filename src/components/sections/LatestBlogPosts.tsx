"use client";

import { useQuery } from "@tanstack/react-query";
import BlogGrid from "@/components/sections/BlogGrid";
import { blogApi } from "@/lib/api/blog";
import type { BlogPost } from "@/types";

export default function LatestBlogPosts({ posts }: { posts: BlogPost[] }) {
  const postsQuery = useQuery({
    queryKey: ["public-blog-posts"],
    queryFn: blogApi.listPublished,
    initialData: posts,
    initialDataUpdatedAt: 0,
    staleTime: 60_000,
  });
  const latestPosts = [...postsQuery.data]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <>
      {postsQuery.isError && (
        <p role="status" className="mb-6 rounded-lg border border-coral-200 bg-coral-50 px-4 py-3 text-sm text-coral-800">
          Could not refresh published articles. Showing the available articles for now.
        </p>
      )}
      <BlogGrid posts={latestPosts} />
    </>
  );
}
