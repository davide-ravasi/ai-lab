/**
 * Lab #5 — agent cloud, sola lettura.
 *
 * local: { cwd } = file sul PC.
 * cloud: { repos } = clone su VM Cursor (senza cloud l’SDK fa local in silenzio).
 * ID atteso: bc-…
 */
import { Agent, CursorAgentError } from "@cursor/sdk";

if (!process.env.CURSOR_API_KEY) {
  console.error("Missing CURSOR_API_KEY (npm run cloud usa --env-file=.env)");
  process.exit(1);
}

const repoUrl = "https://github.com/davide-ravasi/ai-lab";

console.log("runtime: cloud");
console.log("repo:", repoUrl);
console.log("(1/3) Agent.create…");

try {
  const agent = await Agent.create({
    apiKey: process.env.CURSOR_API_KEY,
    model: { id: "composer-2.5" },
    cloud: {
      repos: [{ url: repoUrl, startingRef: "master" }],
    },
  });
  console.log("(2/3) create ok — agentId:", agent.agentId);
  console.log("send…");

  const run = await agent.send(
    [
      "Read-only task. Do not create, edit, or delete any files.",
      "Read README.md.",
      "In 3 short sentences: what this repo is for and which npm scripts exist.",
      "No code blocks.",
    ].join(" "),
  );
  console.log("(3/3) send ok — wait() (VM + clone, può richiedere alcuni minuti)…");

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
