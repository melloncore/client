export const siteConfig = {
  name: "Mellon Core",
  legalName: "Mellon Core Technologies Ltd.",
  tagline: "Software, cloud & AI systems built to hold up.",
  description:
    "Mellon Core is a product engineering studio that designs, builds and scales web platforms, cloud infrastructure and AI-driven systems for growing companies.",
  url: "https://www.melloncore.example",
  ogImage: "/og-image.png",
  email: "hello@melloncore.example",
  supportEmail: "support@melloncore.example",
  phone: "+1 (555) 019-2044",
  address: "148 Harbourview Lane, Suite 4B, Austin, TX 78701",
  social: {
    twitter: "https://twitter.com/melloncore",
    linkedin: "https://linkedin.com/company/melloncore",
    github: "https://github.com/melloncore",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
