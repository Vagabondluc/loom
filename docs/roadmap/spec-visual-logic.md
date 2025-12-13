
# Specification: Visual Builder Logic Integration (Phase 7)

## 1. Overview
The goal is to allow "static" layouts to become interactive prototypes. Users should be able to select an element (e.g., a Button) and define **Actions** that trigger on specific **Events**.

## 2. Data Model Changes

### 2.1 BuilderNode Expansion
We will add an `events` property to the `BuilderNode` interface.

```typescript
type TriggerType = 'onClick' | 'onHover' | 'onLoad';

interface Action {
  type: 'navigate' | 'toast' | 'alert' | 'delay';
  payload: Record<string, any>;
}

interface BuilderNode {
  // ... existing fields
  events?: Record<TriggerType, Action[]>;
}
```

### 2.2 Supported Actions (MVP)
1.  **Navigate**: Switch to a different route (or external URL).
    *   `payload: { url: string, target?: '_blank' }`
2.  **Toast**: Show a DaisyUI toast notification.
    *   `payload: { message: string, type: 'info' | 'success' | 'error' }`
3.  **Alert**: Browser native alert (for debugging).
    *   `payload: { message: string }`

## 3. UI Implementation

### 3.1 Properties Panel: "Interactions" Tab
A new tab alongside "Layout", "Content", and "Style".
*   **List**: Shows configured events (e.g., "On Click -> Toast").
*   **Add Interaction**: Button to append a new action.
*   **Action Editor**:
    *   **Trigger**: Dropdown (Click, Hover).
    *   **Action**: Dropdown (Navigate, Toast).
    *   **Payload Config**: Dynamic inputs based on selected action.

### 3.2 Runtime Execution
The `NodeRenderer` in `BuilderCanvas` is currently just a visual preview.
*   **Editor Mode**: Events are disabled (prevent navigation while editing).
*   **Preview Mode**: A new toggle in the header. When enabled:
    *   `onClick` handlers are attached.
    *   Actions are executed by a simple interpreter function.

## 4. Future: Logic Lab Integration
In Phase 8, the `Action` type will expand to include `triggerFlow`, which takes a `flowId` from the Logic Lab. This bridges the Visual Builder with the State Machine editor.

## 5. Implementation Plan
1.  **Update Types**: Add `events` to `BuilderNode`.
2.  **Update Store**: Add `updateNodeEvents` action.
3.  **UI Update**: Create `InteractionProperties` component.
4.  **Runtime**: Implement `useActionExecutor` hook in the renderer.
