import Link from "next/link";
import { dict, type Locale } from "@/content/site";
import ContactForm from "./ContactForm";
import Footer from "./Footer";

export default function Contact({ locale }: { locale: Locale }) {
  const t = dict[locale].contact;
  return (
    <section id="contact" data-scene="contact" className="relative z-10">
      <div className="flex min-h-dvh flex-col items-center justify-end px-5 pb-10 pt-24 text-center">
        <div data-anchor className="mb-4 aspect-square w-[min(40vw,180px)]" />
        <h2 className="text-[clamp(4rem,19vw,17rem)] font-extralight leading-[0.9] tracking-[-0.05em]">{t.title}</h2>
      </div>
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 pb-24 sm:px-10 lg:grid-cols-2 lg:px-16">
        <div>
          <h3 className="text-2xl font-light">{t.sub}</h3>
          <p className="mt-2 max-w-sm text-muted">{t.text}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="#contact-form" className="rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg">{dict[locale].demo}</Link>
            <Link href={`/${locale}#products`} className="rounded-full border border-line/20 px-6 py-3 text-sm">{t.see}</Link>
          </div>
        </div>
        <div id="contact-form" className="scroll-mt-24"><ContactForm locale={locale} /></div>
      </div>
      <Footer locale={locale} />
    </section>
  );
}
