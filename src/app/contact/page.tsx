import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import ContactForm from "@/components/forms/ContactForm";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Nexlayer to discuss a project, ask about our services, or request support. We reply within one business day.",
  path: "/contact",
});

const contactPoints = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Studio",
    value: siteConfig.address,
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within one business day",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-16 sm:py-24">
          <Badge tone="coral" dot>
            Contact
          </Badge>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl">
            Tell us what you're building.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Whether it's a full product build, a stuck piece of
            infrastructure, or a question about scope — fill out the form
            and a member of our team will follow up directly, no sales
            funnel in between.
          </p>
        </Container>
      </section>

      <Container as="section" className="py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="lg:col-span-5">
            <Card className="h-full">
              <h2 className="font-display text-xl text-ink">
                Other ways to reach us
              </h2>
              <ul className="mt-6 space-y-5">
                {contactPoints.map(({ icon: PointIcon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                      <PointIcon size={16} />
                    </span>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="link-underline text-sm text-ink"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-ink">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-line pt-6">
                <p className="text-sm text-ink-soft">
                  Looking for general support instead of a new project? Use
                  the customer care button in the corner of any page for the
                  fastest response.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
