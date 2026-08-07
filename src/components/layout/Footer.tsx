import Link from "next/link";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "./Logo";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-brand-900 text-white">
      <Container className="py-14 sm:py-20">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-2">
            <Logo onDark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-200">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <SocialLink
                href={siteConfig.social.twitter}
                label="Twitter"
                Icon={Twitter}
              />
              <SocialLink
                href={siteConfig.social.linkedin}
                label="LinkedIn"
                Icon={Linkedin}
              />
              <SocialLink
                href={siteConfig.social.github}
                label="GitHub"
                Icon={Github}
              />
              <SocialLink
                href={`mailto:${siteConfig.email}`}
                label="Email"
                Icon={Mail}
              />
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-brand-300">
              Company
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/services">Services</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-brand-300">
              Services
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {services.slice(0, 4).map((service) => (
                <FooterLink
                  key={service.slug}
                  href={`/services/${service.slug}`}
                >
                  {service.title}
                </FooterLink>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-brand-300">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-200">
              <li>{siteConfig.address}</li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                  className="link-underline"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="link-underline"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-brand-300">
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-brand-300">
            
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link href={href} className="link-underline text-brand-200 hover:text-white">
        {children}
      </Link>
    </li>
  );
}

function SocialLink({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: typeof Twitter;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-coral-500"
    >
      <Icon size={16} />
    </a>
  );
}
