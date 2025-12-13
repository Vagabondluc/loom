
# Specification: Page Settings & Document Semantics

**Feature:** Page Layout Controls
**Subsystem:** Design Canvas / Root Node
**UX Contract:** [UX-PAGE-01] to [UX-PAGE-06]
**Related TDD:** `docs/tdd-page-settings.md`

## 1. Overview
The Page Settings system controls the fundamental layout behavior of the root container. It resolves the tension between "App-like" interfaces (fixed height, internal scrolling) and "Document-like" websites (growing height, window scrolling).

**Semantic Boundary:**
The Page Root is **not** a normal container. It is a semantic boundary that defines scroll ownership, viewport constraints, and export semantics. Unlike generic nodes, the Page Root:
*   Cannot be deleted.
*   Cannot be duplicated.
*   Cannot be nested inside another element.

## 2. Data Model

The `PageSettings` object is a distinct part of the `UISlice` in the store, separate from the node tree.

```typescript
interface PageSettings {
  // Controls vertical expansion and scroll ownership
  heightMode: 'grow' | 'fit';
  
  // Controls the horizontal constraint of the content area
  maxWidth: 'full' | '7xl' | '5xl' | '3xl';
}
```

## 3. Behavioral Specification

### 3.1 Height Modes (The Scroll Contract)
**Crucial Distinction:** Height Mode defines the **scroll container**, not the visual scale of content.

#### Mode A: Grow with Content (Default)
*   **Mental Model:** Standard Website / Document.
*   **Behavior:**
    *   The Canvas Stage has `min-height: 100vh` but no fixed height.
    *   As content is added, the Stage grows vertically.
    *   **Scroll Owner:** The Browser Window (or the outer Canvas shell).
    *   **Visuals:** Content flows naturally; the "fold" moves down.
    *   **DaisyUI/Tailwind Implementation:** `min-h-screen` on the root container.

#### Mode B: Fit to Viewport
*   **Mental Model:** Web Application / Dashboard / Mobile Screen.
*   **Behavior:**
    *   The Canvas Stage is locked to the exact height of the current Viewport (e.g., 1080px or 100vh).
    *   **Scroll Owner:** The Stage itself (`overflow-y: auto`).
    *   **Visuals:** The boundary of the page is fixed. Content overflowing this boundary is hidden behind the Stage's internal scrollbar.
    *   **DaisyUI/Tailwind Implementation:** `h-screen overflow-hidden` on body, `h-full overflow-y-auto` on the content wrapper.

### 3.2 Width Constraints
Controls the `max-width` of the root container wrapper.
*   **Full:** Fluid width (100%).
*   **7xl / 5xl / 3xl:** Applies Tailwind `max-w-*` classes and centers the stage horizontally (`mx-auto`).
*   **[UX-PAGE-03] Content is constrained, not the page:**
    *   `maxWidth` affects **content flow**.
    *   Background colors/patterns on the Root Node must still span the **full width** of the viewport.
    *   The page itself always owns the viewport.

## 4. Interaction Design

### 4.1 Access
Page Settings are context-sensitive. They must appear in the **Properties Panel** when:
1.  The user explicitly selects the "Root" node.
2.  OR the user clicks on the empty canvas area (deselecting specific nodes).

### 4.2 Visual Feedback
*   **Canvas Overlay:** When changing `maxWidth`, the Canvas Overlay must immediately update to show the new content boundaries.
*   **Scrollbars:** When switching `heightMode`, the scrollbar must visually jump from the window edge to the stage edge (or vice-versa) immediately.

## 5. Structure Mode Integration
In Structure Mode, the Page boundary must remain truthful to the settings.
*   If **Fit**, the dashed outline of the Page Root must match the viewport height.
*   If **Grow**, the dashed outline must encompass all content, extending below the fold if necessary.

## 6. Export Implications
These settings are **not** just editor metadata; they affect the exported CSS/HTML.

### 6.1 Export Mapping (Authoritative)
| Height Mode | HTML Output |
| :--- | :--- |
| **Grow** | `body { min-height: 100vh; }` (Standard flow) |
| **Fit** | `body { height: 100vh; overflow: hidden; }` + Inner wrapper with `overflow-y: auto` |

### 6.2 React Export
The root layout component (`App.tsx` or `Layout.tsx`) must include these layout constraints to ensure the deployed app matches the editor behavior.

## 7. UX Contract Addendum: Page Guarantees

### [UX-PAGE-04] Preview Never Cheats Layout
Preview Mode must reflect Page Settings **exactly**. The engine must not rely on "editor-only" padding, margins, or scroll hacks to simulate the page behavior. If it works in Preview, it must work in Export.

### [UX-PAGE-05] Applets Cannot Steal Scroll
Runtime Applets (e.g., Modals, Charts, Third-party scripts) must live *inside* the page contract. They cannot force `overflow: hidden` on the `body` or hijack scroll ownership unless explicitly designed to do so within the bounds of the "Fit to Viewport" contract.

### [UX-PAGE-06] Exported Scroll Model Matches Editor
There must be **zero surprises** regarding scrollbars after export. If the editor shows an internal scrollbar (Fit mode), the exported HTML must define the CSS context to create that exact scrollbar.

---

## 8. Contract Requirements (Inventory)

| Proposed REQ-ID | Title                   | Risk         |
| --------------- | ----------------------- | ------------ |
| REQ-PAGE-01     | Single Scroll Owner     | UX confusion |
| REQ-PAGE-02     | Height Mode Enforcement | Layout bugs  |
| REQ-PAGE-03     | Export Parity           | Drift        |
