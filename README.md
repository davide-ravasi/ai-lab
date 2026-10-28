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
| `playground/` | Toy `cwd` (lab 1–2) |
| `.env` | API key |

```bash
npm run real-repo
```

## Regola

Un obiettivo per sessione. Non mescolare tutorial + feature lavoro nello stesso 25′.
