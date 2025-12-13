
# Completed Tasks Archive

This document contains a log of completed tasks, moved from the main `todo.md` file to keep it focused on active and upcoming work.

---

### Phase 25: Logic Runtime Integration
*Bridge the abstract Behavior Engine with the concrete Runtime Store to enable real side effects.*
- [x] **Type Definition:** Updated `LogicNode` in `types.ts` to include `config`.
- [x] **Engine Update:** Refactor `useLogicStore.ts` to execute side effects.
- [x] **Store Action:** Added `updateNodeConfig` to `useLogicStore`.
- [x] **Properties Panel:** Added configuration form in `LogicLab.tsx`.
- [x] **Integration Test:** Verified flow execution updates runtime state.

### Phase 24: Document Authoring Engine
*Transitioning documents from opaque blobs to structured, semantic trees (Markdown AST).*
- [x] **Centralize Parser:** Created `utils/markdown.ts` wrapping `marked`.
- [x] **Refactor Element Node:** Updated `ElementNode.tsx` to use the central utility.
- [x] **Refactor Markdown Import:** Updated `MarkdownTab.tsx` to use the AST lexer.
- [x] **Document Property Editor:** Created `DocumentEditor.tsx` with split-pane view.
- [x] **Structure Mode Support:** Enhanced visualizer to show Heading levels (H1-H6).

### 🔬 EPIC: Structure Mode 2.0
*Enhance Structure Mode with advanced layout debugging visualizations.*
- [x] **Flex Flow Arrows:** Visually indicate `flex-direction` and `gap`.
- [x] **Nesting Depth Shading:** Use translucent overlays to clarify hierarchy.
- [x] **Component Badges:** Show component labels and layout modes (Grid/Flex).
- [x] **Always-On Drop Zones:** Ensure drop targets are visible and stable in Structure Mode.
- [x] **Padding/Margin Heatmaps:** Visualize the box model on hover.

---

### Phase 23: Runtime Workbench & Adapter Architecture
*Transform the "Playground" into a rigorous testing environment and migrate Preline to the Adapter model.*
- [x] **Audit Registry:** Identify all Preline components in `registries.ts` and tag them with `kind: 'applet'` and `meta.runtimeAdapterId = 'preline'`.
- [x] **Define Adapter Interface:** Create `demo/builder/registry/runtime/RuntimeAdapterRegistry.ts` implementing the `supports`, `init`, `teardown` interface.
- [x] **Refactor Kitchen Sink:** Rename "Preline" tab to "Runtime Patterns (Reference)".
- [x] **Add Callouts:** Insert warning banners in the Kitchen Sink explaining that Preline components are static templates here and require the Workbench for interaction.
- [x] **Scaffold Workbench:** Create `demo/RuntimeWorkbench.tsx` with the 3-pane layout (Stimulus, Stage, Logs).
- [x] **Implement Stage:** Create the "Device Under Test" container with Error Boundary and Adapter Lifecycle hooks.
- [x] **Implement Stimulus Panel:** Connect `RuntimeVariableEditor` to the Workbench state.
- [x] **Implement Logger:** Create a visual log for `adapter:init`, `adapter:event`, and `adapter:error`.
- [x] **Create Adapters:** Implement `PrelineModalAdapter`, `PrelineAccordionAdapter`, and `PrelineTabsAdapter` adhering to `spec-adapter-preline.md`.
- [x] **Register Adapters:** Add them to the `RuntimeAdapterRegistry`.
- [x] **Migrate Demos:** Port existing examples from `RuntimeWorkbench.tsx` into Workbench Fixtures.
- [x] **Deprecate Old Playground:** Delete `RuntimeWorkbench.tsx` and update navigation.

### Phase 22: Export Integrity & Preview Equivalence
*Formalize the guarantee that what you see in Preview is what you get in Export.*
- [x] **Export UI Wizard:** A unified interface for selecting export targets with fidelity warnings (Lossless vs Semantic vs Structural).
- [x] **App Intent Exporter:** Implement the logic to generate abstract "Intent" JSON from the node tree.
- [x] **Fake Data Policy:** Explicit labeling of mock data (Picsum/Lorem) vs real data in exports.
- [x] **Equivalence Contract:** Implement automated checks for §16 of the UX Contract.

