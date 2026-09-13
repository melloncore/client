import type { Metadata } from "next";
import  "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingSupportButton from "@/components/layout/FloatingSupportButton";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import CookieConsentBanner from "@/components/cookies/CookieConsentBanner ";

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${siteConfig.name} — Software, Cloud & AI Engineering Studio`,
    description: siteConfig.description,
    path: "/",
  }),
  title: {
    default: `${siteConfig.name} — Software, Cloud & AI Engineering Studio`,
    template: `%s | ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: "/favicon.svg",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/favicon.svg`,
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address,
  },
  sameAs: [
    siteConfig.social.twitter,
    siteConfig.social.linkedin,
    siteConfig.social.github,
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-paper font-body text-ink antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-coral-500 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingSupportButton />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
