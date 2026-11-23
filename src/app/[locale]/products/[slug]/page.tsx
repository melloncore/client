import { notFound } from "next/navigation";
import Link from "next/link";
import { dict, detailProducts, isLocale, locales, productBySlug } from "@/content/site";
import Footer from "@/components/Footer";
import Mockup from "@/components/Mockup";
import { headlineSize } from "@/lib/headline";

// Every product with full detail content (tagline, blurb, features, mock) gets a page.
export const dynamicParams = false;
export const generateStaticParams = () =>
  locales.flatMap((locale) => detailProducts.map((p) => ({ locale, slug: p.slug })));

export default async function ProductPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const p = productBySlug(slug);
  if (!isLocale(locale) || !p || !p.tagline || !p.blurb || !p.features || !p.mock) notFound();
  const { tagline, blurb, features, mock } = p;
  const subs = (p.includes ?? []).map((s) => productBySlug(s)).filter((x) => !!x);
  return (
    <>
      <section className="relative z-10 mx-auto grid min-h-dvh max-w-[1500px] items-center gap-10 px-5 pb-16 pt-32 sm:px-10 lg:grid-cols-2 lg:px-16">
        <div>
          <h1 style={{ fontSize: headlineSize(p.name[locale], 8) }} className="font-extralight leading-none tracking-[-0.04em] rtl:tracking-normal">{p.name[locale]}<span style={{ color: p.hex }}>.</span></h1>
          <p className="mt-4 max-w-md text-2xl font-light">{tagline[locale]}</p>
          <p className="mt-4 max-w-md text-muted">{blurb[locale]}</p>
          <ul className="mt-6 flex flex-wrap gap-2 text-sm">
            {features[locale].map((f) => <li key={f} className="rounded-full border px-3 py-1" style={{ borderColor: `${p.hex}66`, background: `${p.hex}1a` }}>{f}</li>)}
          </ul>
          {subs.length > 0 && (
            <div className="mt-8">
              <p className="mb-2 text-[11px] uppercase tracking-wider text-muted rtl:tracking-normal">{dict[locale].products.includes}</p>
              <ul className="flex flex-wrap gap-2 text-sm">
                {subs.map((sub) => (
                  <li key={sub!.slug}>
                    <Link href={`/${locale}/products/${sub!.slug}`} className="block rounded-full border border-line/25 px-4 py-1.5 hover:bg-line/10">{sub!.name[locale]}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Mockup m={mock} color={p.hex} />
      </section>
      <Footer locale={locale} />
    </>
  );
}