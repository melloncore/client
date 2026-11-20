"use client";
import { useEffect, useRef, useState } from "react";

/** Tracks scroll progress through a tall section that contains a sticky stage. */
export function useStep(steps: number) {
  const ref = useRef<HTMLElement>(null);
  const [s, setS] = useState({ step: 0, p: 0 });

  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      const step = Math.min(steps - 1, Math.floor(p * steps));
      el.dataset.step = String(step);
      const q = Math.round(p * 100) / 100;
      setS((prev) => (prev.step === step && prev.p === q ? prev : { step, p: q }));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(calc); };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [steps]);

  return { ref, ...s };
}

export function scrollToStep(el: HTMLElement | null, i: number, steps: number) {
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: top + ((i + 0.5) / steps) * (el.offsetHeight - window.innerHeight), behavior: "smooth" });
}
