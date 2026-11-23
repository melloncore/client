import Link from "next/link";
import { dict, showcaseProducts, type Locale } from "@/content/site";

interface Slot { key: string; hex: string; label: string; items: string[] }

// The six major categories. The first four sit on the ring; the rest show as chips underneath.
function slotsFor(locale: Locale): Slot[] {
  return showcaseProducts.map((p) => ({
    key: p.slug,
    hex: p.hex,
    label: p.name[locale],
    items: p.features?.[locale] ?? [],
  }));
}

// Angle in degrees (0 = right, clockwise, -90 = top) -> unit vector
const pos = (deg: number) => {
  const r = (deg * Math.PI) / 180;
  return { c: Math.cos(r), s: Math.sin(r) };
};

// Radius (as % of the anchor width) for the heading pills and the feature labels.
// The particle sphere reaches roughly 40%, so these leave a small gap around it.
// Keep PILL_R about 5 higher than LABEL_R.
const PILL_R = 50;
const LABEL_R = 45;

// One quadrant per ring slot, in order: top-left, top-right, bottom-right, bottom-left.
// `pill` is where the heading pill sits; labels run from `from` to `to`,
// always reading top to bottom, with the first item nearest the pill.
const QUADRANTS = [
  { pill: -120, from: -128, to: -178 }, // top-left
  { pill: -60,  from: -52,  to: -2 },   // top-right
  { pill: 60,   from: 2,    to: 52 },   // bottom-right
  { pill: 120,  from: 178,  to: 128 },  // bottom-left
];

export default function Hero({ locale }: { locale: Locale }) {
  const t = dict[locale].hero;
  const all = slotsFor(locale);
  const ring = all.slice(0, 4); // the 4 flagships sit on the ring

  return (
    <section
      id="start"
      data-scene="hero"
      className="relative z-10 flex min-h-dvh items-center px-5 pb-16 pt-28 sm:px-10 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-[1500px] items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div>
          <p className="mb-5 flex items-center gap-2 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7b8cff]" />
            {t.eyebrow}
          </p>
          <h1 className="text-[clamp(2rem,7vw,4rem)] font-extralight leading-[1.02] tracking-[-0.03em] rtl:tracking-normal">
            {t.title}
          </h1>
          <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-muted">{t.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${locale}#contact`}
              className="rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg"
            >
              {dict[locale].demo}
            </Link>
            <Link
              href={`/${locale}#products`}
              className="rounded-full border border-line/20 px-6 py-3 text-sm hover:bg-line/5"
            >
              {t.explore}
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div
            data-anchor
            className="relative aspect-square w-[min(84vw,52dvh)] lg:w-[min(36vw,70dvh,620px)]"
          >
            {ring.map((slot, i) => {
              const q = QUADRANTS[i];
              const n = slot.items.length;
              const pp = pos(q.pill);
              return (
                <div key={slot.key} className="hidden lg:block">
                  <span
                    className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-5 py-2.5 text-base font-medium text-fg backdrop-blur"
                    style={{
                      left: `${50 + PILL_R * pp.c}%`,
                      top: `${50 + PILL_R * pp.s}%`,
                      borderColor: slot.hex,
                      background: `${slot.hex}22`,
                      boxShadow: `0 0 28px ${slot.hex}55`,
                    }}
                  >
                    {slot.label}
                  </span>

                  {slot.items.map((f, j) => {
                    const a = pos(q.from + ((q.to - q.from) * j) / Math.max(1, n - 1));
                    const right = a.c >= 0;
                    return (
                      <span
                        key={`${slot.key}-${j}`}
                        className="absolute whitespace-nowrap rounded-full px-2.5 py-1 text-[12px]"
                        style={{
                          left: `${50 + LABEL_R * a.c}%`,
                          top: `${50 + LABEL_R * a.s}%`,
                          transform: `translate(${right ? "0" : "-100%"}, -50%)`,
                          color: slot.hex,
                          background: `${slot.hex}22`,
                        }}
                      >
                        {f}
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Mobile: every slot as a chip. Desktop: only the slots that don't fit on the ring. */}
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {all.map((slot, i) => (
              <li
                key={slot.key}
                className={`rounded-full border px-3 py-1.5 text-xs ${i < ring.length ? "lg:hidden" : ""}`}
                style={{ borderColor: slot.hex, background: `${slot.hex}26` }}
              >
                {slot.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="absolute bottom-6 start-5 text-[11px] text-muted sm:start-10 lg:start-16">{t.meta}</p>
      <p className="absolute bottom-6 end-5 hidden text-[11px] text-muted sm:block lg:end-16">{t.scroll}</p>
    </section>
  );
}