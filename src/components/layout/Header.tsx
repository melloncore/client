"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Logo from "./Logo";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/cn";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <Container className="flex h-16 sm:h-20 items-center justify-between">
        <Logo />

        <nav
          className="hidden lg:flex items-center gap-8"
          aria-label="Primary"
        >
          {siteConfig.nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "link-underline text-sm font-medium transition-colors",
                  active ? "text-ink" : "text-ink-soft hover:text-ink"
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" size="sm" icon={<ArrowUpRight size={16} />}>
            Start a project
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 z-40 bg-paper transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full pointer-events-none"
        )}
      >
        <Container className="flex h-full flex-col justify-between py-8">
          <nav
            className="flex flex-col gap-1"
            aria-label="Mobile"
          >
            {siteConfig.nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between border-b border-line py-4 font-display text-2xl",
                    active ? "text-coral-500" : "text-ink"
                  )}
                >
                  {item.label}
                  <ArrowUpRight size={20} className="text-ink-muted" />
                </Link>
              );
            })}
          </nav>
          <Button href="/contact" size="lg" className="w-full">
            Start a project
          </Button>
        </Container>
      </div>
    </header>
  );
}
