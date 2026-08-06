"use client";

import { useState } from "react";
import { MessageCircle, X, Mail, Phone, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/cn";

/**
 * Persistent customer-care launcher shown on every page. Expands into a
 * small panel with the fastest ways to reach a human, and always links
 * through to the full contact page.
 */
export default function FloatingSupportButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[60] flex flex-col items-end gap-3">
      <div
        role="dialog"
        aria-label="Customer care"
        aria-hidden={!open}
        className={cn(
          "w-[85vw] max-w-[320px] origin-bottom-right rounded-2xl border border-line bg-surface p-5 shadow-lift transition-all duration-200",
          open
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        )}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="font-display text-lg text-ink">Need a hand?</p>
            <p className="mt-1 text-sm text-ink-soft">
              Our team usually replies within a few hours.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close customer care panel"
            className="rounded-full p-1 text-ink-muted hover:bg-ink/5 hover:text-ink"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="flex items-center gap-3 rounded-xl border border-line px-3.5 py-3 text-sm text-ink transition-colors hover:border-brand-500"
          >
            <Mail size={17} className="text-brand-600" />
            <span className="flex-1">Email support</span>
            <ArrowUpRight size={15} className="text-ink-muted" />
          </a>
          <a
            href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
            className="flex items-center gap-3 rounded-xl border border-line px-3.5 py-3 text-sm text-ink transition-colors hover:border-brand-500"
          >
            <Phone size={17} className="text-teal-600" />
            <span className="flex-1">Call us</span>
            <ArrowUpRight size={15} className="text-ink-muted" />
          </a>
          <Link
            href="/contact"
            className="flex items-center gap-3 rounded-xl bg-brand-800 px-3.5 py-3 text-sm text-white transition-colors hover:bg-brand-900"
          >
            <MessageCircle size={17} />
            <span className="flex-1">Full contact page</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close customer care" : "Open customer care"}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-coral-500 text-white shadow-lift transition-transform duration-200 hover:bg-coral-600 active:scale-95"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
