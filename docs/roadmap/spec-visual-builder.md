
# Design Canvas Specification

## 1. Overview
A browser-native, drag-and-drop interface for constructing responsive UI layouts using Tailwind CSS and DaisyUI. This tool operates entirely within the browser (no build steps) and focuses on "low-code" assembly of pre-defined atomic components.

**Key Features:**
*   **Dual Layout Modes**: Specialized visual editors for Flexbox (1D) and CSS Grid (2D) workflows.
*   **Component Registry**: Static manifest of DaisyUI and HTML primitives.
*   **Markdown Ingestion**: Convert markdown text into draggable UI blocks.
*   **Pure React/ESM**: No external bundlers or heavy dependencies.

## 2. Data Model

### 2.1 Component Registry
The palette source of truth. Defines what can be dragged.

```typescript
type ComponentCategory = 'layout' | 'daisyui' | 'html' | 'typography';

interface ComponentDefinition {
  id: string;          // Unique key (e.g., 'btn', 'card')
  label: string;       // Display name
  icon: React.FC;      // Lucide icon
  category: ComponentCategory;
  defaultTag: string;  // HTML tag (e.g., 'div', 'button')
  defaultClass: string;// Base Tailwind classes
  defaultProps?: Record<string, any>;
  allowChildren?: boolean;
}
```

### 2.2 Layout Tree (State)
The runtime representation of the user's design.

```typescript
type LayoutMode = 'flex' | 'grid' | 'static';

interface LayoutNode {
  id: string;
  type: string;        // Refers to ComponentDefinition.id
  parentId: string | null;
  children: string[];  // Ordered list of child Node IDs
  
  // Layout Configuration
  layout: {
    mode: LayoutMode;
    // Flex specific
    direction?: 'row' | 'col';
    justify?: 'start' | 'center' | 'end' | 'between';
    align?: 'start' | 'center' | 'end';
    gap?: number; // Tailwind gap scale
    // Grid specific
    cols?: number; // grid-cols-X
    rows?: number; // grid-rows-X
  };

  // Content & Styling
  data: {
    label?: string;    // Text content
    className: string; // User-added utility classes
    props: Record<string, any>; // HTML attributes (src, href, etc.)
  };
}
```

## 3. Architecture

### 3.1 Store (`zustand`)
*   **State**: `nodes` (map), `rootId`, `selectedId`, `draggedItem`.
*   **Actions**: `addNode`, `moveNode`, `updateNode`, `deleteNode`, `setMode`.
*   **Persistence**: `localStorage` sync for draft saving.

### 3.2 Drag & Drop Strategy
*   **API**: Native HTML5 Drag and Drop (`draggable`, `onDragStart`, `onDrop`, `onDragOver`).
*   **Payload**: `DataTransfer` carries `componentId` (new items) or `nodeId` (reordering).
*   **Drop Zones**:
    *   **Flex Container**: Appends to `children` array based on drop target index.
    *   **Grid Container**: Calculates target cell index (future) or simple append (MVP).

## 4. UI Components

### 4.1 BuilderPalette (Left Sidebar)
*   **Tabs**: 
    *   *Library*: Categorized list of `ComponentDefinition` items.
    *   *Markdown*: Text area input -> Parser -> List of draggable text blocks.
*   **Interaction**: Draggable sources that initiate `handleDragStart` with `componentId`.

### 4.2 BuilderCanvas (Center Stage)
*   **Renderer**: Recursive component (`NodeRenderer`) that maps `LayoutNode` to HTML.
*   **Visual Aids**:
    *   Dashed outlines for empty containers.
    *   Hover outlines for selection candidates.
    *   Active selection ring.
*   **Editor Overlay**: 
    *   When a `grid` container is selected, overlay grid lines.
    *   When a `flex` container is selected, show direction indicators.

### 4.3 BuilderProperties (Right Sidebar)
Context-aware form based on `selectedNodeId`.
*   **Layout Tab**:
    *   If parent is Flex: Show `Grow`, `Shrink`, `Basis`.
    *   If self is Container: Show `Flex/Grid` toggle, `Gap`, `Padding`.
*   **Style Tab**: Tailwind class editor (text area + common toggles).
*   **Content Tab**: Text label, Image SRC, etc.

## 5. Markdown "Expression Engine"
A lightweight parser to turn text into structural layout.

1.  **Input**: User pastes `# Title \n Paragraph text.`
2.  **Parse**:
    *   `# Title` -> `type: 'heading', level: 1`
    *   `Paragraph` -> `type: 'paragraph'`
3.  **Output**: A temporary "Clipboard" of nodes in the Palette.
4.  **Action**: User drags a "Heading" block to the canvas; it instantiates a configured Typography node.

## 6. Implementation Roadmap

1.  **Phase 1: Core Engine (Done)**
    *   Basic Registry.
    *   Recursive Rendering.
    *   Simple Drag & Drop (Append only).

2.  **Phase 2: Layout Modes (Next)**
    *   Formalize `layout.mode` in store.
    *   Create "Layout Controls" in Property Panel (Flex Row/Col toggle, Gap slider).
    *   Implement "Grid" container with `grid-cols-X` controls.

3.  **Phase 3: Markdown Ingestion**
    *   Implement Regex parser in Palette.
    *   Create "Ghost Nodes" for draggable text blocks.

4.  **Phase 4: Refinement**
    *   Reordering (Drag existing node to new spot).
    *   Undo/Redo history stack.
    *   JSON Export/Import.