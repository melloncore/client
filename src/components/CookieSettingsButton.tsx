"use client";
import { dict, type Locale } from "@/content/site";
import { useConsent } from "@/hooks/useConsent";

/** Lets visitors change their mind later (reopens the banner). */
export default function CookieSettingsButton({ locale }: { locale: Locale }) {
  const { openSettings } = useConsent();
  return (
    <button type="button" onClick={openSettings} className="underline-offset-4 hover:text-fg hover:underline">
      {dict[locale].cookies.settings}
    </button>
  );
}
