import { Helmet } from 'react-helmet-async'
import { profile } from '../../data/profile.js'

// Canonical site origin — finalized at deploy (Task 11).
const SITE = 'https://arsenius-audley.vercel.app'

// Per-route document head: title, description, canonical, Open Graph, Twitter card.
export function SeoHead({ title, description, path = '/' }) {
  const fullTitle = title
    ? `${title} — ${profile.shortName}`
    : `${profile.shortName} — ${profile.title}`
  const desc = description || profile.thesis
  const url = SITE + path

  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${SITE}/og.png`} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  )
}
