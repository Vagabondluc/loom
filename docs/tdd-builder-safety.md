
# TDD PACK — Builder UI Safety & Warnings

**Feature:** Runtime Boundary Visualization
**Subsystem:** Inspector / Canvas Overlay
**Specs Covered:** `docs/roadmap/spec-builder-ui-warnings.md`
**UX Contract Sections Covered:** 1.1 (Builder Never Lies), [UX-BE-RA-01] Adapters Are Explicit
**Primary User Intent:** To immediately understand why a component isn't "working" (interactive) in the editor, and to know which components rely on external runtimes.

---

## 1. Palette Indicators

### Layer 1: Mechanical TDD
*   **[M-WARN-01]** `ComponentDefinition` type includes `meta.runtimeOnly` boolean.
*   **[M-WARN-02]** `BuilderPalette` renders a specific icon (e.g., `PlayCircle`) for items where `runtimeOnly` is true.

### Layer 2: Behavioral TDD
*   **[BT-WARN-01] Tooltip Clarity:** Hovering the "Play" icon on a palette tile displays the text "Interactive in Preview Mode only".

---

## 2. Inspector Warnings (Properties Panel)

### Layer 1: Mechanical TDD
*   **[M-INSP-01]** `BuilderProperties` checks the `meta.runtimeOnly` flag of the `selectedNode`.
*   **[M-INSP-02]** If true, an `Alert` component renders at the top of the panel.

### Layer 2: Behavioral TDD
*   **[BT-INSP-01] Contextual Warning:** Selecting a "Preline Accordion" shows the warning. Selecting a "Container" does not.
*   **[BT-INSP-02] Actionable Advice:** The warning includes the shortcut hint "(`Ctrl+P`)" to encourage checking Preview Mode.

### Layer 3: UX Contract TDD
*   **[UX-SAFE-01] Builder Never Lies:** The UI must never imply that a static shell is broken. It must explicitly label it as "Static Preview".

---

## 3. Canvas Overlay Badges

### Layer 1: Mechanical TDD
*   **[M-OVL-01]** The `CanvasOverlay` badge rendering logic checks `meta.runtimeOnly`.
*   **[M-OVL-02]** A distinct icon or color is applied to the selection label for runtime nodes.

### Layer 2: Behavioral TDD
*   **[BT-OVL-01] Immediate Feedback:** Selecting a runtime node instantly shows the runtime badge on the canvas overlay, ensuring the user knows the node's nature without looking at the sidebar.

---

## 4. Preline Specifics

### Layer 3: UX Contract TDD
*   **[UX-PRE-01] No False Promises:** Preline components in the Kitchen Sink must be wrapped in a warning or labeled section stating they are "Static Patterns".
*   **[UX-PRE-02] Explicit Activation:** The "Runtime Workbench" must be the only place (besides Preview Mode) where `autoInit()` is called.
