````markdown

# 📜 REQ-ID Template (Contract-Grade)

**Version:** 1.0
**Applies To:** All `spec-*.md` files
**Governed By:** `UX_CONTRACT.md`, `INVARIANTS.md`
**Audit Standard:** Traceability Matrix v1.1

---

## 1. Requirement Block Format (MANDATORY)

Every contract-grade specification **MUST** express its normative requirements using the following block structure.

```md
### REQ-<DOMAIN>-<NN> — <Short Title>

**Statement (Normative):**  
<Clear, testable, non-ambiguous requirement using MUST / MUST NOT / SHALL>

**Rationale:**  
<Why this requirement exists. UX contract, risk, or invariant>

**Scope:**  
<Subsystems affected — e.g., Editor, Runtime, Export, Registry>

**Applies In:**  
- Design Mode
- Structure Mode
- Preview Mode
- Export
- Runtime Workbench
(Select applicable)

**Non-Goals:**  
<Explicitly state what this requirement does NOT cover>

**Failure Mode:**  
<What breaks if violated — user harm or system corruption>

**Traceability:**  
- UX Clause(s): <UX-ID>
- TDD Coverage: <TDD-ID(s)>
```

---

## 2. REQ-ID Naming Convention

### 2.1 Structure

```
REQ-<DOMAIN>-<NN>
```

| Segment  | Meaning                       |
| -------- | ----------------------------- |
| `REQ`    | Normative Requirement         |
| `DOMAIN` | Feature or subsystem          |
| `NN`     | Zero-padded ordinal (01, 02…) |

### 2.2 Approved Domains

| Domain    | Meaning             |
| --------- | ------------------- |
| `UNDO`    | Undo / History      |
| `RUNTIME` | Runtime execution   |
| `ADAPTER` | Runtime Adapters    |
| `REG`     | Registry            |
| `EXP`     | Export              |
| `PAGE`    | Page / Layout       |
| `ICON`    | Icon Library        |
| `DOC`     | Document Engine     |
| `AI`      | AI-driven behavior  |
| `UI`      | Editor UI           |
| `PRE`     | Preline             |
| `SAFE`    | Safety / Guardrails |

---

## 3. Normative Language Rules (STRICT)

Only the following words have **normative force**:

| Word         | Meaning               |
| ------------ | --------------------- |
| **MUST**     | Mandatory             |
| **MUST NOT** | Forbidden             |
| **SHALL**    | Equivalent to MUST    |
| **SHOULD**   | Strong recommendation |
| **MAY**      | Optional              |

❌ Forbidden:

* "should probably"
* "ideally"
* "best effort"
* "in most cases"

---

## 4. Example (Reference Implementation)

```md
### REQ-UNDO-03 — Runtime Actions Are Not Undoable

**Statement (Normative):**  
Runtime execution MUST NOT create undo history entries.

**Rationale:**  
Undo must reflect authoring intent, not execution side-effects.  
Violating this corrupts user trust and history semantics.

**Scope:**  
Undo Store, Runtime Adapters, Behavior Engine

**Applies In:**  
- Preview Mode
- Runtime Workbench

**Non-Goals:**  
This does not restrict AI generation or editor-time mutations.

**Failure Mode:**  
Undo stack becomes polluted with non-authoring steps.

**Traceability:**  
- UX Clause: UX-7.1  
- TDD Coverage: BT-UNDO-RTE-01, NEG-UNDO-RTE-01
```

---

## 5. Spec Compliance Checklist (Per File)

A spec is **Contract-Grade** only if:

* [ ] All **MUST** statements are inside `REQ-*` blocks
* [ ] Every REQ has a **Failure Mode**
* [ ] Every REQ maps to ≥1 **TDD test**
* [ ] At least one **negative test** exists
* [ ] Runtime impact is explicitly stated
* [ ] No implicit or narrative requirements exist

---

## 6. Audit Enforcement Rules

* ❌ Any spec without REQ blocks is **Narrative Only**
* ❌ Any REQ without TDD mapping blocks release
* ❌ Any REQ touching runtime must declare teardown behavior
* ❌ Any REQ violating `INVARIANTS.md` is invalid

---

## 7. Migration Guidance

To upgrade a legacy spec:

1. Extract all sentences using *must / should / forbidden*
2. Convert each into a `REQ-*` block
3. Assign domain + ordinal
4. Link to existing TDDs or create missing ones
5. Update Audit Matrix status

---

## 🧠 Canonical Principle

> **If it cannot be traced, it does not exist.**

````
