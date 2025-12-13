



# Section Zero: Core Directives
1.  **Immutability:** You must not alter or delete the rules in this "Section Zero".
2.  **Atomicity:** Every task must be atomic, actionable, and represent a single, verifiable change.
3.  **Decomposition:** Large requests will be broken down into multiple tasks, organized into phases. This `todo.md` is often refilled from a specification document in `/docs/`.

> ⚠️ Scope Note
>
> This `todo.md` tracks **architectural and feature execution only**. Governance, CI enforcement, and audit tooling live in `/docs` and CI workflows and are **not** tracked as executable tasks here unless they directly unblock a phase step.

**Invariant:** Execution plans must not become policy documents.



# Project Status

## Active Sprint

### 👆 PHASE 26: Drag Engine v2 (Touch & Accessibility) (Active)
*Replace the native HTML5 Drag API with a custom Pointer Events engine to support touch devices and ensure 100% reliable Escape key handling.*
- **Spec:** `docs/roadmap/spec-drag-lifecycle.md`

#### Step 1: Unified Pointer Events
- [x] **Drag Layer Refactor:** Update `DragLayer.tsx` to listen to `pointermove` and `pointerup` (replacing mouse events).
- [x] **Interaction Hooks:** Update `usePaletteInteractions` and `useNodeLogic` to use `onPointerDown` with `setPointerCapture`.
- [x] **Threshold Logic:** Implement a 3px movement threshold in `useNodeLogic` to distinguish clicking/selecting from dragging.

#### Step 2: Auto-Scrolling & Polish
- [x] **Auto-Scroll Engine:** Implement edge-detection in `DragLayer` to scroll the canvas when dragging near the viewport edge.
- [x] **Touch Validation:** Ensure dragging works on mobile emulation without text selection or page scrolling interference (`touch-action: none`).


### Backlog

#### 🖼️ EPIC: Icon Library Browser
*Add a comprehensive catalog of all Lucide icons to the Material Library.*
- **Specification:** `docs/roadmap/spec-icon-library.md`
- **Tasks:**
    - [x] **Scaffold Component:** Create `demo/sections/IconLibrarySection.tsx` with dynamic import of `lucide-react`.
    - [x] **Implement Filtering & Pagination:** Add search logic and batch rendering to prevent lag.
    - [x] **Integrate to Kitchen Sink:** Add "Icons" tab to `KitchenSink.tsx`.

#### Phase 19: AI-Powered Creation
*   **Goal**: Leverage AI to accelerate the creation of initial page layouts.*
- [x] **EPIC: Procedural Template Wizard (v1)**
    - [x] Implement the multi-step wizard UI as a modal (`TemplateWizard.tsx`).
    - [x] Develop the prompt builder service that compiles user choices into a Gemini-ready prompt.
    - [x] Integrate the Gemini API call with a strict JSON `responseSchema` to generate a valid `Template` object.
    - [x] Wire the wizard's "Create Page" action to `useBuilderStore.loadProject`.
- [x] **EPIC: Procedural Page Wizard (v2 - Full Implementation)** (per `spec-procedural-page-wizard.md`)
    - [x] Refactor the Wizard into a Full-Page Modal overlay.
    - [x] Implement Page Archetype selection with "Instructor Voice" microcopy.
    - [x] Implement Content Strategy controls (Lorem Ipsum and Picsum integration).
    - [x] Implement Section Detail overrides (e.g., Hero content settings).
    - [x] Ensure output template respects the "No Hidden Logic" contract.

#### Phase 20: Advanced Export Engine
*   **Goal**: Provide a flexible export mechanism to translate Loom projects into server-rendered templates.*
- [x] **EPIC: Go Template Export** (per `spec-go-template-export.md`)
    - [x] Design the intermediate "Export AST" format.
    - [x] Implement the transformation logic from `BuilderState` to the Export AST.
    - [x] Develop the UI for selecting the Go Template target and viewing the output.

