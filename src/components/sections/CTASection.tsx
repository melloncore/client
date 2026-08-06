import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTASection({
  eyebrow = "Let's talk",
  title,
  description,
  primaryLabel = "Start a project",
  primaryHref = "/contact",
  secondaryLabel = "View services",
  secondaryHref = "/services",
}: CTASectionProps) {
  return (
    <section className="bg-brand-900">
      <Container className="py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-brand-800 px-6 py-14 text-center sm:px-16 sm:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
            aria-hidden="true"
          />
          <p className="relative font-mono text-xs uppercase tracking-wider text-coral-300">
            {eyebrow}
          </p>
          <h2 className="relative mt-4 font-display text-3xl font-medium leading-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-brand-200">
            {description}
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              href={primaryHref}
              size="lg"
              icon={<ArrowUpRight size={18} />}
            >
              {primaryLabel}
            </Button>
            <Button
              href={secondaryHref}
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10"
            >
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
