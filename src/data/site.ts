export const site = {
  name: 'The Tirrim Trust',
  tagline: 'Partner with the ministry in Northern Kenya',
  description:
    'The Tirrim Trust is a Christian ministry of Africa Inland Church reaching the nomadic communities of Northern Kenya through outreach, education, water and development.',
  email: 'info@tirrim.org',
  address: ['PO Box 21020-00505', 'Nairobi, Kenya'],
};

export const schools = [
  { label: 'Nursery', path: '/education/nursery/' },
  { label: 'Primary', path: '/education/primary/' },
  { label: 'Junior High', path: '/education/junior-high/' },
  { label: 'Secondary', path: '/education/secondary/' },
  { label: 'Adult Literacy', path: '/education/adult-literacy/' },
];

export const ministries = [
  { label: 'Outreach', path: '/outreach/' },
  { label: 'Education', path: '/education/' },
  { label: 'Water', path: '/water/' },
  { label: 'Development', path: '/development/' },
];

export const nav = [
  { label: 'Who we are', path: '/about/' },
  { label: 'Education', path: '/education/', children: schools },
  { label: 'Water', path: '/water/' },
  { label: 'Development', path: '/development/' },
  { label: 'Outreach', path: '/outreach/' },
  { label: 'Contact', path: '/contact/' },
];
