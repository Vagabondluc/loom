# TODO Log

This file captures the running log of task progress for Phase 26 and canonical refactor preparations.

Entries:

- 2025-12-12: Started TODO tracking; created initial log. — tool-assisted
- 2025-12-13: Added .copilotignore to prevent Copilot from treating repo as Node project. — tool-assisted
- 2025-12-13: Added README_GAIS.md to clarify GAIS-only workflow. — tool-assisted
- 2025-12-13: Added CI workflow to block node artifacts. — tool-assisted
- 2025-12-13: Git not initialized; could not create branch `refactor/canonical-structure`. — tool-assisted
- 2025-12-13: Added explicit agent rule to `agent.md` forbidding npm/yarn/pnpm suggestions. — tool-assisted
- 2025-12-13: Initialized git, created branch `refactor/canonical-structure`, and committed GAIS guard files. — tool-assisted
- 2025-12-13: Committed additional updates to `todo.md`, `agent.md`, and `todo-log.md` on branch `refactor/canonical-structure`. — tool-assisted
- 2025-12-13: Applied `todo.md` to branch `refactor/canonical-structure` and verified changes are committed. — tool-assisted
- 2025-12-13: Identified canonical runtime roots: `ui/`, `stores/`, `services/`, `utils/`, `config/`. — tool-assisted
- 2025-12-13: Created canonical target folders and placeholder index.ts files for `stores`, `services`, `utils`, and `config`. — tool-assisted

- 2025-12-13: Normalized attributions in todo-log.md to '— tool-assisted'. — tool-assisted

- 2025-12-13: Updated services/promptBuilder to accept `availableComponents` param and removed direct demo import; updated TemplateWizard to pass the registry keys. — tool-assisted
- 2025-12-13: Verified no files in `services/`, `stores/`, `utils/`, `ui/`, or `config/` import from `demo/`. — tool-assisted
- 2025-12-13: Added CI rule `.github/workflows/no-demo-imports.yml` to enforce runtime → demo import guard. — tool-assisted
