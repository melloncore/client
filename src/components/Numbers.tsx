"use client";
import { dict, type Locale } from "@/content/site";
import { useStep } from "@/lib/useStep";

export default function Numbers({ locale }: { locale: Locale }) {
  const t = dict[locale].numbers;
  const { ref, step } = useStep(3);
  return (
    <section ref={ref} id="numbers" data-scene="numbers" className="relative z-10 h-[300dvh]">
      <div className="sticky top-0 h-dvh">
        <p className="absolute inset-x-0 top-24 text-center text-[11px] text-muted">{t.eyebrow}</p>
        <ul className="sr-only">{t.values.map((v, i) => <li key={v}>{v}: {t.captions[i]}</li>)}</ul>
        <p aria-hidden className="absolute inset-x-5 top-[66%] text-center text-[clamp(0.95rem,1.6vw,1.2rem)] text-muted transition-opacity duration-500" key={step}>{t.captions[step]}</p>
        <div className="absolute inset-x-0 bottom-10 flex justify-center gap-2" aria-hidden>
          {t.values.map((v, i) => <span key={v} className={`h-0.5 w-8 rounded-full transition-colors ${i === step ? "bg-fg" : "bg-muted/30"}`} />)}
        </div>
      </div>
    </section>
  );
}
