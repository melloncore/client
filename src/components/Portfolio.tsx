import Link from "next/link";
import { categories, dict, portfolioFile, productsByGroup, type Locale, type Product } from "@/content/site";

export default function Portfolio({ locale }: { locale: Locale }) {
  const t = dict[locale].portfolio;

  // Flagship products have a detail page; the rest send people to the contact form.
  const href = (p: Product) => (p.flagship ? `/${locale}/products/${p.slug}` : `/${locale}#contact`);

  const Row = ({ p }: { p: Product }) => (
    <li>
      <Link href={href(p)} className="flex items-center gap-3 border-b border-line/10 py-3 hover:bg-line/5">
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: p.hex }} />
        <span className="flex min-w-0 flex-col">
          <span className="font-medium">{p.name[locale]}</span>
          <span className="text-sm text-muted">{p.short[locale]}</span>
        </span>
        {p.partner && <span className="ms-auto shrink-0 text-[11px] text-muted">{t.partner}</span>}
      </Link>
    </li>
  );

  const Chip = ({ p }: { p: Product }) => (
    <li>
      <Link href={href(p)} className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs hover:bg-line/5"
        style={{ borderColor: `${p.hex}66`, background: `${p.hex}14` }} title={p.short[locale]}>
        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.hex }} />
        {p.name[locale]}
      </Link>
    </li>
  );

  return (
    <section id="portfolio" data-scene="portfolio" className="relative z-10 flex min-h-dvh items-center px-5 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto grid w-full max-w-[1500px] items-center gap-10 xl:grid-cols-[1fr_minmax(0,0.9fr)_1fr]">
        <div>
          <h2 className="text-[clamp(1.8rem,3.4vw,3rem)] font-extralight leading-tight tracking-[-0.02em] rtl:tracking-normal">{t.h1}<br /><span className="text-muted">{t.h2}</span></h2>

          {categories.map((c) => (
            <div key={c.id} className="mt-8">
              <p className="text-sm font-semibold">{c.label[locale]}</p>
              <p className="mt-1 text-xs text-muted">{c.intro[locale]}</p>
              {c.groups.map((g) => {
                const list = productsByGroup(g.id);
                const flagship = list.filter((p) => p.flagship);
                const rest = list.filter((p) => !p.flagship);
                return (
                  <div key={g.id} className="mt-4">
                    <p className="mb-1 text-[11px] text-muted">{g.label[locale]}</p>
                    {flagship.length > 0 && <ul>{flagship.map((p) => <Row key={p.slug} p={p} />)}</ul>}
                    {rest.length > 0 && <ul className="flex flex-wrap gap-2 pt-2">{rest.map((p) => <Chip key={p.slug} p={p} />)}</ul>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div data-anchor className="mx-auto aspect-square w-[min(60vw,260px)] xl:w-[min(24vw,360px)]" />

        <div>
          <p className="mb-3 flex items-center gap-2 text-[11px] text-muted"><span className="h-1.5 w-1.5 rounded-full bg-[#5b4bff]" />{t.service}</p>
          <h3 className="text-[clamp(1.6rem,2.6vw,2.4rem)] font-extralight">{t.run}</h3>
          <ol className="mt-6 divide-y divide-line/10 border-y border-line/10">
            {t.steps.map((s, i) => <li key={s} className="flex gap-4 py-3"><span className="text-xs tabular-nums text-muted">0{i + 1}</span>{s}</li>)}
          </ol>
          <p className="mt-4 text-sm text-muted">{t.foot}</p>

          {/* Company portfolio download */}
          <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-line/10 p-5">
            <div className="min-w-0 flex-1 basis-48">
              <p className="font-medium">{t.downloadTitle}</p>
              <p className="mt-1 text-sm text-muted">{t.downloadText}</p>
            </div>
            <a
              href={portfolioFile(locale)}
              download
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#5b4bff] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
              </svg>
              {t.downloadCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}