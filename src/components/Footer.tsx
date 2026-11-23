import Link from "next/link";
import CookieSettingsButton from "./CookieSettingsButton";
import { categories, dict, productsByCategory, type Locale } from "@/content/site";
import Logo from "./Logo";


export default function Footer({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <footer className="relative z-10 border-t border-line/10 px-5 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1fr_2fr_2fr]">
          <div>
            <Logo />
            <p
             className="text-sm text-muted ">   Mellon Strata Core is a product engineering studio that designs, builds and scales web platforms, cloud infrastructure and AI-driven systems for growing companies.",
  </p>
          </div>
          {categories.map((c) => (
            <div key={c.id}>
              <p className="mb-3 text-sm font-medium">{c.label[locale]}</p>
              <ul className="grid gap-x-6 gap-y-2 text-sm text-muted sm:grid-cols-2">
                {productsByCategory(c.id).map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={p.flagship ? `/${locale}/products/${p.slug}` : `/${locale}#portfolio`}
                      className="hover:text-fg"
                    >
                      {p.name[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted">
          <p> ©{new Date().getFullYear()} {t.brand}. {t.rights}</p>
          <Link href={`/${locale}/blog`} className="hover:text-fg">{t.nav.blog}</Link>
          <CookieSettingsButton locale={locale} />
        </div>
      </div>
    </footer>
  );
}