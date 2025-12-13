# TDD: Add Panel (Professional Grade)

This document follows a three-layer TDD model to ensure both technical correctness and a trustworthy user experience.

---

## Layer 1: Mechanical TDD (Implementation Correctness)

*   **T1.1**: The `BuilderPalette` component renders without errors.
*   **T1.2**: A search input (`input input-bordered`) is present at the top.
*   **T1.3**: Component categories (`Layout`, `DaisyUI`, etc.) are rendered as DaisyUI `collapse` elements.
*   **T1.4**: Component tiles are `draggable="true"` and trigger `onDragStart` with a valid `template` payload.
*   **T1.5**: Clicking a tile (without dragging) sets the `isPlacing` state in the builder store to `true`.
*   **T1.6**: Pressing `Escape` while `isPlacing` is active correctly resets the state to `false`.

---

## Layer 2: Behavioral TDD (User Reality)

### BT-AP-01 — Zero-Scroll Creation
**Given** the Add Panel is open on a standard laptop viewport.
**Then** a user can find and insert a `Container`, `Flex Row`, `Button`, and `Heading` without scrolling the panel, relying on search or default visibility.
**Failure:** Essential, high-frequency components are not immediately accessible.

### BT-AP-02 — Muscle Memory Stability
**Given** a user inserts a "Button" three times in a row.
**Then** the "Button" appears in a "Recently Used" section, and its position in that section remains stable, ensuring the user's motor action is repeatable without re-scanning the UI.
**Failure:** The "Recently Used" list reorders unpredictably, forcing the user to stop and search.

### BT-AP-03 — Search Supremacy
**Given** a user types "grid" into the search bar.
**Then** the "Grid" component is the first selectable result, regardless of which category accordions are open or closed. Pressing `Enter` arms "Click-to-Place" for the Grid.
**Failure:** Search results are influenced by the visible UI state, making it unpredictable.

### BT-AP-04 — Click-to-Place Dominance
**Given** a user who exclusively uses "Click-to-Place" (clicking a palette item, then clicking a drop zone).
**Then** they can build an entire, complex layout without ever performing a drag-and-drop action.
**Failure:** Any component or layout pattern can only be created via dragging.

---

## Layer 3: UX Contract TDD (Promises to the User)

### UX-AP-01 — No Lost Intent
**Given** a user has armed "Click-to-Place" for a component.
**When** they switch to another panel (e.g., Navigator) or toggle Structure Mode.
**Then** the placement mode is explicitly and visibly cancelled (e.g., cursor returns to normal, ghost disappears).
**Never** silently discard the user's intent to place the component, leaving them in a confused state.

### UX-AP-02 — Panel Does Not Fight the Canvas
**Given** a user starts dragging an item from the Add Panel.
**Then** the panel itself must immediately lock its scroll position. All scroll interactions must be captured by the main canvas for auto-scrolling near edges.
**Failure:** The panel scrolls due to mouse inertia while the user is trying to drag onto the canvas.

### UX-AP-03 — Predictable Insertion
**Given** a user drops component `A` into an empty container, then undoes.
**When** they drop component `A` into the same empty container again.
**Then** the resulting DOM structure and node properties must be identical to the first attempt.
**Failure:** Insertion logic has side effects or context-dependent behaviors that make it inconsistent.