import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.jpg', { eager: true });

const alts = {
  'school-gate': 'Pupils in blue uniforms walking out through the gate of Tirrim Primary and Junior Secondary School',
  'assembly-flag': 'Students gathered around the flag circle, painted in the colours of Kenya, at morning assembly',
  'literacy-celebration': 'Graduates and teachers raising their arms in celebration at an adult literacy ceremony',
  'desert-road': 'A dirt track running straight across the flat, dry Kaisut Desert',
  'elders-hands': 'Rendille elders in bright shukas talking together in Korr',
  'teacher-field': 'A teacher pointing towards the horizon as students sit on the ground outdoors',
  'korr-mountain': 'The plain around Korr with a lone mountain on the horizon',
  'korr-town': 'Aerial view of Korr: tin-roofed buildings and traditional huts among acacia scrub',
  'dev-horizon': 'Haze over the red earth and settlements of the Korr area',
  'dev-aerial': 'Aerial view of red desert earth and tracks near Korr',
  'dev-building': 'A newly built staff house of concrete block with a blue door and veranda',
  'dev-food': 'Rendille children drinking from enamel mugs during a food distribution',
  'dev-emergency': 'The Tirrim emergency vehicle parked at dusk under a full moon',
  'dev-scholarship': 'A scholarship graduate in cap and gown speaking at a graduation ceremony',
  'outreach-night': 'The outreach vehicle with a projector screen set up beside a tent in the desert at night',
  'outreach-training': 'Adults in a training session with notebooks in a classroom',
  'outreach-classroom': 'A full hall of participants watching a projected presentation',
  'outreach-film': 'A crowd watching the Jesus Film projected outdoors at night',
  'outreach-audio-bible': 'A Rendille woman in beaded necklaces listening to a handheld audio Bible',
  'outreach-scripture': 'Elders examining a printed scripture booklet together',
  'water-jerrycans': 'Hands filling yellow jerrycans with clean water from a hose',
  'water-drilling': 'A drilling rig striking water for a new borehole',
  'literacy-certificate': 'A smiling Rendille woman holding her literacy certificate',
  'literacy-handover': 'A literacy graduate receiving her certificate on a red carpet',
  'literacy-tree-class': 'A literacy teacher reading to a large class of Rendille women seated outdoors',
  'literacy-mothers': 'A Rendille mother with her baby studying a literacy primer',
  'rendille-portrait': 'Portrait of a Rendille woman wearing traditional beaded collars',
  'classroom-girl': 'A girl listening attentively at her desk in class',
  'school-buildings': 'Classroom blocks of Tirrim Christian Schools under a clear sky',
  'nursery-class': 'Nursery pupils writing in their exercise books at green desks',
  'primary-lab': 'Primary pupils in pink uniforms working at computers in the lab',
  'primary-hall': 'Hundreds of primary pupils seated together in the school hall',
  'primary-boys': 'Two smiling primary school boys',
  'jhs-computers': 'Junior high students working in a large computer laboratory',
  'jhs-science': 'Junior high students gathered around a chemistry experiment',
  'secondary-campus': 'Aerial view of the Tirrim Secondary School campus on red earth',
  'secondary-study': 'Secondary students sitting an exam in a bright classroom',
  'secondary-play': 'Students playing netball on the dusty school field',
  'secondary-grow': 'A student reading the Bible with a woman from the community',
  'secondary-acacia': 'Students and community gathered beneath an acacia tree at sunset',
} as const;

export type PhotoName = keyof typeof alts;
export type Photo = { src: ImageMetadata; alt: string };

export const photos = Object.fromEntries(
  Object.entries(alts).map(([name, alt]) => {
    const file = files[`../assets/photos/${name}.jpg`];
    if (!file) throw new Error(`Missing photo: ${name}.jpg`);
    return [name, { src: file.default, alt }];
  }),
) as Record<PhotoName, Photo>;
