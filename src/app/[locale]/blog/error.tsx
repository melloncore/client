"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { dict, isLocale } from "@/content/site";
import styles from "@/components/blog/blog.module.css";

export default function BlogError({ reset }: { error: Error; reset: () => void }) {
  const params = useParams<{ locale?: string }>();
  const locale = params.locale && isLocale(params.locale) ? params.locale : "en";
  const t = dict[locale].blog;
  return (
    <main className={styles.page} data-scene="principle">
      <div className={styles.errorBox} role="alert">
        <p>{t.error}</p>
        <button type="button" onClick={reset}>{t.retry}</button>
        <Link href={`/${locale}/blog`}>{t.back}</Link>
      </div>
    </main>
  );
}
