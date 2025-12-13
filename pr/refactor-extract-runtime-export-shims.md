# PR: Extract runtime/export logic from demo into services (shimmed)

This PR moves runtime and export logic out of `demo/` into canonical `services/` and `stores/` folders, replacing demo implementations with shims. No governance changes or re-architecting.

Summary of moves:
- services/export: `generator`, `transformer`, `renderer`, `serialization`, `validator`, `types`, `manifest`
- services/runtime: `actionExecutor`, `adapterOrchestrator`, `envelope`, `boxModel`, `layoutUtils`
- services/registry/runtime: registry, adapters and types
- services/utils: `componentToTemplate`, `lorem`
- services/ai: `reducer`
- stores: `treeSlice`, `uiSlice`, `selectionSlice`, `projectSlice`, `treeUtils`, `historyUtils`, `slices/types`
- demo: replaced many impls with shims (re-exports or wrappers), including builder slices, export pipeline, layout logic, and registry runtime shims.

Checks done:
- `./scripts/check-shim-purity.sh` — passed.
- Editor TypeScript checks (no Node runtime available for `tsc`) — no type errors seen.
- `./scripts/check-contract.sh` — contract checks show pre-existing documentation/contract issues (unchanged by this PR).

Notes:
- Mechanical extraction only; no renames or new abstractions.
- Demo continues to function as a host app with shims.
- CI/PR should run TypeScript and the shim/contract checks.

Next steps:
- If CI finds errors, patch minimal import/type issues caused by extraction only.
- Once CI passes, merge and continue additional extraction loops if required.

- Note: This PR intentionally limits scope to code extraction only; CI failures are pre-existing documentation contract issues and will be remediated in a separate docs-only PR.
