import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import TeamGrid from "@/components/sections/TeamGrid";
import CTASection from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";
import { team, values, stats } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "About Mellon Core",
  description:
    "Mellon Core is a product engineering studio founded by former in-house engineering leads. Learn about our story, values and the team behind the work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-16 sm:py-24">
          <Badge tone="brand" dot>
            About Mellon Core
          </Badge>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Started by engineers who were tired of hand-offs that lost
            context.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Mellon Core was founded in 2018 by two engineering leads who kept
            watching good projects stall between agencies, freelancers and
            in-house teams that never talked to each other. We built the
            studio we wished we could have hired: one team, accountable end
            to end, from architecture through to the system running in
            production.
          </p>
        </Container>
      </section>

      <Container as="section" className="py-16 sm:py-24">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-l-2 border-coral-500 pl-4">
              <p className="font-display text-3xl text-ink sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>

      <div className="border-y border-line bg-surface">
        <Container as="section" className="py-16 sm:py-24">
          <SectionHeading
            eyebrow="Our values"
            eyebrowTone="teal"
            title="What we optimize for on every engagement"
            description="These aren't framed on a wall — they're the things we actually check for in a project retro."
          />
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
            {values.map((value, i) => (
              <div key={value.title} className="flex gap-4">
                <span className="font-mono text-sm text-coral-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <Container as="section" className="py-16 sm:py-24">
        <SectionHeading
          eyebrow="The team"
          title="A small team of senior practitioners"
          description="No layers of account managers between you and the people writing the code."
        />
        <div className="mt-12">
          <TeamGrid team={team} />
        </div>
      </Container>

      <CTASection
        eyebrow="Work with us"
        title="Curious if we're the right fit?"
        description="A 20-minute call is usually enough to tell. No proposal required to have that conversation."
        primaryLabel="Book an intro call"
      />
    </>
  );
}
