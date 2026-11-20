import type { Metadata, Viewport } from "next";
import { Manrope, Noto_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { dict, dir, isLocale, locales, type Locale } from "@/content/site";
import Header from "@/components/Header";
import ParticleStage from "@/components/ParticleStage";
import SideNav from "@/components/SideNav";
import "../globals.css";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
// Manrope has no Arabic glyphs; load an Arabic face and apply it for lang="ar" (see globals.css snippet).
const arabic = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-arabic" });

const ogLocale: Record<Locale, string> = {
  en: "en_US", es: "es_ES", fr: "fr_FR", ar: "ar_AE", pt: "pt_BR", de: "de_DE", zh: "zh_CN",
};

export const viewport: Viewport = { themeColor: "#060818", width: "device-width", initialScale: 1 };
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = dict[locale];
  return {
    title: `${t.brand} · ${t.hero.title}`,
    description: t.hero.text,
    alternates: {
      canonical: `/${locale}`,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}`])), "x-default": "/en" },
    },
    openGraph: {
      title: t.hero.title,
      description: t.hero.text,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
    },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} dir={dir(locale)} className={`${sans.variable} ${arabic.variable}`}>
      <body>
        <ParticleStage />
        <Header locale={locale} />
        <SideNav locale={locale} />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}