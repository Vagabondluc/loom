# GAIS Environment & Browser-Only Guardrails

## Key rules
- Work inside Google AI Studio (GAIS) or a similar browser-only runtime.
- Do not run `npm`, `pnpm`, or `yarn`.
- Do not create `node_modules/` or lockfiles.
- Do not execute `npm ci` or any bundler.
- Avoid Node.js APIs (`fs`, `process`, etc.) while in the GAIS context.
- Keep builds out of GAIS: rely on textual doc editing and script previews.

## GAIS protections (from `todo.md`)
- No GAIS shims or runtime compatibility hacks.
- No placeholder re-exports, temporary files, or `any` just to make TypeScript happy.
- Do not move multiple domains at once.
- Respect layered authority; do not insert governance inside a roadmap card.

## Workflow reminders
- Use `server.py` to preview built output when you are outside GAIS.
- Follow the persona guidelines in `README_GAIS.md` and `AGENTS.md`.
- In GAIS, the AI assistant must stay inspectable, declarative, and ask for clarification when uncertain.
