
# 📜 Specification: Runtime Boundary Enforcement (Contract-Grade)

**Subsystem:** Rendering / Runtime Safety
**Status:** 🔒 **Contract-Grade**
**TDD Partner:** `tdd-runtime-boundary.md`
**UX Clauses:** UX-13 (Editor Safety), UX-18 (Runtime Explicitness)
**Risk Class:** Critical (Editor Corruption, Hidden Runtime)

---

## 1. Purpose

This specification defines the **Runtime Boundary**: the hard separation between **authoring-time rendering** and **runtime execution**.

Its goal is to guarantee that:

* The **Editor never executes runtime logic**
* JavaScript-driven UI systems (Preline, Charts, etc.) cannot mutate the DOM during authoring
* Runtime activation is **explicit, gated, and reversible**

---

## 2. Canonical Taxonomy: Node Kinds

Every registered component **MUST** declare a `kind`.
The `kind` determines its rendering and execution rights.

| Kind            | Definition          | Editor Behavior            | Preview Behavior  |
| --------------- | ------------------- | -------------------------- | ----------------- |
| **static**      | Pure CSS / markup   | Fully rendered             | Fully rendered    |
| **container**   | Structural grouping | Fully rendered + dropzones | Fully rendered    |
| **interactive** | Native inputs       | Rendered, inert            | Fully interactive |
| **applet**      | JS-driven runtime   | **Static shell only**      | Runtime activated |

---

## 3. Contract Requirements (REQ-BND)

### REQ-BND-01 — Static Nodes Never Execute Runtime Code

**Statement (Normative):**
Components classified as `static` or `container` **MUST NOT** execute JavaScript or initialize runtime behavior in any mode.

**Rationale:**
These nodes form the safety baseline of the editor.

**Scope:** Renderer, Component Registry

**Applies In:**

* Design Mode
* Structure Mode
* Preview Mode
* Export

**Failure Mode:**
Unexpected DOM mutation or editor instability.

**Traceability:**

* UX Clause: UX-13
* TDD: M-BND-01, NEG-BND-01

---

### REQ-BND-02 — Applets Render Shell-Only in Editor

**Statement (Normative):**
Components classified as `applet` **MUST** render **static markup only** in all editor domains.
Runtime initialization is **FORBIDDEN** outside Preview / Export.

**Rationale:**
Prevents JS frameworks (Preline, ChartJS) from mutating the editor DOM.

**Scope:** NodeRenderer, Adapter Registry

**Applies In:**

* Design Mode
* Structure Mode
* Kitchen Sink

**Failure Mode:**
Editor DOM corruption, selection bugs, crash loops.

**Traceability:**

* UX Clause: UX-13
* TDD: BT-BND-02, NEG-BND-02

---

### REQ-BND-03 — Runtime Executes Only in Preview / Export

**Statement (Normative):**
Runtime adapters **MUST ONLY** initialize when:

* `isPreviewMode === true`, or
* Export generation explicitly requires runtime bootstrap

Execution in any editor context is **FORBIDDEN**.

**Rationale:**
Runtime must be explicit, inspectable, and reversible.

**Scope:** RuntimeAdapterRegistry, Preview Controller

**Applies In:**

* Preview Mode
* Export

**Failure Mode:**
Hidden execution, undo corruption, non-deterministic behavior.

**Traceability:**

* UX Clause: UX-18
* TDD: BT-BND-03, UX-BND-01

---

### REQ-BND-04 — Interactive Nodes Are Inert in Editor

**Statement (Normative):**
`interactive` nodes (inputs, selects, toggles) **MUST NOT** mutate application state in editor domains.

**Implementation Rule:**
Pointer events **MUST** be suppressed outside Preview Mode.

**Rationale:**
Prevents accidental data entry and state drift during design.

**Scope:** NodeRenderer

**Applies In:**

* Design Mode
* Structure Mode

**Failure Mode:**
Editor state desynchronization.

**Traceability:**

* UX Clause: UX-13
* TDD: BT-BND-04

---

### REQ-BND-05 — Deterministic Teardown on Mode Exit

**Statement (Normative):**
Leaving Preview Mode **MUST** fully discard all runtime-mutated DOM and listeners.

**Implementation Constraint:**
Teardown must be achieved via:

* Adapter `teardown()`, and/or
* Forced remount (key change)

**Rationale:**
Prevents zombie listeners and phantom state.

**Scope:** Preview Controller, RuntimeAdapterRegistry

**Applies In:**

* Preview Mode exit

**Failure Mode:**
Memory leaks, duplicated listeners, corrupted editor tree.

**Traceability:**

* UX Clause: UX-18
* TDD: BT-BND-05, NEG-BND-05

---

### REQ-BND-06 — No Auto-Init or Side-Loaded Runtime

**Statement (Normative):**
Runtime systems **MUST NOT** auto-initialize via:

* global scripts
* DOM mutation observers
* framework lifecycle hooks

All runtime activation **MUST** pass through the Runtime Adapter Registry.

**Rationale:**
Eliminates shadow runtime and bypass vectors.

**Scope:** RuntimeAdapterRegistry, Runtime Adapters

**Applies In:**

* All modes

**Failure Mode:**
Untraceable execution.

**Traceability:**

* UX Clause: UX-18
* TDD: NEG-BND-06

---

## 4. Renderer Enforcement Rules

The Renderer is a **firewall**, not a convenience layer.

| Node Kind   | Editor         | Preview         |
| ----------- | -------------- | --------------- |
| static      | Render         | Render          |
| container   | Render         | Render          |
| interactive | Render + inert | Render + active |
| applet      | Static shell   | Shell + runtime |

---

## 5. Compliance Checklist

A Runtime Boundary implementation is **Contract-Compliant** only if:

* [ ] No runtime code runs in editor domains
* [ ] Applets render static shells in editor
* [ ] Runtime activates only via Registry
* [ ] Teardown verified on Preview exit
* [ ] Auto-init paths are blocked
* [ ] All rules have negative tests

---

## Canonical Principle

> **If runtime can touch the editor,
> the editor is already broken.**
