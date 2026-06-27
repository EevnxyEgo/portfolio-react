// Compact, lowercase ship-log date: "25 jun".
export function shipDate(iso) {
  return new Date(iso)
    .toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
    .toLowerCase()
}

// Strip the protocol from a URL for display: "https://x.vercel.app/" -> "x.vercel.app".
export function bareHost(url) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}
