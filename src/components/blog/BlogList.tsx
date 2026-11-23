"use client";

import Link from "next/link";
import { dict, type Locale } from "@/content/site";
import { usePublishedBlogPosts } from "@/hooks/api";
import { formatPostDate, optimizedImage } from "@/lib/blog-format";
import type { BlogPost } from "@/types";
import styles from "./blog.module.css";

function BlogCard({ post, locale }: { post: BlogPost; locale: Locale }) {
  const t = dict[locale].blog;
  const cover = post.images?.[0];

  return (
    <Link href={`/${locale}/blog/${post.slug}`} className={styles.card} data-track={`blog:${post.slug}`}>
      <div className={styles.cardMedia}>
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={optimizedImage(cover.url, 640)} alt={cover.alt} loading="lazy" />
        )}
      </div>
      <div className={styles.cardBody}>
        <span className={styles.category}>{post.category}</span>
        <h2 className={styles.cardTitle}>{post.title}</h2>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <div className={styles.meta}>
          <span>{post.author}</span>
          <span>·</span>
          <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <span className={styles.readMore}>{t.read} →</span>
      </div>
    </Link>
  );
}

export default function BlogList({ initialPosts, locale }: { initialPosts: BlogPost[]; locale: Locale }) {
  const t = dict[locale].blog;
  const { data: posts = [], isError } = usePublishedBlogPosts(initialPosts);

  return (
    <main className={styles.page} data-scene="principle">
      <header className={styles.pageHeader}>
        <h1>{t.title}</h1>
        <p>{t.sub}</p>
      </header>

      {posts.length === 0 ? (
        <p className={styles.empty} role={isError ? "alert" : undefined}>
          {isError ? t.error : t.empty}
        </p>
      ) : (
        <div className={styles.grid}>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      )}
    </main>
  );
}
