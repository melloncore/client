import Card from "@/components/ui/Card";
import type { TeamMember } from "@/types";

const avatarTones = [
  "bg-coral-100 text-coral-700",
  "bg-teal-100 text-teal-700",
  "bg-brand-100 text-brand-700",
];

export default function TeamGrid({ team }: { team: TeamMember[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((member, i) => (
        <Card key={member.name} hoverLift>
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full font-display text-sm ${
              avatarTones[i % avatarTones.length]
            }`}
          >
            {member.initials}
          </div>
          <h3 className="mt-4 font-display text-lg text-ink">
            {member.name}
          </h3>
          <p className="mt-0.5 text-sm font-medium text-coral-600">
            {member.role}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            {member.bio}
          </p>
        </Card>
      ))}
    </div>
  );
}
