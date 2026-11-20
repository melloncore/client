"use client";

import Link from "next/link";
import { usePublishedBlogPosts } from "@/hooks/api";
import { formatPostDate, optimizedImage } from "@/lib/blog";
import type { BlogPost } from "@/types";
import styles from "./blog.module.css";

function BlogCard({ post }: { post: BlogPost }) {
  const cover = post.images[0];

  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      <div className={styles.cardMedia}>
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={optimizedImage(cover.url, 640)}
            alt={cover.alt}
            loading="lazy"
          />
        )}
      </div>
      <div className={styles.cardBody}>
        <span className={styles.category}>{post.category}</span>
        <h2 className={styles.cardTitle}>{post.title}</h2>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <div className={styles.meta}>
          <span>{post.author}</span>
          <span>·</span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <span className={styles.readMore}>Read article →</span>
      </div>
    </Link>
  );
}

export default function BlogList({
  initialPosts,
}: {
  initialPosts: BlogPost[];
}) {
  const { data: posts = [], isError } = usePublishedBlogPosts(initialPosts);

  return (
    <main className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>Blog</h1>
        <p>Insights, updates and stories from the team.</p>
      </header>

      {posts.length === 0 ? (
        <p className={styles.empty}>
          {isError
            ? "We couldn't load articles right now. Please try again shortly."
            : "No articles published yet. Check back soon."}
        </p>
      ) : (
        <div className={styles.grid}>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
