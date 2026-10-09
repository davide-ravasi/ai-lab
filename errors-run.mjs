import { Agent, CursorAgentError } from "@cursor/sdk";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const cwd = join(dirname(fileURLToPath(import.meta.url)), "playground");

if (!process.env.CURSOR_API_KEY) {
  console.error("Missing CURSOR_API_KEY");
  process.exit(1);
}

try {
  const agent = await Agent.create({
    apiKey: process.env.CURSOR_API_KEY,
    model: { id: "composer-2.5" },
    local: { cwd },
  });

  const run = await agent.send(
    "Read hello.txt and reply with one short sentence. Do not modify files.",
  );
  const result = await run.wait();

  console.log("status:", result.status);
  console.log("error:", result.error ?? "(none)");
  console.log("result:", result.result ?? "(none)");

  if (result.status === "error") {
    console.log("run partito e fallito — guarda error, non la API key");
  }
} catch (err) {
  if (err instanceof CursorAgentError) {
    console.error("non partito:", err.message);
    process.exit(1);
  }
  throw err;
}
