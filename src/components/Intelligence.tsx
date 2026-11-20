"use client";
import { dict, type Locale } from "@/content/site";
import { useStep } from "@/lib/useStep";

export default function Intelligence({ locale }: { locale: Locale }) {
  const t = dict[locale].intel;
  const { ref, step } = useStep(2);
  const on = "opacity-100 translate-y-0", off = "pointer-events-none opacity-0 translate-y-4";
  return (
    <section ref={ref} id="intelligence" data-scene="duo" className="relative z-10 h-[250dvh]">
      <div className="sticky top-0 h-dvh overflow-hidden px-5 pt-24 text-center sm:px-10">
        <p className="mb-3 text-[11px] text-muted">{t.eyebrow}</p>
        <h2 className="text-[clamp(1.5rem,3.6vw,2.9rem)] font-extralight leading-tight tracking-[-0.02em]">
          {t.title[0]}<br /><span className="text-[#a99cff]">{t.title[1]}<br />{t.title[2]}</span>
        </h2>
        <div className={`absolute inset-x-5 bottom-8 max-w-sm text-left transition-all duration-700 sm:left-10 sm:right-auto lg:bottom-16 lg:left-16 ${step === 0 ? on : off}`}>
          <p className="mb-2 flex items-center gap-2 text-[11px] text-muted"><span className="h-1.5 w-1.5 rounded-full bg-[#ff6a3d]" />{t.p1Tag}</p>
          <h3 className="text-2xl font-light">{t.p1Title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{t.p1Text}</p>
        </div>
        <div className={`absolute inset-x-5 bottom-8 text-left transition-all duration-700 sm:left-auto sm:right-10 sm:max-w-md lg:bottom-16 lg:right-24 ${step === 1 ? on : off}`}>
          <p className="mb-2 flex items-center gap-2 text-[11px] text-muted"><span className="h-1.5 w-1.5 rounded-full bg-[#a99cff]" />{t.p2Tag}</p>
          <h3 className="text-2xl font-light">{t.p2Title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{t.p2Text}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
            {t.chips.map((c) => <li key={c} className="rounded-full border border-line/20 px-2.5 py-1">{c}</li>)}
          </ul>
          <p className="mt-3 text-xs text-muted">{t.foot}</p>
        </div>
      </div>
    </section>
  );
}