#### Phase 14: Architectural Implementation (Engine Hardening)
*Implement features and correct weaknesses identified in the Architectural Fortification phase. See `docs/TECH_DEBT.md` (Tier 1).* 
- [x] **Drag & Drop Engine**: Implement a "controlled drag layer" to replace or supplement the native HTML5 Drag API, ensuring contract adherence for Escape handling and touch support (per `HARD_PROBLEMS.md`).
- [x] **Undo System**: Refactor history snapshots to strictly adhere to `spec-undo-semantics.md` (e.g., debounce text inputs, commit slider changes on mouse up).
- [x] **Drop Zone Logic**: Implement the strict Conflict Resolution Hierarchy for unambiguous drop targeting (per `spec-drag-lifecycle.md`).

#### 🖼️ EPIC: Rapid Scaffolding (Placeholders)
*Accelerate layout creation with dedicated placeholder components.*
- **TDD Plan:** `tdd-content-placeholders.md`
- **Key Features:**
    - [x] **Lorem Ipsum Node:** Configurable static text generation.
    - [x] **Picsum Image Node:** Reliable placeholder imagery with safe export handling.
    - [x] **UX Contract:** Explicit "Placeholder" status in Inspector and Export.

---

### Future Phases: Professional-Grade Polish & Extensibility
These epics represent long-term goals that will build upon the completed phases to deliver a world-class creative suite.

#### 🔗 EPIC: Full Logic Lab Integration
*Bridge the gap between the abstract Behavior Engine and the Design Canvas.*
- **Specification:** `spec-visual-logic.md`
- **Goals:**
    - [x] Enable binding of UI element events (`onClick`) to trigger flows in the Behavior Engine.
    - [x] Allow logic flows to update the `runtimeStore`, causing the UI to react.

- [ ] You are **not** in GAIS
- [ ] You have full file delete / rename capability
- [ ] Project builds successfully **before** refactor
- [ ] All tests (if runnable) pass
- [x] Git branch created: `refactor/canonical-structure`
- [ ] `restructuration-plan.md` reflects **target layout**

> **Invariant:** No GAIS workarounds in this phase.

### GAIS Protections
> Note: This section captures governance constraints and protections. These are ambient constraints (META) and not execution tasks unless they directly unblock a phase.


---

### 1. Freeze Authority & Scope [META]

- [x] Identify canonical runtime roots (decide once): `ui/`, `stores/`, `services/`, `utils/`, `config/`
- [x] Confirm `demo` is a host app (runtime **must not import** from `demo/`)
- [x] Confirm docs are not moving yet

---

### 2. Create Target Folders First

Before moving any files:
- [x] Create all target directories (even empty)
- [x] Add placeholder `index.ts` barrels where appropriate
- [x] Do **not** add exports yet

This avoids circular refactors.

---

### 3. Move Files (One Domain at a Time)

Rule: Never move multiple domains at once.

Recommended order:
1. `utils/`
2. `stores/`
3. `services/`
4. `ui/`
5. `config/`
6. `demo/` (last)

Per-file Move Procedure (Repeatable):
- [ ] Cut file to new location
- [ ] Update all imports referencing it
- [ ] Fix relative paths (no alias shortcuts)
- [ ] Delete original file
- [ ] Ensure no duplicate definitions remain

> ❌ Do not leave forwarding files, re-exports, or empty shells.

---

### 4. Normalize Import Paths Immediately

After each domain move:
- [ ] Run global search for old path strings
- [ ] Confirm zero imports reference removed folders
- [ ] Fix any accidental deep imports

Example check:
```
grep -R "utils/runtimeBoundary" .
```
Must return **zero results**.

---

### 5. Enforce Demo Boundary (Now, Not Later)

- [ ] Search for any import from `demo/**` outside `demo/**`
- [ ] Refactor shared logic **out of demo**
- [ ] Demo may import runtime
- [ ] Runtime may **never** import demo

