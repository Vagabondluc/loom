# Specification: Add Panel UX v1.1 (Contract-Driven)

## 1. Purpose & Core Promises
The Add Panel is the primary interface for **creating new nodes**. It must be a fast, predictable, and accessible tool that prioritizes user intent and minimizes cognitive load. This specification is governed by the principles in the **Visual Builder UX Contract**.

*   **Fast Discovery:** Fulfill **UX-AP-01 (Zero-Scroll Creation Guarantee)** and **UX-AP-02 (Search Is Absolute)**.
*   **Fast Repetition:** A "Recently Used" section must provide muscle-memory stability (**BT-AP-02**).
*   **Predictability:** All interactions must be deterministic (**UX-AP-03**).
*   **Accessibility:** "Click-to-Place" is a first-class citizen (**UX-AP-04**).

## 2. Behavioral Specification

### 2.1 Layout & Affordances
The Add Panel is the primary view of the Left Dock and presents a clear visual hierarchy.

1.  **Search Bar:** A prominent, visually distinct search input must be permanently visible at the top of the panel. It must be auto-focused when the panel becomes active.
2.  **Recently Used:** A horizontally scrollable region displaying the last 8 unique components used. Its layout must be stable and not reorder during a session.
3.  **Component Library:** A vertically organized list of logical component groups (e.g., Layout, Forms, Media).
    *   Each group must be collapsible/expandable to manage visual complexity.
    *   The "Layout" group should be expanded by default.
4.  **Component Tiles:** Draggable and clickable items within each group, displaying the component's name and an identifying icon.

### 2.2 Search Behavior (UX-AP-02)
*   **Absolute Results:** Typing in the search bar must immediately hide the categorized library view and display a flat, non-paginated list of all matching components. The search logic **must not** be affected by which categories are currently open or closed.
*   **Restoration:** Clearing the search input must restore the previous categorized view, including the open/closed state of each group.
*   **Keyboard Navigation:** `ArrowUp`/`ArrowDown` must navigate the list of search results. `Enter` must arm "Click-to-Place" mode for the selected component.

### 2.3 "Click-to-Place" Mode (UX-AP-04)
This is a mandatory, first-class creation workflow.

*   **Trigger:** A single click on a component tile (without dragging).
*   **State Change:** The application enters a global "placing" mode, storing the template of the selected component.
*   **Feedback:** The system must provide immediate, unambiguous feedback:
    *   The cursor must change to a placement indicator (e.g., `crosshair`).
    *   A semi-transparent preview of the component should follow the cursor over the canvas.
    *   All valid drop zones on the canvas must become visibly highlighted.
*   **Commit:** Clicking a valid drop zone commits the action, inserting the node into the tree at the specified location.
*   **Cancellation (UX-DR-04):** Pressing the `Escape` key at any point must cleanly exit "placing" mode with no side effects.
*   **No Lost Intent (UX-AP-01):** Switching context (e.g., changing dock panels) must explicitly cancel the "placing" mode.

### 2.4 Drag Behavior
*   **Initiation:** Dragging a component tile creates a "drag payload" containing the component's template data.
*   **Panel Lock:** The Add Panel's scroll position must be locked for the duration of the drag to prevent user disorientation.

---

## Appendix A: Reference Implementation v1.0

*   **UI Kit:** DaisyUI v4.
*   **Search Bar:** An `input input-bordered` element.
*   **Recently Used:** A horizontally scrolling `div` with `flex` properties, not a `carousel` component, to ensure layout stability.
*   **Categories:** A `join join-vertical` containing DaisyUI `collapse` elements.
*   **Drag Payload:** The component `template` is serialized to a JSON string and passed via the native HTML5 `dataTransfer` object.
*   **Placement Feedback:** The global `isPlacing` state in the Zustand store controls the cursor style and visibility of drop zones.