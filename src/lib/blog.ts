import type { BlogPost } from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.melloncore.com/api/v1";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiResponse<T>;
    return json.data;
  } catch {
    return null;
  }
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  return (await fetchJson<BlogPost[]>("/blog/public")) ?? [];
}

export function getPublishedPost(slug: string): Promise<BlogPost | null> {
  return fetchJson<BlogPost>(`/blog/public/${encodeURIComponent(slug)}`);
}

export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00.000Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // avoids server/client hydration mismatches
  });
}

// Serves Cloudinary images at a sensible size and format
export function optimizedImage(url: string, width = 800): string {
  return url.includes("/upload/")
    ? url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`)
    : url;
}