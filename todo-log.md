# TODO Log

This file captures the running log of task progress for Phase 26 and canonical refactor preparations.

Entries:

- 2025-12-12: Started TODO tracking; created initial log. — tool-assisted
- 2025-12-13: Added .copilotignore to prevent Copilot from treating repo as Node project. — tool-assisted
- 2025-12-13: Added README_GAIS.md to clarify GAIS-only workflow. — tool-assisted
- 2025-12-13: Added CI workflow to block node artifacts. — tool-assisted
- 2025-12-13: Git not initialized; could not create branch `refactor/canonical-structure`. — tool-assisted
- 2025-12-13: Added explicit agent rule to `AGENTS.md` forbidding npm/yarn/pnpm suggestions. — tool-assisted
- 2025-12-13: Initialized git, created branch `refactor/canonical-structure`, and committed GAIS guard files. — tool-assisted
- 2025-12-13: Committed additional updates to `todo.md`, `AGENTS.md`, and `todo-log.md` on branch `refactor/canonical-structure`. — tool-assisted
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
 - 2025-12-13: Tightened `AGENTS.md` Node exception language to limit Node APIs to `docs/tools` for governance/CI only. — tool-assisted
 - 2025-12-13: Added CI check in `.github/workflows/no-node.yml` to forbid `.node.` files and node APIs outside `docs/tools`. — tool-assisted
 - 2025-12-12: Added scope note and invariants to `todo.md` clarifying that governance and CI belong in `/docs` and CI flows, not as plan tasks; annotated governance sections as [META]. — tool-assisted
 - 2025-12-12: Added `scripts/check-shim-purity.sh` and CI enforcement job to `.github/workflows/ci-enforce.yml` to enforce runtime shim purity; integrated into `scripts/check-contract.sh`. — tool-assisted
 - 2025-12-13: Extracted `CompositeSection` to `ui/sections/CompositeSection` and replaced `demo/` shim. — tool-assisted
 - 2025-12-13: Extracted `StatusSection` to `ui/sections/StatusSection` and replaced `demo/` shim. — tool-assisted
 - 2025-12-13: Extracted `TablesSection` to `ui/sections/TablesSection` and replaced `demo/` shim. — tool-assisted
 - 2025-12-13: Extracted `CarouselSection` to `ui/sections/CarouselSection` and replaced `demo/` shim. — tool-assisted
 - 2025-12-13: Added `PR_SUMMARY.md` with extraction details and paused further extraction for review. — tool-assisted
 - 2025-12-13: Created Phase 27: Feedback & Interactive UI Extraction candidate list and per-component checklist in `todo.md`. — tool-assisted
 - 2025-12-13: Confirmed shim purity with `scripts/check-shim-purity.sh`; decision made: do not run `npm run build` during active refactor. — tool-assisted
 - 2025-12-13: Rebased `refactor/extract-runtime-export-shims` on remote head and paused for PR review. — tool-assisted
 - 2025-12-13: Added detailed Phase 27 Execution Backlog focusing on `demo/builder/properties` component shims and extraction plan. — tool-assisted
 - 2025-12-13: Audited `LayoutEditor.tsx`: found it uses `services/runtime/layoutUtils` and only demo store selectors; flagged as safe to extract UI view. — tool-assisted
 - 2025-12-13: Scheduled `LayoutEditor` as first extraction candidate (priority 1). — tool-assisted
 - 2025-12-13: Marked `LayoutEditor` audit complete and added task to scaffold `ui/molecules/properties/LayoutEditorView.tsx` as a presentational skeleton. — tool-assisted
 - 2025-12-13: Created `ui/molecules/properties/LayoutEditorView.tsx` skeleton and rewired `demo/builder/properties/LayoutEditor.tsx` to be an adapter wrapper using `LayoutEditorView`. — tool-assisted
 - 2025-12-13: Ran `scripts/check-shim-purity.sh` after the change; checks passed. — tool-assisted
 - 2025-12-13: Completed adapter wrapper for `LayoutEditor` to use `LayoutEditorView`; added next task to extract `FlexControls` and `GridControls`. — tool-assisted
 - 2025-12-13: Added detailed subtasks for `FlexControls` and `GridControls` extraction: audit, presentational view, adapter updates, shim purity checks. — tool-assisted
 - 2025-12-13: Implemented `FlexControlsView` and `GridControlsView` in `ui/molecules/properties` and updated demo adapters to use them; shim purity passed. — tool-assisted
 - 2025-12-13: Created PR #11: Phase 27: Extract LayoutEditorView (adapter/view split) targeting `refactor/extract-runtime-export-shims`. — tool-assisted
 - 2025-12-13: Rebased `refactor/phase27-layout-editor` on remote, resolved unstaged changes and re-pushed branch. — tool-assisted
 - 2025-12-13: Created `ui/molecules/PanelHeaderView.tsx`, replaced inline panel headers across builder and palette panes, and exported it via `ui/index.ts`. Changes committed to `refactor/phase27-layout-editor`. — tool-assisted
 - 2025-12-13: Added `TemplateCardView` to `ui/molecules` and wired it into `demo/builder/palette/TemplatesTab.tsx`. — tool-assisted
 - 2025-12-13: Added `TemplateCardView` to `ui/molecules` and wired it into `demo/builder/palette/TemplatesTab.tsx`. — tool-assisted
 - 2025-12-13: Added `DraggableBlockView` and replaced parsed-markdown blocks with it in `demo/builder/palette/MarkdownTab.tsx`. — tool-assisted
 - 2025-12-13: Extracted `ComponentCardView` to `ui/molecules` and replaced inline cards in `demo/builder/palette/ComponentsTab.tsx`. — tool-assisted
