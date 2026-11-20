import { getPublishedPosts } from "@/lib/Blog";
import type { Metadata } from "next";
import BlogList from "./BlogList";


// Fetch at request time so the build doesn't depend on the API being reachable
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles and updates from Mellon Core.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  return <BlogList initialPosts={posts} />;
}