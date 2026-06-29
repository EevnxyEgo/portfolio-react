import { ReelTicket } from '../signatures/ReelTicket.jsx'
import { PlaygroundRerender } from '../signatures/PlaygroundRerender.jsx'
import { JobFitBoundary } from '../signatures/JobFitBoundary.jsx'

// Maps a project's signature `kind` to its bespoke component — the one moment each case study
// has that the others don't. Add a new kind here when a new project earns one.
const SIGNATURES = {
  'reel-ticket': ReelTicket,
  'playground-rerender': PlaygroundRerender,
  'jobfit-boundary': JobFitBoundary,
}

export function SignatureBlock({ kind }) {
  const Component = SIGNATURES[kind]
  return Component ? <Component /> : null
}
