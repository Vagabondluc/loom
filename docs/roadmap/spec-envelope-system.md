
# Specification: Component Envelope System

## 1. Problem Statement
In a WYSIWYG builder, the native DOM `getBoundingClientRect()` often fails to represent the "logical" boundary of a component.
- **Shadows/Transforms**: Can inflate the rect misleadingly.
- **Composed Components**: A DaisyUI Card is conceptually one item, but DOM events might select its internal `.card-body` wrapper.
- **Tiny Elements**: Empty containers or small icons are hard to click because their physical size is near zero.
- **User Expectation**: Users expect to select the "Component," not the "HTML Tag."

## 2. The Four-Layer Envelope Model

To resolve this, we calculate four different boundaries for every node and derive a final **Selection Rect**.

### 2.1 Layout Envelope (Physical DOM)
The precise physical pixels occupied by the element in the document flow.
*   **Source**: `element.getBoundingClientRect()`
*   **Includes**: Padding, Borders.
*   **Excludes**: Margins (usually), Outlines.

### 2.2 Visual Envelope (Perceived)
The box the user "sees".
*   **Logic**: 
    *   Strip `box-shadow` dimensions if they extend beyond the border-box.
    *   Respect `overflow: hidden` clipping from parents.
    *   *Implementation*: Usually identical to Layout Envelope but critical for components with large cosmetic shadows (like modals or floating cards) that shouldn't capture clicks in empty space.

### 2.3 Component Envelope (Logical)
The boundary defined by the Builder Registry.
*   **Composed Mode**: If a component is flagged as `composed: true` (e.g., DaisyUI Card), its internal DOM structure is treated as a "black box."
*   **Behavior**: The builder treats the root node of the component as the *only* selectable entity, ignoring internal padding divs or wrappers unless the user explicitly "drills in" (future feature).
*   **Registry Config**:
    ```typescript
    interface ComponentDefinition {
      // ...
      meta?: {
        composed?: boolean; // If true, internal DOM nodes are ignored for selection
        minDimensions?: { width: number; height: number }; // For empty states
      }
    }
    ```

### 2.4 Interaction Envelope (Hit Area)
The area responsive to mouse events, expanded for usability.
*   **Logic**: `Math.max(VisualEnvelope, MIN_INTERACTION_SIZE)`
*   **Constant**: `MIN_INTERACTION_SIZE = 24px`.
*   **Centroid Logic**: If an element is 0x0 (empty div), the envelope is a 24x24 box centered on the element's coordinate.

## 3. Implementation Strategy

### 3.1 Registry Updates
Update `COMPONENT_REGISTRY` to support metadata for envelope calculation.

### 3.2 `getEnvelopeRect` Utility
A new core function in `demo/builder/utils/envelope.ts` used by the Overlay system.

```typescript
export interface Envelope {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const getEnvelopeRect = (nodeId: string, nodeType: string): Envelope | null => {
  const el = document.getElementById(nodeId);
  if (!el) return null;

  const def = COMPONENT_REGISTRY[nodeType];
  const rect = el.getBoundingClientRect();
  const container = document.getElementById('builder-canvas-stage');
  const containerRect = container?.getBoundingClientRect() || { top: 0, left: 0 };

  // 1. Base Layout Envelope
  let envelope = {
    top: rect.top - containerRect.top + (container?.scrollTop || 0),
    left: rect.left - containerRect.left + (container?.scrollLeft || 0),
    width: rect.width,
    height: rect.height
  };

  // 2. Interaction Expansion (Tiny Elements)
  if (envelope.width < 24) {
    const diff = 24 - envelope.width;
    envelope.left -= diff / 2;
    envelope.width = 24;
  }
  if (envelope.height < 24) {
    const diff = 24 - envelope.height;
    envelope.top -= diff / 2;
    envelope.height = 24;
  }

  return envelope; 
}
```

### 3.3 Event Interception
To enforce the **Component Envelope**, we must prevent pointer events on children of "Composed" nodes during the editing phase.
*   **Strategy**: In `NodeRenderer`, if a node is `composed`, add `pointer-events-none` to its children (unless those children are also BuilderNodes that we want to be selectable).
*   **Refinement**: Actually, we want to select children if they are valid DropZones. The strict "Composed" rule applies mostly to *non-node* DOM elements (like DaisyUI's internal divs).

## 4. Visual Debugging
Add a "Debug Envelopes" toggle in the Builder Toolbar (Dev only) that renders a translucent red box representing the calculated Interaction Envelope vs the blue Selection Ring (Visual Envelope).

---

## 5. Contract Requirements (Inventory)

| Proposed REQ-ID | Title                   | Risk        |
| --------------- | ----------------------- | ----------- |
| REQ-ENV-01      | Single Selection Source | State drift |
| REQ-ENV-02      | Structural Truthfulness | Ghost nodes |
| REQ-ENV-03      | Undo Safety             | Corruption  |
