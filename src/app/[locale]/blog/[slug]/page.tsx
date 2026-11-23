import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "@/components/blog/blog.module.css";
import Footer from "@/components/Footer";
import { dict, isLocale } from "@/content/site";
import { getPublishedPost } from "@/lib/blog";
import { formatPostDate, optimizedImage } from "@/lib/blog-format";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  let post;
  try {
    post = await getPublishedPost(slug);
  } catch {
    return { title: dict[locale].brand }; // API down: the page itself shows the error boundary
  }
  if (!post) return { title: dict[locale].brand, robots: { index: false } };

  const cover = post.images?.[0];
  return {
    title: `${post.title} · ${dict[locale].brand}`,
    description: post.excerpt,
    alternates: { canonical: `/${locale}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      authors: [post.author],
      ...(cover ? { images: [optimizedImage(cover.url, 1200)] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const t = dict[locale].blog;
  const [cover, ...gallery] = post.images ?? [];

  return (
    <>
      <article className={styles.article} data-scene="principle">
        <div className={styles.articleInner}>
          <Link href={`/${locale}/blog`} className={styles.back}>
            ← {t.back}
          </Link>

          <span className={styles.category}>{post.category}</span>
          <h1 className={styles.articleTitle}>{post.title}</h1>
          <div className={styles.meta}>
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          {cover && (
            <figure className={styles.hero}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={optimizedImage(cover.url, 1400)} alt={cover.alt} />
            </figure>
          )}

          {/* Content is sanitized server-side (sanitize-html) before it is stored */}
          <div className={styles.prose} dangerouslySetInnerHTML={{ __html: post.content }} />

          {gallery.length > 0 && (
            <div className={styles.gallery}>
              {gallery.map((img) => (
                <figure key={img.url}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={optimizedImage(img.url, 900)} alt={img.alt} loading="lazy" />
                  <figcaption>{img.alt}</figcaption>
                </figure>
              ))}
            </div>
          )}

          <Link href={`/${locale}/blog`} className={styles.back}>
            ← {t.back}
          </Link>
        </div>
      </article>
      <Footer locale={locale} />
    </>
  );
}
