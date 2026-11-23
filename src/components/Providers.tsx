"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import type { Locale } from "@/content/site";
import { ConsentProvider } from "@/hooks/useConsent";
import CookieBanner from "./CookieBanner";
import VisitorTracker from "./VisitorTracker";

export default function Providers({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  // Created once per browser session — never at module level (it would be shared between requests on the server).
  const [client] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } } }),
  );
  return (
    <QueryClientProvider client={client}>
      <ConsentProvider>
        {children}
        <CookieBanner locale={locale} />
        <VisitorTracker />
      </ConsentProvider>
    </QueryClientProvider>
  );
}
