import { schoolList } from './schools';

export type SearchEntry = { title: string; kind: string; path: string; text: string };

/** Everything the ⌘K palette can jump to: pages, key sections and actions. */
export const searchIndex: SearchEntry[] = [
  { title: 'Home', kind: 'Page', path: '/', text: 'partner ministry northern kenya tirrim trust' },
  { title: 'Who we are', kind: 'Page', path: '/about/', text: 'about tirrim king post cornerstone aic korr 1999 kaisut' },
  { title: 'The place: Northern Kenya', kind: 'Section', path: '/about/#place', text: 'marsabit county desert nomadic poverty roads' },
  { title: 'Core values', kind: 'Section', path: '/about/#vision', text: 'vision christ-centred integrity teamwork excellence' },
  { title: 'Our philosophy', kind: 'Section', path: '/about/#philosophy', text: 'spiritual growth dignity respect harmony' },
  { title: 'Ministry partners', kind: 'Section', path: '/about/#partners', text: 'genesis waters samaritans purse africa inland mission cornerstone church audio scripture' },
  { title: 'Education', kind: 'Ministry', path: '/education/', text: 'tirrim christian schools excellence with godliness' },
  { title: 'We value', kind: 'Section', path: '/education/#values', text: 'academic excellence teamwork integrity community' },
  ...schoolList.map((s) => ({ title: s.name, kind: 'School', path: `/education/${s.slug}/`, text: `${s.short} ${s.summary} ${s.lede}` })),
  { title: 'Water', kind: 'Ministry', path: '/water/', text: 'clean water borehole drilling living water genesis waters' },
  { title: 'Development', kind: 'Ministry', path: '/development/', text: 'the hands infrastructure buildings food emergencies transport scholarships' },
  { title: 'Outreach', kind: 'Ministry', path: '/outreach/', text: 'the feet training evangelism camps jesus film audio bibles great commission' },
  { title: 'Give', kind: 'Page', path: '/give/', text: 'donate support partner money rendille ministries reap scholarships schools' },
  { title: 'Partner in prayer: newsletter', kind: 'Section', path: '/give/#prayer', text: 'subscribe monthly newsletter email prayer' },
  { title: 'Contact us', kind: 'Page', path: '/contact/', text: 'email address po box nairobi message visit' },
];
