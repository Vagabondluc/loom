# TDD Pack: Architectural Review Implementation

This document provides a comprehensive Test-Driven Development (TDD) plan to implement the actionable suggestions from the Architectural Review. Each section translates a finding into a set of verifiable tests across the three layers of TDD, ensuring that all changes are robust, scalable, and contract-compliant.

---

## 1. UI Layer Refinements

### 1.1 `cn` Utility Consolidation

**Feature:** Universal `cn` Utility
**Subsystem:** Developer Experience / Code Quality
**Finding:** The `cn` utility function was duplicated. While fixed in most components, `ui/atoms/CodeLabel.tsx` remains an outlier.

#### Layer 1: Mechanical TDD
*   **[M-CN-01]** The file `ui/atoms/CodeLabel.tsx` no longer contains local definitions for `clsx` or `twMerge`.
*   **[M-CN-02]** `ui/atoms/CodeLabel.tsx` now imports the `cn` function from `../utils`.

#### Layer 2: Behavioral TDD
*   **[BT-CN-01] Visual Fidelity:** The `CodeLabel` component renders identically to its pre-refactor state. Passing an additional `className` prop correctly merges the classes.

#### Layer 3: UX Contract TDD
*   **[UX-CN-01] Developer Contract:** A linting rule or CI check should be considered to fail if any file inside `/ui` contains a local `cn`, `clsx`, or `tailwind-merge` implementation, enforcing the "single source of truth" for this utility.

---

### 1.2 `FormField` Abstraction

**Feature:** Consistent Form Field API
**Subsystem:** UI Components / Forms
**Finding:** `Input.tsx` and `TextArea.tsx` share almost identical wrapper logic for labels and errors, indicating a need for abstraction.

#### Layer 1: Mechanical TDD
*   **[M-FF-01]** A new component exists at `ui/molecules/FormField.tsx`.
*   **[M-FF-02]** `FormField` is responsible for rendering the `.form-control` wrapper, the `.label`, and the error message `span`.
*   **[M-FF-03]** `Input.tsx` and `TextArea.tsx` are refactored to be simpler components that are intended to be wrapped by `FormField`. They no longer contain the wrapper divs or label logic.

#### Layer 2: Behavioral TDD
*   **[BT-FF-01] Composition:** Rendering `<FormField label="Name"><Input /></FormField>` in the `KitchenSink` produces the exact same DOM structure and visual appearance as the previous, monolithic `Input` component.
*   **[BT-FF-02] Error Propagation:** Passing an `error` prop to `FormField` correctly applies the `text-error` class to its label and displays the error message below the input.

#### Layer 3: UX Contract TDD
*   **[UX-FF-01] Builder Never Lies:** After refactoring, all input fields in the `KitchenSink` and `VisualBuilder` demos render with zero visual regressions, proving the abstraction is lossless.

---

## 2. State Management Scalability

### 2.1 Patch-Based History

**Feature:** Scalable Undo/Redo System
**Subsystem:** State Management / History
**Finding:** The current history implementation stores full state snapshots, which poses a significant performance and memory risk for large projects.

#### Layer 1: Mechanical TDD
*   **[M-HIST-01]** The `history.past` array in the `treeSlice` no longer stores full `Record<string, BuilderNode>` objects.
*   **[M-HIST-02]** The `past` array now stores "inverse patch" objects, which contain only the information needed to revert a specific action (e.g., `{ type: 'MOVE', nodeId, oldParentId, oldIndex }`).
*   **[M-HIST-03]** The `performUndo` function in `historyUtils.ts` is refactored to read an inverse patch and apply it to the current `nodes` state. `performRedo` applies the original action.

#### Layer 2: Behavioral TDD
*   **[BT-HIST-01] Undo/Redo Integrity:** A user performs a sequence of actions: 1. Add a node. 2. Move the node. 3. Update its text. Executing `undo` three times correctly reverts these actions in reverse order. Executing `redo` three times correctly re-applies them.
*   **[BT-HIST-02] Memory Efficiency:** A test script that performs 100 node updates shows significantly lower memory consumption for the history stack compared to the snapshot-based approach.

