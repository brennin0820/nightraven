import { RefreshCw, Settings } from 'lucide-react'
import { useCompassData } from '../../hooks/useCompassData'

export function SettingsPage() {
  const { snapshot, selected, registry, refresh, selectProject } = useCompassData()

  return (
    <section className="settings-page" aria-labelledby="settings-title">
      <article className="dashboard-card dashboard-card--wide">
        <div className="card-heading">
          <span className="card-icon card-icon--blue">
            <Settings size={18} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">Settings</p>
            <h2 id="settings-title">Project registry & refresh</h2>
          </div>
        </div>
        <p className="card-copy">
          Compass reads <code>scripts/gods-eye-projects.conf</code> at dev-server start. Add a line
          per project to pick up new repos.
        </p>
        <button className="scope-link-btn settings-refresh" onClick={refresh} type="button">
          <RefreshCw size={14} aria-hidden="true" /> Refresh snapshot
        </button>
      </article>

      <article className="dashboard-card">
        <h3>Selected project</h3>
        <div className="meta-grid">
          <span>
            <strong>Label</strong>
            {selected?.label ?? '—'}
          </span>
          <span>
            <strong>Path</strong>
            {selected?.path ?? '—'}
          </span>
          <span>
            <strong>Loaded</strong>
            {snapshot?.meta.loadedAt
              ? new Date(snapshot.meta.loadedAt).toLocaleString()
              : '—'}
          </span>
        </div>
      </article>

      <article className="dashboard-card settings-registry">
        <h3>Registry ({registry.length})</h3>
        <ul className="registry-list">
          {registry.map((entry) => (
            <li key={entry.path} data-available={entry.available}>
              <div className="registry-list__main">
                <strong>{entry.label}</strong>
                <span>{entry.role}</span>
                <code>{entry.path}</code>
              </div>
              {entry.available ? (
                <button
                  className="scope-link-btn"
                  disabled={selected?.path === entry.path}
                  onClick={() => selectProject(entry.path, entry.label)}
                  type="button"
                >
                  {selected?.path === entry.path ? 'Active' : 'Select'}
                </button>
              ) : (
                <span className="registry-unavailable">Path not found</span>
              )}
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}
