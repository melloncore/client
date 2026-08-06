import { Quote } from "lucide-react";
import Card from "@/components/ui/Card";
import type { Testimonial } from "@/types";

export default function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {testimonials.map((t) => (
        <Card key={t.name} className="flex h-full flex-col">
          <Quote className="text-coral-400" size={22} />
          <p className="mt-4 flex-1 text-sm leading-relaxed text-ink">
            “{t.quote}”
          </p>
          <div className="mt-6 border-t border-line pt-4">
            <p className="text-sm font-medium text-ink">{t.name}</p>
            <p className="text-xs text-ink-muted">
              {t.role}, {t.company}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
