#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const scriptDir = __dirname;
const installRoot = process.env.GODS_EYE_INSTALL_ROOT || path.resolve(scriptDir, '../..');
const serverJs = path.join(installRoot, 'mcp-server/dist/index.js');
const mcpServerDir = path.join(installRoot, 'mcp-server');

if (!fs.existsSync(serverJs)) {
  console.error(`nightraven memory-chain MCP server not built: ${serverJs}`);
  console.error(`Run: cd "${mcpServerDir}" && npm install && npm run build`);
  process.exit(1);
}

// Spawn the process
const child = spawn(process.execPath, [serverJs], {
  stdio: 'inherit',
  env: process.env
});

child.on('close', (code) => {
  process.exit(code);
});

