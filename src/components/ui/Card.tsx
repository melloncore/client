import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverLift?: boolean;
}

/** Base surface used for service cards, blog cards, testimonials, team cards. */
export default function Card({
  children,
  hoverLift = false,
  className,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-surface p-6 sm:p-7",
        hoverLift &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:border-transparent",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
