#!/usr/bin/env node
// Generates the contour-line texture (src/assets/brand/topo.svg): abstract
// Kaisut Desert topography used behind dark and sand sections.
// An elevation field is built from a few hills plus gentle undulation, and
// iso-lines are traced with marching squares, so contours never cross.
// Deterministic: re-running produces the same file.

import { writeFileSync } from 'node:fs';

const W = 1600, H = 1000, CELL = 10;
const cols = W / CELL + 1, rows = H / CELL + 1;

const hills = [
  [250, 280, 1.0, 230], [1180, 210, 0.85, 260], [820, 840, 1.1, 300],
  [1560, 880, 0.7, 220], [-60, 980, 0.6, 260], [560, 120, -0.45, 200], [1320, 620, -0.4, 180],
];
const height = (x, y) => {
  let v = 0;
  for (const [hx, hy, a, s] of hills) v += a * Math.exp(-((x - hx) ** 2 + (y - hy) ** 2) / (2 * s * s));
  return v + 0.08 * Math.sin(x / 210 + y / 330) + 0.05 * Math.sin(x / 97 - y / 150) + 0.03 * Math.cos(y / 61);
};

const field = Array.from({ length: rows }, (_, j) => Array.from({ length: cols }, (_, i) => height(i * CELL, j * CELL)));
const flat = field.flat();
const min = Math.min(...flat), max = Math.max(...flat);
const LEVELS = 22;

const lerp = (a, b, t) => a + (b - a) * t;
const paths = [];

for (let k = 1; k < LEVELS; k++) {
  const level = lerp(min, max, k / LEVELS);
  const point = new Map(); // edge key -> [x, y]
  const adj = new Map(); // edge key -> [edge keys]
  const edge = (i, j, dir) => {
    const key = `${dir}${i},${j}`;
    if (!point.has(key)) {
      const [a, b, ax, ay, bx, by] = dir === 'h'
        ? [field[j][i], field[j][i + 1], i, j, i + 1, j]
        : [field[j][i], field[j + 1][i], i, j, i, j + 1];
      const t = (level - a) / (b - a);
      point.set(key, [lerp(ax, bx, t) * CELL, lerp(ay, by, t) * CELL]);
    }
    return key;
  };
  const link = (a, b) => {
    (adj.get(a) ?? adj.set(a, []).get(a)).push(b);
    (adj.get(b) ?? adj.set(b, []).get(b)).push(a);
  };
  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols - 1; i++) {
      const c = [field[j][i], field[j][i + 1], field[j + 1][i + 1], field[j + 1][i]].map((v) => (v > level ? 1 : 0));
      const idx = c[0] * 8 + c[1] * 4 + c[2] * 2 + c[3];
      if (idx === 0 || idx === 15) continue;
      const T = () => edge(i, j, 'h'), R = () => edge(i + 1, j, 'v'), B = () => edge(i, j + 1, 'h'), L = () => edge(i, j, 'v');
      const segs = {
        1: [[L, B]], 2: [[B, R]], 3: [[L, R]], 4: [[T, R]], 5: [[T, L], [B, R]], 6: [[T, B]], 7: [[T, L]],
        8: [[T, L]], 9: [[T, B]], 10: [[T, R], [L, B]], 11: [[T, R]], 12: [[L, R]], 13: [[B, R]], 14: [[L, B]],
      }[idx];
      for (const [a, b] of segs) link(a(), b());
    }
  }
  // Stitch segments into polylines, starting from open ends first.
  const seen = new Set();
  const starts = [...adj.keys()].sort((a, b) => adj.get(a).length - adj.get(b).length);
  for (const start of starts) {
    if (seen.has(start)) continue;
    const line = [start];
    seen.add(start);
    let cur = start;
    for (;;) {
      const next = adj.get(cur).find((n) => !seen.has(n));
      if (!next) break;
      seen.add(next);
      line.push(next);
      cur = next;
    }
    if (line.length < 6) continue;
    let pts = line.map((key) => point.get(key));
    // Chaikin smoothing softens the grid steps.
    for (let n = 0; n < 2; n++) {
      const out = [pts[0]];
      for (let p = 0; p < pts.length - 1; p++) {
        const [a, b] = [pts[p], pts[p + 1]];
        out.push([a[0] * 0.75 + b[0] * 0.25, a[1] * 0.75 + b[1] * 0.25], [a[0] * 0.25 + b[0] * 0.75, a[1] * 0.25 + b[1] * 0.75]);
      }
      out.push(pts.at(-1));
      pts = out;
    }
    // Thin out points that add nothing at this scale.
    const kept = pts.filter((_, n) => n % 4 === 0 || n === pts.length - 1);
    paths.push('M' + kept.map(([x, y]) => `${Math.round(x)} ${Math.round(y)}`).join('L'));
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"><path fill="none" stroke="#000" stroke-width="1" stroke-linejoin="round" d="${paths.join('')}"/></svg>`;
writeFileSync(new URL('../src/assets/brand/topo.svg', import.meta.url), svg);
console.log(`topo.svg: ${paths.length} lines, ${(svg.length / 1024).toFixed(1)} KB`);
