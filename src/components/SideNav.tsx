"use client";
import { useEffect, useState } from "react";
import { dict, type Locale } from "@/content/site";

const IDS = ["start", "products", "intelligence", "principle", "numbers", "world", "portfolio", "contact"];

export default function SideNav({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      let idx = 0;
      IDS.forEach((id, i) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= innerHeight * 0.5) idx = i; });
      setActive(idx);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(calc); };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => { removeEventListener("scroll", on); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <nav aria-label="Sections" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-2.5 xl:flex">
      {dict[locale].side.map((label, i) => (
        <button key={IDS[i]} onClick={() => document.getElementById(IDS[i])?.scrollIntoView({ behavior: "smooth" })}
          aria-current={active === i} className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted">
          <span className={`transition-opacity ${active === i ? "text-fg opacity-100" : "opacity-0 group-hover:opacity-100"}`}>{label}</span>
          <span className={`h-px transition-all ${active === i ? "w-6 bg-fg" : "w-3 bg-muted/60"}`} />
        </button>
      ))}
    </nav>
  );
}
