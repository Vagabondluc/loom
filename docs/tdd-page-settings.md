# 🧪 TDD PACK — Page Settings (UX Contract–Driven)

**Subsystem:** Page / Document Root
**Authority:** Visual Builder UX Contract
**Scope:** Canvas sizing, scroll ownership, document semantics, Structure Mode interaction

---

## LAYER 1 — Mechanical TDD (Existence & Wiring)

> These tests assert that Page Settings exist and are wired correctly — **not** that they behave well.

### [M-PAGE-01] Page Settings Are Accessible

**Given**
* No node is selected

**Then**
* The Properties panel exposes “Page Settings”
* OR toolbar exposes a “Page” / “Settings” control

---

### [M-PAGE-02] Page Has Persistent Settings Object

**Given**
* A new project is created

**Then**
* The root page has a settings object
* Settings persist across reload

---

### [M-PAGE-03] Page Settings Are Not a Normal Node

**Given**
* Navigator is visible

**Then**
* Page root cannot be deleted
* Page root cannot be reparented
* Page root cannot be duplicated

---

## LAYER 2 — Behavioral TDD (Real Usage)

> These tests simulate **how users actually break builders**.

---

### [BT-PAGE-01] Grow With Content Eliminates Overflow

**Context**
* Page height mode = Grow With Content
* User adds content exceeding viewport height

**Expected Behavior**
* Page height increases
* Browser scroll activates
* No internal scrollbars appear unexpectedly

**Failure Condition**
* Content clipped
* Internal scroll container appears without user intent

---

### [BT-PAGE-02] Fit to Viewport Creates Internal Scroll

**Context**
* Page height mode = Fit to Viewport
* User adds content exceeding viewport height

**Expected Behavior**
* Page height remains fixed
* Scroll occurs inside the page container
* Browser scroll does not grow unexpectedly

**Failure Condition**
* Page expands vertically
* Scroll ownership is ambiguous

---

### [BT-PAGE-03] Switching Height Modes Is Reversible

**Context**
* Page contains long content

**Action**
* Switch from Grow With Content → Fit to Viewport → Grow With Content

**Expected Behavior**
* No layout corruption
* No lost content
* Page returns to original flow

**Failure Condition**
* Content position shifts unpredictably
* Phantom margins or gaps appear

---

### [BT-PAGE-04] Content Width Constraint Is Stable

**Context**
* Page max width set to “Medium”

**Expected Behavior**
* Content is centered
* Background remains full width
* Child layouts remain unchanged

**Failure Condition**
* Nested containers resize unpredictably
* Structure Mode boundaries shift

---

## LAYER 3 — UX Contract TDD (Non-Negotiable Guarantees)

> These tests decide **ship / no-ship**.

---

### [UX-PAGE-01] Page Never Lies About Its Size

**Guarantee**
* Visible page boundary always reflects real scroll and height behavior

**Verification**
* Compare visual boundary with actual scroll behavior
* Toggle Structure Mode and verify alignment

**Violation Examples**
* Outline shows full page but scroll happens elsewhere
* Structure Mode hides overflow

---

### [UX-PAGE-02] One Scroll Owner at a Time

**Guarantee**
* At any moment, scroll ownership is unambiguous:
  * Browser **or**
  * Page container

**Verification**
* Scroll wheel affects exactly one scroll context

**Violation Examples**
* Scroll wheel alternates between contexts
* Nested scrollbars appear unexpectedly

---

### [UX-PAGE-03] Page Settings Are Explicit and Discoverable

**Guarantee**
* User can always determine:
  * current height mode
  * current max width

**Verification**
* Status indicator present (toolbar, properties header, or badge)

**Violation Examples**
* Page behavior changes without visible explanation

---

### [UX-PAGE-04] Page Settings Apply Instantly

**Guarantee**
* Changing a page setting updates the canvas immediately

**Verification**
* Toggle height mode and observe canvas resize live

**Violation Examples**
* Requires refresh
* Requires save/apply
* Delayed update

---

### [UX-PAGE-05] Page Settings Are Mode-Invariant

**Guarantee**
* Page behavior is consistent across:
  * Design Mode
  * Structure Mode
  * Preview Mode

**Verification**
* Toggle modes and observe page boundaries and scroll

**Violation Examples**
* Preview scroll differs from Design
* Structure Mode misrepresents size

---

## SHIP / NO-SHIP GATE — Page Settings

A release **cannot ship** unless:

```
[ ] Page height mode is explicit
[ ] Scroll ownership is singular
[ ] Structure Mode reflects page boundaries honestly
[ ] No overflow without intent
[ ] Undo/Redo works
[ ] Preview matches export
```