If you find shared logic: move it to `services/` or `utils/`.

---

### 6. Fix Entry Points & Routing

- [ ] Confirm `App.tsx` imports only runtime + demo routing
- [ ] Ensure demo routes are isolated
- [ ] Verify deleting `demo/` would not break runtime types, services, stores, or ui

Simulate the condition mentally; don't delete `demo/` yet.

---

### 7. Run TypeScript Integrity Pass

- [ ] No TS errors
- [ ] No unused imports caused by moves
- [ ] No circular dependencies introduced
- [ ] No `any` introduced to “make it compile”

If something breaks: fix structure, **not** types.

---

### 8. Add CI Rules (Clean Version Only) [META]

Now that the structure is clean:
- [ ] Add CI rule: forbid imports from `demo/**` outside `demo/**`
- [ ] Add CI rule: forbid imports from deprecated folders
- [ ] CI assumes **no legacy paths exist**

> Do **not** add legacy exceptions yet.

---

### 9. Commit in Logical Chunks

Recommended commits:
- `chore: prepare canonical folders`
- `refactor(utils): move and normalize`
- `refactor(stores): move and normalize`
- `refactor(services): move and normalize`
- `refactor(ui): move and normalize`
- `refactor(demo): isolate host app`
- `ci: enforce runtime/demo boundary`

Each commit should compile independently.

---

### 10. Final Validation (Critical)

Before merging:
- [ ] No duplicate files exist

---

### Execution Progress: File Movement (Status)

- [x] Full `utils/` move pass — canonical utils moved to `services/utils` (lorem, componentToTemplate)
- [x] Full `stores/` move pass — canonical slices and helpers moved to `stores/` (projectSlice, treeSlice, uiSlice, selectionSlice)
- [x] Full `services/` move pass — export/runtime logic moved to `services/` and demo files shimmed
- [ ] Full `ui/` move pass — pending: review generic UI components to extract into `ui/` if appropriate
- [x] `config/` normalization — target config files moved to `config/` and pluralized where needed
- [ ] Final `demo/` isolation pass — pending: verify only UI + shims remain in `demo/`
 - [ ] Final `demo/` isolation pass — pending: verify only UI + shims remain in `demo/`
- [~] TS integrity sweep — editor TS checks pass for changed files; CI `tsc` will run on PR
- [ ] Final validation checklist — pending: final CI and manual review
 - [ ] Final validation checklist — pending: final CI and manual review
 - [x] PR Summary added: `PR_SUMMARY.md` — ready for review

#### UI Move Pass — Candidate List (Initial)

- [x] ThemePreview (demo/theme/ThemePreview.tsx) — Preview UI; candidate for `ui/` if reused; extracted.
- [x] ThemeControls (demo/theme/ThemeControls.tsx) — Control UI; candidate only if it is generic; extracted.
- [x] StoryPreview (demo/story/StoryPreview.tsx) — Extracted to `ui/`.
- [x] StoryToolbar (demo/story/StoryToolbar.tsx) — Extracted to `ui/`.
Additional story components extracted: StoryEditor, StorySidebar, StoryLogicView.
- [x] CompositeSection (demo/sections/CompositeSection.tsx) — Extracted to `ui/sections/CompositeSection.tsx`.
- [x] StatusSection (demo/sections/StatusSection.tsx) — Extracted to `ui/sections/StatusSection.tsx`.
 - [x] TablesSection (demo/sections/TablesSection.tsx) — Extracted to `ui/sections/TablesSection.tsx`.
 - [x] CarouselSection (demo/sections/CarouselSection.tsx) — Extracted to `ui/sections/CarouselSection.tsx`.

Recommendation: For each candidate, validate there are no editor-specific imports (builder store, demo-only utilities). If none, move to `ui/` and replace original with a shim re-export.


Notes: The PR `refactor/extract-runtime-export-shims` contains many of these changes; CI shim purity passed while contract checks flag pre-existing documentation issues that will be remediated in a separate PR.

