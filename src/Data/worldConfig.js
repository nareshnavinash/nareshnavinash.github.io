/**
 * World layout configuration.
 * Hub-and-spoke layout centered at (0,0).
 * Each area has a position, radius, and accent color key.
 */

const res = await fetch('/data/resume.json')
const resume = await res.json()
const firstName = resume.personal.firstName

export const worldSize = 200

export const areas = {
  hero: {
    position: { x: 0, z: 0 },
    radius: 12,
    color: 'mint',
    label: '',
    description: 'Welcome',
  },
  about: {
    position: { x: 30, z: -15 },
    radius: 14,
    color: 'lavender',
    label: 'About',
    description: `Learn about ${firstName}`,
  },
  career: {
    position: { x: -10, z: -40 },
    radius: 16,
    color: 'peach',
    label: 'Experience',
    description: 'Career journey',
  },
  skills: {
    position: { x: -40, z: -5 },
    radius: 14,
    color: 'mint',
    label: 'Skills',
    description: 'Technical toolkit',
  },
  leadership: {
    position: { x: -30, z: 30 },
    radius: 14,
    color: 'gold',
    label: 'Leadership',
    description: 'How I lead teams',
  },
  publications: {
    position: { x: 10, z: 35 },
    radius: 12,
    color: 'blue',
    label: 'Publications',
    description: 'Writing & open source',
  },
  certifications: {
    position: { x: 40, z: 15 },
    radius: 12,
    color: 'lavender',
    label: 'Certifications',
    description: 'Continuous learning',
  },
  contact: {
    position: { x: 35, z: -35 },
    radius: 12,
    color: 'mint',
    label: 'Contact',
    description: "Let's connect",
  },
}

// Paths between areas (pairs of area keys)
export const paths = [
  ['hero', 'about'],
  ['hero', 'career'],
  ['hero', 'skills'],
  ['hero', 'leadership'],
  ['hero', 'publications'],
  ['hero', 'certifications'],
  ['hero', 'contact'],
]

// Interactive points within each area
export const interactivePoints = {
  hero: [
    {
      id: 'hero-welcome',
      offset: { x: 0, z: 3 },
      label: 'Welcome',
      contentKey: 'hero',
      innerRadius: 3,
      outerRadius: 8,
    },
  ],
  about: [
    {
      id: 'about-main',
      offset: { x: 0, z: 0 },
      label: 'About Me',
      contentKey: 'about',
      innerRadius: 3,
      outerRadius: 8,
    },
  ],
  career: [
    {
      id: 'career-main',
      offset: { x: 0, z: 0 },
      label: 'Experience',
      contentKey: 'career',
      innerRadius: 3,
      outerRadius: 8,
    },
  ],
  skills: [
    {
      id: 'skills-main',
      offset: { x: 0, z: 0 },
      label: 'Skills',
      contentKey: 'skills',
      innerRadius: 3,
      outerRadius: 8,
    },
  ],
  leadership: [
    {
      id: 'leadership-main',
      offset: { x: 0, z: 0 },
      label: 'Leadership',
      contentKey: 'leadership',
      innerRadius: 3,
      outerRadius: 8,
    },
  ],
  publications: [
    {
      id: 'publications-main',
      offset: { x: 0, z: 0 },
      label: 'Publications',
      contentKey: 'publications',
      innerRadius: 3,
      outerRadius: 8,
    },
  ],
  certifications: [
    {
      id: 'certifications-main',
      offset: { x: 0, z: 0 },
      label: 'Certifications',
      contentKey: 'certifications',
      innerRadius: 3,
      outerRadius: 8,
    },
  ],
  contact: [
    {
      id: 'contact-main',
      offset: { x: 0, z: 0 },
      label: 'Contact',
      contentKey: 'contact',
      innerRadius: 3,
      outerRadius: 8,
    },
  ],
}
