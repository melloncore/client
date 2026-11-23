import { dict, partners, type Locale } from "@/content/site";

export default function Partners({ locale }: { locale: Locale }) {
  const t = dict[locale].partners;
  return (
    <section id="partners" aria-labelledby="partners-title" className="relative z-10 px-5 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1500px]">
        <p className="mb-3 flex items-center gap-2 text-[11px] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5b4bff]" />
          {t.eyebrow}
        </p>
        <h2 id="partners-title" className="max-w-2xl text-[clamp(1.8rem,3.4vw,3rem)] font-extralight leading-tight tracking-[-0.02em] rtl:tracking-normal">
          {t.title}
        </h2>
        <p className="mt-3 max-w-xl text-muted">{t.text}</p>
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
          {partners.map((partner) => (
            <li
              key={partner.name}
              className="grid h-28 place-items-center rounded-2xl border border-line/15 bg-white p-6 shadow-lg sm:h-36"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={partner.logo} alt={partner.name} loading="lazy" className="max-h-12 w-auto max-w-full object-contain sm:max-h-16" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
