// Tiny class-name joiner. We control every class here, so a filtered join is enough —
// no need for clsx/tailwind-merge weight.
export function cn(...args) {
  return args
    .flat()
    .filter(Boolean)
    .join(' ')
}
