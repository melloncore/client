"use client";
import { dict, type Locale } from "@/content/site";
import { useSendContactMessage } from "@/hooks/api";

export default function ContactForm({ locale }: { locale: Locale }) {
  const t = dict[locale].contact;
  const send = useSendContactMessage();
  const state = send.isPending ? "sending" : send.isSuccess ? "sent" : send.isError ? "error" : "idle";

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    // The API takes name/email/company/message; keep job title + phone in the message so nothing is lost.
    const extras = [v("job") && `Job title: ${v("job")}`, v("phone") && `Phone: ${v("phone")}`, `Site language: ${locale}`]
      .filter(Boolean)
      .join("\n");
    send.mutate(
      { name: `${v("first")} ${v("last")}`.trim(), email: v("email"), company: v("company"), message: `${v("message")}\n\n—\n${extras}` },
      { onSuccess: () => form.reset() },
    );
  }

  const field = "mt-1 w-full rounded-lg border border-[#d9dcea] bg-white px-3 py-2.5 text-sm text-[#10142e] placeholder:text-[#9aa0bd] focus:border-[#5b4bff]";
  const label = "block text-xs font-medium text-[#10142e]";
  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white p-5 text-[#10142e] shadow-2xl sm:p-8">
      <h3 className="text-xl font-medium">{t.formTitle}</h3>
      <p className="mb-5 mt-1 text-sm text-[#5a6082]">{t.formText}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={label}>{t.first} *<input required name="first" autoComplete="given-name" className={field} /></label>
        <label className={label}>{t.last} *<input required name="last" autoComplete="family-name" className={field} /></label>
        <label className={label}>{t.email} *<input required type="email" name="email" autoComplete="email" className={field} /></label>
        <label className={label}>{t.company} *<input required name="company" autoComplete="organization" className={field} /></label>
        <label className={label}>{t.job} *<input required name="job" autoComplete="organization-title" className={field} /></label>
        <label className={label}>{t.phone}<input type="tel" name="phone" autoComplete="tel" className={field} /></label>
        <label className={`${label} sm:col-span-2`}>{t.message} *<textarea required name="message" rows={4} className={field} /></label>
      </div>
      <button disabled={state === "sending"} className="mt-5 w-full rounded-full bg-[#10142e] px-6 py-3 text-sm font-medium text-white disabled:opacity-60 sm:w-auto">
        {state === "sending" ? t.sending : t.send}
      </button>
      <p role="status" className={`mt-3 text-sm ${state === "error" ? "text-red-600" : "text-[#2a8a5a]"}`}>{state === "sent" ? t.sent : state === "error" ? t.error : ""}</p>
    </form>
  );
}
