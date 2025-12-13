
# 🧪 TDD PACK — Runtime Boundary Enforcement

**Feature:** Runtime Boundary (DaisyUI vs Preline / Applets)
**Subsystem:** Renderer / Runtime Safety
**Spec:** `spec-runtime-boundary.md`
**UX Clauses:** UX-13 (Editor Safety), UX-18 (Explicit Runtime), UX-20 (Workbench)
**Risk Class:** **Critical**
**Gate:** **Hard (Editor Safety + Runtime Isolation)**

---

## Test Layers

This TDD pack enforces **where code may execute**, **when runtime is allowed**, and **what must never happen in editor domains**.

---

## Layer 1 — Mechanical TDD (Renderer Guards)

### **M-BND-01 — Static Nodes Never Execute Runtime JS**

**Given:** A node with `kind: static`
**When:** Rendered in Design Mode or Structure Mode
**Then:**

* No runtime adapter is resolved
* No runtime registry calls occur
* No global JS hooks are invoked

---

### **M-BND-02 — Container Nodes Never Execute Runtime JS**

**Given:** A node with `kind: container`
**When:** Rendered in any editor domain
**Then:**

* Render is pure React + CSS
* No runtime adapter lifecycle is invoked

---

### **M-BND-03 — Interactive Nodes Suppress Events in Editor**

**Given:** A node with `kind: interactive`
**When:** Rendered in Design or Structure Mode
**Then:**

* Pointer events are suppressed (`pointer-events: none`)
* No DOM events mutate state
* No runtime adapters are involved

---

### **M-BND-04 — Applet Nodes Render Static Shell in Editor**

**Given:** A node with `kind: applet`
**When:** Rendered in Design Mode, Structure Mode, or Kitchen Sink
**Then:**

* Only static HTML template is rendered
* No runtime adapter is initialized
* No JS-driven behavior is active

---

## Layer 2 — Behavioral TDD (Mode Transitions)

### **BT-BND-01 — Runtime Activates Only in Preview Mode**

**Given:** An Applet node present on the canvas
**When:** Preview Mode is toggled ON
**Then:**

* Runtime Adapter Registry initializes the adapter
* Adapter `init()` is called exactly once
* Behavior becomes interactive

---

### **BT-BND-02 — Runtime Never Activates in Editor Domains**

**Given:** An Applet node present
**When:** User interacts in:

* Design Mode
* Structure Mode
* Material Library
  **Then:**
* Adapter `init()` is never called
* No runtime effects occur

---

### **BT-BND-03 — Runtime Teardown on Preview Exit**

**Given:** Preview Mode is active with initialized Applets
**When:** Preview Mode is toggled OFF
**Then:**

* All active adapters receive `teardown()`
* DOM is restored to clean React render
* No mutated DOM nodes persist

---

### **BT-BND-04 — Mode Toggle Is Idempotent**

**Given:** Preview Mode toggled ON → OFF → ON
**When:** The sequence completes
**Then:**

* Adapters are not double-initialized
* Event listeners are not duplicated
* Behavior remains deterministic

---

## Layer 3 — Negative / Safety Tests (Non-Negotiable)

### **NEG-BND-01 — AutoInit Forbidden in Editor**

**Action:** Attempt to call `HSStaticMethods.autoInit()` in Design Mode
**Expected:**

* Call is blocked or ignored
* Critical warning logged
* No DOM mutation occurs

---

### **NEG-BND-02 — Adapter Bypass Forbidden**

**Action:** Directly invoke adapter `init()` without Registry authorization
**Expected:**

* Operation fails
* Registry reports defect
* Adapter does not run

---

### **NEG-BND-03 — Runtime JS Cannot Leak Across Modes**

**Action:**

1. Enter Preview Mode
2. Activate Applet behavior
3. Exit Preview Mode
4. Re-enter Design Mode

**Expected:**

* No residual JS behavior remains
* No global listeners persist
* DOM is clean

---

## Layer 4 — UX Contract Proof

### **UX-BND-01 — Editor Is Runtime-Free**

**Guarantee:**
The Editor never executes runtime logic.

**Verification:**
Spy confirms:

* 0 adapter `init()` calls
* 0 runtime registry activity
  outside Preview / Export

---

### **UX-BND-02 — Explicit Runtime Boundary**

**Guarantee:**
Runtime behavior is always visible, intentional, and mode-scoped.

**Verification:**

* Runtime activates only on Preview toggle
* Deactivates immediately on exit
* All lifecycle events observable

---

## Exit Criteria (Hard Gate)

This TDD pack **passes** only if:

* [ ] Static / Container nodes never execute JS
* [ ] Interactive nodes are inert in editor
* [ ] Applets render shell only in editor
* [ ] Runtime activates only in Preview / Export
* [ ] Teardown fully restores DOM
* [ ] AutoInit cannot run in editor
* [ ] Adapter bypass is impossible

Failure of **any** test is a **release blocker**.

---

## Canonical Principle

> **The Editor is a place to think.
> Runtime is a place to act.
> Crossing that boundary without consent is a defect.**
