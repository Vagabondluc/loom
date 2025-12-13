# 🚧 Known Hard Problems & Non-Solutions

This document transparently lists the difficult technical challenges the builder faces. Acknowledging these problems prevents contributors from attempting naive solutions and guides long-term architectural planning.

---

### 1. Native Drag & Drop API Limitations

*   **Problem:** The HTML5 Drag and Drop API is notoriously inconsistent across browsers, especially regarding drag ghost appearance, `dragEnd` events, and Escape key handling. It has no viable support for touch devices.
*   **Non-Solution:** Trying to patch every browser-specific quirk of the native API. This leads to brittle, unmaintainable code.
*   **Architectural Path:** The native API is acceptable for a v1.0 mouse-driven prototype. The long-term, robust solution is a **custom, JavaScript-driven "controlled drag layer"**. This approach gives us full control over the drag lifecycle, event handling, and allows for a unified implementation for both mouse and touch input.

### 2. Drop Zone Ambiguity in Complex Layouts

*   **Problem:** When multiple containers are nested (e.g., a card body inside a grid column inside a section), their drop zones can overlap. The system must unambiguously determine the user's intent.
*   **Non-Solution:** Relying on DOM event bubbling order (`e.stopPropagation()`) as the sole source of truth. This is unreliable and can vary based on subtle DOM structure changes.
*   **Architectural Path:** Implement a strict, non-negotiable **Conflict Resolution Hierarchy** in the drag-over logic. As defined in `spec-drag-lifecycle.md`, this hierarchy (Deepest First → Nearest Center → Insertion over Nesting) provides a deterministic outcome. All drop zone calculations must be performed centrally, not within individual zone components.

### 3. Nested Scroll Containers

*   **Problem:** If a user is dragging an element and their cursor hovers near the edge of a scrollable container on the canvas, the container should auto-scroll to reveal more drop targets. This is a complex interaction to manage.
*   **Non-Solution:** Attaching `onScroll` listeners everywhere. This is a performance nightmare.
*   **Architectural Path:** This feature should be implemented within the custom controlled drag layer. During a drag, the system can check the cursor's position relative to the viewport and any registered scrollable containers, programmatically dispatching `scrollTop` or `scrollLeft` changes.

### 4. Performance at Scale

*   **Problem:** As a user's project grows to hundreds or thousands of nodes, re-rendering the entire canvas and its interactive overlay on every state change will become unacceptably slow.
*   **Non-Solution:** Relying solely on React's default reconciliation.
*   **Architectural Path:**
    1.  **Memoization:** Aggressively use `React.memo` on `NodeRenderer` and its sub-components.
    2.  **Selector Optimization:** Ensure Zustand selectors are granular and only subscribe to the minimal state required to prevent unnecessary re-renders.
    3.  **Virtualization (Future):** For extremely large projects, the `Navigator` and eventually the `Canvas` itself may need to be virtualized, rendering only the nodes currently in the viewport.