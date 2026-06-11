#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const { execSync, spawn } = require('child_process');

const scriptDir = __dirname;
const installRoot = process.env.GODS_EYE_INSTALL_ROOT || path.resolve(scriptDir, '../..');
const serverJs = path.join(installRoot, 'mcp-server/dist/index.js');
const mcpServerDir = path.join(installRoot, 'mcp-server');

if (!fs.existsSync(serverJs)) {
  console.log(`God's Eye MCP server build not found. Setting up environment...`);
  try {
    console.log(`Running 'npm install' in ${mcpServerDir}...`);
    execSync('npm install', { cwd: mcpServerDir, stdio: 'inherit' });
    
    console.log(`Running 'npm run build' in ${mcpServerDir}...`);
    execSync('npm run build', { cwd: mcpServerDir, stdio: 'inherit' });
    
    console.log(`Environment setup complete!`);
  } catch (error) {
    console.error(`Failed to automatically set up God's Eye environment:`, error.message);
    process.exit(1);
  }
}

// Spawn the process
const child = spawn(process.execPath, [serverJs], {
  stdio: 'inherit',
  env: process.env
});

child.on('close', (code) => {
  process.exit(code);
});

