
# 🛡️ Audit Enforcement Policy (Traceability Matrix v1.1)

## 0. Canonical Principle
If it cannot be traced, it does not exist.

---

## 1. Document Classes

### 1.1 Contract-Grade Specs (`spec-*.md`)
A spec is Contract-Grade only if:
- All normative requirements are expressed as `REQ-*` blocks
- Every REQ includes:
  - Failure Mode
  - UX Clause(s)
  - TDD Coverage IDs
- Spec declares its TDD partner file (`tdd-*.md`)

### 1.2 TDD Packs (`tdd-*.md`)
A TDD pack is valid only if:
- It covers all REQs referenced by the partner spec
- It includes at least:
  - Mechanical layer
  - Behavioral layer
  - UX Contract layer
- For runtime features: includes Negative + Teardown tests

### 1.3 Informational Docs
Governance/philosophy docs are not required to map to TDD.

---

## 2. Runtime Gates (mandatory where applicable)

If a spec affects runtime or adapters, it MUST include and test:
- Init gate
- Teardown gate
- Idempotence gate
- Editor-Safe gate (proof runtime cannot execute in editor domains)

---

## 3. Compliance Status Rules

✅ Compliant:
- 100% REQ ↔ TDD mapping
- 0 orphan tests (tests that map to no REQ)
- runtime gates pass (if applicable)

⚠️ Pending Trace:
- inventory exists, but REQ blocks or mapping incomplete

❌ Non-Compliant:
- normative language outside REQ blocks
- missing negative/teardown where required
- missing TDD partner for Contract-Grade REQs

---

## 4. CI Enforcement (Hard Gate)

CI MUST fail if:
- a `spec-*.md` contains MUST/SHALL/etc without REQ blocks
- a REQ block is missing "TDD Coverage:"
- a spec with REQs does not declare a TDD partner
- a spec references a missing TDD file

Reference implementation: `scripts/check-contract.sh` and optional external runner `docs/tools/check-contract.node.mjs`

### Node-Based Governance Tools (Transitional)

Node-based audit tools may exist under `docs/tools` as a temporary compatibility measure.
They MUST:
- Never be executed in the GAIS browser runtime
- Never be imported by runtime code
- Be executable only by CI or external tooling

The canonical enforcement model is an external governance runner (separate Git/Gov repo). 
The presence of Node-based tools in this repo is transitional and does not change Loom's GAIS-first policy.

### Demo Runtime Shims (Transitional)

Files under `demo/**/registry/runtime/**` are transitional shims only.

They MUST:
- Contain no runtime logic (no `class`, `function`, or other implementation)
- Only re-export symbols from `services/registry/runtime` (e.g., `export { prelineAdapter } from '../../../../services/registry/runtime/adapters/preline'`)
- Not introduce new adapters, types, or lifecycle code

CI will enforce this via `scripts/check-shim-purity.sh` which validates the shim-only rule.

---

## 5. Upgrade Workflow for ⚠️ Specs

Step 1 — Add Inventory Appendix:
- Proposed REQ IDs (table)
- Missing runtime gates checklist
- TDD impact

Step 2 — Rewrite into REQ blocks:
- Move all MUST statements into REQ format
- Add Traceability lines

Step 3 — Upgrade TDD pack:
- Add tests for every new REQ
- Add negative + teardown (runtime)

Step 4 — Promote in Audit Matrix:
- Mark ✅ only when mapping is complete

---

## 6. Audit Authority
This policy is governed by:
- UX_CONTRACT.md
- INVARIANTS.md

Violation blocks release.
