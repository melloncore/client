import { notFound, redirect } from "next/navigation";
import { isLocale } from "@/content/site";

export const dynamic = "force-dynamic";

export default async function ProductsIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  redirect(`/${locale}#products`);
}