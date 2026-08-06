import { ArrowUpRight, ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <Badge tone="coral" dot>
        404
      </Badge>
      <h1 className="mt-6 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
        This page doesn't exist.
      </h1>
      <p className="mt-4 max-w-md text-base text-ink-soft">
        The page you're looking for may have moved or never existed. Try
        heading back home, or reach out if you think this is a mistake.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/" icon={<ArrowLeft size={16} />} iconPosition="left">
          Back to home
        </Button>
        <Button
          href="/contact"
          variant="outline"
          icon={<ArrowUpRight size={16} />}
        >
          Contact us
        </Button>
      </div>
    </Container>
  );
}
