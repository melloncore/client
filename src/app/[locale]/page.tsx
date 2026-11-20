import { notFound } from "next/navigation";
import { isLocale } from "@/content/site";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import Products from "@/components/Products";
import Intelligence from "@/components/Intelligence";
import Principle from "@/components/Principle";
import Numbers from "@/components/Numbers";
import World from "@/components/World";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <Hero locale={locale} />
      <Reveal locale={locale} />
      <Products locale={locale} />
      <Intelligence locale={locale} />
      <Principle locale={locale} />
      <Numbers locale={locale} />
      <World locale={locale} />
      <Portfolio locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
