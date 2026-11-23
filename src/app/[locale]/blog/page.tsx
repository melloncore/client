import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogList from "@/components/blog/BlogList";
import Footer from "@/components/Footer";
import { dict, isLocale, locales } from "@/content/site";
import { getPublishedPosts } from "@/lib/blog";

// Fetch at request time so the build never depends on the API being reachable.
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = dict[locale].blog;
  return {
    title: `${t.title} · ${dict[locale].brand}`,
    description: t.sub,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/blog`])),
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const posts = await getPublishedPosts();
  return (
    <>
      <BlogList initialPosts={posts} locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
