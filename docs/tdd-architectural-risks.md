# TDD Pack: Architectural Fortification

This document provides a comprehensive Test-Driven Development plan to address the key "Areas for Improvement & Potential Risks" identified during the project architecture review. Each section follows the three-layer TDD model to ensure robust, contract-compliant solutions.

---

## 1. UI Component Organization

**Feature:** UI Folder Atomic Refactor
**Subsystem:** Developer Experience / Code Scalability
**UX Contract Sections Covered:** 1.1 (Builder Never Lies - via preventing regressions)
**Primary User Intent (Developer):** To easily locate, maintain, and extend UI components.

### Layer 1: Mechanical TDD
*   **[M-UIO-01]** The `/ui` directory contains subdirectories: `atoms/`, `molecules/`, and `composites/`.
*   **[M-UIO-02]** A central barrel file exists at `ui/index.ts`.
*   **[M-UIO-03]** `Button.tsx` and `Input.tsx` exist in `ui/atoms/`.
*   **[M-UIO-04]** `Card.tsx` and `Modal.tsx` exist in `ui/moleles/`.
*   **[M-UIO-05]** `Panel.tsx` and `Toolbar.tsx` exist in `ui/composites/`.
*   **[M-UIO-06]** Components in `App.tsx`, `KitchenSink.tsx`, and other demo files import from the central barrel file (e.g., `import { Button } from '../ui'`), not from specific file paths.

### Layer 2: Behavioral TDD
*   **[BT-UIO-01] Visual Regression:** After refactoring all imports, the `KitchenSink` demo renders with **zero visual changes**. All buttons, cards, and other moved components appear and function identically to their pre-refactor state.
*   **[BT-UIO-02] Extensibility:** A developer adds a new component, `ui/atoms/Badge.tsx`, and exports it from `ui/index.ts`. They can then immediately `import { Badge } from '../ui'` in `KitchenSink.tsx` and use it successfully.

### Layer 3: UX Contract TDD (Developer Contract)
*   **[UX-UIO-01] Architectural Consistency:** A script or linter rule is in place that fails if a component inside `/demo` attempts to import a UI component using a deep path (e.g., `../ui/atoms/Button`) instead of the barrel file (`../ui`). This enforces the "single entry point" principle for the UI library.

---

## 2. Code Duplication in UI Components

**Feature:** Centralized `cn` Utility
**Subsystem:** Developer Experience / Code Maintainability
**UX Contract Sections Covered:** N/A (Internal Code Quality)
**Primary User Intent (Developer):** To have a single, shared utility for merging Tailwind classes, reducing boilerplate and ensuring consistent behavior.

### Layer 1: Mechanical TDD
*   **[M-DED-01]** A file exists at `ui/utils.ts`.
*   **[M-DED-02]** `ui/utils.ts` exports a function named `cn`.
*   **[M-DED-03]** Components like `ui/atoms/Button.tsx` and `ui/molecules/Card.tsx` import `cn` from `../utils`.
*   **[M-DED-04]** No component file within `/ui` contains a local definition of a `cn` or similar utility function.

### Layer 2: Behavioral TDD
*   **[BT-DED-01] Class Merging:** A component using `cn('p-2', 'p-4')` correctly renders with only the `p-4` class, demonstrating that `tailwind-merge` logic is active.
*   **[BT-DED-02] Conditional Classes:** A component using `cn('btn', { 'btn-primary': true, 'btn-disabled': false })` correctly renders with the class string `"btn btn-primary"`.

### Layer 3: UX Contract TDD
*   **[UX-DED-01] Builder Never Lies (Visual Fidelity):** After refactoring all components to use the central `cn` utility, there are zero visual regressions in the `KitchenSink` or `VisualBuilder` demos. The computed class strings must be identical to the pre-refactor versions, preserving the visual integrity of the application.

---

## 3. Preline UI Integration Depth

**Feature:** Dynamic Preline Component Support
**Subsystem:** Component Registry / Runtime
**UX Contract Sections Covered:** 8.2 (Editor Never Executes Logic), 1.1 (Builder Never Lies)
**Primary User Intent:** To use interactive, JS-driven Preline components within the Visual Builder.

