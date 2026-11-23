"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useSubmitConsent } from "@/hooks/api";
import { getAnalyticsConsent, saveAnalyticsConsent } from "@/hooks/consent";

type Status = "loading" | "unset" | "accepted" | "declined";

interface ConsentContextValue {
  status: Status;
  /** True while the choice is still being sent to the backend. */
  syncing: boolean;
  bannerOpen: boolean;
  accept: () => void;
  decline: () => void;
  openSettings: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>("loading");
  const [bannerOpen, setBannerOpen] = useState(false);
  const submit = useSubmitConsent({ retry: 1 });

  // Read the cookie after mount so server and client markup match.
  useEffect(() => {
    const saved = getAnalyticsConsent();
    setStatus(saved ?? "unset");
    setBannerOpen(saved === null);
  }, []);

  const decide = useCallback(
    (accepted: boolean) => {
      const stored = saveAnalyticsConsent(accepted);
      if (!stored && process.env.NODE_ENV !== "production") {
        console.warn("[consent] the browser refused to store the consent cookie");
      }
      setStatus(accepted ? "accepted" : "declined");
      setBannerOpen(false);
      // Record the choice server-side. The cookie already governs the UI, so a
      // failure here must never block or break the page.
      submit.mutate({ accepted }, {
        onError: (err) => {
          if (process.env.NODE_ENV !== "production") console.warn("[consent] backend not updated:", err.message);
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [submit.mutate],
  );

  const value = useMemo<ConsentContextValue>(
    () => ({
      status,
      syncing: submit.isPending,
      bannerOpen,
      accept: () => decide(true),
      decline: () => decide(false),
      openSettings: () => setBannerOpen(true),
    }),
    [status, submit.isPending, bannerOpen, decide],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used inside <ConsentProvider>");
  return ctx;
}
