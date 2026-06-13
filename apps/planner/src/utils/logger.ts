import type { AgentRole } from '../types/agent.js'

type Level = 'info' | 'warn' | 'error' | 'phase'

function emit(level: Level, role: AgentRole | 'flow', msg: string, meta?: object) {
  const entry = {
    ts: new Date().toISOString(),
    level,
    role,
    msg,
    ...meta,
  }
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(entry))
}

export const logger = {
  info:  (role: AgentRole | 'flow', msg: string, meta?: object) => emit('info',  role, msg, meta),
  warn:  (role: AgentRole | 'flow', msg: string, meta?: object) => emit('warn',  role, msg, meta),
  error: (role: AgentRole | 'flow', msg: string, meta?: object) => emit('error', role, msg, meta),
  phase: (role: AgentRole | 'flow', msg: string, meta?: object) => emit('phase', role, msg, meta),
}
