# TDD: Drag Lifecycle (Professional Grade)

This document follows a three-layer TDD model to ensure the core drag-and-drop system is robust, forgiving, and predictable.

---

## Layer 1: Mechanical TDD (Implementation Correctness)

*   **T1.1**: `onDragStart` correctly sets a `template` or `sourceNodeId` in the `dataTransfer` object.
*   **T1.2**: During a drag operation, the `isDragging` state in the store is `true`.
*   **T1.3**: `DropZone` components become visible only when `isDragging` is `true` (in Design Mode).
*   **T1.4**: `onDrop` event on a `DropZone` correctly calls the `insertNodeTree` or `moveNode` store action with the correct `parentId` and `index`.
*   **T1.5**: A `moveNode` action is blocked if the target is a child of the source node (circular dependency check).
*   **T1.6**: Pointer events are disabled on underlying `BuilderNode` elements during drag to ensure drop zones are the only valid targets.

---

## Layer 2: Behavioral TDD (User Reality)

### BT-DR-01 — Drag Escape Velocity
**Given** a user starts dragging a component from the far-left panel towards the far-right canvas.
**Then** the drag ghost/preview must immediately follow the cursor without any perceived lag or "stickiness" to the source panel. Valid drop zones on the canvas should highlight well before the cursor reaches them.
**Failure:** The drag feels anchored to the panel, or the system waits until the cursor is perfectly over a drop zone to provide feedback.

### BT-DR-02 — Ambiguity Resolution
**Given** a drop target area where multiple nested containers create overlapping drop zones (e.g., dropping into a card, which is inside a column, which is inside a section).
**Then** the system highlights *exactly one* drop zone at a time based on a clear heuristic (e.g., deepest valid target first). The highlight must not flicker between potential targets as the user moves the mouse by a few pixels.
**Failure:** Competing drop zones flicker, making the drop outcome uncertain.

### BT-DR-03 — Error Forgiveness
**Given** a user is dragging a component.
**When** they release the mouse button outside of any valid drop zone (e.g., over the properties panel, outside the browser window).
**Then** the drag operation is cleanly cancelled. No node is created, no state is corrupted, and the system returns to an idle state without errors.
**Failure:** Dropping on an invalid target creates a broken node, leaves the app in a "dragging" state, or throws a console error.

---

## Layer 3: UX Contract TDD (Promises to the User)

### UX-DR-01 — No Surprise Reparenting
**Given** a user intends to insert a new node *between* two existing siblings in a flex container.
**Then** the drop zone's visual indicator must be an unambiguous horizontal or vertical bar. The node is *never* dropped *inside* one of the siblings unintentionally.
**Failure:** The drop semantics are pixel-based and imprecise, causing frequent accidental nesting.

### UX-DR-02 — Drag is Planning, Not Commitment
**Given** a user is dragging a component and hovers over multiple drop zones in sequence.
**Then** no mutations to the actual layout tree (the `nodes` object in the store) occur. The only changes are ephemeral visual previews in the overlay. The state is only committed upon the single `drop` event.
**Failure:** The system performs micro-commits on `dragEnter`, leading to state corruption if the drag is cancelled.

### UX-DR-03 — What You See Is What You Get
**Given** a user drops a component onto a highlighted blue drop zone.
**Then** the component appears in the exact location indicated by that highlight.
**Failure:** The final position of the dropped component is offset or different from what the visual preview promised.