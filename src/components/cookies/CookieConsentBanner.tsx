"use client";

import { useEffect, useRef, useState } from "react";
import { pingVisitor, submitConsent } from "@/lib/api";

const CONSENT_COOKIE_NAME = "cookie_consent_choice";
const CONSENT_COOKIE_MAX_AGE_HOURS = 24;

function getClientCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setClientCookie(name: string, value: string, maxAgeHours: number) {
  const maxAgeSeconds = maxAgeHours * 60 * 60;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secure}`;
}

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // true once /ping has succeeded, meaning the visitor_id cookie exists
  const trackedRef = useRef(false);
  // guards against React Strict Mode double-invoking the effect in dev
  const pingStartedRef = useRef(false);

  useEffect(() => {
    // Show the banner only if the visitor hasn't already chosen on this device.
    const alreadyChosen = getClientCookie(CONSENT_COOKIE_NAME);
    if (!alreadyChosen) setVisible(true);

    // Fire the tracking ping once per page load, regardless of banner state.
    if (!pingStartedRef.current) {
      pingStartedRef.current = true;
      pingVisitor().then((res) => {
        trackedRef.current = !!res?.tracked;
      });
    }
  }, []);

  async function handleChoice(accepted: boolean) {
    setSubmitting(true);
    setError("");

    // If the initial ping hasn't succeeded yet (cold start, network blip),
    // retry it first so the visitor_id cookie exists before consenting.
    if (!trackedRef.current) {
      const res = await pingVisitor();
      trackedRef.current = !!res?.tracked;
    }

    if (!trackedRef.current) {
      setSubmitting(false);
      setError("Couldn't reach the server. Please try again.");
      return;
    }

    const result = await submitConsent(accepted);
    setSubmitting(false);

    if (result?.success) {
      setClientCookie(
        CONSENT_COOKIE_NAME,
        accepted ? "accepted" : "declined",
        CONSENT_COOKIE_MAX_AGE_HOURS
      );
      setVisible(false);
    } else {
      // Keep the banner up so the visitor can retry.
      setError("Something went wrong. Please try again.");
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