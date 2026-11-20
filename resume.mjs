/**
 * Lab #6 — riprendi l'agente cloud del #5.
 * L'id esce da agent.agentId dopo create. bc- = cloud.
 * Non ripassare cloud.repos: il runtime si capisce dal prefisso.
 */
import { Agent, CursorAgentError } from "@cursor/sdk";

const agentId = "bc-a6a6e799-d1c3-4287-8888-46040d9d99ea";

if (!process.env.CURSOR_API_KEY) {
  console.error("Missing CURSOR_API_KEY (npm run resume usa --env-file=.env)");
  process.exit(1);
}

console.log("resume:", agentId);

try {
  const agent = await Agent.resume(agentId, {
    apiKey: process.env.CURSOR_API_KEY,
  });
  console.log("resumed agentId:", agent.agentId);

  const run = await agent.send(
    [
      "Read-only. Do not create, edit, or delete any files.",
      "From the previous turn, which npm scripts did you list?",
      "Reply in one short sentence. No code blocks.",
    ].join(" "),
  );
  console.log("send ok — wait()…");

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
