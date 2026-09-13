"use client";

import { pingVisitor, submitConsent } from "@/lib/api";
import { useEffect, useState } from "react";

const CONSENT_COOKIE_NAME = "cookie_consent_choice";
const CONSENT_COOKIE_MAX_AGE_HOURS = 24;

// Plain, non-httpOnly client cookie — this is only a UI flag so the banner
// knows not to reshow itself. It's separate from the server-side
// `consentGiven` field on the Visitor record, which stays the source of truth.
function getClientCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setClientCookie(name: string, value: string, maxAgeHours: number) {
  const maxAgeSeconds = maxAgeHours * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
}

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Fire tracking ping once per page load, regardless of consent banner state.
    pingVisitor();

    // Only show the banner if the visitor hasn't already made a choice
    // on this device.
    const alreadyChosen = getClientCookie(CONSENT_COOKIE_NAME);
    if (!alreadyChosen) setVisible(true);
  }, []);

  async function handleChoice(accepted: boolean) {
    setSubmitting(true);
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
      // Keep the banner up so the visitor can retry if the request failed
      // (e.g. no visitor_id cookie yet — see integration notes).
      console.error("Consent submission failed; leaving banner visible for retry.");
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-neutral-900 text-neutral-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
      <p className="text-sm text-neutral-300">
        We use cookies to improve your experience on this site. You can accept or decline
        non-essential cookies at any time.
      </p>
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