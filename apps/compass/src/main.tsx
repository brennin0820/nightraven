import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import { CompassState } from './components/layout/CompassState'
import { ProjectProvider } from './context/ProjectProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProjectProvider>
      <CompassState>
        <App />
      </CompassState>
    </ProjectProvider>
  </StrictMode>,
)
