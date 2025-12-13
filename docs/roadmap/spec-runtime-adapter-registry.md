
# 📜 Specification: Runtime Adapter Registry (Contract-Grade)

**Subsystem:** Runtime Engine
**Status:** 🔒 **Contract-Grade**
**UX Clauses:** UX-18 (Runtime Adapters), UX-13 (Editor Safety)
**Enforcement Level:** Hard Gate
**Primary Risk Addressed:** Hidden runtime execution & adapter bypass

---

## 1. Purpose

The **Runtime Adapter Registry** is the **single authoritative entry point** for all runtime behavior in Loom.

Its purpose is to:

* Prevent hidden or accidental runtime execution
* Enforce lifecycle discipline (init / teardown / idempotence)
* Provide deterministic, inspectable behavior for the Runtime Workbench
* Guarantee that the Editor never executes runtime logic

---

## 2. Definitions

### 2.1 Runtime Adapter

A **Runtime Adapter** is a concrete implementation that fulfills an **abstract Behavior Intent** (e.g., `openModal`, `toggleAccordion`) for a specific runtime engine (Preline, ChartJS, Native DOM, etc.).

Adapters **do not define structure**. They only bind behavior to an existing DOM subtree.

---

### 2.2 Registry

The **Registry** is a centralized, immutable map of Adapter Definitions indexed by `adapterId`.

No adapter may initialize, execute, or teardown outside of the Registry.

---

## 3. Adapter Registry Interface

```ts
interface RuntimeAdapter {
  id: string
  version: string

  domains: {
    preview: boolean
    export: boolean
  }

  init(ctx: AdapterContext): void
  teardown(ctx: AdapterContext): void

  events?: AdapterEventEmitter
}
```

---

## 4. Contract Requirements (REQ-REG)

### 4.1 Registration & Identity

**REQ-REG-01 — Explicit Registration**
All runtime adapters **MUST** be registered in the Runtime Adapter Registry.

**REQ-REG-02 — Unique Adapter IDs**
The Registry **MUST REJECT** duplicate adapter IDs at registration time.

**REQ-REG-03 — Immutable Registry**
Once initialized, the Registry **MUST NOT** allow adapters to be added, removed, or replaced at runtime.

---

### 4.2 Execution Authority

**REQ-REG-04 — Single Entry Point**
Runtime adapters **MUST NOT** be invoked directly.
All `init`, `teardown`, or action calls **MUST** originate from the Registry.

**REQ-REG-05 — Bypass Prohibition (Negative)**
Any attempt to initialize an adapter outside the Registry **MUST FAIL** (throw or no-op with error).

---

### 4.3 Domain Gating

**REQ-REG-06 — Domain Declaration Required**
Every adapter **MUST** declare its supported domains (`preview`, `export`).

**REQ-REG-07 — Editor Safety Gate**
Adapters **MUST NOT** initialize in:

* Design Mode
* Structure Mode
* Material Library
* Kitchen Sink

**REQ-REG-08 — Preview-Only Activation**
Adapters may initialize **only** when:

* `isPreviewMode === true`
* AND the adapter declares `domains.preview === true`

---

### 4.4 Lifecycle Discipline

**REQ-REG-09 — Deterministic Init**
Calling `init()` multiple times with the same context **MUST NOT**:

* Duplicate listeners
* Duplicate DOM mutations
* Alter adapter state unpredictably

**REQ-REG-10 — Mandatory Teardown**
Every adapter **MUST** implement `teardown()`.

**REQ-REG-11 — Teardown on Exit**
Exiting Preview Mode **MUST** trigger teardown for all active adapters.

---

### 4.5 Failure Isolation

**REQ-REG-12 — Adapter Failure Containment**
If an adapter throws during `init` or execution:

* The error **MUST** be isolated
* Other adapters **MUST NOT** be affected
* The editor **MUST NOT** crash

**REQ-REG-13 — Error Reporting**
Adapter failures **MUST** emit a normalized error event to the Runtime Workbench log.

---

### 4.6 Observability

**REQ-REG-14 — Lifecycle Events Emitted**
The Registry **MUST** emit observable events for:

* Adapter init
* Adapter teardown
* Adapter failure

**REQ-REG-15 — Workbench Visibility**
All Registry events **MUST** be visible in the Runtime Workbench log stream.

---

### 4.7 Enforcement Against Shadow Runtime

**REQ-REG-16 — No Side-Loaded Runtime**
Adapters **MUST NOT** auto-initialize via:

* Global scripts
* DOM mutation observers
* Framework lifecycle hooks

**REQ-REG-17 — Forbidden AutoInit (Negative)**
Any adapter calling runtime init without Registry authorization **MUST BE TREATED AS A DEFECT**.

---

## 5. Registry Behavior Rules

| Scenario         | Expected Behavior                      |
| ---------------- | -------------------------------------- |
| Preview Mode ON  | Registry initializes eligible adapters |
| Preview Mode OFF | Registry tears down all adapters       |
| Adapter crashes  | Error isolated + logged                |
| Adapter re-init  | Idempotent behavior                    |
| Editor Mode      | No adapter code runs                   |

---

## 6. UX Contract Alignment

| UX Clause | Guarantee                                                         |
| --------- | ----------------------------------------------------------------- |
| UX-18     | All runtime behavior is explicit, inspectable, and adapter-driven |
| UX-13     | Editor never executes runtime logic                               |
| UX-RW-04  | All adapter activity is observable                                |

---

## 7. Out of Scope

This spec does **not** define:

* Adapter internal logic
* DOM structure
* Styling or layout
* Performance characteristics

Those belong to:

* Adapter-specific specs (e.g., `spec-adapter-preline.md`)
* Export specs
* UI component registries

---

## 8. Compliance Checklist

A Runtime Adapter Registry is **Contract-Compliant** only if:

* [ ] All adapters have REQ-compliant registration
* [ ] No adapter runs in editor modes
* [ ] Init / teardown / idempotence are test-verified
* [ ] Registry cannot be bypassed
* [ ] Runtime Workbench observes all lifecycle events

---

## 9. Required TDD Coverage

This spec **REQUIRES**:

* Unit tests for Registry logic
* Negative tests for bypass attempts
* Runtime Workbench verification
* Editor safety assertions

(See `tdd-runtime-adapter-registry.md`)
