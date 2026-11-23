import { cache } from "react";
import { API_ROOT } from "@/lib/api-url";
import type { BlogPost } from "@/types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

/** null = the API said 404. Anything else that goes wrong throws. */
async function fetchJson<T>(path: string): Promise<T | null> {
  const res = await fetch(`${API_ROOT}${path}`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Blog API responded ${res.status} for ${path}`);
  const json = (await res.json()) as ApiResponse<T>;
  return json.data ?? null;
}

/**
 * List: never throws. If the API is down we render an empty list and the
 * client (React Query) refetches on mount, so the page can recover by itself.
 */
export const getPublishedPosts = cache(async (): Promise<BlogPost[]> => {
  try {
    return (await fetchJson<BlogPost[]>("/blog/public")) ?? [];
  } catch (err) {
    console.error("[blog] could not load posts", err);
    return [];
  }
});

/**
 * Single post: null ONLY for a real 404 (→ notFound()). An API outage throws,
 * so the segment's error boundary shows "try again" instead of a fake 404.
 */
export const getPublishedPost = cache((slug: string): Promise<BlogPost | null> =>
  fetchJson<BlogPost>(`/blog/public/${encodeURIComponent(slug)}`),
);
