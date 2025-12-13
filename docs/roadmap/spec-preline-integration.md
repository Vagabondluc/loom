
# Specification: Preline UI Integration v2.1 (Adapter Contract)

## 1. Overview & Purpose
This document defines the strict integration contract for **Preline UI** within the Loom engine. Unlike CSS-only libraries (DaisyUI), Preline relies on JavaScript for interactivity. To prevent editor instability, we treat Preline not as a component library, but as a **Runtime Adapter**.

**Governing Decision:** `Dec-014` (Preline Integration Contract)
**Implementation Status:** Strict Adapter Pattern required.

## 2. Core Guarantees

### 2.1 React Owns the Structure
Preline operates on the DOM. To exist safely within React:
*   **[REQ-PRE-01] Allowed Mutations:** An adapter may toggle classes (e.g., `hidden`, `active`) and attributes (e.g., `aria-expanded`) *inside* the adapter-owned root element.
*   **[REQ-PRE-02] Forbidden Mutations:** An adapter **must not** insert, remove, or reorder DOM nodes that React rendered. It **must not** rewrite `innerHTML`.
*   **[REQ-PRE-03] Consequence:** Any component violating this is marked "Unsafe" and rejected from the registry.

### 2.2 Idempotence & Scoping
*   **[REQ-PRE-04] Idempotence:** Re-initializing an adapter on the same node (e.g., toggling Preview off/on) **must not** duplicate event listeners or corrupt state.
*   **[REQ-PRE-05] Scoping:** Initialization must be scoped to the specific `rootElement` of the component whenever possible. Global `HSStaticMethods.autoInit()` is restricted to full-page Preview or Export.

### 2.3 Loading Domains
*   **[REQ-PRE-06] Material Library:** Domain A (Static Presence). **No JS execution.**
*   **[REQ-PRE-07] Editor Canvas:** Domain A (Static Presence). **No JS execution.**
*   **[REQ-PRE-08] Runtime Workbench:** Domain C (Runtime Activation). **Full execution.**
*   **[REQ-PRE-09] Preview Mode:** Domain C (Runtime Activation). **Full execution.**

---

## 3. Scope of Work

### 3.1 Kitchen Sink (`Preline` Tab): Static Reference
The Material Library serves as a **visual reference only**.
*   **[REQ-PRE-10] Static Reference:** Content must be static HTML shells of Accordions, Modals, Tabs.
*   **[REQ-PRE-11] No Imports:** The component **must not** import or use `HSStaticMethods` or Preline modules.

### 3.2 Visual Builder Palette: Static Templates
*   **[REQ-PRE-12] Registry Definition:** `preline-accordion`, `preline-modal` defined in `registry/preline.ts`.
*   **[REQ-PRE-13] Node Kind:** Must be `kind: 'applet'`.
*   **[REQ-PRE-14] Meta Tag:** Must include `runtimeAdapterId: 'preline'`.

### 3.3 Runtime Adapter: Preline
This is the bridge that animates the static shells.

**Identity:**
*   `adapterId`: `preline`
*   `domains`: `['preview', 'workbench', 'export']`

**Lifecycle Contract:**
1.  **Init `(rootEl, node, domain)`**:
    *   **[REQ-PRE-15] Availability Check:** Must verify `window.HSStaticMethods` availability.
    *   **[REQ-PRE-16] Event Emission:** Emits `adapter:init:start` and `adapter:init:done`.
2.  **Teardown `(rootEl)`**:
    *   **[REQ-PRE-17] Cleanup Strategy:** Must implement Best-Effort Cleanup (remove listeners) OR Hard Reset (force React remount) upon exit.
    *   **[REQ-PRE-18] Event Emission:** Emits `adapter:teardown`.
3.  **Events**:
    *   **[REQ-PRE-19] Event Mapping:** Maps native Preline events (e.g., `open.hs.overlay`) to normalized Loom events (`adapter:event`).

### 3.4 Runtime Workbench Integration
The Workbench is the **Device Under Test (DUT)** environment for this adapter.
*   **[REQ-PRE-20] Stimulus:** User can trigger "Open Modal" via abstract action.
*   **[REQ-PRE-21] Observation:** Workbench Log must show `adapter:action` followed by `adapter:event`.

## 4. Acceptance Criteria (Summary)
- [ ] **Static Safety:** Clicking Preline components in the Kitchen Sink does absolutely nothing.
- [ ] **Preview Fidelity:** Entering Preview Mode activates `hs-accordion` behavior immediately.
- [ ] **Clean Exit:** Leaving Preview Mode restores the DOM to its pure React state (no lingering `style` attributes or listeners).
- [ ] **Workbench Logs:** Interactions in the Workbench produce visible, timestamped logs.
- [ ] **No Console Errors:** No "element not found" or "already initialized" warnings during rapid mode switching.
