# Specification: Structure Mode & Dock Workflow (UX Contract-Driven)

## 1. Overview
Structure Mode is a specialized "X-Ray" view designed for **unambiguous layout editing**. It is not a theme but a distinct operational mode that prioritizes clarity, precision, and safety, directly fulfilling the promises of the **Visual Builder UX Contract**.

## 2. Core Promises & Adherence

*   **UX-SM-01 (Structure Mode Reveals All):** All nodes, including empty containers and zero-height elements, must be visible and selectable.
*   **UX-SM-02 (Structure Mode Never Lies):** All visual overlays must correspond 1:1 with the actual node tree.
*   **UX-SM-03 (Drop Zones Are Explicit):** Drop zones are permanently visible and geometrically stable.
*   **UX-SM-04 (Structure Mode Is Safer):** All interactions are designed to reduce error compared to Design Mode.

## 3. Visual Language of Structure Mode

When active, the canvas transforms to reveal the underlying architecture.

### 3.1 Layout Visualization
*   **Outlines:** Every `BuilderNode` receives a dashed outline to show its boundary.
*   **Component Badges:** A small, non-interactive badge (e.g., `[Flex Row]`, `[Card Body]`) is rendered at the top-left of each node, making the component type instantly readable.
*   **Nesting Depth:** Containers receive a progressively darker, translucent background tint based on their nesting level to visually communicate hierarchy.
*   **Flex Flow:** Flex containers display a subtle arrow indicating `flex-direction` and a hatched pattern visualizing `gap`.
*   **Empty Containers:** Containers with no children display a diagonal-striped background and a "Drop Here" message, making them obvious targets.

### 3.2 Always-On Drop Zones
*   **Behavior:** All `DropZone` components are rendered at all times in Structure Mode, regardless of drag state.
*   **Visuals:**
    *   **Idle:** A thin, dashed gray bar between siblings or a placeholder inside empty containers.
    *   **On Drag Hover:** The bar expands and turns a solid primary color to confirm the drop target.
*   **Stability (UX-SM-03):** These zones must have a fixed size to prevent layout shifts or flickering during drag operations.

## 4. Interaction Model

*   **Selection Overrides Interaction (UX-5.2):** All runtime events (`onClick`, `onHover`, etc.) on `BuilderNode` elements are disabled. Every click is a selection event.
*   **Click-Through Prevention:** Pointer events are locked to the builder's overlay and structural elements. Clicks cannot "pass through" to underlying non-node DOM elements (e.g., the text inside a Card).
*   **Navigator Sync:** Hovering a node on the canvas highlights its corresponding entry in the Navigator, and vice-versa, creating a unified selection model.

## 5. Dock Workflow

*   **Mode Toggle:** The primary mode switcher in the `BuilderToolbar` (`[Design] | [Structure] | [Preview]`) controls the state. A hotkey (`Ctrl+B`) provides quick toggling.
*   **Navigator:** While the Navigator is available in all modes, its role is elevated in Structure Mode as the definitive tool for selecting deeply nested or overlapping elements.
*   **Add Panel:** The Add Panel remains fully functional. Dragging from the panel into a Structure Mode canvas benefits from the always-on, stable drop zones.

This specification ensures Structure Mode is a powerful, professional-grade tool for building and debugging complex layouts with confidence.