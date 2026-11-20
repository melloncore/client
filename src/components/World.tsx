"use client";
import { useEffect, useState } from "react";
import { dict, offices, type Locale } from "@/content/site";

export default function World({ locale }: { locale: Locale }) {
  const t = dict[locale].world;
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  const clock = (tz: string) => (now ? new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(now) : "--:--");

  return (
    <section id="world" data-scene="globe" className="relative z-10 flex min-h-dvh items-center px-5 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto grid w-full max-w-[1500px] items-center gap-8 lg:grid-cols-2">
        <div>
          <p className="mb-4 flex items-center gap-2 text-[11px] text-muted"><span className="h-1.5 w-1.5 rounded-full bg-[#3ddcc4]" />{t.eyebrow}</p>
          <h2 className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-extralight leading-[1.04] tracking-[-0.03em]">{t.a}<br />{t.b}</h2>
          <ul className="mt-8 max-w-md divide-y divide-line/10 border-y border-line/10">
            {offices.map((o) => (
              <li key={o.city} className="flex items-baseline justify-between gap-4 py-3">
                <span className="text-lg">{o.city}</span>
                <span className="text-xs text-muted">{o.country}</span>
                <span className="w-14 text-right tabular-nums" suppressHydrationWarning>{clock(o.tz)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div data-anchor className="mx-auto aspect-square w-[min(88vw,70dvh,720px)]" />
      </div>
    </section>
  );
}
