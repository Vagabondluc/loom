
# Specification: Builder UI Labels & Warnings

## 1. Purpose
To uphold the **"Builder Never Lies"** principle of the UX Contract, the Visual Builder's UI must clearly communicate the static-vs-runtime nature of certain components (e.g., JS-driven Preline elements). This document specifies the design of these labels and warnings.

## 2. Implementation Areas & Design

### 2.1 Component Palette (Add Panel)
- **Requirement:** Components that have significant runtime-only behavior (Category D 'Motion' and E 'Advanced' from the Preline mapping) must be visually distinguished.
- **Implementation:**
    - A small, non-intrusive icon (e.g., a "Play" symbol) should be added to the corner of the component tile.
    - A `tooltip` on the tile will display the message: **"Interactive behavior is only active in Preview Mode."**
- **Goal:** Allow users to make informed decisions before adding a component to the canvas.

### 2.2 Properties Panel
- **Requirement:** When a component with runtime-only behavior is selected, the Properties Panel must provide a persistent reminder of its nature.
- **Implementation:**
    - A compact `Alert` component with a "Info" variant will be displayed at the top of the panel.
    - **Text:** "This component is interactive only in **Preview Mode** (`Ctrl+P`)."
- **Goal:** Prevent user confusion when trying to interact with a static preview in the editor.

### 2.3 Canvas Overlay (Selection Badge)
- **Requirement:** The on-canvas selection indicator should also reflect the component's runtime nature.
- **Implementation:**
    - The component's name badge, which appears on the selection overlay, will include the "Play" icon.
    - **Example:** `[Carousel] ▶`
- **Goal:** Provide immediate, in-context feedback directly on the canvas.

## 3. Visual Language
- **Iconography:** Use a consistent icon, such as `lucide-react`'s `PlayCircle` or a similar simple glyph, to represent "runtime behavior."
- **Color & Style:** Warnings and labels should be informative but not alarming. Use `badge-ghost` or `alert-info` styles to avoid implying an error.
- **Conciseness:** All text must be brief and direct.

## 4. Acceptance Criteria
- A user can immediately identify runtime-only components in the Component Palette.
- When a runtime-only component is selected, the user is clearly informed in at least two places (Properties Panel and Canvas) that its behavior is deferred to Preview Mode.
- The warnings do not obstruct the primary UI or interfere with the editing workflow.

---

## 5. Contract Requirements (Inventory)

| Proposed REQ-ID | Title                      | Risk           |
| --------------- | -------------------------- | -------------- |
| REQ-UI-01       | Runtime Warning Visibility | User confusion |
| REQ-UI-02       | Severity Color Consistency | Misread danger |
| REQ-UI-03       | Preview Warning Parity     | False safety   |