- [ ] No empty legacy files exist
- [ ] All imports point to canonical paths
- [ ] CI rules pass
- [ ] Repo reflects final intended architecture

---

### 11. What You Explicitly Do NOT Do

- ❌ No GAIS shims
- ❌ No legacy barrels
- ❌ No placeholder re-exports
- ❌ No temporary files
- ❌ No compatibility hacks

Those belong to a different phase.

---

### 12. Post-Refactor Next Steps (Not Part of This Checklist)

After this phase is merged:
- GAIS re-import plan
- Legacy barrel strategy (if needed)
- Docs folder restructuring
- Export-only entrypoint

---

### Canonical Rule (Remember This)

> Architecture is defined where you can delete files. Compatibility is handled where you cannot.

---

### Next Actions (Optional)
- [ ] generate exact CI rules for this phase
- [ ] review your target folder map before you start
- [ ] produce a GAIS re-entry checklist that pairs with this one

---

### 👋 PHASE 27: Feedback & Interactive UI Extraction (Pending)
Target: Extract interactive, feedback-driven UI into `ui/` while preserving inert editor behavior and isolating runtime logic into `services/` or `stores/`.

- Scope Note: This phase contains higher-risk items that commonly include runtime logic (e.g., toasts, modals, accordions). For each candidate, split logic out to `services/` or `stores` and keep presentation-only code in `ui/`.

#### Candidate Components
- [ ] Inspector / BuilderProperties (`demo/builder/BuilderProperties.tsx`, `demo/builder/properties/*`) — Move visual-only parts to `ui/molecules/`; keep stateful logic in `stores/`.
- [ ] Toast Notifications (`ui/ToastContainer.tsx` / `stores/toastStore.ts`) — Ensure `toastStore` remains in `stores/` and the UI component moves to `ui/molecules`.
- [ ] Modal & Confirmations (`ui/Modal.tsx`, Preline modals) — Extract static markup; add `inert` prop for editor mode; runtime behavior lives in `services/preline-adapter`.
- [ ] Preline Playground interactive elements (`demo/sections/PrelinePlayground.tsx`) — Move static examples to `ui/sections/PrelinePlayground`, split runtime behavior to `services/preline/`.
- [ ] Forms & Validation (`ui/Input.tsx`, `ui/TextArea.tsx`, FormField) — Extract `FormField` and `Input` to `ui/atoms` and `ui/molecules`, keep schema logic & Zod helpers in `services/form`.
- [ ] Step Inspector / LogicLab panels (`demo/LogicLab.tsx`) — move presentation to `ui/molecules` and logic to `services/` or `stores/`.
- [ ] Runtime Workbench panels that illustrate behavior (live examples) — move static visual cases to `ui/`; keep interactive behaviors in `services` only.

---

#### Phase 27 Execution Backlog — Property Editors (Priority 1)
- For each property editor in `demo/builder/properties/`, perform the following substeps:
    - [ ] Audit imports: list external runtime imports vs demo-only imports.
    - [ ] Extract: Move presentational markup and style into `ui/molecules/properties/` as `*EditorView.tsx`.
    - [ ] Adapter Wrapper: Keep a small `demo/builder/properties/*` file that reads from `useBuilderStore` and passes props to `ui/` component.
    - [ ] Shim Re-export: Replace `demo` property file with shim that re-exports adapter wrapper if necessary.
    - [ ] Purity & TS: Run `scripts/check-shim-purity.sh` and TypeScript checks.
