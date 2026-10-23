# The Tirrim Trust: website redesign

A redesign demo for [tirrim.org](https://www.tirrim.org), the Christian ministry of Africa Inland Church that serves the nomadic communities of Northern Kenya through outreach, education, water and development.

**Live demo:** https://raykl640.github.io/tirrim-trust/

The redesign keeps the Trust's identity (the blue `#1470AF`, the cyan `#01B5EF`, sky `#8EB6DC`, black, white, and Poppins) and every piece of its content, and rebuilds the experience around it.

## Design approach

*Tirrim* means "king post" or "cornerstone". The site is built like an editorial documentary rather than a template:

- **Typography leads.** Poppins (the existing brand face) for headlines and interface, set large and tight. Newsreader, a text serif, carries scripture, testimony and long-form copy.
- **Brand shapes, reused with intent.**
  - **Manyatta dome.** The dome of the hut in the Tirrim logo becomes the frame for key photographs.
  - **Cyan triangle.** The triangle from the original homepage becomes a wayfinding marker and the frame of the "Give" band.
  - **"We value" cross.** The cross diagram from the Education page is rebuilt in CSS.
- **Photography first.** The images come from the existing site, cropped, cleaned, and served responsively.
- **Motion with a purpose, at no JS cost.** Scroll-linked reveals and the "horizon" (a panorama opening from a thin line) use CSS scroll timelines. The reading-progress line in the header fills like water. Browsers without support, and visitors who prefer reduced motion, simply see the content.

## Performance

- Static HTML from [Astro](https://astro.build), with CSS inlined per page and about 2.5 KB of JavaScript in total (header, mobile menu, hover preview, carousel buttons).
- Every photo is served as responsive WebP with `srcset`/`sizes`, lazy-loaded below the fold, and has explicit dimensions (no layout shift).
- Self-hosted fonts with a metric-matched fallback; the fonts the first screen needs are preloaded.
- Lighthouse, mobile preset (local production build): Performance 97–100, Accessibility 100, Best Practices 100, SEO 100.

## Project structure

```
src/
  assets/
    photos/          Photography extracted from the current site (JPEG masters)
    brand/           Traced logo (SVG), AIC seal, partner logos
  components/        Header, Footer, PageHero, Feature, Scripture, GiveBand, …
  data/              Site navigation, photo registry (with alt text), school content
  layouts/           Base HTML layout
  pages/             One file per route; /education/[slug] renders each school
  styles/global.css  Design tokens, type scale, layout primitives, motion
scripts/
  extract-assets.mjs Crops photos and logos out of the original site captures
  trace-logo.mjs     Vectorises the Tirrim mark into a single-colour SVG
.github/workflows/   Build and deploy to GitHub Pages on every push to main
```

## Running locally

Requires Node 22.23 or newer (Node 24 recommended).

```sh
npm install
npm run dev       # http://localhost:4321/tirrim-trust/
npm run build     # production build in dist/
npm run preview   # serve the production build
```

The extracted assets are committed. To regenerate them from the original screenshots (needs ImageMagick 7):

```sh
SCREENSHOTS=~/Pictures/tirrim-screenshots npm run assets:extract
node scripts/trace-logo.mjs
```

## Demo limitations

- The newsletter and contact forms don't send anything yet; they confirm on screen and say so.
- The "Give" buttons point to the contact page until a payment provider is chosen.
- The Stories page on the current site is "under construction" and has been left out.

## Content and credits

All text, photography and logos belong to The Tirrim Trust and the respective partner organisations, and are used here only to demonstrate the redesign.
