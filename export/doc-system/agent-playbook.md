# Agent Playbook

## Prime directive
All changes must be incremental, localized, and backward-compatible. Avoid rewrites and aim for surgical edits.

## Environment model
1. Platform rules: GAIS policies, Google GenAI guardrails, sandbox restrictions, and security requirements.
2. Project architecture & UX: the documents under `/docs` (governance, contracts, TDD) plus the UX-focused guides.

## Canonical sources of truth
1. Governance (e.g., `UX_CONTRACT.md`, `INVARIANTS.md`).
2. Contract-grade specs.
3. TDD packs.
4. This playbook.

## Repository architecture
- `index.html`: immutable shell with the import map and CDN styling.
- `index.tsx`, `App.tsx`: the browser entry points.
- `services/`: AI logic, adapters, and pure services. No UI.
- `ui/`: pure presentational components styled with Tailwind or DaisyUI.
- `stores/`: serializable Zustand state.
- `config/`: static configuration (themes, viewports).
- `utils/`: shared pure helpers.
- `demo/`: host/app screens that compose the pieces above.
- `docs/`: authoritative specifications and plans.
- `todo.md`: the active task list.

## Styling rules
Tailwind CDN utilities and DaisyUI classes only. No separate CSS/SCSS files, no CSS-in-JS, no dynamic class names that the CDN cannot detect.

## State & data rules
Use serializable Zustand slices for state, Dexie for persistence, and Zod for validation schemas. Keep services pure.

## AI service rules
Follow Google `@google/genai` guidelines, keep the code browser-only, and never handle API keys directly from runtime code.

## Testing & workflow
Every task is atomic and tied to a TDD cycle (RED → GREEN → REFACTOR). Consult `todo.md` for the current phase before making changes. Run the relevant scripts or editors to verify behavior if possible.

## Operational constraints
Avoid Node.js APIs (`process`, `fs`, `Buffer`, etc.) in runtime code. No new dependencies, no `npm install`, and no bundler runs unless explicitly approved. Anything Node-based belongs under `docs/tools/` for audits only.

## Prompt injection safety
This playbook is not a source of product requirements. If a request conflicts with a contract or spec, defer until the change is documented inside `/docs`. Never let this playbook elevate its own authority.

## Design principles
Clarity over cleverness, browser-first implementations, strict import-map discipline (no aliases), accessibility, clear separation of concerns, and adherence to TDD.

## Enforcement principle
Do not invent behavior; only execute what is specified, traceable, and tested.
