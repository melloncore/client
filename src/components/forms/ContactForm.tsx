"use client";

import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, Loader2, ArrowUpRight } from "lucide-react";
import { Input, TextArea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { sendContactMessage } from "@/lib/api";

type Status = "idle" | "submitting" | "success";

const budgets = [
  "Under $10k",
  "$10k – $50k",
  "$50k – $150k",
  "$150k+",
  "Not sure yet",
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const contactMutation = useMutation({ mutationFn: sendContactMessage });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      await contactMutation.mutateAsync({
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        company: String(form.get("company") ?? ""),
        budget: String(form.get("budget") ?? ""),
        message: String(form.get("message") ?? ""),
      });
      setStatus("success");
    } catch (cause) {
      setStatus("idle");
      setError(cause instanceof Error ? cause.message : "We couldn't send your message. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-line bg-surface px-6 py-16 text-center">
        <CheckCircle2 className="text-teal-500" size={40} />
        <h3 className="mt-4 font-display text-2xl text-ink">
          Message sent
        </h3>
        <p className="mt-2 max-w-sm text-sm text-ink-soft">
          Thanks for reaching out — a member of our team will reply within
          one business day.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
      noValidate
    >
      {error && (
        <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input label="Full name" htmlFor="name" name="name" required placeholder="Jordan Lee" />
        <Input
          label="Work email"
          htmlFor="email"
          name="email"
          type="email"
          required
          placeholder="jordan@company.com"
        />
        <Input
          label="Company"
          htmlFor="company"
          name="company"
          placeholder="Company name"
        />
        <div>
          <label htmlFor="budget" className="mb-2 block text-sm font-medium text-ink">
            Estimated budget
          </label>
          <select
            id="budget"
            name="budget"
            className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink transition-colors focus:border-brand-500"
            defaultValue=""
          >
            <option value="" disabled>
              Select a range
            </option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <TextArea
          label="Project details"
          htmlFor="message"
          name="message"
          required
          placeholder="Tell us what you're building, your timeline, and anything else that would help us prepare."
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-6 w-full sm:w-auto"
        icon={
          status === "submitting" ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <ArrowUpRight size={18} />
          )
        }
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
