# Nexlayer — Company Portfolio Website

A modern, fully responsive company portfolio built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Pages & routes

| Page          | Route                     |
|---------------|----------------------------|
| Home          | `/`                        |
| About         | `/about`                   |
| Services      | `/services`                |
| Service detail| `/services/[slug]`         |
| Blog          | `/blog`                    |
| Blog article  | `/blog/[slug]`             |
| Contact       | `/contact`                 |
| Sitemap       | `/sitemap.xml` (auto-generated) |
| Robots        | `/robots.txt` (auto-generated) |
| 404           | any unmatched route        |

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

To build for production:

```bash
npm run build
npm run start
```

## Project structure

```
src/
  app/                  Route segments (App Router) — one folder per page, each with its own metadata
  components/
    ui/                 Reusable primitives: Button, Card, Badge, Input, Container, SectionHeading, Icon
    layout/              Header, Footer, Logo, FloatingSupportButton (site-wide, used in app/layout.tsx)
    sections/            Page sections built from ui/ primitives: Hero, ServicesGrid, ProcessSteps,
                          Testimonials, TeamGrid, BlogGrid, CTASection
    forms/               ContactForm (client component)
  lib/
    theme.ts             Central color tokens (mirrors tailwind.config.ts) for any JS/inline-style use
    site-config.ts        Company info, nav links, social links — referenced by Header/Footer/SEO
    seo.ts               buildMetadata() — one function every page calls for consistent SEO tags
    data.ts               All content: services, team, testimonials, blog posts, process steps
    cn.ts                 Small classNames helper
  types/                  Shared TypeScript interfaces
```

## Design system

- **Colors** live in `tailwind.config.ts` (`brand`, `coral`, `teal` scales) and are mirrored in
  `src/lib/theme.ts` for any place that needs a raw hex value. The `Badge` component is the main
  reusable "color" component — pass a `tone` prop (`coral | teal | brand | neutral`) and every
  label across the site stays consistent.
- **Typography** uses a display/body/mono system defined as CSS variables in `globals.css`
  (`--font-display`, `--font-body`, `--font-mono`) — safe system-font fallbacks, no external font
  fetch required at build time. Swap in real webfonts by loading them however your hosting setup
  prefers and pointing those variables at them.

## SEO

Every route exports its own `metadata` (or `generateMetadata` for dynamic routes) built through
`buildMetadata()` in `src/lib/seo.ts`, which sets: title, description, canonical URL, Open Graph
tags, and Twitter Card tags. `sitemap.ts` and `robots.ts` generate `/sitemap.xml` and
`/robots.txt` automatically from the same content data, so new services/posts are picked up
without extra work. `layout.tsx` also injects `Organization` JSON-LD structured data.

## Floating customer care button

`src/components/layout/FloatingSupportButton.tsx` is mounted once in the root layout, so it
appears on every page. It expands into a small panel with email, phone, and a link to the full
Contact page.

## Mobile-first & responsive

All layout is built mobile-first with Tailwind's responsive prefixes (`sm:`, `lg:`), the nav
collapses into a full-screen mobile menu below the `lg` breakpoint, grids collapse from 3/4
columns down to 1 column on small screens, and touch targets (buttons, nav links, the floating
button) are sized for touch. Reduced-motion preferences are respected in `globals.css`.

## Before going live

1. Replace placeholder content in `src/lib/data.ts` and `src/lib/site-config.ts` with real company
   info, services, team, and blog content.
2. Update `siteConfig.url` in `site-config.ts` to your real domain (used for canonical URLs, the
   sitemap, and Open Graph tags).
3. Add a real `/public/og-image.png` (1200×630) for social sharing previews.
4. Wire `ContactForm`'s `handleSubmit` up to a real API route or form-handling service.
5. Swap the placeholder blog article body in `blog/[slug]/page.tsx` for real Markdown/MDX or CMS
   content.
