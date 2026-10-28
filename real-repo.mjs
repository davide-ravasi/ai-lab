/**
 * Lab #4 — agent su repo reale, sola lettura.
 *
 * cwd = root track-em-all (l’SDK scrive stato/SQLite qui; una sola cartella foglio
 * tipo EpisodePage ha dato `[internal] unable to open database file`).
 * Strettezza = prompt sul file, non cwd a una foglia.
 */
import { Agent, CursorAgentError } from "@cursor/sdk";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const aiLabRoot = dirname(fileURLToPath(import.meta.url));
const cwd = join(aiLabRoot, "..", "react-exp", "track-em-all");

if (!process.env.CURSOR_API_KEY) {
  console.error("Missing CURSOR_API_KEY (npm run real-repo usa --env-file=.env)");
  process.exit(1);
}

console.log("cwd:", cwd);
console.log("(1/3) Agent.create…");

try {
  const agent = await Agent.create({
    apiKey: process.env.CURSOR_API_KEY,
    model: { id: "composer-2.5" },
    local: { cwd },
  });
  console.log("(2/3) create ok — send…");

  const run = await agent.send(
    [
      "Read-only task. Do not create, edit, or delete any files.",
      "Open only src/pages/EpisodePage/EpisodePage.tsx.",
      "In 3–5 short sentences: how metaDescription is built when overview is missing vs when it is long.",
      "Mention SxxExx if relevant. No code blocks longer than a few tokens.",
    ].join(" "),
  );
  console.log("(3/3) send ok — wait() (può richiedere 1–3 min)…");

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