- Items:
    - [x] `LayoutEditor.tsx` — (audit complete: layoutUtils already in `services/runtime`.)
    - [x] `LayoutEditorView` skeleton in `ui/molecules/properties/LayoutEditorView.tsx` — created presentational-only component that consumes props for layout, overrides, and callbacks.
    - [x] `LayoutEditor` demo wrapper replaced to use `LayoutEditorView` and pass live store props (adapter wrapper). — done
    - [x] `FlexControls` and `GridControls` extraction: create `ui/molecules/properties/*` controls and make the demo adapter pass props/callbacks; ensure tests and shim purity pass.
        - [ ] Audit `FlexControls` and `GridControls` for direct runtime/demo imports.
        - [x] Extract presentational `FlexControlsView` and `GridControlsView` to `ui/molecules/properties/`.
        - [x] Update demo adapters to pass props and handle store interactions.
        - [x] Validate shim purity and add TDD tests for control behavior.
    - [ ] `InteractionEditor.tsx`
    - [ ] `ContentEditor.tsx`
    - [ ] `StyleEditor.tsx`
    - [ ] `LogicEditor.tsx`
    - [ ] `SchemaEditor.tsx`
    - [ ] `RuntimeVariableEditor.tsx`
    - [ ] `PageSettingsEditor.tsx`
    - [ ] `DocumentEditor.tsx`

---

#### Recent Activity (Dec 13, 2025)

- 2025-12-13: **Panel Header Standardization:** Introduced `ui/molecules/PanelHeaderView.tsx` and replaced inline panel/header markup across builder and palette panes (e.g., `BuilderProperties.tsx`, `BuilderNavigator.tsx`, `TemplatesTab.tsx`, `MarkdownTab.tsx`, `ExportModal.tsx`, `ComponentsTab.tsx`). Changes committed to branch `refactor/phase27-layout-editor` and pushed. — tool-assisted
- 2025-12-13: **Template Card:** `TemplateCardView` added to `ui/molecules` and wired into `demo/builder/palette/TemplatesTab.tsx`. — tool-assisted

Notes: Continuing sweep for small card patterns and other presentational extractions (in-progress). Run `scripts/check-shim-purity.sh` after each extraction and ensure `get_errors` fixups for typings are addressed in follow-up dev-dependency updates.

- 2025-12-13: **ComponentCardView:** Extracted `ui/molecules/ComponentCardView.tsx` and replaced inline component cards in `demo/builder/palette/ComponentsTab.tsx`. — tool-assisted

---

#### Phase 27 Execution Backlog — Modals/Toasts/Preline (Priority 2)
- Items:
    - [ ] `Modal.tsx` and demo preline modals — extract UI → `ui/` and runtime init to `services/preline`.
    - [ ] `ToastContainer.tsx` — move UI; keep `toastStore` in `stores/toastStore.ts`.
    - [ ] `PrelinePlayground.tsx` — convert to static examples and move to `ui/sections/PrelinePlayground`.

---

#### Phase 27 Execution Backlog — Forms & Validation (Priority 3)
- Items:
    - [ ] `Input.tsx`, `TextArea.tsx`, and `FormField` — extract to `ui/atoms` & `ui/molecules` and keep validation in `services/form`.
    - [ ] Form-binding utils (`Zod` helpers) — ensure these live in `services/form` or `utils` and are not demo-specific.

---

#### Phase 27 Execution Backlog — Step Inspector / LogicLab (Priority 4)
- Items:
    - [ ] `LogicLab.tsx` panels: Extract UI and components into `ui/molecules/logic/` and keep store/service integration within `demo` wrappers or `services/`.
    - [ ] `StepInspector` — ensure inspector visual components are in `ui/` and logic in `services/`.

---

#### Phase 27 Orchestration & Acceptance
- [ ] For each extracted file: update `ui/index.ts` exports and add a short entry to `docs/tdd-*` describing the inert vs runtime behavior.
- [ ] Run `scripts/check-shim-purity.sh` after each round of extractions and ensure green before committing.
- [ ] Create branch `refactor/phase27-feedback` and perform extracts in small PRs (one editor or component per PR).


