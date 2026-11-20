"use client";
import Link from "next/link";
import { useEffect } from "react";
import { dict, flagshipProducts as items, type Locale } from "@/content/site";
import { scrollToStep, useStep } from "@/lib/useStep";
import Mockup from "./Mockup";

// This scroll scene features the flagship platforms (CRM, ERP, HR): they are the only
// products with a tagline, blurb, feature list and mockup. The full catalog lives in <Portfolio />.
export default function Products({ locale }: { locale: Locale }) {
  const t = dict[locale].products;
  const total = items.length + 1; // one step per product + one "exit" step
  const { ref, step } = useStep(total);
  const idx = Math.min(step, items.length - 1), exit = step === items.length;

  useEffect(() => { if (ref.current) ref.current.dataset.accent = items[idx].hex; }, [idx, ref]);

  return (
    <section ref={ref} id="products" data-scene="products" className="relative z-10" style={{ height: `${total * 100}dvh` }}>
      <div className="sticky top-0 h-dvh overflow-hidden">
        <div className="mx-auto flex h-full max-w-[1500px] flex-col px-5 pb-5 pt-20 sm:px-10 lg:px-16 lg:pt-24">
          <header className={`transition-opacity duration-500 ${exit ? "opacity-0" : "opacity-100"}`}>
            <p className="mb-2 flex items-center gap-2 text-[11px] text-muted"><span className="h-1.5 w-1.5 rounded-full" style={{ background: items[idx].hex }} />{t.eyebrow}</p>
            <h2 className="max-w-xl text-[clamp(1rem,1.5vw,1.4rem)] font-light leading-snug">{t.h1} <span className="text-muted">{t.h2}</span></h2>
          </header>

          <div className="grid min-h-0 flex-1 items-center gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10">
            <div className="grid">
              {items.map((p, i) => {
                const on = i === idx && !exit;
                const name = p.name[locale];
                return (
                  <div key={p.slug} inert={!on} aria-hidden={!on}
                    className={`col-start-1 row-start-1 transition-all duration-700 ${on ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}>
                    <h3 className="text-[clamp(2.8rem,10vw,7.5rem)] font-extralight leading-none tracking-[-0.04em] rtl:tracking-normal">{name}<span style={{ color: p.hex }}>.</span></h3>
                    <p className="mt-2 max-w-md text-[clamp(1.05rem,2.2vw,1.7rem)] font-light leading-tight">{p.tagline?.[locale]}</p>
                    {p.partner && <p className="mt-2 text-xs text-muted">{t.partner}</p>}
                    <p className="mt-3 hidden max-w-md text-sm leading-relaxed text-muted sm:block">{p.blurb?.[locale]}</p>
                    <ul className="mt-4 hidden flex-wrap gap-1.5 text-[11px] md:flex">
                      {(p.features?.[locale] ?? []).map((f) => <li key={f} className="rounded-full border px-2.5 py-1" style={{ borderColor: `${p.hex}66`, background: `${p.hex}1a` }}>{f}</li>)}
                    </ul>
                    <Link href={`/${locale}/products/${p.slug}`} className="mt-4 inline-block rounded-full border border-line/25 px-5 py-2 text-sm hover:bg-line/5">{t.go.replace("{name}", name)}</Link>
                  </div>
                );
              })}
            </div>

            <div className="relative grid [perspective:1800px]">
              {items.map((p, i) => {
                const on = i === idx;
                return (
                  <div key={p.slug} aria-hidden className="col-start-1 row-start-1 mx-auto w-full transition-all duration-700"
                    style={{
                      maxWidth: "min(100%, calc(42dvh * 1.6), 760px)",
                      opacity: on ? (exit ? 0 : 1) : 0,
                      transform: on ? (exit ? "rotateY(0deg) scale(1.7)" : "rotateY(-14deg) rotateX(3deg)") : "rotateY(-30deg) translateX(8%) scale(0.92)",
                      filter: exit && on ? "blur(8px)" : "none",
                    }}>
                    {p.mock && <Mockup m={p.mock} color={p.hex} />}
                  </div>
                );
              })}
            </div>
          </div>

          <footer className={`flex items-center justify-between gap-3 transition-opacity duration-500 ${exit ? "opacity-0" : "opacity-100"}`}>
            <div role="tablist" aria-label="Products" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {items.map((p, i) => (
                <button key={p.slug} role="tab" aria-selected={i === idx} onClick={() => scrollToStep(ref.current, i, total)}
                  className="flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs transition-all sm:text-sm"
                  style={{ borderColor: i === idx ? p.hex : "rgb(var(--line) / .15)", background: i === idx ? `${p.hex}33` : "transparent", boxShadow: i === idx ? `0 0 24px ${p.hex}66` : "none" }}>
                  <span className="h-2 w-2 rounded-full" style={{ background: p.hex }} />{p.name[locale]}
                </button>
              ))}
            </div>
            <p className="hidden shrink-0 text-[11px] tabular-nums text-muted sm:block">
              {String(idx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
          </footer>
        </div>
      </div>
    </section>
  );
}