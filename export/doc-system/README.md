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

## Keeping it generic
Whenever you edit these notes, stick to mechanical concepts such as builder modes, preview behavior, runtime guards, and authority flow. Avoid proprietary nouns. The goal is to have a drop-in doc system that any GAIS browser-only project can follow to keep governance, contracts, tests, tooling, and narrative work in sync.
