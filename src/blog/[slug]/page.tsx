import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "@/components/blog/blog.module.css";
import { formatPostDate, getPublishedPost, optimizedImage } from "@/lib/blog";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "Article not found" };

  const cover = post.images[0];
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      ...(cover ? { images: [optimizedImage(cover.url, 1200)] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const [cover, ...gallery] = post.images;

  return (
    <article className={styles.article}>
      <Link href="/blog" className={styles.back}>
        ← All articles
      </Link>

      <span className={styles.category}>{post.category}</span>
      <h1 className={styles.articleTitle}>{post.title}</h1>
      <div className={styles.meta}>
        <span>{post.author}</span>
        <span>·</span>
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
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
      <div
        className={styles.prose}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {gallery.length > 0 && (
        <div className={styles.gallery}>
          {gallery.map((img) => (
            <figure key={img.url}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={optimizedImage(img.url, 900)}
                alt={img.alt}
                loading="lazy"
              />
              <figcaption>{img.alt}</figcaption>
            </figure>
          ))}
        </div>
      )}

      <Link href="/blog" className={styles.back}>
        ← Back to all articles
      </Link>
    </article>
  );
}