import Link from "next/link";
import { categories, dict, productsByCategory, type Locale } from "@/content/site";

export default function Footer({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <footer className="relative z-10 border-t border-line/10 px-5 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1fr_2fr_2fr]">
          <p className="text-lg font-semibold">{t.brand}</p>
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
        <p className="mt-10 text-xs text-muted">© 2006–{new Date().getFullYear()} {t.brand}. {t.rights}</p>
      </div>
    </footer>
  );
}