type ClassValue = string | number | null | undefined | false;

/** Minimal className joiner — filters falsy values, no external dependency. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
