# Prompt di ripartenza — ai-lab — 2026-10-28

Incolla questo in una chat nuova dopo aver clonato il repo.

---

Leggi questo file e, se esiste, il path studio in cerebro: `docs/sources/ai-agents/README.md` (repo `cerebro-wiki`). Rispondi in italiano, breve. Dimmi solo da dove ripartiamo. Non rifare i lab già chiusi.

Questa chat è stata persa col cambio PC. Il filo operativo è questo file + le note in cerebro. Copia Drive: `backup-pc-cambio-2026-10/ai-lab-restart-prompt-2026-10-28.md`.

## Cos’è

Repo lab Cursor SDK (surplus Ven, 1 pomodoro). Note studio: `cerebro-wiki` → `docs/sources/ai-agents/` + mappa agenti. Corso Udemy Max = solo vocabolario; coda video **chiusa** 20/10.

## Setup sul PC nuovo

1. `git clone https://github.com/davide-ravasi/ai-lab.git`
2. `npm install`
3. Copia da Drive `backup-pc-cambio-2026-10/env/ai-lab.env` → `.env` in root (solo `CURSOR_API_KEY`)
4. Verifica: `npm run prompt`

`.env` non va in git.

## Lab fatti

| # | Cosa | Stato |
|---|------|:-----:|
| 1 / 1b | `Agent.prompt` local · `finished` ≠ task ok | ✓ |
| 2 | `create` + `send` | ✓ |
| 3 | errori (startup / run) | ✓ |
| 4 | real-repo: cwd track-em-all, pezzo su `EpisodePage.tsx` read-only | ✓ |
| 5 | cloud / skill pratica | ☐ prossimo Ven |

Script: `npm run prompt` · `conversation` · `errors:startup` · `errors:run` · `real-repo`.

## Regole

- Un obiettivo per sessione Ven; non + track deep lo stesso giorno.
- Skill studio in cerebro: `@learn-*`. Skill SDK: `@sdk` se serve.
- Non installare skill esterne per questo lab.

## Prox

Ven: lab **#5** (cloud) oppure pezzo skill / morning-agent. Piano settimanale: `cerebro-wiki` → `docs/study-resume.md` e `docs/restart-prompt-2026-10-28.md`.
