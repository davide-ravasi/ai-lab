import { Agent, CursorAgentError } from "@cursor/sdk";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const cwd = join(dirname(fileURLToPath(import.meta.url)), "playground");

try {
  const agent = await Agent.create({
    apiKey: "sk-invalid-lab3-on-purpose",
    model: { id: "composer-2.5" },
    local: { cwd },
  });
  const run = await agent.send("Say hi in one word.");
  const result = await run.wait();
  console.log("unexpected status:", result.status);
} catch (err) {
  if (err instanceof CursorAgentError) {
    console.log("CursorAgentError");
    console.log("message:", err.message);
    console.log("isRetryable:", err.isRetryable);
    process.exit(1);
  }
  throw err;
}
