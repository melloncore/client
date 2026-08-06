import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { stats } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-lines opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
        style={{ backgroundSize: "48px 48px" }}
      />

      <Container className="relative grid grid-cols-1 gap-14 pb-16 pt-14 sm:pb-24 sm:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-24">
        <div className="lg:col-span-7">
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
            Nexlayer designs and ships web platforms, cloud infrastructure
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

        <div className="lg:col-span-5">
          <SystemPanel />
        </div>
      </Container>
    </section>
  );
}

/** Signature hero visual: a small "system status" panel evoking the
 *  circuit-board / schematic language of the rest of the site. */
function SystemPanel() {
  const nodes = [
    { label: "Frontend", tone: "coral" as const },
    { label: "API layer", tone: "brand" as const },
    { label: "Cloud infra", tone: "teal" as const },
    { label: "AI services", tone: "coral" as const },
  ];

  return (
    <div className="relative mx-auto max-w-sm rounded-3xl border border-line bg-surface p-6 shadow-lift sm:p-7 animate-float">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
          system.status
        </span>
        <span className="flex items-center gap-1.5 font-mono text-xs text-teal-600">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse-dot" />
          all systems live
        </span>
      </div>

      <ul className="mt-5 space-y-3">
        {nodes.map((node, i) => (
          <li
            key={node.label}
            className="flex items-center justify-between rounded-xl border border-line px-4 py-3"
          >
            <span className="flex items-center gap-3 text-sm text-ink">
              <span
                className={`h-2 w-2 rounded-full ${
                  node.tone === "coral"
                    ? "bg-coral-500"
                    : node.tone === "teal"
                    ? "bg-teal-500"
                    : "bg-brand-500"
                }`}
              />
              {node.label}
            </span>
            <span className="font-mono text-xs text-ink-muted">
              {(98 + i * 0.4).toFixed(1)}%
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5 rounded-xl bg-brand-900 p-4">
        <p className="font-mono text-[11px] leading-relaxed text-teal-300">
          <span className="text-coral-400">$</span> deploy --env production
          <br />
          <span className="text-brand-300">✓</span> build passed · shipped in
          2m 14s
        </p>
      </div>
    </div>
  );
}
