#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

const scriptDir = __dirname;
const installRoot = process.env.GODS_EYE_INSTALL_ROOT || path.resolve(scriptDir, '../..');
const serverJs = path.join(installRoot, 'mcp-server/dist/index.js');

if (!fs.existsSync(serverJs)) {
  console.error(`gods-eye MCP server not built: ${serverJs}`);
  console.error(`Run: cd "${path.join(installRoot, 'mcp-server')}" && npm install && npm run build`);
  process.exit(1);
}

// Spawn the process
const { spawn } = require('child_process');
const child = spawn(process.execPath, [serverJs], {
  stdio: 'inherit',
  env: process.env
});

child.on('close', (code) => {
  process.exit(code);
});
