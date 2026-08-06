import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "coral" | "teal" | "brand" | "neutral";

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  dot?: boolean;
  className?: string;
}

const toneStyles: Record<BadgeTone, string> = {
  coral: "bg-coral-50 text-coral-600",
  teal: "bg-teal-50 text-teal-700",
  brand: "bg-brand-50 text-brand-700",
  neutral: "bg-ink/5 text-ink-soft",
};

const dotStyles: Record<BadgeTone, string> = {
  coral: "bg-coral-500",
  teal: "bg-teal-500",
  brand: "bg-brand-500",
  neutral: "bg-ink-muted",
};

/**
 * Small color-coded label used across service cards, blog cards and the
 * hero. Centralizing the tone→color mapping here means every part of the
 * site that needs a "colored tag" reuses the exact same palette.
 */
export default function Badge({
  children,
  tone = "neutral",
  dot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono uppercase tracking-wider",
        toneStyles[tone],
        className
      )}
    >
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full", dotStyles[tone])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
