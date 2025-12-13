
# 📜 Specification: Export Engine Suite (Contract-Grade)

**Subsystem:** Export / Transformation
**Status:** 🔒 **Contract-Grade**
**TDD Partner:** `tdd-export-suite.md`
**UX Clauses:** UX-16 (Preview vs Export), UX-13 (Editor Safety)
**Risk Class:** Critical (Trust & Fidelity)

---

## 1. Purpose

The Export Engine converts **Builder Authoring State** into deployable artifacts **without semantic loss, hidden behavior, or editor artifacts**.

Export is a **pure transformation**, never execution.

---

## 2. Canonical Export Model

### REQ-EXP-01 — Preview DOM Is Canonical

**Statement (Normative):**
The **Preview Mode DOM** **MUST** be treated as the canonical reference for all export fidelity comparisons.

**Rationale:**
Preview is the only environment where runtime activation is explicit, controlled, and observable.

**Scope:** Export Engine, Preview Renderer

**Applies In:**

* Preview Mode
* Export

**Failure Mode:**
Exported output visually or behaviorally diverges from what the user validated.

**Traceability:**

* UX Clause: UX-16
* TDD: UX-EXP-01

---

## 3. Export Pipeline Guarantees

### REQ-EXP-02 — Unidirectional Export Pipeline

**Statement (Normative):**
Export **MUST** follow a unidirectional pipeline:

`Builder State → Normalized AST → Target Generator → Artifact`

Reverse mutation or feedback into Builder State is **FORBIDDEN**.

**Rationale:**
Prevents hidden state corruption and non-deterministic output.

**Failure Mode:**
Export modifies editor data or depends on execution order.

**Traceability:**

* UX Clause: UX-13
* TDD: M-EXP-02

---

### REQ-EXP-03 — Deterministic Output

**Statement (Normative):**
Given identical Builder State, export **MUST** produce byte-stable output.

**Rationale:**
Required for CI, diffing, caching, and trust.

**Failure Mode:**
Non-reproducible builds.

**Traceability:**

* UX Clause: UX-16
* TDD: BT-EXP-03

---

## 4. Runtime & Editor Isolation

### REQ-EXP-04 — No Editor Artifacts Exported

**Statement (Normative):**
Exported artifacts **MUST NOT** include any editor-only metadata, attributes, or DOM scaffolding.

**Examples (Forbidden):**

* selection handles
* drag overlays
* editor data attributes
* undo/history state

**Rationale:**
Exported output must be clean, portable, and safe.

**Failure Mode:**
Leaked implementation details.

**Traceability:**

* UX Clause: UX-13
* TDD: NEG-EXP-01

---

### REQ-EXP-05 — Runtime Activation Mirrors Preview

**Statement (Normative):**
If runtime adapters are active in Preview, export **MUST** reproduce equivalent activation behavior for that target.

**Clarification:**

* Static exports may embed runtime bootstrap scripts
* Runtime **MUST NOT** execute during export generation

**Rationale:**
Avoids behavior drift between Preview and deployment.

**Failure Mode:**
Exported UI behaves differently than Preview.

**Traceability:**

* UX Clause: UX-16
* TDD: BT-EXP-05

---

## 5. Target-Specific Guarantees

### REQ-EXP-06 — Static HTML Fidelity

**Statement (Normative):**
Static HTML export **MUST** render pixel-equivalent layout to Preview Mode within defined tolerance.

**Tolerance Definition:**

* Computed layout boxes
* Computed styles
* DOM hierarchy

**Failure Mode:**
“Pixel-perfect” becomes a marketing claim instead of a fact.

**Traceability:**

* UX Clause: UX-16
* TDD: UX-EXP-HTML-01

---

### REQ-EXP-07 — React Export Runnable

**Statement (Normative):**
React source export **MUST** produce a runnable project without manual repair.

**Minimum Guarantee:**
`npm install && npm run dev` succeeds.

**Failure Mode:**
Developer trust loss.

**Traceability:**

* UX Clause: UX-16
* TDD: UX-EXP-REACT-01

---

### REQ-EXP-08 — App Intent Is Implementation-Free

**Statement (Normative):**
App Intent export **MUST NOT** contain HTML tags, CSS classes, or framework identifiers.

**Rationale:**
Intent export is semantic, not visual.

**Failure Mode:**
Intent polluted by presentation details.

**Traceability:**

* UX Clause: UX-16
* TDD: UX-EXP-INTENT-01

---

### REQ-EXP-09 — Go Templates Are Pure Formatting

**Statement (Normative):**
Go template export **MUST NOT** execute logic, I/O, or runtime code.

**Allowed:**

* Structural loops
* Conditional visibility already resolved

**Failure Mode:**
Templates become an execution surface.

**Traceability:**

* UX Clause: UX-13
* TDD: NEG-EXP-GO-01

---

## 6. Safety & Non-Goals

### REQ-EXP-10 — Export Is Side-Effect Free

**Statement (Normative):**
Export **MUST NOT** mutate:

* Builder State
* Runtime Store
* Undo History

**Rationale:**
Export is observation, not action.

**Failure Mode:**
History corruption.

**Traceability:**

* UX Clause: UX-7.1
* TDD: NEG-EXP-UNDO-01

---

## 7. Compliance Checklist

Export Engine is **Contract-Compliant** only if:

* [ ] Preview DOM declared canonical
* [ ] All runtime behavior mirrors Preview
* [ ] Deterministic output proven
* [ ] Editor artifacts stripped
* [ ] Fidelity verified mechanically
* [ ] Runtime never executes during export

---

## Canonical Principle

> **Preview proves intent.
> Export preserves it.
> Anything else is betrayal.**
