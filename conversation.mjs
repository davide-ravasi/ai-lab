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
  const agent = await Agent.create({
    apiKey: process.env.CURSOR_API_KEY,
    model: { id: "composer-2.5" },
    local: { cwd },
  });

  const run = await agent.send(
    "Read hello.txt and reply with one short sentence saying what it contains. Do not modify any files.",
  );

  const result = await run.wait();
  console.log("status run1:", result.status);
  console.log("result run1:", result.result);

  if (result.status === "error") process.exit(2);

  const run2 = await agent.send(
    "Without re-reading files: how many words were in that sentence you just summarized? One short sentence only.",
  );

  const result2 = await run2.wait();
  console.log("status run2:", result2.status);
  console.log("result run2:", result2.result);

  const run3 = await agent.send(
    "Remember me how the file you've read is named?",
  );

  const result3 = await run3.wait();
  console.log("status run3:", result3.status);
  console.log("result run3:", result3.result);

  if (result3.status === "error") process.exit(2);
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