#### Per-Component Checklist
- [ ] Candidate Audit: Ensure the file doesn't import `demo/` or runtime-only artifacts. If it does, list which lines require refactor.
- [ ] Split: If runtime logic exists (API calls, side effects, Zustand stores), extract to `services/` or `stores/` and import them from there.
- [ ] UI Extraction: Move the presentational TSX to `ui/atoms`/`molecules`/`sections` as appropriate. Add or reuse `FormField` abstraction when relevant.
- [ ] Inert Prop: Add `inert` or `editorDisabled` prop so components render non-interactive markup in the Builder without wiring runtime behaviors.
- [ ] Shim Re-export: Replace original file in `demo/` with a shim re-exporting the new `ui/` component.
- [ ] Validation: Run `scripts/check-shim-purity.sh` after each extraction and verify output.
- [ ] TypeScript sweep: Run an editor TS check and resolve any new errors locally.
- [ ] Final re-export: Add a canonical export to `ui/index.ts` if this component is intended to be reused across the runtime.

#### Safety & TDD
- [ ] For each extracted component, write or extend a TDD pack in `docs/tdd-*` that captures the UX contract for inert vs runtime behavior (e.g., `tdd-builder-safety`, `tdd-low-code-superpowers`).
- [ ] Maintain backward-compatible API; prefer props over context where possible to reduce coupling.

#### Acceptance Criteria
- [ ] No runtime code imports from `demo/` remain outside `demo/`.
- [ ] Each shim re-export passes `scripts/check-shim-purity.sh`.
- [ ] `ui/` components are pure presentation, with runtime responsibilities in `services/` or `stores/`.
- [ ] No changes to `docs/` or governance in this PR — those happen in a follow-up docs remediation PR.

#### Notes & Risk
- Some Preline components are expected to require a `services/preline` adapter due to internal initialization; plan to extract adapters only in a follow-up extraction if it proves risky.
- If a component is deeply coupled to runtime state, prefer creating a facade in `ui/` that accepts props and defers to a `services/` adapter for preview-only wiring.

---

### Safety Reminder: Buildless Development
- Do not run `npm run build` during the active refactor phase. This repo is currently in GAIS dev mode and should remain buildless until architecture stabilization. See `agent.md` for the canonical rule.

---

### 0. Preconditions (Do Not Skip)

