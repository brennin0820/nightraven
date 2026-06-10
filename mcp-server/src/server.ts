import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  READ_ORDER,
  appendRecentSession,
  getProjectPaths,
  listAvailableSlots,
  readMemoryDoc,
  searchMemoryDocs,
} from "./memory.js";

function textResult(payload: Record<string, unknown>) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(payload, null, 2) }],
    structuredContent: payload,
  };
}

function errorText(message: string) {
  return {
    content: [{ type: "text" as const, text: message }],
    isError: true,
  };
}

export function createServer(): McpServer {
  const server = new McpServer({
    name: "gods-eye-mcp-server",
    version: "0.1.0",
  });

  server.registerTool(
    "gods_eye_list_memory_slots",
    {
      title: "List memory slots",
      description:
        "List God's Eye memory slots (handoff, changelog, overlay, Bible, etc.) with paths and existence.\n\nUse when: starting a session or choosing which doc to read.\nDo NOT use when: you already know the slot id (use gods_eye_read_memory).",
      inputSchema: {},
      outputSchema: {
        project_root: z.string(),
        gods_eye_root: z.string(),
        slots: z.array(
          z.object({
            id: z.string(),
            label: z.string(),
            layer: z.string(),
            relativePath: z.string(),
            absolutePath: z.string(),
            exists: z.boolean(),
            readOnlyDefault: z.boolean(),
          })
        ),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async () => {
      const paths = await getProjectPaths();
      const slots = await listAvailableSlots(paths);
      return textResult({
        project_root: paths.projectRoot,
        gods_eye_root: paths.godsEyeRoot,
        slots,
      });
    }
  );

  server.registerTool(
    "gods_eye_get_read_order",
    {
      title: "Get parallel read order",
      description:
        "Return the canonical God's Eye parallel read batch for Touch 1 (Before).\n\nUse when: classifying tier and intent before edits.\nDo NOT use when: you only need one specific doc (use gods_eye_read_memory).",
      inputSchema: {},
      outputSchema: {
        read_order: z.array(z.string()),
        note: z.string(),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async () =>
      textResult({
        read_order: READ_ORDER,
        note: "Batch these reads in parallel. Git-backed docs are authoritative over any external index.",
      })
  );

  server.registerTool(
    "gods_eye_read_memory",
    {
      title: "Read memory doc",
      description:
        "Read a God's Eye memory document by slot id.\n\nUse when: loading handoff, overlay, changelog, or Bible content.\nDo NOT use when: searching for a keyword across docs (use gods_eye_search_memory).",
      inputSchema: {
        slot: z
          .enum([
            "handoff",
            "changelog",
            "learning_log",
            "overlay",
            "bible",
            "agents",
            "router",
            "session_tree",
          ])
          .describe("Memory slot id"),
      },
      outputSchema: {
        slot: z.string(),
        label: z.string(),
        path: z.string(),
        exists: z.boolean(),
        content: z.string(),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async ({ slot }) => {
      try {
        const paths = await getProjectPaths();
        const doc = await readMemoryDoc(slot, paths);
        return textResult({
          slot: doc.slot.id,
          label: doc.slot.label,
          path: doc.path,
          exists: doc.exists,
          content: doc.content,
        });
      } catch (error) {
        return errorText(error instanceof Error ? error.message : String(error));
      }
    }
  );

  server.registerTool(
    "gods_eye_search_memory",
    {
      title: "Search memory docs",
      description:
        "Search God's Eye memory docs for a case-insensitive substring.\n\nUse when: deduping against handoff/changelog or finding prior decisions.\nDo NOT use when: you need the full doc (use gods_eye_read_memory).",
      inputSchema: {
        query: z.string().min(2).max(200).describe("Substring to search for"),
        max_results: z
          .number()
          .int()
          .min(1)
          .max(50)
          .default(20)
          .describe("Maximum matches to return"),
      },
      outputSchema: {
        query: z.string(),
        match_count: z.number(),
        matches: z.array(
          z.object({
            slot: z.string(),
            path: z.string(),
            line: z.number(),
            text: z.string(),
          })
        ),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async ({ query, max_results }) => {
      const paths = await getProjectPaths();
      const matches = await searchMemoryDocs(query, paths, max_results);
      return textResult({
        query,
        match_count: matches.length,
        matches,
      });
    }
  );

  server.registerTool(
    "gods_eye_append_recent_session",
    {
      title: "Append Recent sessions line",
      description:
        "Append one line to docs/14_SESSION_HANDOFF.md under Recent sessions (+# only).\n\nUse when: Touch 3 After — recording session outcomes.\nDo NOT use when: rewriting history, deleting lines, or editing other sections.",
      inputSchema: {
        entry: z
          .string()
          .min(1)
          .max(2000)
          .describe("Single-line session summary (date prefix added automatically)"),
      },
      outputSchema: {
        path: z.string(),
        appended: z.string(),
      },
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: false,
      },
    },
    async ({ entry }) => {
      try {
        const paths = await getProjectPaths();
        const result = await appendRecentSession(entry, paths);
        return textResult(result);
      } catch (error) {
        return errorText(error instanceof Error ? error.message : String(error));
      }
    }
  );

  return server;
}

export async function main(): Promise<void> {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
