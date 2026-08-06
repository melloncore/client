import type { ProcessStep } from "@/types";

export default function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => (
        <li key={step.step} className="bg-surface p-6 sm:p-7">
          <span className="font-mono text-sm text-coral-500">
            {step.step}
          </span>
          <h3 className="mt-3 font-display text-lg text-ink">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
