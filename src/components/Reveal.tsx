"use client";
import { dict, type Locale } from "@/content/site";
import { useStep } from "@/lib/useStep";

export default function Reveal({ locale }: { locale: Locale }) {
  const t = dict[locale].reveal;
  const { ref, step } = useStep(3);
  const show = "opacity-100 translate-y-0", hide = "opacity-0 translate-y-4";
  return (
    <section ref={ref} data-scene="reveal" className="relative z-10 h-[300dvh]" aria-label={`${t.a} ${t.b}`}>
      <div className="sticky top-0 grid h-dvh place-items-center px-5 text-center">
        <p className={`absolute text-[clamp(2.2rem,7vw,6rem)] font-extralight tracking-[-0.03em] transition-all duration-700 ${step === 1 ? show : hide}`}>{t.a}</p>
        <p className={`text-[clamp(2.2rem,7vw,6rem)] font-extralight leading-[1.05] tracking-[-0.03em] transition-all duration-700 ${step === 2 ? show : hide}`}>
          {t.a}<br /><span className="text-[#a99cff]">{t.b}</span>
        </p>
      </div>
    </section>
  );
}
