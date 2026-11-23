import { dateLocales, type Locale } from "@/content/site";

/** Formats "YYYY-MM-DD" (or a full ISO timestamp) in the reader's language. */
export function formatPostDate(date: string, locale: Locale = "en"): string {
  const d = new Date(`${date.slice(0, 10)}T00:00:00.000Z`);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(dateLocales[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // avoids server/client hydration mismatches
  });
}

/** Serves Cloudinary images at a sensible size and format. */
export function optimizedImage(url: string, width = 800): string {
  return url.includes("/upload/")
    ? url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`)
    : url;
}
