# The Tirrim Trust: website redesign

A redesign demo for [tirrim.org](https://www.tirrim.org), the Christian ministry of Africa Inland Church that serves the nomadic communities of Northern Kenya through outreach, education, water and development.

**Live demo:** https://raykl640.github.io/tirrim-trust/

The redesign keeps the Trust's identity (navy blue `#0553B1`, sky blue `#38B6FF`, red `#FF3131`, white, and Poppins) and every piece of its content, and rebuilds the experience around it.

## Design approach

**Colour.** The pages are mostly white, navy and sky blue. Red is the minority accent and has one clear job: it marks every Give action, plus the small triangle markers and scripture marks. Red buttons use dark navy text, so the brand red stays legible (WCAG AA).

*Tirrim* means "king post" or "cornerstone". The site is built like an editorial documentary rather than a template:

- **Typography leads.** Poppins (the existing brand face) for headlines and interface, set large and tight. Newsreader, a text serif, carries scripture, testimony and long-form copy.
- **Brand shapes, reused with intent.**
  - **Manyatta dome.** The dome of the hut in the Tirrim logo becomes the frame for key photographs.
  - **Cyan triangle.** The triangle from the original homepage becomes a wayfinding marker and the frame of the "Give" band.
  - **"We value" cross.** The cross diagram from the Education page is rebuilt in CSS.
- **The manyatta skyline.** The homepage opens on a row of dome-framed photographs standing on a cyan horizon, where the dusk sky meets the sand of the page below. Every inner page carries the same horizon.
- **Topography and sand.** A generated contour-line texture (abstract Kaisut terrain) runs behind dark and blue sections. A warm sand neutral sits alongside the brand blues and complements the desert photography.
- **Photography first.** The images come from the existing site, cropped, cleaned, and served responsively.
- **Motion with a purpose, at no JS cost.** Scroll-linked reveals and the "horizon" (a panorama opening from a thin line) use CSS scroll timelines. The reading-progress line in the header fills like water. Browsers without support, and visitors who prefer reduced motion, simply see the content.

## Quality-of-life features

- **Search (⌘K / Ctrl K, or `/`):** a keyboard-driven palette that jumps to any page, school, ministry or key section.
- **Quick give:** a slide-in panel opened by any "Give" button. You choose a project, one-time or monthly, and a currency-aware amount. It remembers your last choice, and in the demo it hands off to a pre-filled contact message.
- **Photo viewer:** every zoomable photo opens full-size, with arrow keys, swipe and a counter.
- **"On this page" bar:** sticky jump links on long pages that highlight the section you're reading.
- **Breadcrumbs,** with BreadcrumbList structured data for search engines.
- **"Next" links** that chain the ministries and the schools together.
- **Back to top,** with a ring that fills as you read, plus a reading-progress line in the header.
- **Smooth page transitions** (cross-document View Transitions, where supported).
- **Copy email** buttons with a confirmation toast, and friendly inline form validation.

## Performance

- Static HTML from [Astro](https://astro.build), with CSS and a few small scripts inlined per page. There is no framework runtime, and every feature above works with native `<dialog>` elements and plain DOM code.
- Every photo is served as responsive WebP with `srcset`/`sizes`, lazy-loaded below the fold, and has explicit dimensions (no layout shift).
- Self-hosted fonts with a metric-matched fallback; the fonts the first screen needs are preloaded.
- Lighthouse, mobile preset (local production build): Performance 96–99, Accessibility 100, Best Practices 100, SEO 100.

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
  generate-topo.mjs  Builds the contour texture (marching squares on an elevation field)
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
- Quick give hands off to a pre-filled contact message until a payment provider is chosen.
- The Stories page on the current site is "under construction" and has been left out.

## Content and credits

All text, photography and logos belong to The Tirrim Trust and the respective partner organisations, and are used here only to demonstrate the redesign.
