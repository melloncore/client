"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  categories,
  dict,
  localeNames,
  locales,
  productsByGroup,
  type Locale,
  type Product,
} from "@/content/site";
import Logo from "./Logo";

export default function Header({ locale }: { locale: Locale }) {
  const t = dict[locale],
    pathname = usePathname();
  const [dd, setDd] = useState(false),
    [lang, setLang] = useState(false),
    [menu, setMenu] = useState(false);
  const home = `/${locale}`;

  // Swap the locale prefix, keep the rest of the path (e.g. /fr/products/crm -> /de/products/crm)
  const localeRe = new RegExp(`^/(${locales.join("|")})(?=/|$)`);
  const hrefFor = (l: Locale) => `/${l}${pathname.replace(localeRe, "")}`;

  // Flagship products have a detail page; the rest link to the products section.
  const productHref = (p: Product) =>
    p.flagship ? `${home}/products/${p.slug}` : `${home}#products`;

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDd(false);
        setLang(false);
        setMenu(false);
      }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  const link = "text-sm text-muted transition-colors hover:text-fg";
  const dot = (hex: string) => (
    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: hex }} />
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main"
        className="mx-auto flex h-12 max-w-[1500px] items-center justify-between rounded-full border border-line/10 bg-pill/70 px-4 backdrop-blur-xl transition-colors duration-700 sm:h-14 sm:px-6"
      >
        <Link
          href={home}
          className="text-lg font-semibold tracking-tight"
          onClick={() => setMenu(false)}
        >
          <Logo />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          <li
            className="relative"
            onMouseEnter={() => setDd(true)}
            onMouseLeave={() => setDd(false)}
          >
            <button
              aria-expanded={dd}
              aria-haspopup="true"
              onClick={() => setDd((o) => !o)}
              className={`${link} py-4`}
            >
              {t.nav.products}
            </button>
            {dd && (
              <div className="absolute left-1/2 top-full w-[40rem] -translate-x-1/2 pt-1">
                <div className="grid max-h-[80dvh] grid-cols-2 gap-6 overflow-y-auto rounded-2xl border border-line/10 bg-pill p-5 shadow-2xl">
                  {categories.map((c) => (
                    <div key={c.id}>
                      <p className="px-3 text-sm font-semibold">{c.label[locale]}</p>
                      <p className="mt-1 px-3 text-xs text-muted">{c.intro[locale]}</p>
                      {c.groups.map((g) => (
                        <div key={g.id} className="mt-4">
                          <p className="px-3 text-[11px] uppercase tracking-wider text-muted rtl:tracking-normal">
                            {g.label[locale]}
                          </p>
                          <ul className="mt-1">
                            {productsByGroup(g.id).map((p) => (
                              <li key={p.slug}>
                                <Link
                                  href={productHref(p)}
                                  onClick={() => setDd(false)}
                                  className="block rounded-xl px-3 py-2 hover:bg-line/5"
                                >
                                  <span className="flex items-center gap-2 text-sm font-medium">
                                    {dot(p.hex)}
                                    {p.name[locale]}
                                  </span>
                                  {p.flagship && (
                                    <span className="mt-0.5 block text-xs text-muted">
                                      {p.short[locale]}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>
          <li>
            <Link className={link} href={`${home}#intelligence`}>
              {t.nav.intelligence}
            </Link>
          </li>
          <li>
            <Link className={link} href={`${home}#portfolio`}>
              {t.nav.service}
            </Link>
          </li>
          <li>
            <Link className={link} href={`${home}#blog`}>
              {t.nav.blog}
            </Link>
          </li>
          <li>
            <Link className={link} href={`${home}#contact`}>
              {t.nav.contact}
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language switcher */}
          <div className="relative">
            <button
              aria-expanded={lang}
              aria-haspopup="true"
              aria-label={localeNames[locale]}
              onClick={() => {
                setLang((o) => !o);
                setDd(false);
              }}
              className={`${link} font-medium`}
            >
              {locale.toUpperCase()}
            </button>
            {lang && (
              <ul className="absolute end-0 top-full mt-3 w-44 rounded-2xl border border-line/10 bg-pill p-2 shadow-2xl">
                {locales.map((l) => (
                  <li key={l}>
                    <Link
                      href={hrefFor(l)}
                      hrefLang={l}
                      lang={l}
                      aria-current={l === locale ? "true" : undefined}
                      onClick={() => {
                        setLang(false);
                        setMenu(false);
                      }}
                      className={`block rounded-xl px-3 py-2 text-sm hover:bg-line/5 ${
                        l === locale ? "font-medium text-fg" : "text-muted"
                      }`}
                    >
                      {localeNames[l]}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link
            href={`${home}#contact`}
            className="hidden rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-colors duration-700 sm:inline-block"
          >
            {t.demo}
          </Link>
          <button
            aria-label={t.menu}
            aria-expanded={menu}
            onClick={() => setMenu((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-full border border-line/15 lg:hidden"
          >
            <svg
              width="16"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              aria-hidden
            >
              <path d={menu ? "M2 1l12 8M14 1L2 9" : "M0 1h16M0 9h16"} />
            </svg>
          </button>
        </div>
      </nav>

      {menu && (
        <div className="fixed inset-0 top-0 -z-10 overflow-y-auto bg-bg/95 px-6 pb-10 pt-24 backdrop-blur-xl lg:hidden">
          <ul className="space-y-1">
            {categories.map((c) => (
              <li key={c.id} className="pt-4 first:pt-0">
                <p className="text-sm font-semibold">{c.label[locale]}</p>
                {c.groups.map((g) => (
                  <div key={g.id} className="mt-3">
                    <p className="text-xs text-muted">{g.label[locale]}</p>
                    <ul className="mt-1 text-2xl font-extralight">
                      {productsByGroup(g.id).map((p) => (
                        <li key={p.slug}>
                          <Link
                            onClick={() => setMenu(false)}
                            href={productHref(p)}
                            className="flex items-center gap-3 py-1.5"
                          >
                            {dot(p.hex)}
                            {p.name[locale]}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </li>
            ))}
            <li className="pt-6 text-2xl font-extralight">
              <Link
                onClick={() => setMenu(false)}
                href={`${home}#intelligence`}
                className="block py-2 text-muted"
              >
                {t.nav.intelligence}
              </Link>
            </li>
            <li className="text-2xl font-extralight">
              <Link
                onClick={() => setMenu(false)}
                href={`${home}#portfolio`}
                className="block py-2 text-muted"
              >
                {t.nav.service}
              </Link>
            </li>
            <li className="text-2xl font-extralight">
              <Link
                onClick={() => setMenu(false)}
                href={`${home}#blog`}
                className="block py-2 text-muted"
              >
                {t.nav.blog}
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setMenu(false)}
                href={`${home}#contact`}
                className="mt-4 inline-block rounded-full bg-fg px-6 py-3 text-base font-medium text-bg"
              >
                {t.demo}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}