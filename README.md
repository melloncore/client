# Meridian site (Next.js 15 + TypeScript + Tailwind)

    npm install
    npm run dev      # http://localhost:3000 -> /en

How it works
- One fixed canvas (`ParticleStage.tsx`) morphs ~6,000 particles between "scenes" as you scroll.
- Each page section declares `data-scene="..."`; pinned sections get `data-step` from `useStep()`.
- A child with `data-anchor` tells the canvas where to draw (so layout stays responsive).
- Scenes (shapes, colors, sizes) live in `src/lib/scenes.ts`.
- Brand, products, offices and all copy (EN/ES) live in `src/content/site.ts`.
- Contact form posts to `src/app/api/contact/route.ts` (add your email provider there).
