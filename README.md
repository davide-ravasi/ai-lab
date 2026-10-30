# ai-lab

Lab Cursor SDK (surplus Ven). Path studio: `cerebro/docs/sources/ai-agents/README.md`.

## Setup

1. `CURSOR_API_KEY` in `.env` (non commitare)
2. `npm install`
3. `npm run prompt`

## Layout

| Path | Ruolo |
|------|--------|
| `prompt.mjs` | One-shot `Agent.prompt` local |
| `conversation.mjs` | `create` + più `send` |
| `errors-*.mjs` | Lab #3 errori |
| `real-repo.mjs` | Lab #4 — cwd = track-em-all root; prompt su `EpisodePage.tsx` (read-only) |
| `cloud-repo.mjs` | Lab #5 — `cloud: { repos }` su questo repo GitHub (read-only) |
| `playground/` | Toy `cwd` (lab 1–2) |
| `.env` | API key |

```bash
npm run real-repo
npm run cloud
```

## Regola

Un obiettivo per sessione. Non mescolare tutorial + feature lavoro nello stesso 25′.

## Ripartenza (cambio PC)

Prompt da incollare in chat: [`docs/restart-prompt-2026-10-28.md`](docs/restart-prompt-2026-10-28.md). Env: Drive `backup-pc-cambio-2026-10/env/ai-lab.env`.
