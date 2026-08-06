import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

interface LogoProps {
  onDark?: boolean;
}

/** Shared wordmark used in the header and footer. */
export default function Logo({ onDark = false }: LogoProps) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 font-display text-xl font-medium tracking-tight"
      aria-label={`${siteConfig.name} — home`}
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold ${
          onDark ? "bg-coral-500 text-white" : "bg-brand-800 text-white"
        }`}
      >
        N
      </span>
      <span className={onDark ? "text-white" : "text-ink"}>
        {siteConfig.name}
      </span>
    </Link>
  );
}