### Phase 21: Boundary Enforcement & Safety
*   **Goal**: Formalize runtime boundaries to prevent regression during future engine refactors. See `docs/TECH_DEBT.md` (Tier 2).
- [x] **Draft Specification**: Create `docs/roadmap/spec-runtime-boundary.md` defining Node Kinds (Static vs. Applet) and Loading Domains.
- [x] **Adapter Registry Spec**: Create `docs/roadmap/spec-runtime-adapter-registry.md` defining the bridge between static design and runtime behavior.
- [x] **Establish Contracts**: Formalize the "Preview Mode Only" execution rule in a central utility or hook.
- [x] **Inspector Updates**: Ensure the Inspector explicitly labels "Runtime-Only" components (building on the existing warnings).

### Phase 14: Architectural Implementation
- [x] **Add Panel**: Implement the "Recently Used" components section for fast, repeatable actions (per `spec-add-panel.md`).

### Phase 17: Page & Document Semantics
*   **Goal**: Fix canvas overflow and provide explicit control over page-level layout behavior.
- [x] **Feature: Page Settings**
    - [x] Implement Page Settings UI in Properties Panel (for when no node is selected).
    - [x] Create new state in Zustand store for page settings (`heightMode`, `maxWidth`).
    - [x] Refactor `BuilderCanvas` and `App.tsx` to respect new page settings.
    - [x] Ensure feature passes all tests in `docs/tdd-page-settings.md`.

### Phase 15: Full Preline Integration
- [x] **Kitchen Sink**: Add *static previews* for core Preline components (Alerts, Accordions, Modals, and Tabs), ensuring no JS initialization.
- [x] **Builder Palette**: Add registry definitions for Preline components, following the guidance in `COMPONENT_STRATEGY.md`.
- [x] **Testing**: Ensure all JS-driven Preline components work correctly in **Preview Mode**.

### Phase 18: Architectural Doctrine Implementation
*   **Goal**: Implement UI features and developer contracts defined in the recent architectural documentation to improve clarity and safety.

- [x] **Feature: Runtime Workbench** (per `spec-runtime-workbench.md`)
    - [x] Create new `demo/RuntimeWorkbench.tsx` page for live component demos.
    - [x] Add "Runtime Workbench" to the main app navigation.
    - [x] Add a link from the static `PrelineSection` in the Kitchen Sink to the new Workbench.

- [x] **Feature: Builder UI Warnings** (per `spec-builder-ui-warnings.md`)
    - [x] Add indicators (icon + tooltip) to runtime-only components in the `BuilderPalette`.
    - [x] Add a persistent `Alert` to `BuilderProperties` when a runtime-only component is selected.
    - [x] Add a visual indicator to the on-canvas selection badge.

### Phase 16: UI Folder Reorganization (DaisyUI Atomic Structure)
*   **Goal**: Refactor `/ui` into an Atomic Design structure for better scalability.
- [x] **Decision**: Formalize the new structure in `docs/decisions.md` (Dec-012).
- [x] **Core**: Create central export (`ui/index.ts`) and utility (`ui/utils.ts`) files.
- [x] **Atoms**: Move `Button`, `Input`, `TextArea`, `CodeLabel` to `ui/atoms/`.
- [x] **Molecules**: Move `Card`, `Modal`, `Navbar`, `ToastContainer` to `ui/molecules/`.
- [x] **Composites**: Split `Composites.tsx` into `Panel`, `Surface`, `Toolbar` under `ui/composites/`.
- [x] **Refactor**: Update all imports across the app to use the new central barrel file (`../ui`).
- [x] **Docs**: Update `README.md` to reflect the new UI folder structure.
- [x] **Next**: Continue migrating/creating components into the new structure (e.g., `Badge`, `Alert`).
- [x] **Next**: Refactor remaining primitives like `toggle`, `radio`, `checkbox` into atomic components.

### Technical Debt & Optimization
- [x] **Component Repetition**
    - [x] Extract `CodeLabel` component from `demo/sections/*.tsx` to shared `ui/CodeLabel.tsx`.
