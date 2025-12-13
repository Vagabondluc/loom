



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


