import { photos, type Photo } from './photos';

export type School = {
  slug: string;
  short: string;
  name: string;
  summary: string;
  card: Photo;
  hero: Photo;
  heroVariant: 'wide' | 'split';
  heroPosition?: string;
  heroAspect?: string;
  lede: string;
  stat: { n: string; label: string };
  intro: string[];
  quote?: { text: string; cite: string };
  features?: { title: string; photo: Photo; body: string[]; position?: string }[];
  triptych?: { label: string; photo: Photo }[];
  graduates?: { title: string; items: string[] }[];
  closing?: { photo: Photo; caption: string };
};

export const schoolList: School[] = [
  {
    slug: 'nursery',
    short: 'Nursery',
    name: 'Tirrim Nursery School',
    summary: 'Over 100 kindergarten children around Korr.',
    card: photos['nursery-class'],
    hero: photos['nursery-class'],
    heroVariant: 'split',
    heroPosition: '30% 50%',
    lede: 'The first classroom many children in Korr will ever sit in.',
    stat: { n: '100+', label: 'Kindergarten children' },
    intro: [
      'Tirrim Nursery School serves over 100 kindergarten children around Korr, Kenya. They are introduced to basic truths from the Bible and the world around them.',
    ],
    quote: {
      text: '“Let the little children come to me, and do not hinder them, for the kingdom of God belongs to such as these.”',
      cite: 'Mark 10:14',
    },
  },
  {
    slug: 'primary',
    short: 'Primary',
    name: 'Tirrim Primary School',
    summary: 'Ranked #1 primary school in Marsabit County.',
    card: photos['primary-boys'],
    hero: photos['school-gate'],
    heroVariant: 'wide',
    heroAspect: '1440 / 684',
    lede: 'Ranked the number one primary school in Marsabit County.',
    stat: { n: 'No. 1', label: 'Primary school in Marsabit County' },
    intro: [
      'Tirrim Primary School serves over 500 children from class 1 to class 8 in a day school format. Upper classes have the option to board in our new dormitories.',
    ],
    features: [
      {
        title: 'A library and a computer lab',
        photo: photos['primary-lab'],
        body: [
          'We offer a fully functional library with shelves full of educational materials, and a computer lab that allows technology learning at an early age.',
        ],
      },
      {
        title: 'Over 500 pupils',
        photo: photos['primary-hall'],
        body: [
          'Class 1 to class 8 learn together in a day school format, and upper classes can board in the new dorms.',
          'High-quality education, where Christ is preeminent in everything we do.',
        ],
      },
    ],
    closing: { photo: photos['primary-boys'], caption: 'Tirrim Primary pupils.' },
  },
  {
    slug: 'junior-high',
    short: 'Junior High',
    name: 'Tirrim Junior High School',
    summary: 'Classes 7 to 9, in a day or boarding format.',
    card: photos['jhs-science'],
    hero: photos['jhs-computers'],
    heroVariant: 'wide',
    heroAspect: '16 / 9',
    lede: 'Christian education for classes 7 through 9.',
    stat: { n: '7–9', label: 'Classes, day or boarding' },
    intro: [
      'Tirrim Junior High School offers Christian education to classes 7 through 9 in a day or boarding school format.',
    ],
    features: [
      {
        title: 'Learning by doing',
        photo: photos['jhs-science'],
        body: [
          'Students work hands-on in the laboratory and in a full computer lab, preparing for secondary school and beyond.',
        ],
      },
    ],
  },
  {
    slug: 'secondary',
    short: 'Secondary',
    name: 'Tirrim Secondary School',
    summary: 'Secondary education with a Biblical worldview.',
    card: photos['secondary-grow'],
    hero: photos['secondary-campus'],
    heroVariant: 'wide',
    heroAspect: '18 / 5',
    lede: 'Secondary education with a Biblical worldview.',
    stat: { n: '6', label: 'Marks of a Tirrim graduate' },
    intro: [
      'Students at Tirrim Secondary study, play and grow together, and leave ready to serve their communities as mature, faithful leaders.',
    ],
    triptych: [
      { label: 'Study', photo: photos['secondary-study'] },
      { label: 'Play', photo: photos['secondary-play'] },
      { label: 'Grow', photo: photos['secondary-grow'] },
    ],
    features: [
      {
        title: 'Outreach to the community',
        photo: photos['secondary-acacia'],
        body: [
          'Tirrim Secondary students have the opportunity to share the love of Christ with the communities surrounding our school.',
        ],
      },
    ],
    graduates: [
      { title: 'Mature', items: ['Honest and displays integrity', 'Truthful', 'Wise', 'Courageous', 'Independent thinkers', 'Ambassadors'] },
      { title: 'Caring', items: ['Tolerant', 'Accepting and inclusive', 'Friendly', 'Loving', 'Respectful'] },
      { title: 'Strong', items: ['Resilient', 'Confident', 'Proud but humble', 'Able to make informed choices'] },
      {
        title: 'Leaders and influencers',
        items: ['Effective team members', 'Purposeful', 'Know their gifts', 'Self-motivated', 'Self-disciplined', 'Rich in character and inner strength', 'Articulate'],
      },
      { title: 'Faithful', items: ['Godly', 'Have a strong Biblical worldview'] },
      {
        title: 'Achievers',
        items: ['Dedicated', 'Prepared for life', 'Well rounded', 'Lifelong learners', 'Aim at their personal best', 'Meet challenges', 'Creative', 'Passionate', 'Strivers for excellence'],
      },
    ],
  },
  {
    slug: 'adult-literacy',
    short: 'Adult Literacy',
    name: 'Adult Literacy',
    summary: 'Reading and writing in the Rendille mother tongue.',
    card: photos['literacy-certificate'],
    hero: photos['literacy-mothers'],
    heroVariant: 'split',
    heroPosition: '50% 40%',
    lede: 'Learning to read, in Rendille, so that God’s Word can be read in the mother tongue.',
    stat: { n: '2018', label: 'Rendille New Testament presented' },
    intro: [
      'Many Rendille have never had the opportunity to go to school. Many do not know how to read or write; it is only the younger generation that is getting that chance.',
    ],
    quote: {
      text: '“I started my schooling under a tree, and this is where Jesus met me… I met the Lord, who knows my language.”',
      cite: 'Nareyo · Literacy teacher',
    },
    features: [
      {
        title: 'Reading, and God’s Word',
        photo: photos['literacy-tree-class'],
        body: [
          'For several years Tirrim has had an adult literacy programme. Students not only learn how to read but also learn God’s Word. Many traditional Rendille came to know Jesus through this programme.',
          'A few of Tirrim’s active evangelists were saved through the literacy class. Other passionate believers and graduates of this programme are the pillars of various Rendille churches today.',
        ],
      },
      {
        title: 'Based on Christian education principles',
        photo: photos['literacy-certificate'],
        position: '35% 50%',
        body: [
          'The purpose is to help the Rendille learn to read and write in their mother tongue, so that they can read and understand the Rendille Bible.',
          'The completed and printed New Testament was presented to the Rendille people in August 2018. The Old Testament is in the midst of being translated into Rendille.',
          'As Rendille learn to read and write, they also become empowered to find solutions to their poverty-stricken lives, to grow spiritually, and to share their faith with those around them.',
        ],
      },
    ],
    closing: { photo: photos['literacy-celebration'], caption: 'A literacy graduation. The results of the past years have been exciting and fruitful.' },
  },
];
