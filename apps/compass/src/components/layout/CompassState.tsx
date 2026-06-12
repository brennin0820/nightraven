import type { ReactNode } from 'react'
import { useCompassData } from '../../context/ProjectContext'

export function CompassState({ children }: { children: ReactNode }) {
  const { loading, error, refresh, snapshot } = useCompassData()

  if (loading && !snapshot) {
    return (
      <section className="placeholder-panel">
        <p className="eyebrow">Loading</p>
        <h2>Reading God&apos;s Eye project registry…</h2>
        <p>Parsing handoff, overlay, and next steps from disk.</p>
      </section>
    )
  }

  if (error && !snapshot) {
    return (
      <section className="placeholder-panel">
        <p className="eyebrow">Error</p>
        <h2>Could not load project</h2>
        <p>{error}</p>
        <p>Run Compass with <code>npm run dev</code> from <code>apps/compass</code> (API required).</p>
        <button className="scope-link-btn" onClick={refresh} type="button">
          Retry
        </button>
      </section>
    )
  }

  return children
}
