# Documentation System Export

This folder packages a generic version of the layered documentation system that this GAIS-focused browser builder follows. It strips project-specific decisions so you can drop the same structure into any project that shares the same tech stack and enforcement model.

## Contents
- `layers/`: step-by-step guidance for each layer (governance through informational).
- `authority-resolution.md`: the strict ordering that resolves conflicting statements.
- `gais-environment.md`: the browser-only guardrails (no `npm`/`pnpm`/`yarn`, no hidden execution).
- `agent-playbook.md`: how any human or tool must operate inside this repo.
- `todo-playbook.md`: how to keep an execution backlog aligned with the layered system.
- `server-tooling.md`: the helper script that previews built output without running a bundler.
- `diagram.md`: a simple reference for how the layers stack.

## How to adopt
Copy the entire `export/doc-system` tree into your new repo, rename the placeholder files to match your own spec names (e.g., `spec-*.md`, `tdd-*.md`, `UX_CONTRACT.md`), and keep the checklists intact. Update the paths and references so the docs point to your own `docs/` tree, but do not add product-unique details to these templates—focus on roles, responsibilities, and enforcement, not feature names.

## Adoption checklist
Before relying on these documents, ensure you have renamed or aliased every hard-coded reference below to your own files:
- Governance: `docs/UX_CONTRACT.md`, `docs/INVARIANTS.md`, `docs/AUDIT_ENFORCEMENT.md`, `docs/IDENTITY_GOVERNANCE.md`, `docs/import.md`, `docs/decisions.md`, `AGENTS.md`, `docs/review/agent.md`.
- Contract guidance: `docs/roadmap/spec-*.md`, `docs/specs/*.md`, `docs/prd/*.md`, `docs/CONTRACTS/REQ_ID_TEMPLATE.md`.
- TDD proof: `docs/tdd-*.md`, `docs/TDD_GUIDELINES.md`.
- Roadmap/narrative: `docs/roadmap/*.md`, `docs/prd/*.md` (note overlap), `docs/roadmap.md`, `docs/TECH_DEBT.md`, `docs/HARD_PROBLEMS.md`.
- Informational resources: `docs/MENTAL_MODEL.md`, `docs/philosophy/*.md`, `docs/HARD_PROBLEMS.md`, `docs/review/*`, `README_GAIS.md`, `todo.md`.
- Tooling and enforcement: `docs/tools/*.md`, `scripts/check-contract.*`, `scripts/check-shim-purity.sh`, `server.py`.
Update each referenced path so it points at your repo’s files before the templates start governing behavior.

## Keeping it generic
Whenever you edit these notes, stick to mechanical concepts such as builder modes, preview behavior, runtime guards, and authority flow. Avoid proprietary nouns. The goal is to have a drop-in doc system that any GAIS browser-only project can follow to keep governance, contracts, tests, tooling, and narrative work in sync.
