
# ✅ `docs/todo.md` — Documentation Remediation Plan

**Source:** Documentation & TDD Audit Report (June 4, 2024)
**Standard:** Traceability Matrix v1.1
**Goal:** Elevate all critical specs to **Contract-Grade** without expanding scope.

---

## 🔴 BLOCKERS — Must Be Resolved Before Any Feature Work

> These items represent **active contract violations** or enforcement gaps.

### 1. Upgrade `spec-runtime-adapter-registry.md` to Contract-Grade

**Risk:** Runtime safety can be bypassed.

**Tasks:**

* [x] Add explicit `REQ-REG-*` requirement IDs for all normative statements
* [x] Define **Adapter Lifecycle Gates** explicitly:

  * Init
  * Teardown
  * Idempotence
  * Editor-Safe
* [x] Add **negative requirements**:

  * Registry MUST reject duplicate adapter IDs
  * Registry MUST reject adapters without domain declaration
* [ ] Write **unit-level TDD pack** for registry logic (not just Workbench integration)
* [ ] Update traceability matrix with REQ ↔ Test mapping

**Exit Criteria:**
`spec-runtime-adapter-registry.md` marked ✅ Compliant

---

### 2. Fix Undo Semantics Runtime Pollution

**Risk:** Undo stack corruption via runtime events.

**Tasks:**

* [x] Add requirement `REQ-UNDO-RUNTIME-EXCL`

  * “Runtime execution MUST NOT create history snapshots”
* [x] Define negative cases explicitly:

  * Modal open
  * Adapter event
  * Runtime log emission
* [ ] Add Behavioral TDD:

  * Trigger runtime event → history length unchanged
* [x] Verify Undo semantics explicitly ignore Runtime Store (Implemented in treeSlice)

**Exit Criteria:**
`spec-undo-semantics.md` + `tdd-undo-semantics.md` upgraded to Contract-Grade

---

### 3. Enforce Adapter Registry as Single Entry Point

**Risk:** Adapters can be side-loaded or invoked directly.

**Tasks:**

* [x] Document bypass vectors explicitly in `spec-runtime-adapter-registry.md`
* [x] Add enforcement rule:

  * “All adapter initialization MUST go through Registry”
* [ ] Add mechanical tests:

  * Direct adapter invocation throws or no-ops
* [ ] Add UX Contract test:

  * Bypassed adapter never initializes in editor or preview

**Exit Criteria:**
Registry enforcement verified by unit + UX tests

---

## 🟠 HIGH PRIORITY — Required for Trustworthy Export & Runtime Claims

### 4. Formalize Export Fidelity (`spec-export-suite.md`)

**Risk:** “Pixel-perfect” is unverified marketing language.

**Tasks:**

* [ ] Introduce `REQ-EXP-FIDELITY`
* [ ] Declare **Preview Mode DOM as canonical**
* [ ] Define acceptable tolerance (computed styles, layout boxes)
* [ ] Add test strategy:

  * Headless browser render
  * Computed style diff
* [ ] Update `tdd-export-suite.md` accordingly

**Exit Criteria:**
Export fidelity is mechanically provable

---

### 5. Enforce Runtime Boundary Guards

**Risk:** Node kinds are defined but not enforced.

**Tasks:**

* [ ] Add `REQ-BND-*` IDs to `spec-runtime-boundary.md`
* [ ] Define forbidden behaviors per Node Kind
* [ ] Add tests for `NodeRenderer`:

  * Static nodes never execute logic
  * Applets render shell in editor
* [ ] Add teardown verification for Preview → Design transitions

**Exit Criteria:**
Runtime Boundary spec upgraded to Contract-Grade

---

## 🟡 MEDIUM PRIORITY — Traceability & Documentation Hygiene

### 6. Add REQ-ID Blocks to Pending Specs

**Affected Files:**

* `spec-page-settings.md`
* `spec-icon-library.md`
* `spec-document-engine.md`
* `spec-procedural-page-wizard.md`
* `spec-builder-ui-warnings.md`
* `spec-envelope-system.md`

**Tasks (per spec):**

* [ ] Add `REQ-*` identifiers to all MUST / MUST NOT statements
* [ ] Identify at least one negative test per spec
* [ ] Map REQs to existing TDDs (or flag gaps)

**Exit Criteria:**
Specs move from ⚠️ Pending Trace → eligible for Contract review

---

### 7. Clarify Pending Inventory Reasons Inline

**Risk:** Ambiguity during future audits.

**Tasks:**

* [ ] For each ⚠️ spec, add a short “Pending Because” block:

  * Missing REQ IDs
  * Missing negative test
  * Missing runtime gate
* [ ] Keep reasons factual and non-judgmental

**Exit Criteria:**
No “why is this pending?” ambiguity remains

---

## 🟢 LOW PRIORITY — Governance & Tooling

### 8. Add REQ-ID Authoring Template

**Tasks:**

* [x] Create `docs/templates/spec-requirements.md` (as `docs/governance/REQ_ID_TEMPLATE.md`)
* [ ] Include:

  * REQ format
  * Negative requirement example
  * Runtime gate checklist
* [ ] Reference from `TDD_GUIDELINES.md`

---

### 9. Optional: Automate Traceability Checks

**Tasks:**

* [ ] Script to scan specs for `REQ-*` without test references
* [ ] Script to detect orphan TDD tests
* [ ] Output report compatible with Traceability Matrix

---

## 🚦 Rules Until Completion

* ❌ No new feature specs without REQ-IDs
* ❌ No PRs without Layer 3 (UX Contract) tests
* ❌ No runtime behavior without registry registration