#### Layer 3: UX Contract TDD
*   **[UX-HIST-01] All Actions Are Recoverable:** The refactored history system must continue to perfectly fulfill the undo/redo promise. The user experience must be identical to the snapshot method; the change is purely an internal performance optimization.

---

## 3. Visual Builder Core Enhancements

### 3.1 Event-Driven Canvas Overlay

**Feature:** Performant Overlay Updates
**Subsystem:** Visual Builder / Canvas
**Finding:** The `CanvasOverlay` uses `setInterval` for polling, which is a major performance anti-pattern.

#### Layer 1: Mechanical TDD
*   **[M-OBS-01]** The `setInterval` call is completely removed from `CanvasOverlay.tsx`.
*   **[M-OBS-02]** A `useEffect` hook is implemented that creates and cleans up a `ResizeObserver`.
*   **[M-OBS-03]** The `ResizeObserver` is configured to observe the main canvas stage (`#builder-canvas-stage`) and the DOM element corresponding to the `selectedNodeId`.

#### Layer 2: Behavioral TDD
*   **[BT-OBS-01] Update on Resize:** When the browser window is resized, the selection overlay updates its position and dimensions to perfectly match the selected element.
*   **[BT-OBS-02] No Idle Renders:** With the browser idle, a performance profiler shows that `CanvasOverlay` is not re-rendering. The component is "asleep" until a relevant DOM change occurs.

#### Layer 3: UX Contract TDD
*   **[UX-OBS-01] Feedback Is Immediate:** The selection overlay tracks the selected element's bounds during resize and layout shifts with no perceivable lag, fulfilling the performance contract. The user experience is smoother and more efficient.

---

### 3.2 Decomposed `useNodeLogic` Hook

**Feature:** Maintainable Node Logic
**Subsystem:** Visual Builder / Rendering
**Finding:** The `useNodeLogic.ts` hook has too many responsibilities (class generation, event handling, visibility), making it a "god hook" that is difficult to maintain and test.

#### Layer 1: Mechanical TDD
*   **[M-DEC-01]** A new pure function, `generateNodeClasses(node, isStructureMode, ...)` exists in a utility file.
*   **[M-DEC-02]** A new hook, `useNodeInteractions(nodeId)`, exists and encapsulates the `onClick`, `onDragStart`, etc., handlers.
*   **[M-DEC-03]** `useNodeLogic.ts` is refactored to be an orchestrator, calling the new function and hook to assemble its final return value. Its line count is significantly reduced.

#### Layer 2: Behavioral TDD
*   **[BT-DEC-01] Functional Equivalence:** After refactoring, the Visual Builder is functionally identical. All nodes render with the correct classes, and all interactions (selection, dragging, preview-mode clicks) work exactly as before. There are zero regressions.

#### Layer 3: UX Contract TDD
*   **[UX-DEC-01] Developer Contract:** The logic for a node is now separated by concern, making it easier for future developers to modify styling, interaction, or visibility logic in isolation without unintended side effects.

---

## 4. Documentation Hygiene

### 4.1 Document Archiving Process

**Feature:** Clear Source of Truth
**Subsystem:** Documentation
**Finding:** The presence of multiple, versioned specification documents can create confusion.

#### Layer 1: Mechanical TDD
*   **[M-ARC-01]** A new directory, `/docs/archive/`, is created.

#### Layer 2: Behavioral TDD
*   **[BT-ARC-01] Archival Process:** Outdated documents (e.g., `spec-visual-builder.md`) are moved into the `/docs/archive/` directory. The `files-to-erase.md` list is updated to reflect this archival, rather than outright deletion.

#### Layer 3: UX Contract TDD
*   **[UX-ARC-01] Developer Contract:** Any developer entering the project can clearly distinguish between active and superseded specifications, reducing the risk of implementing against an outdated plan.
