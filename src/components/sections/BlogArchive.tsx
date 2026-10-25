"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import BlogGrid from "@/components/sections/BlogGrid";
import { blogApi } from "@/lib/api/blog";
import type { BlogPost } from "@/types";

export default function BlogArchive({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const postsQuery = useQuery({
    queryKey: ["public-blog-posts"],
    queryFn: blogApi.listPublished,
    initialData: posts,
    initialDataUpdatedAt: 0,
    staleTime: 60_000,
  });
  const currentPosts = postsQuery.data;
  const categories = ["All", ...new Set(currentPosts.map((post) => post.category))];

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return [...currentPosts]
      .filter((post) => category === "All" || post.category === category)
      .filter((post) => {
        if (!normalizedQuery) return true;
        return [
          post.title,
          post.excerpt,
          post.category,
          post.author,
          ...(post.sections ?? []).flatMap((section) => [
            section.heading,
            ...section.paragraphs,
            ...(section.takeaways ?? []),
          ]),
          post.content ?? "",
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [category, currentPosts, query]);

  const hasFilters = query.length > 0 || category !== "All";

  function clearFilters() {
    setQuery("");
    setCategory("All");
  }

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-line pb-8">
        <div className="relative max-w-xl">
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <Search
            aria-hidden="true"
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
          />
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles, topics, or authors"
            className="w-full rounded-xl border border-line bg-white py-3 pl-11 pr-4 text-sm text-ink placeholder:text-ink-muted focus:border-coral-500 focus:outline-none"
          />
        </div>

        <div
          role="group"
          aria-label="Filter by category"
          className="flex flex-wrap items-center gap-2"
        >
          {categories.map((item) => {
            const selected = category === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => setCategory(item)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  selected
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-white text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-8 mt-6 flex items-center justify-between gap-4 text-sm text-ink-muted">
        <p aria-live="polite">
          {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 font-medium text-ink hover:text-coral-600"
          >
            <X size={15} />
            Clear filters
          </button>
        )}
      </div>

      {postsQuery.isError && (
        <p role="status" className="mb-6 rounded-lg border border-coral-200 bg-coral-50 px-4 py-3 text-sm text-coral-800">
          Could not refresh published articles. Showing the available articles for now.
        </p>
      )}

      {filteredPosts.length > 0 ? (
        <BlogGrid posts={filteredPosts} />
      ) : (
        <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-16 text-center">
          <h2 className="font-display text-xl text-ink">No articles found</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Try a different search term or choose another category.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 text-sm font-medium text-ink underline underline-offset-4"
          >
            Show all articles
          </button>
        </div>
      )}
    </div>
  );
}
