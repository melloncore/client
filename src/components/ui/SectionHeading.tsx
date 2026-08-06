import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Badge, { type BadgeTone } from "./Badge";

interface SectionHeadingProps {
  eyebrow?: string;
  eyebrowTone?: BadgeTone;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

/** Consistent eyebrow + title + description block reused on every page/section. */
export default function SectionHeading({
  eyebrow,
  eyebrowTone = "coral",
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Badge tone={eyebrowTone} dot className="mb-4">
          {eyebrow}
        </Badge>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-medium leading-[1.1] tracking-tight text-ink">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
