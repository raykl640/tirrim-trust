#!/usr/bin/env node
// Pulls photography and logos out of the captured screenshots of the current
// tirrim.org site. Coordinates are in full-resolution (1440px wide) pixels.
//
//   SCREENSHOTS=~/Pictures/tirrim-screenshots npm run assets:extract
//
// Requires ImageMagick 7 (`magick`) on the PATH. Output is committed, so this
// only needs re-running if the source captures change.

import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const SRC = process.env.SCREENSHOTS ?? join(homedir(), 'Pictures/tirrim-screenshots');
const OUT = new URL('../src/assets/photos/', import.meta.url).pathname;
const BRAND = new URL('../src/assets/brand/', import.meta.url).pathname;

const full = (page) => join(SRC, page, `${page}_full_desktop.png`);
const el = (page, file) => join(SRC, page, 'elements', file);

// [output name, source file, geometry ("WxH+X+Y") or null for whole file, trim]
// `trim` is true to trim against the corner colour, or a colour to trim against
// when the margin doesn't wrap all four sides.
const SKY = '#8EB6DC';
const BLUE = '#1470AF';

const photos = [
  // Home / education
  ['school-gate', full('primary'), '1440x684+0+760'],
  ['assembly-flag', full('education'), '1352x600+44+892'],
  ['literacy-celebration', el('adult-literacy', '008_section_7.png'), null, true],

  // Who we are / vision
  ['desert-road', full('who-are-we'), '658x880+44+690'],
  ['elders-hands', full('who-are-we'), '542x468+854+1248'],
  ['teacher-field', full('who-are-we'), '608x456+788+1926'],
  ['korr-mountain', full('our-vision'), '1440x340+0+115'],
  ['korr-town', full('our-vision'), '1440x360+0+540'],

  // Development
  ['dev-horizon', full('development'), '1440x380+0+100'],
  ['dev-aerial', full('development'), '1440x340+0+560'],
  ['dev-building', full('development'), '676x708+44+1146'],
  ['dev-food', full('development'), '676x732+720+1958'],
  ['dev-emergency', full('development'), '676x710+44+2726'],
  ['dev-scholarship', full('development'), '676x710+720+3470'],

  // Outreach
  ['outreach-night', full('outreach'), '1352x472+44+384'],
  ['outreach-training', el('outreach', '007_block_3.png'), null, true],
  ['outreach-classroom', el('outreach', '009_block_5.png'), null, true],
  ['outreach-film', el('outreach', '010_block_6.png'), null, true],
  ['outreach-audio-bible', el('outreach', '012_block_8.png'), null, true],
  ['outreach-scripture', el('outreach', '014_block_10.png'), null, true],

  // Water
  ['water-jerrycans', full('water'), '446x832+274+2124'],
  ['water-drilling', full('water'), '446x780+720+3058'],

  // Adult literacy
  ['literacy-certificate', el('adult-literacy', '014_block_6.png'), null, true],
  ['literacy-handover', el('adult-literacy', '016_block_8.png'), null, true],
  ['literacy-tree-class', el('adult-literacy', '017_block_9.png'), '660x632+0+0', true],
  ['literacy-mothers', el('adult-literacy', '011_block_3.png'), '700x712+688+0', true],

  // Giving
  ['rendille-portrait', el('giving', '005_block_2.png'), null, SKY],
  ['classroom-girl', el('giving', '008_block_5.png'), null, SKY],
  ['school-buildings', el('giving', '011_block_8.png'), null, SKY],

  // Schools
  ['nursery-class', el('nursery', '007_block_3.png'), '640x407+748+0', true],
  ['primary-lab', full('primary'), '676x632+44+1542'],
  ['primary-hall', full('primary'), '676x532+720+2364'],
  ['primary-boys', full('primary'), '608x684+44+3086'],
  ['jhs-computers', full('junior-high-school'), '1352x900+44+996'],
  ['jhs-science', full('junior-high-school'), '1352x898+44+2054'],
  ['secondary-campus', full('secondary'), '1440x400+0+100'],
  ['secondary-study', el('secondary', '010_block_3.png'), null, SKY],
  ['secondary-play', el('secondary', '012_block_5.png'), null, SKY],
  ['secondary-grow', el('secondary', '014_block_7.png'), null, SKY],
  ['secondary-acacia', el('secondary', '016_block_9.png'), '644x458+744+0', BLUE],
];

// Partner logos sit on white tiles, so keep them as lossless PNG.
const partners = [
  ['genesis-waters', '014_block_9.png'],
  ['africa-inland-mission', '015_block_10.png'],
  ['cornerstone-church', '016_block_11.png'],
  ['samaritans-purse', '017_block_12.png'],
  ['for-the-childrens-sake', '018_block_13.png'],
  ['audio-scripture', '019_block_14.png'],
  ['kamminga-roodvoets', '020_block_15.png'],
  ['glory-bee', '021_block_16.png'],
];

const magick = (args) => execFileSync('magick', args, { stdio: 'inherit' });

mkdirSync(OUT, { recursive: true });
mkdirSync(join(BRAND, 'partners'), { recursive: true });

for (const [name, src, geometry, trim] of photos) {
  const args = [src];
  if (geometry) args.push('-crop', geometry, '+repage');
  // Element captures carry a margin of page background (white or sky blue);
  // trim against the corner colour, then shave any anti-aliased edge.
  if (typeof trim === 'string') args.push('-shave', '3x3', '-bordercolor', trim, '-border', '1');
  if (trim) args.push('-fuzz', '10%', '-trim', '+repage', '-shave', '2x2');
  args.push('-strip', '-quality', '92', join(OUT, `${name}.jpg`));
  magick(args);
  console.log('photo  ', name);
}

for (const [name, file] of partners) {
  magick([el('who-are-we', file), '-fuzz', '4%', '-trim', '+repage', '-strip', join(BRAND, 'partners', `${name}.png`)]);
  console.log('partner', name);
}

// Logo source for scripts/trace-logo.mjs: the large mark on the Education hero.
magick([full('education'), '-crop', '520x390+460+222', '+repage', join(BRAND, 'logo-source.png')]);
// Africa Inland Church seal from the footer.
magick([full('index'), '-crop', '112x112+664+4583', '+repage', '-strip', join(BRAND, 'aic-seal.png')]);
console.log('brand   logo-source, aic-seal');
