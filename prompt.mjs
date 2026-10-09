import { Agent, CursorAgentError } from "@cursor/sdk";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const cwd = join(root, "playground");

if (!process.env.CURSOR_API_KEY) {
  console.error(
    "Missing CURSOR_API_KEY (use: node --env-file=.env prompt.mjs)",
  );
  process.exit(1);
}

try {
  const result = await Agent.prompt(
    "Read hello.txt and reply with one short sentence saying what it contains. Do not modify any files.",
    {
      apiKey: process.env.CURSOR_API_KEY,
      model: { id: "composer-2.5" },
      local: { cwd },
    },
  );

  console.log("status:", result.status);
  console.log("result:", result.result);
  if (result.status === "error") process.exit(2);
} catch (err) {
  if (err instanceof CursorAgentError) {
    console.error(
      "startup failed:",
      err.message,
      "retryable=",
      err.isRetryable,
    );
    process.exit(1);
  }
  throw err;
}