- [ ] You are **not** in GAIS
- [ ] You have full file delete / rename capability
- [ ] Project builds successfully **before** refactor
- [ ] All tests (if runnable) pass
- [x] Git branch created: `refactor/canonical-structure`
- [ ] `restructuration-plan.md` reflects **target layout`

> **Invariant:** No GAIS workarounds in this phase.

---

### 1. Freeze Authority & Scope [META]

- [x] Identify canonical runtime roots (decide once): `ui/`, `stores/`, `services/`, `utils/`, `config/`
- [x] Confirm `demo` is a host app (runtime **must not import** from `demo/`)
- [x] Confirm docs are not moving yet

---

### 2. Create Target Folders First

Before moving any files:
- [x] Create all target directories (even empty)
- [x] Add placeholder `index.ts` barrels where appropriate
- [x] Do **not** add exports yet

This avoids circular refactors.

---

### 3. Move Files (One Domain at a Time)

Rule: Never move multiple domains at once.

Recommended order:
1. `utils/`
2. `stores/`
3. `services/`
4. `ui/`
5. `config/`
6. `demo/` (last)

Per-file Move Procedure (Repeatable):
- [ ] Cut file to new location
- [ ] Update all imports referencing it
- [ ] Fix relative paths (no alias shortcuts)
- [ ] Delete original file
- [ ] Ensure no duplicate definitions remain

> ❌ Do not leave forwarding files, re-exports, or empty shells.

---

### 4. Normalize Import Paths Immediately

After each domain move:
- [ ] Run global search for old path strings
- [ ] Confirm zero imports reference removed folders
- [ ] Fix any accidental deep imports

Example check:
```
grep -R "utils/runtimeBoundary" .
```
Must return **zero results**.

---

### 5. Enforce Demo Boundary (Now, Not Later)

- [ ] Search for any import from `demo/**` outside `demo/**`
- [ ] Refactor shared logic **out of demo`
- [ ] Demo may import runtime
- [ ] Runtime may **never** import demo

If you find shared logic: move it to `services/` or `utils/`.

---

### 6. Fix Entry Points & Routing

- [ ] Confirm `App.tsx` imports only runtime + demo routing
- [ ] Ensure demo routes are isolated
- [ ] Verify deleting `demo/` would not break runtime types, services, stores, or ui

Simulate the condition mentally; don't delete `demo/` yet.

---

### 7. Run TypeScript Integrity Pass

- [ ] No TS errors
- [ ] No unused imports caused by moves
- [ ] No circular dependencies introduced
- [ ] No `any` introduced to “make it compile”

If something breaks: fix structure, **not** types.

---

### 8. Add CI Rules (Clean Version Only)

Now that the structure is clean:
- [ ] Add CI rule: forbid imports from `demo/**` outside `demo/**`
- [ ] Add CI rule: forbid imports from deprecated folders
- [ ] CI assumes **no legacy paths exist**

> Do **not** add legacy exceptions yet.

---

### 9. Commit in Logical Chunks

Recommended commits:
- `chore: prepare canonical folders`
- `refactor(utils): move and normalize`
- `refactor(stores): move and normalize`
- `refactor(services): move and normalize`
- `refactor(ui): move and normalize`
- `refactor(demo): isolate host app`
- `ci: enforce runtime/demo boundary`

Each commit should compile independently.

---

### 10. Final Validation (Critical)

Before merging:
- [ ] No duplicate files exist
- [ ] No empty legacy files exist
- [ ] All imports point to canonical paths
- [ ] CI rules pass
- [ ] Repo reflects final intended architecture

---

### 11. What You Explicitly Do NOT Do

- ❌ No GAIS shims
- ❌ No legacy barrels
- ❌ No placeholder re-exports
- ❌ No temporary files
- ❌ No compatibility hacks

Those belong to a different phase.

---

### 12. Post-Refactor Next Steps (Not Part of This Checklist)

After this phase is merged:
- GAIS re-import plan
- Legacy barrel strategy (if needed)
- Docs folder restructuring
- Export-only entrypoint

---

### Canonical Rule (Remember This)

> Architecture is defined where you can delete files. Compatibility is handled where you cannot.

---

### Next Actions (Optional)
- [ ] generate exact CI rules for this phase
- [ ] review your target folder map before you start
- [ ] produce a GAIS re-entry checklist that pairs with this one

- **Goals:**
    - [x] Enable binding of UI element events (`onClick`) to trigger flows in the Behavior Engine.
    - [x] Allow logic flows to update the `runtimeStore`, causing the UI to react.



---

## 🛠 VS Code Migration Checklist (Canonical Refactor Phase)

This is a VS Code–specific migration checklist, written as an execution playbook. It assumes full filesystem control, Copilot available, no GAIS constraints, and a goal of ending with a clean canonical structure.

---

### Refactor Invariants (Do Not Violate)

- Runtime code must never import from `demo/`
- Deleting `demo/` must not break TypeScript
- No forwarding or compatibility re-exports during this phase
- Each step must leave the repo in a compilable state

### 0. Preconditions (Do Not Skip)

- [ ] You are **not** in GAIS
- [ ] You have full file delete / rename capability
- [ ] Project builds successfully **before** refactor
- [ ] All tests (if runnable) pass
- [x] Git branch created: `refactor/canonical-structure`
- [ ] `restructuration-plan.md` reflects **target layout**

> **Invariant:** No GAIS workarounds in this phase.

---

### 1. Freeze Authority & Scope [META]

- [ ] Identify canonical runtime roots (decide once): `ui/`, `stores/`, `services/`, `utils/`, `config/`
- [ ] Confirm `demo` is a host app (runtime **must not import** from `demo/`)
- [ ] Confirm docs are not moving yet

---

### 2. Create Target Folders First

Before moving any files:
- [x] Create all target directories (even empty)
- [x] Add placeholder `index.ts` barrels where appropriate
- [x] Do **not** add exports yet

This avoids circular refactors.

---

### 3. Move Files (One Domain at a Time)

Rule: Never move multiple domains at once.

Recommended order:
1. `utils/`
2. `stores/`
3. `services/`
4. `ui/`
5. `config/`
6. `demo/` (last)

Per-file Move Procedure (Repeatable):
- [ ] Cut file to new location
- [ ] Update all imports referencing it
- [ ] Fix relative paths (no alias shortcuts)
- [ ] Delete original file
- [ ] Ensure no duplicate definitions remain

> ❌ Do not leave forwarding files, re-exports, or empty shells.

---

### 4. Normalize Import Paths Immediately

After each domain move:
- [ ] Run global search for old path strings
- [ ] Confirm zero imports reference removed folders
- [ ] Fix any accidental deep imports

Example check:
```
grep -R "utils/runtimeBoundary" .
```
Must return **zero results**.

---

### 5. Enforce Demo Boundary (Now, Not Later)

- [ ] Search for any import from `demo/**` outside `demo/**`
- [ ] Refactor shared logic **out of demo**
- [ ] Demo may import runtime
- [ ] Runtime may **never** import demo

If you find shared logic: move it to `services/` or `utils/`.

---

### 6. Fix Entry Points & Routing

- [ ] Confirm `App.tsx` imports only runtime + demo routing
- [ ] Ensure demo routes are isolated
- [ ] Verify deleting `demo/` would not break runtime types, services, stores, or ui

Simulate the condition mentally; don't delete `demo/` yet.

---

### 7. Run TypeScript Integrity Pass

- [ ] No TS errors
- [ ] No unused imports caused by moves
- [ ] No circular dependencies introduced
- [ ] No `any` introduced to “make it compile”

If something breaks: fix structure, **not** types.

---

### 8. Add CI Rules (Clean Version Only)

Now that the structure is clean:
- [ ] Add CI rule: forbid imports from `demo/**` outside `demo/**`
- [ ] Add CI rule: forbid imports from deprecated folders
- [ ] CI assumes **no legacy paths exist**

> Do **not** add legacy exceptions yet.

---

### 9. Commit in Logical Chunks

Recommended commits:
- `chore: prepare canonical folders`
- `refactor(utils): move and normalize`
- `refactor(stores): move and normalize`
- `refactor(services): move and normalize`
- `refactor(ui): move and normalize`
- `refactor(demo): isolate host app`
- `ci: enforce runtime/demo boundary`

Each commit should compile independently.

---

### 10. Final Validation (Critical)

Before merging:
- [ ] No duplicate files exist
- [ ] No empty legacy files exist
- [ ] All imports point to canonical paths
- [ ] CI rules pass
- [ ] Repo reflects final intended architecture

---

### 11. What You Explicitly Do NOT Do

- ❌ No GAIS shims
- ❌ No legacy barrels
- ❌ No placeholder re-exports
- ❌ No temporary files
- ❌ No compatibility hacks

Those belong to a different phase.

---

### 12. Post-Refactor Next Steps (Not Part of This Checklist)

After this phase is merged:
- GAIS re-import plan
- Legacy barrel strategy (if needed)
- Docs folder restructuring
- Export-only entrypoint

---

### Canonical Rule (Remember This)

> Architecture is defined where you can delete files. Compatibility is handled where you cannot.

---

### Stop If Any Occur

- You are tempted to leave a temporary forwarding file
- You add `any` to make TypeScript pass
- You are planning to move multiple domains at once
- You are unsure which file owns a concept

---

### Next Actions (Optional)
- [ ] generate exact CI rules for this phase
- [ ] review your target folder map before you start
- [ ] produce a GAIS re-entry checklist that pairs with this one


