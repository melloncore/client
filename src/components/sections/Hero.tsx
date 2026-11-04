import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { items, stats } from "@/lib/data";
import FloatingField from "../ui/FloatingField";


  
export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-lines opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
        style={{ backgroundSize: "48px 48px" }}
      />

      <Container className="relative grid grid-cols-1 gap-14 pb-16 pt-14 sm:pb-24 sm:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-24">
        <div className="order-2 lg:order-none lg:col-span-7">
          <Badge tone="coral" dot className="animate-fade-up">
            Product engineering studio
          </Badge>

          <h1
            className="mt-6 max-w-xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            We build the systems that run underneath{" "}
            <span className="text-coral-500">good products.</span>
          </h1>

          <p
            className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            Mellon Strata Core designs and ships web platforms, cloud infrastructure
            and AI-driven features for teams who need software that holds up
            after launch, not just at the demo.
          </p>

          <div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <Button href="/contact" size="lg" icon={<ArrowUpRight size={18} />}>
              Start a project
            </Button>
            <Button href="/services" variant="outline" size="lg">
              Explore services
            </Button>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4 sm:gap-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-display text-2xl text-ink sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-1 lg:order-none lg:col-span-5">
          <FloatingField items={items} />
        </div>
      </Container>
    </section>
  );
}
