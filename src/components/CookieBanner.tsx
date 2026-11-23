"use client";
import { dict, type Locale } from "@/content/site";
import { useConsent } from "@/hooks/useConsent";

export default function CookieBanner({ locale }: { locale: Locale }) {
  const { bannerOpen, accept, decline } = useConsent();
  const t = dict[locale].cookies;
  if (!bannerOpen) return null;

  const btn = "rounded-full px-5 py-2.5 text-sm font-medium transition-colors";
  return (
    <section
      role="dialog"
      aria-live="polite"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-text"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-line/15 bg-pill/95 p-5 shadow-2xl backdrop-blur-xl sm:inset-x-6 sm:bottom-6"
    >
      <h2 id="cookie-title" className="text-sm font-semibold">{t.title}</h2>
      <p id="cookie-text" className="mt-1 text-sm text-muted">{t.text}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={decline} className={`${btn} border border-line/25 hover:bg-line/5`}>
          {t.decline}
        </button>
        <button type="button" onClick={accept} className={`${btn} bg-fg text-bg`}>
          {t.accept}
        </button>
      </div>
    </section>
  );
}
