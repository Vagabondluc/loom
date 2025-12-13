
# TDD PACK — Preline UI Integration (Traceable)

**Feature:** Preline Adapter & Runtime Safety
**Subsystem:** Runtime / Adapters
**UX Contract Sections Covered:** [UX-18] Runtime Adapters, [Dec-014] Preline Contract
**Primary User Intent:** To use enterprise-grade components that are visually rich in the editor but only execute behavior in safe runtime domains.

---

## Layer 1: Mechanical TDD (Implementation Correctness)

*   **[M-PRE-01] Registry Config**
    *   **Trace:** Covers `[REQ-PRE-12]`, `[REQ-PRE-13]`, `[REQ-PRE-14]`
    *   **Test:** Assert `preline-card` has `kind: 'applet'` and `meta.runtimeAdapterId = 'preline'`.
*   **[M-PRE-02] Static Reference**
    *   **Trace:** Covers `[REQ-PRE-10]`, `[REQ-PRE-11]`, `[REQ-PRE-06]`
    *   **Test:** Verify `PrelineSection.tsx` does not import `preline/plugin` or call `autoInit`.
*   **[M-PRE-03] Adapter Lifecycle Wiring**
    *   **Trace:** Covers `[REQ-PRE-08]`, `[REQ-PRE-09]`
    *   **Test:** Mock `PreviewMode`. Assert `adapter.init()` is called. Mock `DesignMode`. Assert `adapter.teardown()` is called.
*   **[M-PRE-04] Scoped Initialization**
    *   **Trace:** Covers `[REQ-PRE-05]`
    *   **Test:** Spy on `init`. Assert `rootElement` argument is passed and is a specific DOM node, not `document`.
*   **[M-PRE-05] Event Emission**
    *   **Trace:** Covers `[REQ-PRE-16]`, `[REQ-PRE-18]`, `[REQ-PRE-19]`
    *   **Test:** Initialize adapter. Assert `adapter:init:done` is logged.

---

## Layer 2: Behavioral TDD (User Reality)

*   **[BT-PRE-01] Static Catalog Safety**
    *   **Trace:** Covers `[REQ-PRE-06]`, `[REQ-PRE-07]`
    *   **Action:** Click the "Accordion" example in the Material Library.
    *   **Expected:** Nothing happens. No class changes, no console logs. Content remains static.
*   **[BT-PRE-02] Preview Activation**
    *   **Trace:** Covers `[REQ-PRE-09]`
    *   **Action:** Drop a Preline Accordion on the Canvas. Enter Preview Mode. Click the Header.
    *   **Expected:** The content expands. The `hidden` class is removed.
*   **[BT-PRE-03] Re-entry Idempotence**
    *   **Trace:** Covers `[REQ-PRE-04]`
    *   **Action:** Toggle Preview ON -> OFF -> ON.
    *   **Expected:** The accordion works correctly on the second entry. Event listeners are not duplicated (verified by checking logs or memory).
*   **[BT-PRE-04] Dynamic Insertion**
    *   **Trace:** Covers `[REQ-PRE-05]`
    *   **Action:** While in Preview Mode, drag *another* Preline component onto the canvas.
    *   **Expected:** The Runtime Enforcer detects the new node and initializes it immediately.
*   **[BT-PRE-05] Workbench Device Test**
    *   **Trace:** Covers `[REQ-PRE-20]`, `[REQ-PRE-21]`
    *   **Action:** Select "Preline Modal" in the Runtime Workbench. Click "Fire: Open".
    *   **Expected:** The modal opens. The Log Panel shows `adapter:action { type: 'open' }` and `adapter:event { type: 'open.hs.overlay' }`.
*   **[BT-PRE-06] Teardown Verification**
    *   **Trace:** Covers `[REQ-PRE-17]`
    *   **Action:** Exit Preview Mode. Inspect the DOM.
    *   **Expected:** The Preline component markup matches the static template. Any `style="display: block"` or `class="hidden"` applied by runtime interaction is reset.

---

## Layer 3: UX Contract TDD (Promises to the User)

*   **[UX-PRE-01] Explicit Labeling**
    *   **Guarantee:** Preline components in the Add Panel must display the "Play" icon (Runtime Only).
    *   **Verification:** Visual check of the palette.
*   **[UX-PRE-02] Editor Never Executes Adapters**
    *   **Trace:** Covers `[REQ-PRE-07]`
    *   **Guarantee:** No `HSStaticMethods` calls occur while `isPreviewMode` is false.
    *   **Verification:** Spy on `window.HSStaticMethods.autoInit` in Design Mode. Count must be 0.
*   **[UX-PRE-03] No Zombie Listeners**
    *   **Trace:** Covers `[REQ-PRE-17]`
    *   **Guarantee:** Interaction after teardown produces no side effects.
    *   **Verification:** Open Accordion in Preview. Exit Preview. Click Accordion Header. It must acts as a selection click (blue ring), not a toggle.
*   **[UX-PRE-04] Forbidden Mutations**
    *   **Trace:** Covers `[REQ-PRE-02]`
    *   **Guarantee:** Adapter must NOT inject new DOM nodes (like a modal backdrop) directly into `body` that persists after unmount.
    *   **Verification:** Enter preview, open modal. Exit preview. Assert `document.body` has no lingering backdrop elements.

---

## Layer 4: Performance & Regression

*   **[P-PRE-01] Preview Latency:** Entering Preview Mode with 20 Preline nodes completes initialization in < 100ms.
*   **[R-PRE-01] React Reconciliation:** Rapidly toggling Preview Mode does not cause React "Node not found" or hydration mismatch errors due to DOM manipulation.
