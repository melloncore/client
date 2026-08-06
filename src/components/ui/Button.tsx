import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-coral-500 text-white hover:bg-coral-600 shadow-soft focus-visible:outline-brand-700",
  secondary:
    "bg-brand-700 text-white hover:bg-brand-800 shadow-soft",
  outline:
    "bg-transparent text-ink border border-ink/20 hover:border-ink/60",
  ghost: "bg-transparent text-ink hover:bg-brand-50",
};

const sizeStyles: Record<Size, string> = {
  sm: "text-sm px-4 py-2 gap-1.5",
  md: "text-sm px-5 py-3 gap-2",
  lg: "text-base px-7 py-4 gap-2.5",
};

const base =
  "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 active:scale-[0.98] whitespace-nowrap";

interface LinkButtonProps extends BaseProps {
  href: string;
  external?: boolean;
}

interface ClickButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

type ButtonProps = LinkButtonProps | ClickButtonProps;

/**
 * Shared CTA component used across every page (hero, service cards, footer,
 * contact form). Pass `href` to render a Next.js <Link>, omit it to render
 * a native <button> (e.g. inside a form).
 */
export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "right",
    className,
    children,
  } = props;

  const classes = cn(
    base,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && icon}
      <span>{children}</span>
      {icon && iconPosition === "right" && icon}
    </>
  );

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  const { href: _href, ...rest } = props as ClickButtonProps;
  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
