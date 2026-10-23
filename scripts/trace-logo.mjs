#!/usr/bin/env node
// Vectorises the Tirrim Trust mark from src/assets/brand/logo-source.png (the
// large logo on the Education hero, dark ink on sky) into a single-colour SVG
// that inherits `currentColor`, so the same file works on light and dark.

import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import potrace from 'potrace';

const SRC = new URL('../src/assets/brand/logo-source.png', import.meta.url).pathname;
const OUT = new URL('../src/assets/brand/logo.svg', import.meta.url).pathname;
const MASK = new URL('../src/assets/brand/.logo-mask.png', import.meta.url).pathname;

// Upscale before thresholding so the traced curves come out smooth.
execFileSync('magick', [
  SRC, '-colorspace', 'Gray', '-resize', '400%', '-blur', '0x1.2',
  '-threshold', '38%', '-morphology', 'Open', 'Disk:1.5', MASK,
]);

potrace.trace(MASK, { threshold: 128, turdSize: 60, optTolerance: 0.4, color: 'currentColor' }, (err, svg) => {
  if (err) throw err;
  const tidy = svg
    .replace(/ width="\d+" height="\d+"/, '')
    .replace(/ version="1.1"/, ' role="img" aria-label="The Tirrim Trust"')
    // Sub-pixel precision is invisible at 4x scale; integers halve the size.
    .replace(/\d+\.\d+/g, (n) => String(Math.round(Number(n))))
    .replace(/\s*\n\s*/g, '');
  writeFileSync(OUT, tidy);
  console.log('wrote', OUT, `${(tidy.length / 1024).toFixed(1)} KB`);
});
