#!/usr/bin/env node
import { createServer, main } from "./server.js";

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`nightraven-memory-chain-mcp-server failed: ${message}`);
  process.exit(1);
});

export { createServer, main };
