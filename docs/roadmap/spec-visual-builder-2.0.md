# Specification: Design Canvas 2.0 (Advanced)

## 1. Executive Summary
The goal is to evolve the Design Canvas from a prototype into a robust, professional-grade layout tool. This phase introduces responsive breakpoints, a dedicated "Structure Mode" for complex layout editing, and a completely refactored interaction engine to solve drag-and-drop instability.

## 2. Architecture Decisions

### AD-001: Rendering Engine (DOM vs. PixiJS/Konva)
**Decision:** We will strictly use **React/DOM** for rendering the user's content.
**Reasoning:**
1.  **CSS Fidelity:** The output must be valid Tailwind/DaisyUI HTML. Canvas renderers (PixiJS) cannot accurately simulate CSS Grid, Flexbox, media queries, or DaisyUI component styles.
2.  **Performance:** For a static page builder, the DOM is sufficiently fast.
3.  **WYSIWYG:** The editor view must match the final export 100%.

### AD-002: Interaction Overlay
**Decision:** We will implement a separate **Overlay Layer** (absolute positioned `div` or `svg`) on top of the content canvas.
**Function:**
*   Handles selection highlights (blue ring).
*   Renders "Drop Zones" (insertion points).
*   Draws Layout Guides (Grid lines, Flex gaps).
*   Prevents text selection while dragging.

## 3. Feature Specifications

### 3.1 Multi-View Responsive Canvas
The `BuilderCanvas` will no longer fill the screen. It will be a "Stage" containing a resizable "Viewport".

**Viewports:**
*   **Desktop:** 100% width (min 1024px).
*   **Tablet:** Fixed 768px width, centered.
*   **Mobile:** Fixed 375px width, centered.

**Implementation:**
*   Wrap the rendered root node in a `div.viewport-frame`.
*   Apply CSS transitions to `width` for smooth switching.
*   Store `activeBreakpoint` (`desktop` | `tablet` | `mobile`) in `BuilderStore`.

### 3.2 Advanced "Structure Mode"
A specialized view mode "made only for making layouts," enabling users to see invisible structure.

**Toggle:** `[Preview] <-> [Structure]` in the toolbar.

**Visual Behavior (When Active):**
1.  **Outlines:** All containers (`div`, `section`, `article`) get a dashed border (color-coded by depth).
2.  **Gap Visualization:** Flex/Grid gaps are rendered as hatched patterns.
3.  **Padding/Margin:** Hovering a node visualizes the box model (green for padding, orange for margin).
4.  **Empty States:** Empty containers get an explicit height and "Drop Here" watermark.

### 3.3 Refactored Drag & Drop (Insertion Zones)
The current "Drop on Node" logic is imprecise. We will move to an **Explicit Drop Zone** model.

**Logic:**
1.  **Drag Start:**
    *   Set `draggedNodeId`.
    *   Render `<DropZone />` components *between* every sibling in the tree and *inside* every container.
2.  **Drop Zone UI:**
    *   A Drop Zone is an invisible 4px bar (or box for empty containers).
    *   On `dragOver`, it expands to 40px and turns blue/green to indicate "Insert Here".
3.  **Drop Action:**
    *   The drop event provides the exact `parentId` and `index` for insertion.
    *   This eliminates ambiguity about whether you are dropping *on* a node or *after* it.

### 3.4 Page Sizing & Document Semantics
The root canvas must have an explicit and configurable sizing policy to handle different use cases and prevent layout bugs like content overflow.

**Page Settings:**
*   A new "Page Settings" interface will be accessible (e.g., when no node is selected).
*   This interface will control document-level properties, separating them from container-level layout.

**Height Behavior:**
*   **Grow with Content (Default):** The page has a minimum height of the viewport but expands vertically as content is added. This is the standard behavior for websites and fixes the overflow issue. The browser's main scrollbar is used.
*   **Fit to Viewport:** The page has a fixed height equal to the viewport (`100vh`). Content that exceeds this height becomes scrollable *within* the page container. This is for app-like interfaces.

**Content Width:**
*   The Page Settings will also control the maximum content width (e.g., `Full Width`, `Large (1280px)`, `Medium (1024px)`) to manage readability while allowing backgrounds to be full-bleed.

## 4. UI Components

### 4.1 ViewportControls.tsx
*   **Location:** Top center of Builder header.
*   **Items:** Icons for Mobile, Tablet, Desktop.
*   **Action:** Updates `BuilderStore.activeBreakpoint`.

### 4.2 CanvasOverlay.tsx
*   **Location:** Absolute covering `BuilderCanvas`.
*   **Props:** `nodes` tree to calculate positions.
*   **Render:**
    *   Selection Box (follow `selectedNodeId`).
    *   Hover Box (follow mouse).
    *   Grid Lines (if `layout.mode === 'grid'`).

### 4.3 StructureLayer.css
*   CSS file injected when Structure Mode is active.
*   Uses `:has()` or class names to apply visualizations without changing the DOM structure significantly.

## 5. Implementation Steps

1.  **Store Update:** Add `isStructureMode`, `activeBreakpoint` to `BuilderStore`.
2.  **Canvas Refactor:** Wrap root in `<div className={activeBreakpoint}>`.
3.  **Drop Zone System:** Replace standard `onDrop` with injected `<DropZone>` components in the recursive renderer.
4.  **Overlay Implementation:** Create the visual highlighting layer.
5.  **Page Settings Implementation:** Create the Page Settings modal and refactor `BuilderCanvas` to respect the new height and width modes.