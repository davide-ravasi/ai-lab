/**
 * Lab #7 — AGENTS.md sul progetto.
 *
 * Senza settingSources: ["project"] l’SDK non carica AGENTS.md (default = solo inline).
 * Regola in AGENTS.md: prima riga = AGENTS-OK; script npm solo da package.json.
 */
import { Agent, CursorAgentError } from "@cursor/sdk";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const cwd = dirname(fileURLToPath(import.meta.url));

if (!process.env.CURSOR_API_KEY) {
  console.error("Missing CURSOR_API_KEY (npm run agents-md usa --env-file=.env)");
  process.exit(1);
}

console.log("cwd:", cwd);
console.log("settingSources: project (carica AGENTS.md)");
console.log("(1/3) Agent.create…");

try {
  const agent = await Agent.create({
    apiKey: process.env.CURSOR_API_KEY,
    model: { id: "composer-2.5" },
    local: {
      cwd,
      settingSources: ["project"],
    },
  });
  console.log("(2/3) create ok — agentId:", agent.agentId);
  console.log("send…");

  const run = await agent.send(
    [
      "Read-only. Do not create, edit, or delete any files.",
      "List the npm scripts available in this repo.",
      "Follow project agent rules.",
    ].join(" "),
  );
  console.log("(3/3) send ok — wait()…");

  const result = await run.wait();
  console.log("status:", result.status);
  console.log("result:", result.result);
  if (result.error) console.log("error:", result.error);

  if (result.status === "error") process.exit(2);
  if (result.status !== "finished") process.exit(3);
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
