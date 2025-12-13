
# 🧪 TDD PACK — Export Engine Suite (REQ-Mapped)

**Feature:** Export Engine Suite
**Subsystem:** Export / Transformation
**Spec:** `spec-export-suite.md`
**UX Clauses:** UX-16 (Preview vs Export Guarantees)
**Risk Class:** Critical (Trust, Drift, CI Instability)

⚠️ **Note:** REQ-EXP-06 through REQ-EXP-10 are provisional and enforced by this TDD pack prior to their full formalization in `spec-export-suite.md`.

---

## Coverage Matrix (REQ → Tests)

| REQ-ID     | Covered By Tests                 |
| ---------- | -------------------------------- |
| REQ-EXP-01 | M-EXP-01, UX-EXP-01              |
| REQ-EXP-02 | BT-EXP-02, BT-EXP-02B, UX-EXP-02 |
| REQ-EXP-03 | BT-EXP-03, NEG-EXP-03            |
| REQ-EXP-04 | M-EXP-04, NEG-EXP-04             |
| REQ-EXP-05 | M-EXP-05, UX-EXP-05              |
| REQ-EXP-06 | UX-EXP-HTML-01                   |
| REQ-EXP-07 | UX-EXP-REACT-01                  |
| REQ-EXP-08 | UX-EXP-INTENT-01                 |
| REQ-EXP-09 | NEG-EXP-GO-01                    |
| REQ-EXP-10 | NEG-EXP-UNDO-01                  |


---

## Layer 1 — Mechanical TDD (Correctness)

### M-EXP-01 — Preview DOM Capture Is Canonical

**Covers:** REQ-EXP-01

* **Given:** Builder state with a populated node tree
* **When:** Export pipeline starts
* **Then:** Export reads from Preview DOM snapshot, not editor DOM
* **Fail If:** Editor-only wrappers or overlays are detected

---

### M-EXP-04 — Editor Artifacts Are Stripped

**Covers:** REQ-EXP-04

* **Given:** Nodes rendered with editor-only attributes
* **When:** Export is generated
* **Then:** Output contains zero editor markers

  * no `data-node-id`
  * no selection overlays
  * no inspector hooks

---

### M-EXP-05 — Deterministic Output

**Covers:** REQ-EXP-05

* **Given:** Identical Builder State
* **When:** Export runs twice
* **Then:** Byte-for-byte identical output is produced

---

## Layer 2 — Behavioral TDD (User Reality)

### BT-EXP-02 — Unidirectional Pipeline

**Covers:** REQ-EXP-02

* **Action:** Run export, then inspect builder state.
* **Expected:** The `nodes` object and `history` stack are unchanged.
* **Failure:** Exporting modifies the live editor state.

---

### BT-EXP-02B — Visual Fidelity Snapshot

**Covers:** REQ-EXP-02

* **Action:** Capture Preview DOM layout metrics and Export DOM metrics.
* **Expected:** Bounding boxes, visibility, and computed styles match within tolerance.

---

### BT-EXP-03 — Runtime Activation Mirrors Preview

**Covers:** REQ-EXP-03

* **Context:** Project contains Applet nodes

* **Action:**

  * Enter Preview → runtime initializes
  * Load Export → runtime initializes

* **Expected:**

  * Same adapters activate
  * Same lifecycle order
  * No extra runtime paths

---

## Layer 3 — UX Contract Proof

### UX-EXP-01 — Preview Is Source of Truth

**Covers:** REQ-EXP-01

* **Guarantee:**
  Preview Mode is the canonical rendering model

* **Verification:**

  * Any deviation between Preview and Export fails test

---

### UX-EXP-02 — Export Matches Preview

**Covers:** REQ-EXP-02

* **Guarantee:**
  What users see in Preview is what they ship

* **Verification:**

  * Visual diff oracle passes

---

### UX-EXP-05 — Export Is Deterministic

**Covers:** REQ-EXP-05

* **Guarantee:**
  Exports are CI-stable

* **Verification:**

  * Hash comparison passes across runs

---

## Layer 4 — Negative / Safety Tests

### NEG-EXP-03 — No Runtime Drift

**Covers:** REQ-EXP-03

* **Action:**
  Inject runtime-only adapter in editor context

* **Expected:**

  * Adapter never initializes
  * Export ignores editor runtime state

---

### NEG-EXP-04 — No Editor Leakage

**Covers:** REQ-EXP-04

* **Action:**
  Export with selection active, overlays visible

* **Expected:**

  * No editor CSS, DOM, or attributes present

---

### NEG-EXP-GO-01 — Go Templates Are Pure Formatting

**Covers:** REQ-EXP-09

* **Action:** Inject executable logic into a node's data.
* **Expected:** Go template export escapes the logic as text, it does not execute it.

---

### NEG-EXP-UNDO-01 — Export Is Side-Effect Free

**Covers:** REQ-EXP-10

* **Action:** Run export and then press Undo.
* **Expected:** The last user action is undone. The export action does not appear in history.

---

## Exit Criteria (Audit-Grade)

A release **MUST FAIL** if:

* Any `REQ-EXP-*` lacks ≥1 test
* Visual diff oracle is missing or skipped
* Runtime init path differs between Preview and Export
* Determinism test fails
* Editor artifacts appear in export

---

## Canonical Principle

> **Export is not interpretation.
> It is proof.**
