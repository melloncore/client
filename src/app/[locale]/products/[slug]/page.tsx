import { notFound } from "next/navigation";
import { flagshipProducts, isLocale, locales } from "@/content/site";
import Footer from "@/components/Footer";
import Mockup from "@/components/Mockup";

// Only flagship products (CRM, ERP, HR) have the content a detail page needs.
export const dynamicParams = false;
export const generateStaticParams = () =>
  locales.flatMap((locale) => flagshipProducts.map((p) => ({ locale, slug: p.slug })));

export default async function ProductPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const p = flagshipProducts.find((x) => x.slug === slug);
  if (!isLocale(locale) || !p || !p.tagline || !p.blurb || !p.features || !p.mock) notFound();
  const { tagline, blurb, features, mock } = p;
  return (
    <>
      <section className="relative z-10 mx-auto grid min-h-dvh max-w-[1500px] items-center gap-10 px-5 pb-16 pt-32 sm:px-10 lg:grid-cols-2 lg:px-16">
        <div>
          <h1 className="text-[clamp(3rem,10vw,8rem)] font-extralight leading-none tracking-[-0.04em] rtl:tracking-normal">{p.name[locale]}<span style={{ color: p.hex }}>.</span></h1>
          <p className="mt-4 max-w-md text-2xl font-light">{tagline[locale]}</p>
          <p className="mt-4 max-w-md text-muted">{blurb[locale]}</p>
          <ul className="mt-6 flex flex-wrap gap-2 text-sm">
            {features[locale].map((f) => <li key={f} className="rounded-full border px-3 py-1" style={{ borderColor: `${p.hex}66`, background: `${p.hex}1a` }}>{f}</li>)}
          </ul>
        </div>
        <Mockup m={mock} color={p.hex} />
      </section>
      <Footer locale={locale} />
    </>
  );
}