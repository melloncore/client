"use client";

import { useEffect, useState } from "react";
import { useAnalyticsEvent, useSubmitConsent, useVisitorPing } from "@/lib/api";
import { getAnalyticsConsent, saveAnalyticsConsent } from "@/lib/consent";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const pingQuery = useVisitorPing();
  const consentMutation = useSubmitConsent();
  const eventMutation = useAnalyticsEvent();

  useEffect(() => {
    const alreadyChosen = getAnalyticsConsent();
    const timer = !alreadyChosen ? window.setTimeout(() => setVisible(true), 0) : undefined;

    return () => { if (timer !== undefined) window.clearTimeout(timer); };
  }, []);

  async function handleChoice(accepted: boolean) {
    setSubmitting(true);
    setError("");

    try {
      const pingResult = pingQuery.data?.tracked
        ? pingQuery
        : await pingQuery.refetch();
      if (pingResult.isError) throw pingResult.error;
      if (!pingResult.data?.tracked) {
        throw new Error("The server did not confirm visitor tracking.");
      }
    } catch (cause) {
      setSubmitting(false);
      setError(
        cause instanceof Error
          ? `Visitor check failed: ${cause.message}`
          : "Visitor check failed. Please try again.",
      );
      return;
    }

    try {
      const result = await consentMutation.mutateAsync({ accepted });
      if (!result.success) throw new Error("Consent update failed");
      saveAnalyticsConsent(accepted);
      if (accepted) {
        eventMutation.mutate({ surface: "client", type: "page_view", path: window.location.pathname });
      }
      setVisible(false);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? `Could not save your choice: ${cause.message}`
          : "Could not save your choice. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-50 bg-neutral-900 text-neutral-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg"
    >
      <div>
        <p className="text-sm text-neutral-300">
          We use cookies to improve your experience on this site. You can accept
          or decline non-essential cookies at any time.
        </p>
        {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
      </div>

      <div className="flex gap-3 shrink-0">
        <button
          onClick={() => handleChoice(false)}
          disabled={submitting || pingQuery.isFetching || consentMutation.isPending}
          className="px-4 py-2 text-sm rounded-md border border-neutral-600 hover:bg-neutral-800 disabled:opacity-50"
        >
          Decline
        </button>
        <button
          onClick={() => handleChoice(true)}
          disabled={submitting || pingQuery.isFetching || consentMutation.isPending}
          className="px-4 py-2 text-sm rounded-md bg-white text-neutral-900 hover:bg-neutral-200 disabled:opacity-50"
        >
          Accept
        </button>
      </div>
    </div>
  );
}