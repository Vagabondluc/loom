# TDD: Structure Mode Workflow (Professional Grade)

This document follows a three-layer TDD model to verify that Structure Mode is not just a visual theme but a fundamentally safer and more comprehensible editing environment.

---

## Layer 1: Mechanical TDD (Implementation Correctness)

*   **T1.1**: The `isStructureMode` boolean in the `uiSlice` is correctly toggled by the toolbar button and the `Ctrl+B` shortcut.
*   **T1.2**: When `isStructureMode` is `true`, `NodeRenderer` applies a specific CSS class or data attribute to rendered nodes to enable visual overlays.
*   **T1.3**: In Structure Mode, `DropZone` components are always rendered, regardless of the `isDragging` state.
*   **T1.4**: Component-type badges (e.g., `badge-ghost`) are rendered on top of each node.
*   **T1.5**: Hovering a node on the canvas highlights the corresponding item in the `BuilderNavigator` tree view, and vice-versa.

---

## Layer 2: Behavioral TDD (User Reality)

### BT-SM-01 — Structure Mode Is Safer Than Design Mode
**Given** a dense, deeply nested layout.
**When** a user's task is to move an element from one nested container to another.
**Then** performing this task in Structure Mode results in a measurably higher success rate (fewer mis-drops or undos) than in Design Mode.
**Failure:** Structure Mode adds visual noise without improving placement accuracy, making it more complex, not simpler.

### BT-SM-02 — Structural Literacy
**Given** a user views a pre-made layout for the first time in Structure Mode.
**Then** they can correctly answer questions about the layout hierarchy without using the DOM inspector, such as: "Which container controls the alignment of these three cards?" or "Is this button inside or outside the card's main body?"
**Failure:** The visual cues (outlines, badges, spacing) are ambiguous and do not effectively communicate ownership and hierarchy.

---

## Layer 3: UX Contract TDD (Promises to the User)

### UX-SM-01 — No Hidden Nodes
**Given** a layout contains a `div` that is visually collapsed due to having zero height (e.g., an empty container without a `min-h` style).
**Then** that `div` is still clearly visible and selectable in Structure Mode, rendered with a minimum height and a "Empty Container" label.
**Never** allow a node that exists in the tree to be completely invisible and unselectable in Structure Mode.

### UX-SM-02 — Structure Mode Never Lies
**Given** Structure Mode is active.
**Then** all visible outlines, badges, and layout guides must correspond to real, existing nodes in the builder's state. There are no phantom containers or misleading overlays that don't map to the actual structure.
**Failure:** The visualization is an approximation and disagrees with the Navigator tree or the final rendered output.

### UX-SM-03 — Predictability is Constant
**Given** a user is in Structure Mode.
**When** they perform a drag-and-drop.
**Then** the drop zones must remain geometrically stable. They do not shift or resize as the user drags over them, preventing layout flicker and ensuring the drop target is predictable.
**Failure:** Drop zone highlighting causes reflows in the underlying structure, making the target jump around.