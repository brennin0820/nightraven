import { MessageSquare } from 'lucide-react'
import { useCompassData } from '../../hooks/useCompassData'
import type { PromptCard as PromptCardData } from '../../types/project'
import { PromptCard } from './PromptCard'

const promptOrder: PromptCardData['target'][] = [
  'gods_eye',
  'nightraven_builder',
  'nightraven_auditor',
  'research',
]

export function NextPromptPage() {
  const { snapshot, nextTask, currentPhase } = useCompassData()
  const promptCards = [...(snapshot?.promptCards ?? [])].sort(
    (a, b) => promptOrder.indexOf(a.target) - promptOrder.indexOf(b.target),
  )

  return (
    <section className="prompt-page" aria-labelledby="next-prompt-title">
      <article className="dashboard-card dashboard-card--wide">
        <div className="card-heading">
          <span className="card-icon card-icon--blue">
            <MessageSquare size={18} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">Next prompt</p>
            <h2 id="next-prompt-title">Recommended prompts for current work</h2>
          </div>
        </div>
        <p className="card-copy">
          Generated from project, phase, and next-task snapshot via{' '}
          <code>promptGenerator.ts</code> — God&apos;s Eye, NightRaven Builder, Auditor, and
          Research.
        </p>
        {nextTask && currentPhase ? (
          <p className="card-copy">
            Current focus: <strong>{nextTask.title}</strong> in phase{' '}
            <strong>{currentPhase.name}</strong>.
          </p>
        ) : null}
      </article>

      <div className="prompt-page__grid">
        {promptCards.length === 0 ? (
          <article className="dashboard-card">
            <p className="card-copy">No prompt cards — add a Next line to handoff.</p>
          </article>
        ) : (
          promptCards.map((card) => <PromptCard key={card.id} promptCard={card} />)
        )}
      </div>
    </section>
  )
}