- [x] **Accessibility (A11y)**
    - [x] Convert clickable `div` elements in `BuilderCanvas` to `<button>` or add `role="button"` and `onKeyDown`.
    - [x] Ensure `BuilderPalette` draggable items are keyboard accessible.
- [x] **Performance**
    - [x] Optimize `CanvasOverlay` Zustand selectors to prevent re-renders on unrelated node updates.

### Refactoring & Maintenance
- [x] **Decompose Monolithic Files** (Target: < 200 lines)
    - [x] Refactor `demo/builder/registries.ts`:
        - [x] Split into `registry/{layout,daisyui,media,patterns,typography}.ts`.
    - [x] Refactor `demo/builder/BuilderProperties.tsx`:
        - [x] Extract `LayoutEditor` (Flex/Grid/Responsive controls).
        - [x] Extract `InteractionEditor` (Event actions).
        - [x] Extract `ContentEditor` and `StyleEditor`.
    - [x] Refactor `demo/builder/store.ts`:
        - [x] Split into slices: `createTreeSlice`, `createUISlice`, `createSelectionSlice`.
    - [x] Refactor `demo/ThemeGenerator.tsx`:
        - [x] Extract `ThemePreview` component.
        - [x] Move config generation string logic to `utils/themeGenerator.ts`.
        - [x] Extract `ThemeControls` component.
    - [x] Refactor `demo/builder/slices/treeSlice.ts`:
        - [x] Extract complex logic to `treeUtils.ts` and `historyUtils.ts`.
    - [x] Refactor `demo/builder/CommandPalette.tsx`:
        - [x] Extract commands registry and hook.
    - [x] Refactor `demo/sections/DataDisplaySection.tsx`
    - [x] Refactor `demo/sections/InputsSection.tsx`
    - [x] Refactor `demo/sections/PrelineSection.tsx`
    
---

### Phase 13.5: Architectural Fortification
- [x] **Establish UX Contract v1.1**: Fortified the core contract with an explicit Performance Budget and a formal reference to Undo Semantics.
- [x] **Define Core Governance Docs**: Established the project's "north star" by creating `MENTAL_MODEL.md`, `INVARIANTS.md`, and `HARD_PROBLEMS.md`.
- [x] **Refactor Core Specs to be Contract-Led**: Rewrote `spec-add-panel.md` and `spec-drag-lifecycle.md` into pure contract form, separating UX guarantees from their reference implementations.
- [x] **Formalize Undo Semantics**: Created `spec-undo-semantics.md` to define atomic actions and ensure a predictable history stack.

### Phase 13: Interaction Engine Polish (Envelope System)
- [x] **Step 13.1: Registry Metadata**: Updated `ComponentDefinition` type with `meta` options.
- [x] **Step 13.2: Envelope Calculation Engine**: Implemented `getEnvelopeRect` utility with 4-Layer Logic.
- [x] **Step 13.3: Overlay Integration**: Refactored `CanvasOverlay.tsx` to use the new envelope system.
- [x] **Step 13.4: Event Guarding**: Updated `NodeRenderer` to respect `composed` components.

### Phase 11 & 10: Low-Code Superpowers & Persistence
- [x] **Superpower #7: Persistence**: Migrated to `Dexie.js` (IndexedDB).
- [x] **Superpower #3-5, 8-9**: Integrated Preline, HTMX-style fetching, Zod schemas, Composite Components, and Import Map inspection.

- [x] **Phase 9: Runtime Engine**: Implemented Variable Store, Conditional Visibility, and Expression Engine.
- [x] **Phase 8: Visual Polish & Primitives**: Integrated Lucide Icons and Headless Patterns (Tabs/Accordion).
- [x] **Phase 7: Templates & Advanced Logic**: Added Templates, event handling, and undo/redo.
- [x] **Phase 6: Export & Code Generation**: Implemented JSX and JSON serialization.
- [x] **Phase 5: Advanced Canvas & Interaction**: Implemented Viewports, Structure Mode, Drop Zones, and responsive overrides.
- [x] **Initial Phases**: Core engine, layout modes, markdown ingestion, theme engine, and basic DnD.
