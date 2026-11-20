import { dict, type Locale } from "@/content/site";

export default function Principle({ locale }: { locale: Locale }) {
  const t = dict[locale].principle;
  const [first, ...rest] = t.a.split(" ");
  return (
    <section id="principle" data-scene="principle" className="relative z-10 grid min-h-dvh place-items-center px-5 text-center">
      <div>
        <p className="mb-6 text-[11px] text-muted">{t.eyebrow}</p>
        <h2 className="text-[clamp(2.6rem,9vw,8rem)] font-extralight leading-[1.02] tracking-[-0.04em]">
          <span className="text-[#a99cff]">{first}</span> {rest.join(" ")}<br /><span className="text-muted">{t.b}</span>
        </h2>
      </div>
    </section>
  );
}
