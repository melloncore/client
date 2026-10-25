# Mellon Strata Core — Company Portfolio Website

A modern, fully responsive company portfolio built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

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
4. Set `NEXT_PUBLIC_API_URL` (see `.env.example`) and configure the backend
   `CONTACT_TO_EMAIL` and Resend sender values. The contact form persists the
   inquiry and notifies the configured inbox.
5. Anonymous page views and click labels are recorded only after a visitor
   accepts analytics cookies.
6. Create and publish articles through the admin Blog page. Published posts and
   their 1–3 Cloudinary-hosted images are loaded from the backend; the client
   retains built-in articles as a fallback if the API is temporarily unavailable.

## Environment and API

Use `.env` for local development. Next.js automatically loads `.env.production`
for production builds; copy `.env.production.example` to that filename and set
`BACKEND_URL` to the backend origin. The browser uses the same-origin `/api/v1`
path in production, which is proxied by `next.config.mjs`.

The client runs at `http://localhost:3000`; admin and marketplace run at
`http://localhost:3001` and `http://localhost:3002`. All three use the
same-origin API proxy, so localhost cookies are shared across app ports.
The client and marketplace use the same analytics-consent cookie. In
production, set `NEXT_PUBLIC_COOKIE_DOMAIN` to the shared parent domain to
share that consent and the visitor cookie across app subdomains.

API request helpers are grouped in `src/lib/api/` by concern (`contact`,
`analytics`, and `landing`) with shared HTTP handling in `http.ts`. Components
use React Query mutations for form submissions, consent, and analytics events.
