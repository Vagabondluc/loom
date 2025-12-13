
# 📜 The Visual Builder UX Contract

> **Definition:** This document lists the non-negotiable promises we make to the user.
> If a feature works but violates this contract, it is a bug.

---

## §1 — Truth & Trust

### UX-1.1 — The Builder Never Lies
The Properties Panel, Navigator, and Canvas must always agree.
*   If the Inspector says a node is a "Flex Row", it must behave like a Flex Row.
*   If a node is hidden in the Canvas, it must be marked hidden in the Navigator.
*   We never show "fake" settings that don't apply to the current context.

---

## §4 — Structure Mode

### UX-4.4 — Structure Mode Is Safer
Structure Mode exists to resolve ambiguity.
*   It must reveal all hidden, zero-height, or empty nodes.
*   It must show the true hierarchy (parents/children) without visual clutter.
*   Drop zones must be permanently visible and stable in this mode.

---

## §5 — Selection

### UX-5.1 — Selection Is Deterministic
*   Clicking a node must always select it (unless locked/composed).
*   The selection state must persist across view toggles (Design <-> Structure).
*   We never infer selection; the user must explicitly act.

---

## §7 — Undo / History

### UX-7.1 — All Actions Are Recoverable
*   Every state mutation (add, edit, move, delete) creates a history entry.
*   Undo must be non-destructive (it returns to the exact previous state).
*   **v2 Update:** Undo applies only to *structural intent*, not runtime side-effects (see §20).

---

## §8 — Logic & Feedback

### UX-8.1 — Logic Is Never Implicit
*   Hidden behaviors (like data fetching or event triggers) must be visible in the UI (e.g., via badges or the Inspector).
*   Magic "auto-wiring" is forbidden unless explicitly requested by a Wizard.

### UX-8.2 — Editor Never Executes Logic
*   **Design Mode is Static:** No `onClick` handlers, no API calls, no redirects.
*   **Structure Mode is Static:** Pure layout visualization.
*   **Runtime Logic** runs *only* in Preview Mode or the Runtime Workbench.

---

## §9 — Resilience

### UX-9.1 — Errors Are Recoverable
*   If a component crashes, the builder must not crash.
*   The crashing node should be replaced by an "Error Placeholder" allowing the user to delete or fix it.

---

## §10 — Logic Self-Documentation

### UX-BL-10 — Logic Is Self-Documenting
Every step in a logic flow has an inspectable explanation object. The UI never presents a logic step without a way to understand its intent.

### UX-BL-11 — Explanations Are Design-Time Only
The explanation text and authority badge never change during a runtime simulation. They are static, design-time artifacts.

### UX-BL-12 — Explanation Authority Is Explicit
The inspector must always display a clear indicator for "Generated", "Authored", or "Stale".

### UX-BL-13 — Drift Is Never Silent
If a logic definition changes while its explanation is "Authored," the UI must visually flag the explanation as potentially out of sync.

### UX-BL-14 — AI Is Assistive, Never Authoritative
AI-generated explanations must be deterministic, inspectable, overridable, and must never conceal logic. AI output is always secondary to user intent.

---

## §13 — Runtime Boundaries

### UX-13 — Runtime Boundary Enforcement
*   Components are strictly classified as **Static**, **Interactive**, or **Applet**.
*   **Applets** (Preline, Charts) render as Static Shells in the Editor.
*   JavaScript initialization for Applets is strictly gated to Preview Mode.

---

## §16 — Preview vs Export Guarantees

### UX-PRE-EXP-01 — Preview Is Export-Truthful
Preview Mode must represent **the highest-fidelity runtime simulation** of any export target.
If it works in Preview:
* It must work in at least one export format.
* The export type must be clearly labeled.

### UX-PRE-EXP-02 — No Hidden Runtime
Preview may activate runtime adapters, but:
* Must not rely on editor-only state.
* Must not depend on Loom internals.
* Must degrade cleanly when exported.

### UX-PRE-EXP-03 — Export Declares Lossiness
If an export loses fidelity (e.g., MDX dropping layout, Intent export dropping styles):
* The export UI must declare this explicitly.
* No silent degradation is allowed.

### UX-PRE-EXP-04 — Static HTML Is the Ground Truth
If two exports disagree:
* **Static HTML** is authoritative for layout and styling.
* **Intent Export** is authoritative for semantics.
* **React Export** is authoritative for developer ergonomics.

---

## §18 — Runtime Adapters & Behavior

### UX-BE-RA-01 — Adapters Are Explicit
Every runtime-capable node must explicitly declare its **Adapter** and **Activation Domains**.

### UX-BE-RA-02 — Editor Never Executes Adapters
In Design/Structure Mode:
*   Adapters must **not** initialize.
*   Adapters must **not** attach event listeners.
*   Adapters must **not** mutate the DOM.

### UX-BE-RA-03 — One Behavior, One Meaning
A Logic Action must map to exactly one canonical abstract definition.

### UX-BE-RA-04 — Adapter Lifecycle Is Inspectable
Every adapter activation (init, action, teardown) must be observable in the Runtime Workbench.

### UX-BE-RA-05 — Safe Failure
If a Runtime Adapter crashes, the error must be isolated, and the app must remain stable.

### UX-BE-RA-06 — Deterministic Execution
Given the same Node Tree, Runtime State, and Adapter Selection, execution must be 100% reproducible.

### UX-BE-RA-07 — Adapter Identity Is Stable
Once a node is bound to an Adapter, switching adapters is an explicit, undoable user action.

---

## §19 — Adapter Event Taxonomy

All runtime adapters must emit events using a normalized taxonomy.

*   **[UX-BE-RA-08] Runtime Events Are Observable, Not Causal**
    *   Events are append-only logs.
    *   Events never trigger editor undo.
    *   Events never mutate the node tree.

---

## §20 — Runtime Workbench (The Test Bench)

### UX-RW-01 — The Workbench Is a Sandbox
The Runtime Workbench executes logic and adapters in isolation. No state changes inside the Workbench may affect the Design Canvas or Undo history.

### UX-RW-02 — Three-Pane Mental Model
The Workbench UI is structurally composed of:
1. **Stimulus Panel:** Runtime variable injection and manual triggers.
2. **Stage:** Single isolated runtime target (DUT).
3. **Log Panel:** Real-time adapter + runtime events (Read-only).

### UX-RW-03 — Deterministic Replay
Given the same node, adapter, and injected runtime state, the Workbench must produce identical behavior and logs.

### UX-RW-04 — Explicit Mount / Teardown
Switching targets or exiting the Workbench must tear down adapters, remove event listeners, and reset the runtime store. Zombie behavior is a critical failure.

### UX-RW-05 — Failure Containment
If an adapter throws, the Stage shows an error state, logs record the failure, and the editor remains stable.

### UX-RW-06 — No Hidden Execution
No adapter may initialize unless the Workbench is active OR Preview Mode is active. **The Editor never runs runtime code implicitly.**
