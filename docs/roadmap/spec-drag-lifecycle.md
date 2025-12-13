# Specification: Drag Lifecycle v1.1 (Contract-Driven)

## 1. Overview
This document defines the state machine and interaction promises for all drag-and-drop operations, governed by the **Visual Builder UX Contract**. The core principle is that drag-and-drop must be a predictable, forgiving, and unambiguous planning tool.

**Predictability Defined:** Same inputs + same visible state = same outcome.

## 2. States & Transitions

1.  **Idle:** No drag active.
2.  **Planning:** A "drag payload" (representing a new or existing node) is being moved by the user.
3.  **Targeting:** The cursor is over a valid drop zone, which is actively highlighted.
4.  **Committed:** A "commit" event (e.g., mouse release) has occurred on a valid target, and the state mutation is complete.
5.  **Cancelled:** The drag was abandoned via an "abort" signal (e.g., Escape key, drop on invalid area).

## 3. Lifecycle Promises & Invariants

### A. Initiation (Idle → Planning)
*   **Payload:** A drag payload is created containing either a `template` for new components or a `sourceNodeId` for moves.
*   **Feedback (BT-DR-01):** A visual "drag ghost" of the component appears instantly and follows the cursor without lag.
*   **State:** The global store enters a "dragging" state, which makes all valid drop zones on the canvas visible.

### B. Transit & Targeting (Planning → Targeting)
*   **Promise: Drag is Planning, Not Commitment (UX-DR-02):** No mutations to the node tree occur during the drag operation. Only visual overlays change.
*   **Promise: What You See Is What You Get (UX-DR-03):** The visual highlight of a drop zone is a 100% accurate representation of where the node will land.
*   **Invariant: Unambiguous Targeting (UX-DR-02):** At any given moment, exactly one drop zone may be highlighted as the active target. The system must enforce this using a strict conflict resolution hierarchy:
    1.  **Deepest First:** The drop zone in the most deeply nested valid container wins.
    2.  **Nearest Center:** If zones are at the same depth, the zone whose center is closest to the cursor's position wins.
    3.  **Insertion Over Nesting:** If still ambiguous, a zone for sibling insertion is preferred over a zone for nesting (re-parenting).
    4.  **Block if Ambiguous:** If the hierarchy cannot resolve a clear winner, no drop zone is highlighted.

### C. Commitment (Targeting → Committed)
*   **Trigger:** The "commit" event on the active drop zone is the *single source of truth* for triggering a state mutation (`insertNodeTree` or `moveNode`).
*   **Validation:** A `moveNode` action must be guarded against circular dependencies (moving a parent into its own child). The action must fail gracefully if this is attempted.
*   **Cleanup:** The "dragging" state is cleared, and all drop zones return to their default visibility.

### D. Cancellation (Planning/Targeting → Cancelled)
*   **Promise: Error Forgiveness (BT-DR-03):** Releasing the pointer outside of any valid drop zone must cleanly cancel the operation.
*   **Promise: Escape Always Works (UX-DR-04):** An "abort" signal (e.g., the `Escape` key) must immediately terminate the drag and return the system to an `Idle` state with no side effects.

---

## Appendix A: Reference Implementation v1.0

*   **Drag API:** The system may use the native HTML5 Drag and Drop API as a first-pass implementation. The drag payload can be serialized as JSON into the `dataTransfer` object.
*   **Escape Hatch:** If the native API proves incapable of fulfilling the **"Escape Always Works"** or cross-browser consistency promises (see `docs/HARD_PROBLEMS.md`), the implementation **must** fall back to a custom, JavaScript-driven "controlled drag layer" that simulates the drag behavior and gives full control over event handling.
*   **Touch Support:** The native API does not support touch. A custom drag layer is the designated solution for touch devices.