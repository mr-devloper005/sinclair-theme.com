export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'st7q4v2m8x',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Sinclair Theme',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Straightforward editorial publishing',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A clean editorial site for article publishing, insights, and topical coverage.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'sinclair-theme.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sinclair-theme.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

