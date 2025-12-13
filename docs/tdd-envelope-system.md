
# TDD PACK — Envelope System (Selection Boundaries)

**Feature:** Selection & Overlay Engine
**Subsystem:** Visual Builder / Interaction
**UX Contract Sections Covered:** 5.1 (Selection Is Deterministic), 1.1 (Builder Never Lies)
**Primary User Intent:** To easily and accurately select any component on the canvas, regardless of its size, nesting, or internal DOM structure.

---

## Layer 1: Mechanical TDD (Implementation Correctness)

*   **[M-ENV-01]** `getEnvelopeRect` returns `null` for invalid IDs.
*   **[M-ENV-02]** `getEnvelopeRect` returns coordinates relative to the `builder-canvas-stage`.
*   **[M-ENV-03]** `getEnvelopeRect` applies the `MIN_INTERACTION_SIZE` (24px) expansion logic when dimensions are small.
*   **[M-ENV-04]** `CanvasOverlay` renders a `div` matching the returned envelope coordinates.
*   **[M-ENV-05]** `NodeRenderer` applies `pointer-events: none` to children of components marked `composed: true` in the registry.

---

## Layer 2: Behavioral TDD (User Reality)

### [BT-ENV-01] Small Element Usability
*   **Context:** An empty container (height: 0) or small icon (16x16) is on the canvas.
*   **Action:** User hovers 2px outside the visual boundary of the element.
*   **Expected Behavior:** The element is highlighted/selected because the **Interaction Envelope** padding captures the event.
*   **Failure Condition:** User must pixel-hunt to hit the exact center.

### [BT-ENV-02] Composed Component Integrity
*   **Context:** A DaisyUI Card (composed) containing a Title and Body.
*   **Action:** User clicks on the whitespace inside the Card Body.
*   **Expected Behavior:** The **Card** node is selected.
*   **Failure Condition:** The internal `div.card-body` or a raw HTML element is selected, breaking the component abstraction.

### [BT-ENV-03] Real-Time Tracking
*   **Context:** User resizes the browser window or toggles a sidebar, causing layout shift.
*   **Action:** Observe selection overlay.
*   **Expected Behavior:** The blue selection ring immediately jumps/animates to the new position of the selected element.
*   **Failure Condition:** The ring stays behind, detached from the element ("Ghost Ring").

---

## Layer 3: UX Contract TDD (Promises to the User)

### [UX-ENV-01] Selection Hugs Content (Visual Envelope)
*   **Guarantee:** The visual selection ring must match the `border-box` of the element.
*   **Verification:** Select a component with `shadow-xl`. The ring must ignore the shadow and hug the border.
*   **Violation:** The selection ring includes the shadow spread, making the element look larger than it is.

### [UX-ENV-02] Logical Selection (Component Envelope)
*   **Guarantee:** Users select "Components", not "DOM Nodes".
*   **Verification:** In Design Mode, clicking any part of a complex component (like a Hero or Card) selects the root of that component unless the specific child is defined as a separate `Container` or `Atom` in the registry.
*   **Violation:** The user accidentally selects an internal wrapper `div` that they cannot configure in the properties panel.

### [UX-ENV-03] No Unselectable Ghosts
*   **Guarantee:** Every node in the tree is selectable via the Canvas.
*   **Verification:** Create a `div` with `width: 0; height: 0`. It must render a 24x24px selection target in the overlay.
*   **Violation:** A node exists in the Navigator but cannot be clicked on the Canvas.
