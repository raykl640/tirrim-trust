// @ts-check
import { defineConfig } from 'astro/config';

// Deployed to GitHub Pages as a project site: https://raykl640.github.io/tirrim-trust/
export default defineConfig({
  site: 'https://raykl640.github.io',
  base: '/tirrim-trust',
  trailingSlash: 'always',
  build: {
    // Small enough to inline: saves a render-blocking request per page.
    inlineStylesheets: 'always',
  },
  image: {
    responsiveStyles: false,
  },
  devToolbar: { enabled: false },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
