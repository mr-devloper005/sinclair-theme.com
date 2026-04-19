import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Adventure journalism & field notes',
    /** Extra nav links (non–task routes). Intentionally empty—article category filters stay on listing pages, not the navbar. */
    editorialNav: [] as const,
  },
  footer: {
    tagline: 'Stories from the edge of the map',
  },
  hero: {
    badge: 'Field-tested reporting',
    title: ['Stories built for', 'slow reading and bold imagery.'],
    description:
      'Dispatch-style features, route intelligence, and human-centered adventure writing—presented with the pacing of a premium magazine.',
    primaryCta: {
      label: 'Read today’s lead',
      href: '/articles',
    },
    secondaryCta: {
      label: 'Search the archive',
      href: '/search',
    },
    searchPlaceholder: 'Search articles, authors, and topics',
    focusLabel: 'Focus',
    featureCardBadge: 'cover rotation',
    featureCardTitle: 'The homepage follows the rhythm of a weekly magazine.',
    featureCardDescription:
      'Lead art, featured row, latest list, and trending rail keep scanning fast without sacrificing editorial depth.',
  },
  home: {
    metadata: {
      title: 'Adventure journalism, field reporting, and trail culture',
      description:
        'Independent adventure magazine with long-form reporting, gear insight, and human stories from remote places.',
      openGraphTitle: 'Adventure journalism and field reporting',
      openGraphDescription:
        'Immersive stories, structured layouts, and premium article presentation for readers who live outdoors.',
      keywords: ['adventure journalism', 'travel magazine', 'outdoor reporting', 'trail culture', 'field notes'],
    },
    introBadge: 'About the publication',
    introTitle: 'Built for readers who want depth, not algorithmic noise.',
    introParagraphs: [
      'Every story is edited for clarity, safety context, and respect for the landscapes and communities we cover.',
      'We combine narrative features with practical intelligence—routes, ethics, climate, and gear—without turning the site into a generic feed.',
      'Whether you start with a dispatch, a gear lab review, or a trending trail note, the typography and pacing stay consistent.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'Magazine-style homepage with hero, featured row, latest list, and trending rail.',
      'Deep teal palette tuned for long reading sessions indoors or on the trail.',
      'Lightweight motion: subtle lifts and fades, no gimmicky scroll hijacking.',
      'Search and category filters stay fast and keyboard friendly.',
    ],
    primaryLink: {
      label: 'Browse articles',
      href: '/articles',
    },
    secondaryLink: {
      label: 'Open search',
      href: '/search',
    },
  },
  cta: {
    badge: 'Write with us',
    title: 'Bring a route, investigation, or expedition feature to our readers.',
    description:
      'We review every pitch for editorial fit, safety, and environmental responsibility before assigning.',
    primaryCta: {
      label: 'Create contributor account',
      href: '/register',
    },
    secondaryCta: {
      label: 'Contact editors',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and dispatches',
    description: 'Long-form adventure journalism, field notes, gear labs, and narrative features.',
  },
  listing: {
    title: 'Listings and discoverable pages',
    description: 'Explore listings, services, brands, and structured pages organized for easier browsing.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'Browse classifieds, offers, notices, and time-sensitive posts across categories.',
  },
  image: {
    title: 'Images and visual posts',
    description: 'Explore image-led posts, galleries, and visual stories from across the platform.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'Discover public profiles, brand pages, and identity-focused posts in one place.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'Browse useful links, saved references, and curated resources organized for discovery.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'Open reports, documents, and downloadable resources shared across the platform.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings, services, and structured pages',
    paragraphs: [
      'Explore listings, services, brands, and discoverable pages across categories. Each entry is organized to make browsing clearer and help visitors quickly understand what a post offers.',
      'Listings connect naturally with articles, images, resources, and other content types so supporting information stays easy to reach from the same platform.',
      'Browse by category to compare posts in context, discover related content, and move between formats without losing your place.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Open search', href: '/search' },
      { label: 'About', href: '/about' },
    ],
  },
  article: {
    title: 'Articles, dispatches, and long-form reading',
    paragraphs: [
      'This desk publishes field reporting, route intelligence, profiles, and gear investigations with a magazine-grade editing pass.',
      'Use category filters to move between news, travel, lifestyle notes, and equipment coverage without losing the calm reading rhythm.',
      'Every article is tuned for accessibility: strong contrast, generous line height, and predictable navigation patterns.',
    ],
    links: [
      { label: 'Browse all articles', href: '/articles' },
      { label: 'Search archive', href: '/search' },
      { label: 'About the publication', href: '/about' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'They work well alongside articles, listings, and profiles, making it easier to connect short-term posts with more structured content.',
      'Browse by category to find announcements quickly, then continue into related sections when you need more detail.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Open search', href: '/search' },
      { label: 'About', href: '/about' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Images take the lead in this section through galleries, visual posts, and story-led content where imagery carries the experience.',
      'These posts connect with articles and other sections so visuals can act as entry points into deeper content.',
      'Browse the latest visual updates, then continue into related stories or supporting pages for more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Open search', href: '/search' },
      { label: 'About', href: '/about' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles capture the identity behind a business, creator, brand, or project and help visitors understand who is behind the content they are exploring.',
      'These pages work as trust anchors across the site and connect naturally with stories and other post types.',
      'Browse profiles to understand people and brands more clearly, then continue into related content from the same source.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Open search', href: '/search' },
      { label: 'About', href: '/about' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related stories.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Open search', href: '/search' },
      { label: 'About', href: '/about' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside stories and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related sections when you want more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Open search', href: '/search' },
      { label: 'About', href: '/about' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with stories and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into the broader site experience.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Open search', href: '/search' },
      { label: 'About', href: '/about' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected directly to articles and help keep discussion close to the writing it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context beneath stories, then continue exploring related content from the same topic area.',
    ],
    links: [
      { label: 'Explore articles', href: '/articles' },
      { label: 'Open search', href: '/search' },
      { label: 'About', href: '/about' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with stories and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Open search', href: '/search' },
      { label: 'About', href: '/about' },
    ],
  },
}
