"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { recordAnalyticsEvent, useVisitorPing, type AnalyticsEvent } from "@/hooks/api";
import { useConsent } from "@/hooks/useConsent";

const PING_KEY = "msc_visitor_pinged";
const debug = process.env.NODE_ENV !== "production";

function send(event: AnalyticsEvent) {
  if (debug) console.debug("[tracker] →", event);
  // Tracking must never surface an error to the visitor.
  recordAnalyticsEvent(event).catch((err: unknown) => {
    if (debug) console.warn("[tracker] event failed:", err);
  });
}

/** A short, non-sensitive label for whatever was clicked. */
function labelFor(el: Element): string {
  const explicit = el.getAttribute("data-track") ?? el.getAttribute("aria-label");
  if (explicit) return explicit.slice(0, 80);
  const href = el.getAttribute("href") ?? "";
  if (href.startsWith("mailto:")) return "mailto"; // never send addresses
  if (href.startsWith("tel:")) return "tel";
  return (el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 80) || href.slice(0, 80);
}

/**
 * Opt-in visitor tracking. Nothing is sent until the visitor accepts cookies;
 * declining (or withdrawing) stops everything immediately.
 *   1. GET  /landing/ping       once per browser session
 *   2. POST /analytics/events   page_view on every route change
 *   3. POST /analytics/events   click on links / buttons
 */
export default function VisitorTracker() {
  const { status, syncing } = useConsent();
  const pathname = usePathname();
  // Wait until the consent choice has reached the backend so the first ping
  // can't race it.
  const enabled = status === "accepted" && !syncing;

  // 1. session ping ---------------------------------------------------------
  const [alreadyPinged, setAlreadyPinged] = useState<boolean | null>(null);
  useEffect(() => {
    try { setAlreadyPinged(sessionStorage.getItem(PING_KEY) === "1"); }
    catch { setAlreadyPinged(false); }
  }, []);
  const ping = useVisitorPing(enabled && alreadyPinged === false);
  useEffect(() => {
    if (!ping.isSuccess) return;
    if (debug) console.debug("[tracker] ping ok, tracked =", ping.data?.tracked);
    try { sessionStorage.setItem(PING_KEY, "1"); } catch { /* private mode */ }
  }, [ping.isSuccess, ping.data]);
  useEffect(() => {
    if (ping.isError && debug) console.warn("[tracker] ping failed:", ping.error);
  }, [ping.isError, ping.error]);

  // 2. page views -----------------------------------------------------------
  const lastPath = useRef<string | null>(null);
  useEffect(() => {
    if (!enabled) { lastPath.current = null; return; } // re-accepting logs the current page again
    if (!pathname || lastPath.current === pathname) return;
    lastPath.current = pathname;
    send({ surface: "client", type: "page_view", path: pathname });
  }, [enabled, pathname]);

  // 3. clicks ---------------------------------------------------------------
  useEffect(() => {
    if (!enabled) return;
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("a[href], button, [data-track]");
      if (!el) return;
      send({ surface: "client", type: "click", path: window.location.pathname, label: labelFor(el) });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [enabled]);

  return null;
}
