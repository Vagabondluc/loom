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
- 2025-12-13: Moved `projectSlice` implementation to `stores/projectSlice` and replaced demo with shim. — tool-assisted
- 2025-12-13: Replaced demo builder `treeSlice`, `uiSlice`, and `selectionSlice` with shims re-exporting canonical `stores` implementations. — tool-assisted
- 2025-12-13: Moved `export/manifest` logic to `services/export/manifest` and replaced demo with shim. — tool-assisted
- 2025-12-13: Replaced local `resolveEffectiveLayout` in `LayoutEditor` with canonical `services/runtime/layoutUtils` via shim. — tool-assisted
- 2025-12-13: Ran TypeScript validation via workspace checks; no type errors found (Node not present to run `tsc`). — tool-assisted
- 2025-12-13: Ran shim purity & contract checks; shim purity passed; contract checks show pre-existing doc issues. — tool-assisted
- 2025-12-13: Created branch `refactor/extract-runtime-export-shims` and committed extraction changes (08d0af62, 94dfd7a). — tool-assisted
- 2025-12-13: Created canonical target folders and placeholder index.ts files for `stores`, `services`, `utils`, and `config`. — tool-assisted

- 2025-12-13: Normalized attributions in todo-log.md to '— tool-assisted'. — tool-assisted

- 2025-12-13: Updated services/promptBuilder to accept `availableComponents` param and removed direct demo import; updated TemplateWizard to pass the registry keys. — tool-assisted
- 2025-12-13: Verified no files in `services/`, `stores/`, `utils/`, `ui/`, or `config/` import from `demo/`. — tool-assisted
- 2025-12-13: Added CI rule `.github/workflows/no-demo-imports.yml` to enforce runtime → demo import guard. — tool-assisted
 - 2025-12-13: Updated `scripts/check-contract.sh` to ignore fenced code blocks for governance checks, refine REQ regexes, and allowed `App.tsx` as host demo import. — tool-assisted
 - 2025-12-13: Created CI workflow `.github/workflows/ci-enforce.yml` to run `scripts/check-contract.sh`. — tool-assisted
 - 2025-12-13: Moved `REQ_ID_TEMPLATE.md` from docs/governance to docs/CONTRACTS and added a governance redirect. — tool-assisted
 - 2025-12-13: Moved Node-based contract checker to `docs/tools/check-contract.node.mjs`, updated workflows to run it, and added a Node-only header. — tool-assisted
 - 2025-12-13: Added CI check to verify Node APIs are confined to `docs/tools` only. — tool-assisted
 - 2025-12-13: Added `docs/tools/README.md` documenting Node-only audit tools usage. — tool-assisted
 - 2025-12-13: Updated `docs/AUDIT_ENFORCEMENT.md` with a Node-based tools transitional paragraph and Strategy A canonical model. — tool-assisted
 - 2025-12-13: Tightened `agent.md` Node exception language to limit Node APIs to `docs/tools` for governance/CI only. — tool-assisted
 - 2025-12-13: Added CI check in `.github/workflows/no-node.yml` to forbid `.node.` files and node APIs outside `docs/tools`. — tool-assisted
 - 2025-12-12: Added scope note and invariants to `todo.md` clarifying that governance and CI belong in `/docs` and CI flows, not as plan tasks; annotated governance sections as [META]. — tool-assisted
 - 2025-12-12: Added `scripts/check-shim-purity.sh` and CI enforcement job to `.github/workflows/ci-enforce.yml` to enforce runtime shim purity; integrated into `scripts/check-contract.sh`. — tool-assisted
 - 2025-12-13: Extracted `CompositeSection` to `ui/sections/CompositeSection` and replaced `demo/` shim. — tool-assisted
 - 2025-12-13: Extracted `StatusSection` to `ui/sections/StatusSection` and replaced `demo/` shim. — tool-assisted
