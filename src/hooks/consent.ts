export type ConsentChoice = "accepted" | "declined";

/**
 * Consent is asked again on EVERY visit:
 *  - the choice lives in sessionStorage (per tab, gone when the tab/browser closes), and that is
 *    the only thing the banner logic trusts, so a cookie left over from an earlier visit (or from
 *    another surface such as the marketplace) never skips the banner;
 *  - a *session* cookie (no Max-Age) mirrors the choice for the backend and other subdomains.
 */
const CONSENT_COOKIE = "msc_analytics_consent";
const SESSION_KEY = "msc_consent_choice";

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

/** The choice made during THIS visit, or null if the visitor has not chosen yet. */
export function getAnalyticsConsent(): ConsentChoice | null {
  try {
    const v = sessionStorage.getItem(SESSION_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null; // storage blocked → just ask again
  }
}

/**
 * Only use the shared Domain= attribute when the current host really belongs
 * to it. A cookie with Domain=.melloncore.com set from localhost or a
 * *.workers.dev preview is silently rejected by the browser.
 */
function cookieDomainAttr(): string {
  const configured = process.env.NEXT_PUBLIC_COOKIE_DOMAIN?.trim();
  if (!configured) return "";
  if (!/^\.[a-z\d](?:[a-z\d.-]*[a-z\d])?$/i.test(configured)) {
    console.warn("NEXT_PUBLIC_COOKIE_DOMAIN must be a bare cookie domain such as .melloncore.com — ignoring it.");
    return "";
  }
  const host = window.location.hostname;
  const bare = configured.slice(1);
  return host === bare || host.endsWith(configured) ? `; Domain=${configured}` : "";
}

/** Returns true only if the browser actually stored the cookie. */
export function saveAnalyticsConsent(accepted: boolean): boolean {
  const value: ConsentChoice = accepted ? "accepted" : "declined";
  try { sessionStorage.setItem(SESSION_KEY, value); } catch { /* private mode: in-memory state still applies */ }
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  // No Max-Age/Expires → session cookie.
  document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; SameSite=Lax${cookieDomainAttr()}${secure}`;
  return readCookie(CONSENT_COOKIE) === value;
}
