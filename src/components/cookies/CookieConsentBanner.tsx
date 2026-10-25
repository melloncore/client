"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { pingVisitor, recordAnalyticsEvent, submitConsent } from "@/lib/api";
import { getAnalyticsConsent, saveAnalyticsConsent } from "@/lib/consent";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const trackedRef = useRef(false);      // true once /ping succeeded
  const pingStartedRef = useRef(false);  // guards Strict Mode double effect
  const pingMutation = useMutation({ mutationFn: pingVisitor });
  const consentMutation = useMutation({
    mutationFn: (accepted: boolean) => submitConsent(accepted),
  });
  const eventMutation = useMutation({ mutationFn: recordAnalyticsEvent });
  const ping = pingMutation.mutate;
  const pingAsync = pingMutation.mutateAsync;

  useEffect(() => {
    const alreadyChosen = getAnalyticsConsent();
    const timer = !alreadyChosen ? window.setTimeout(() => setVisible(true), 0) : undefined;

    if (!pingStartedRef.current) {
      pingStartedRef.current = true;
      ping(undefined, {
        onSuccess: (res) => { trackedRef.current = res.tracked; },
      });
    }
    return () => { if (timer !== undefined) window.clearTimeout(timer); };
  }, [ping]);

  async function handleChoice(accepted: boolean) {
    setSubmitting(true);
    setError("");

    // Retry the ping if it hasn't succeeded yet (cold start, network blip).
    try {
      if (!trackedRef.current) {
        const res = await pingAsync();
        trackedRef.current = res.tracked;
      }
    } catch {
      trackedRef.current = false;
    }

    if (!trackedRef.current) {
      setSubmitting(false);
      setError("Couldn't reach the server. Please try again.");
      return;
    }

    try {
      const result = await consentMutation.mutateAsync(accepted);
      if (!result.success) throw new Error("Consent update failed");
      saveAnalyticsConsent(accepted);
      if (accepted) {
        eventMutation.mutate({ surface: "client", type: "page_view", path: window.location.pathname });
      }
      setVisible(false);
    } catch {
      setError("Something went wrong. Please try again.");
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
          disabled={submitting}
          className="px-4 py-2 text-sm rounded-md border border-neutral-600 hover:bg-neutral-800 disabled:opacity-50"
        >
          Decline
        </button>
        <button
          onClick={() => handleChoice(true)}
          disabled={submitting}
          className="px-4 py-2 text-sm rounded-md bg-white text-neutral-900 hover:bg-neutral-200 disabled:opacity-50"
        >
          Accept
        </button>
      </div>
    </div>
  );
}