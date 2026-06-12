import fs from 'node:fs'
import path from 'node:path'
import type { Connect } from 'vite'
import type { Plugin } from 'vite'
import { buildProjectSnapshot, loadRegistry } from './buildSnapshot'

function findMonorepoRoot(): string {
  let dir = process.cwd()
  for (let i = 0; i < 6; i += 1) {
    if (fs.existsSync(path.join(dir, 'scripts', 'gods-eye-projects.conf'))) return dir
    const parent = path.dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  return path.resolve(process.cwd(), '../..')
}

function sendJson(res: import('node:http').ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

function attachApi(server: { middlewares: Connect.Server }, monorepoRoot: string) {
  const confPath = path.join(monorepoRoot, 'scripts', 'gods-eye-projects.conf')

  server.middlewares.use('/api/registry', (_req, res) => {
    try {
      const registry = loadRegistry(confPath, monorepoRoot)
      sendJson(res, 200, { registry })
    } catch (error) {
      sendJson(res, 500, { error: String(error) })
    }
  })

  server.middlewares.use('/api/project', (req, res) => {
    try {
      const url = new URL(req.url ?? '', 'http://localhost')
      const projectPath = url.searchParams.get('path')
      const label = url.searchParams.get('label') ?? path.basename(projectPath ?? 'project')

      if (!projectPath) {
        sendJson(res, 400, { error: 'Missing path query parameter' })
        return
      }

      const normalized = path.normalize(projectPath)
      if (!fs.existsSync(normalized)) {
        sendJson(res, 404, { error: `Project path not found: ${normalized}` })
        return
      }

      const registry = loadRegistry(confPath, monorepoRoot)
      const snapshot = buildProjectSnapshot(normalized, label, registry)
      sendJson(res, 200, snapshot)
    } catch (error) {
      sendJson(res, 500, { error: String(error) })
    }
  })
}

export function compassApiPlugin(): Plugin {
  const monorepoRoot = findMonorepoRoot()

  return {
    name: 'compass-api',
    configureServer(server) {
      attachApi(server, monorepoRoot)
    },
    configurePreviewServer(server) {
      attachApi(server, monorepoRoot)
    },
  }
}
