import { MessageSquare } from 'lucide-react'
import type { PromptCard as PromptCardData } from '../../types/project'

type PromptCardProps = {
  promptCard: PromptCardData
}

export function PromptCard({ promptCard }: PromptCardProps) {
  return (
    <article className="dashboard-card dashboard-card--prompt">
      <div className="card-heading">
        <span className="card-icon card-icon--blue">
          <MessageSquare size={18} aria-hidden="true" />
        </span>
        <div>
          <p className="eyebrow">Recommended prompt</p>
          <h2>Send to {promptCard.target.replaceAll('_', ' ')}</h2>
        </div>
      </div>
      <p className="prompt-text">{promptCard.prompt}</p>
      <div className="required-output">
        <h3>Required output</h3>
        <ul>
          {promptCard.requiredOutput.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}
