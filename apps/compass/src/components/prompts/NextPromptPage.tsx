import { MessageSquare } from 'lucide-react'
import { useCompassData } from '../../context/ProjectContext'
import { PromptCard } from './PromptCard'

export function NextPromptPage() {
  const { snapshot } = useCompassData()
  const promptCards = snapshot?.promptCards ?? []

  return (
    <section className="prompt-page" aria-labelledby="next-prompt-title">
      <article className="dashboard-card dashboard-card--wide">
        <div className="card-heading">
          <span className="card-icon card-icon--blue">
            <MessageSquare size={18} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">Next prompt</p>
            <h2 id="next-prompt-title">Recommended prompts for current task</h2>
          </div>
        </div>
        <p className="card-copy">
          Generated from live project, phase, and next-task snapshot.
        </p>
      </article>

      <div className="prompt-page__grid">
        {promptCards.length === 0 ? (
          <article className="dashboard-card">
            <p className="card-copy">No prompt cards — add a **Next:** line to handoff.</p>
          </article>
        ) : (
          promptCards.map((card) => <PromptCard key={card.id} promptCard={card} />)
        )}
      </div>
    </section>
  )
}