### Layer 1: Mechanical TDD
*   **[M-PLI-01]** The `PrelineSection.tsx` file is updated to include the markup for an `HSAccordion` and a trigger/target for an `HSModal`.
*   **[M-PLI-02]** The component registry (`registry/preline.ts`) contains definitions for `preline-accordion-group`, `preline-accordion-item`, `preline-modal`, and `preline-modal-trigger`.
*   **[M-PLI-03]** A mechanism exists to call `(window as any).HSStaticMethods.autoInit()` after Preline components are added to the DOM by the `NodeRenderer`. This could be a `useEffect` with a dependency on the node tree's structure.

### Layer 2: Behavioral TDD
*   **[BT-PLI-01] Accordion Interactivity:** A "Preline Accordion" template is dropped onto the canvas. In **Preview Mode**, clicking the accordion's header correctly expands and collapses its content panel.
*   **[BT-PLI-02] Modal Interactivity:** A "Preline Modal Trigger" and a "Preline Modal" are dropped onto the canvas and linked by their `data-hs-overlay` ID. In **Preview Mode**, clicking the trigger button opens the modal, and clicking the close button dismisses it.
*   **[BT-PLI-03] Dynamic Initialization:** After dropping a new Preline Accordion onto the canvas *while already in Preview Mode*, the new accordion is immediately interactive without requiring a mode switch.
*   **[BT-PLI-04] Clean Teardown:** Deleting a Preline Accordion from the canvas does not leave orphaned event listeners or cause console errors.

### Layer 3: UX Contract TDD
*   **[UX-PLI-01] Editor Never Executes Logic:** Dropping a Preline Accordion or Modal onto the canvas in **Design Mode** or **Structure Mode** renders its static markup only. The components **must not** be interactive. Clicking them should only trigger the builder's selection logic.
*   **[UX-PLI-02] What You See Is What You Get:** The behavior of a Preline component inside the builder's Preview Mode must be identical to its behavior on a static HTML page using the same CDN script. There are no unexpected layout shifts or behavioral quirks introduced by the builder's rendering engine.

---

## 4. Performance at Scale

**Feature:** Optimized Rendering Engine
**Subsystem:** Performance / State Management
**UX Contract Sections Covered:** 8.1 (Feedback Is Immediate), 8.2 (No Surprise Jank)
**Primary User Intent:** To have a fluid, responsive editing experience even with very large projects.

### Layer 1: Mechanical TDD
*   **[M-PERF-01]** The `NodeRenderer` component is wrapped in `React.memo()`.
*   **[M-PERF-02]** Components that subscribe to the `builderStore` (e.g., `CanvasOverlay`, `BuilderProperties`) use granular, memoized selectors (e.g., `useBuilderStore(s => s.selectedNodeId)`) rather than subscribing to the entire store object.

### Layer 2: Behavioral TDD
*   **Context for all tests:** A project is loaded with 500+ nodes. A profiling tool (like React DevTools Profiler) is attached.
*   **[BT-PERF-01] Selection Performance:** A user clicks a node to select it. The profiler shows that only the `NodeRenderer` instances for the previously selected node and the newly selected node re-render. The vast majority of other `NodeRenderer` instances do not render.
*   **[BT-PERF-02] Property Edit Performance:** A user types a single character into the "Label" input in the `BuilderProperties` panel. The profiler shows that only the `NodeRenderer` for the selected node re-renders. The `CanvasOverlay` and other unrelated nodes do not re-render.
*   **[BT-PERF-03] Hover Performance:** A user moves the mouse rapidly over many different nodes on the canvas. The profiler shows that `CanvasOverlay` may re-render to update the hover highlight, but the `NodeRenderer` tree remains static (no re-renders).

### Layer 3: UX Contract TDD
*   **[UX-PERF-01] Feedback Is Immediate (Hover):** With a 500+ node project, hovering over any node must display the hover outline within **16ms**. The test is to perform this action and visually inspect for any noticeable delay or "jank".
*   **[UX-PERF-02] No Surprise Jank (Drag):** Dragging a new component over the large canvas must feel fluid. The drop zone highlights must appear and disappear without stuttering. The drag ghost must not lag behind the cursor.
*   **[UX-PERF-03] Mode Switch Performance:** Toggling into Structure Mode on the large project must complete (render all outlines and badges) in **under 100ms**.
