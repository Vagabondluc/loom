Yes — that plan is **sound**, and you’re very close to a *clean, future-proof* split.
The key is to formalize **“demo as a removable host”** without letting logic leak into it.

Below is a **tight architectural refinement** that preserves your intent, works with GAIS limitations, and stays compatible with RooCode restructuring.

---

## The Core Principle (make it explicit)

> **`demo/` is a host application, not a framework dependency.**
> Everything required to *run an exported app* must live **outside** `demo/`.

If you delete `demo/`, the remaining tree must still be:

* a runnable UI runtime
* a reusable component + logic library
* exportable into a static app

---

## The Correct Mental Model (3-layer split)

### 1️⃣ **Framework / Runtime (cannot be deleted)**

These are the **minimum Loom runtime** needed by any exported app.

**Lives outside `demo/`.**

```
/core
/shared
/services
/stores
/ui
/utils
/config
/types.ts
```

These MUST:

* contain **no editor concepts**
* contain **no CMS / builder UI**
* be safe to ship to production

Think of this as **@loom/runtime** (even if you never package it).

---

### 2️⃣ **Host Application: Builder / CMS / Tools**

This is your **Design Canvas, Workbench, LogicLab, etc.**

**Lives entirely in `demo/`.**

```
/demo
  VisualBuilder.tsx
  LogicLab.tsx
  RuntimeWorkbench.tsx
  KitchenSink.tsx
  StoryCreator.tsx
  ThemeGenerator.tsx
  builder/
  sections/
```

Rules:

* may import from `/ui`, `/stores`, `/core`
* may NEVER be imported *by* `/ui` or `/core`
* deleting `/demo` must not break TypeScript in remaining folders

This makes `demo/` a **replaceable shell**.

---

### 3️⃣ **Product Output (what users actually ship)**

What users export or deploy:

* uses `/ui`
* uses `/stores`
* uses `/services`
* uses runtime adapters
* **never includes `/demo`**

This is already aligned with your **Export Engine** and **Runtime Boundary** specs.

---

## Folder Strategy (Explicit Decision)

**Decision:** Keep existing runtime folders. Do **not** introduce `/core` or `/shared` at this stage.

### Runtime Layer (Framework)
The following folders are considered **runtime / framework code** and MUST remain independently shippable:

- `ui/`
- `stores/`
- `services/`
- `utils/`
- `config/`
- `types.ts`

**Invariant:** All runtime code MUST compile and function with the `demo/` folder removed.

### Host / Tooling Layer
- `demo/`

The `demo/` folder is a **host application**, not a framework dependency.  
Runtime code MUST NEVER import from `demo/`.

---

## What You Were Missing (subtle but critical)

Right now, some concepts are *semantically runtime* but *physically live in demo*.

You should split these **by responsibility**, not by screen.

## Runtime Extraction Move-Map (Executable)

The following runtime concepts MUST NOT live in `demo/` and must be relocated if currently present there.

| Concept | Current Location (Likely) | Target Location |
|------|---------------------------|-----------------|
| Runtime Adapter Registry | `demo/**` | `services/runtime/registry.ts` |
| Runtime Boundary Guards | `demo/builder/**` | `utils/runtimeBoundary.ts` |
| Adapter Lifecycle Types | mixed | `types/runtime.ts` |
| Runtime Store | mixed | `stores/runtimeStore.ts` |
| Runtime Error / Logging Helpers | demo utils | `utils/runtimeErrors.ts` |

**Non-Goal:** This table does not introduce new behavior. It only relocates existing runtime logic.

### Keep IN `demo/`:

| Concept          | Reason                   |
| ---------------- | ------------------------ |
| VisualBuilder UI | CMS only                 |
| Properties panel | CMS only                 |
| Drag/drop UX     | CMS only                 |
| Workbench UI     | Host for testing runtime |
| KitchenSink      | Educational catalog      |

This guarantees:

* runtime exists without CMS
* CMS can be deleted cleanly
* exported apps don’t pull editor code accidentally

---

## How this aligns with your original intent

> “by simply deleting the demo folder we can strip the app of its tools”

With the above split:

✅ True
✅ Safe
✅ Enforceable via CI
✅ Compatible with GAIS (no deletes required — just empty + re-export if needed)

---

## GAIS-Compatible Demo Deletion Strategy

Because GAIS cannot delete files, demo removal is achieved structurally.

### Entry Point Split
Two browser-native entrypoints are defined:

- `index.tsx` — production runtime (NO demo imports)
- `index.demo.tsx` — demo / builder host

`index.tsx` MUST import only runtime-safe modules.  
`index.demo.tsx` is the only file allowed to import from `demo/`.

### Demo Erasure in GAIS
When stripping demo:

- Replace contents of `index.demo.tsx` with `export {};`
- Leave demo files present but unreferenced
- Production entrypoint remains intact

This satisfies GAIS constraints while enforcing runtime isolation.
---

## CI Rule You SHOULD Add (this enforces the contract)

> **Framework code must never import from demo**

### Rule (conceptual)

Fail CI if:

* any file outside `/demo/**`
* imports from `/demo/**`

This single rule protects your whole vision.

---

## Final Verdict

Your instinct was **correct** — you just needed to formalize it:

* `demo/` = **host / CMS / tools**
* everything else = **runtime framework**
* runtime must survive without demo
* demo must never be depended on

This turns Loom into:

* a **builder**
* a **runtime**
* a **framework**
* a **static app generator**

all without forks or rewrites.

If you want, next I can:

* produce a **canonical folder tree** reflecting this split
* mark exactly which current files move where
* draft the **“demo deletion checklist”** used before export
* add the **CI guard rules** that make this irreversible

This is a strong architecture.


Perfect — we’ll apply **the same architectural discipline** you just established for code to the **`/docs` folder**, so that:

* docs are **layered**
* authority is explicit
* CI enforcement is trivial
* demo/CMS knowledge does not leak into runtime specs
* future “B / C” evolutions stay forward-compatible

Below is a **clean, enforceable docs architecture** that builds *directly* on your runtime / demo split.

---

## Core Principle (docs version)

> **Docs mirror the product’s authority layers, not its file tree.**

So `/docs` is **not** “misc markdown” — it is a **governance system**.

---

## Top-Level `/docs` Structure (canonical)

```
/docs
├── GOVERNANCE/
├── CONTRACTS/
├── ROADMAP/
├── TDD/
├── TOOLS/
├── ARCHIVE/
└── README.md
```

Each directory has a **single responsibility** and **clear authority rules**.

## Docs Structure — Compatibility Mapping

No folder renames are performed at this stage. Existing structure is mapped to canonical doc classes.

| Canonical Class | Actual Path |
|----------------|------------|
| GOVERNANCE | `docs/governance/` |
| CONTRACTS | `docs/roadmap/` (Contract-Grade only) |
| TDD | `docs/tdd-*` |
| TOOLS | `docs/tools/` |
| PHILOSOPHY | `docs/philosophy/` |
| REVIEW | `docs/review/` |

CI enforcement operates on **classification**, not folder names.

---

## 1️⃣ `/docs/GOVERNANCE` — The Law (highest authority)

**Purpose:**
Defines *how* the system is allowed to evolve.

```
/docs/GOVERNANCE
├── UX_CONTRACT.md
├── INVARIANTS.md
├── AUDIT_ENFORCEMENT.md
├── IDENTITY_GOVERNANCE.md
├── COMPONENT_STRATEGY.md
├── TECH_DEBT.md
├── decisions.md
└── REQ_ID_TEMPLATE.md
```

### Rules

* ❌ No product behavior defined here
* ❌ No “how it works” explanations
* ✅ Only constraints, enforcement, and authority

### CI implications

* These files **must never reference demo UI**
* These files **must never reference code paths**
* These files **must never define REQs**

This aligns perfectly with your **agent.md** positioning.

---

## 2️⃣ `/docs/CONTRACTS` — The Canonical Truth

**Purpose:**
Defines **what the product guarantees**.

Only files here can be 🔒 Contract-Grade.

```
/docs/CONTRACTS
├── runtime-boundary.md
├── runtime-adapter-registry.md
├── runtime-workbench.md
├── undo-semantics.md
├── export-suite.md
├── document-engine.md
├── envelope-system.md
└── page-settings.md
```

### Rules

* ✅ All normative behavior lives here
* ✅ REQ-* blocks required
* ✅ Must declare TDD partner
* ❌ No UI walkthroughs
* ❌ No implementation examples beyond conceptual diagrams

> Think of this as **the constitution of Loom**.

### Mapping

| Code Layer | Contract Examples |
| ---------- | ----------------- |
| Runtime    | runtime-boundary  |
| Export     | export-suite      |
| State      | undo-semantics    |
| Debugging  | runtime-workbench |

---

## 3️⃣ `/docs/ROADMAP` — Planned but Non-Binding

**Purpose:**
Capture *intent* before it becomes law.

```
/docs/ROADMAP
├── spec-procedural-page-wizard.md
├── spec-icon-library.md
├── spec-builder-ui-warnings.md
├── spec-ai-logic-generator.md
├── spec-persistence-workflow.md
└── README.md
```

### Rules

* ⚠️ May contain MUST / SHOULD language
* ❌ MUST NOT be enforced by CI
* ❌ MUST NOT be referenced by code
* ✅ Must include REQ Inventory appendix before promotion

### Promotion Path

```
ROADMAP → inventory → CONTRACTS → TDD → COMPLIANT
```

You already formalized this path — this just **makes it visible**.

---

## 4️⃣ `/docs/TDD` — Proof, Not Theory

**Purpose:**
Demonstrate that contracts are *true*.

```
/docs/TDD
├── tdd-runtime-boundary.md
├── tdd-runtime-adapter-registry.md
├── tdd-runtime-workbench.md
├── tdd-undo-semantics.md
├── tdd-export-suite.md
├── tdd-document-engine.md
├── tdd-envelope-system.md
└── README.md
```

### Rules

* ✅ Every Contract-Grade spec must have exactly one TDD pack
* ❌ TDDs must not introduce new behavior
* ❌ No REQs defined here — only references

This is where **CI enforces truth**.

---

## 5️⃣ `/docs/TOOLS` — Meta Infrastructure

**Purpose:**
Support the docs system itself.

```
/docs/TOOLS
├── req-inventory-generator.md
├── traceability-matrix.md
├── lint-rules.md
└── README.md
```

These are:

* allowed to reference CI
* allowed to reference scripts
* **never authoritative**

Your `req-inventory-generator.md` belongs **exactly here**.

---

## 6️⃣ `/docs/ARCHIVE` — Dead, but Auditable

```
/docs/ARCHIVE
├── spec-visual-builder.md
├── spec-visual-builder-2.0.md
├── spec-theme-engine.md
├── spec-go-template-export.md
└── README.md
```

Rules:

* ❌ Never referenced by code
* ❌ Never referenced by contracts
* ✅ Kept only for archaeology

---

## 7️⃣ `/docs/README.md` — Orientation Only

This file should answer:

* What is Loom?
* How are docs organized?
* Where do I add new specs?
* How does promotion work?

**No behavior. No rules. No REQs.**

---

## Authority Flow (the most important part)

```
GOVERNANCE
   ↓
CONTRACTS (REQs)
   ↓
TDD (proof)
   ↓
CODE
```

Anything outside that flow:

* cannot invent behavior
* cannot override guarantees
* cannot bypass CI

---

## How this supports your “demo deletion” goal

Because:

* Runtime contracts live in `/docs/CONTRACTS`
* Demo-only behavior never becomes Contract-Grade
* Export suite guarantees are runtime-level
* Workbench is documented as **a tool**, not a dependency

Deleting `/demo`:

* does not invalidate contracts
* does not invalidate TDD
* does not change guarantees

Which is exactly what you want.

---

## Final Recommendation

Proceed with this doc structure **before** the RooCode restructuring pass.

It will:

* prevent future drift
* make CI rules trivial
* keep agent.md clean
* make Loom understandable to *humans and AIs*

## Restructuration Exit Criteria (Non-Negotiable)

The restructuring is complete only when:

- [ ] No file outside `demo/**` imports from `demo/**`
- [ ] Runtime folders compile with demo routes excluded
- [ ] `index.tsx` has zero demo dependencies
- [ ] CI fails on any new cross-boundary import
- [ ] Docs classification rules are enforced

If any condition fails, the restructuring is incomplete.

Below is a **CI enforcement specification** that matches your governance model, GAIS constraints, and Copilot / RooCode safety goals.
This is **not a rewrite** of behavior — it is a **hardening layer** that formalizes what you already established.

I’ll give you:

1. **Rule set (human-readable, authoritative)**
2. **File-scope rules (what is allowed where)**
3. **REQ / TDD enforcement rules**
4. **Agent safety rules (prompt injection hardening)**
5. **Reference implementation outline** (`scripts/check-contract.js`)

You can drop this almost verbatim into `docs/GOVERNANCE/AUDIT_ENFORCEMENT.md` and wire it into CI.

---

# 🛡️ CI ENFORCEMENT RULES — Loom Docs & Architecture

## CI Enforcement (Hard Gates)

### Rule 1 — Demo Import Guard
Runtime folders MUST NOT import from `demo/**`.

**Applies To:**
- `ui/`
- `stores/`
- `services/`
- `utils/`
- `config/`

Violation fails CI.

### Rule 2 — Demo Deletability
Only `index.demo.tsx` may import from `demo/**`.  
Any other import path referencing `demo/` fails CI.

### Rule 3 — Docs Authority Guard
Runtime code MUST NOT import or reference roadmap or spec documents.

Reference implementation extends `scripts/check-contract.js`.

## Canonical Principle

> **If a rule cannot be enforced automatically, it is not a rule.**

CI is the final authority on documentation truth, not human review.

---

## 1️⃣ Directory Authority Rules (Hard Boundaries)

### 1.1 `/docs/GOVERNANCE`

**Role:** Law & enforcement
**Authority:** Highest (non-product)

#### CI MUST FAIL if:

* Any file in `/docs/GOVERNANCE`:

  * contains `REQ-`
  * contains `MUST`, `SHALL`, `FORBIDDEN`, `NEVER` referring to product behavior
  * references `/demo`, `/ui`, `/stores`, or runtime code paths
* Any file outside `/docs/GOVERNANCE` claims higher authority than UX_CONTRACT

✅ Allowed:

* Enforcement language
* CI rules
* Process constraints

❌ Forbidden:

* Product behavior
* Runtime guarantees

---

### 1.2 `/docs/CONTRACTS`

**Role:** Product truth
**Authority:** Canonical

#### CI MUST FAIL if:

* A file contains normative language (`MUST`, `SHALL`, etc.) **outside a `REQ-*` block**
* A `REQ-*` block is missing:

  * Failure Mode
  * UX Clause reference
  * TDD Coverage reference
* A Contract file does **not** declare:

  ```
  TDD Partner: tdd-<same-name>.md
  ```

#### CI MUST ALSO FAIL if:

* A Contract references a missing TDD file
* A REQ-ID is duplicated across files

---

### 1.3 `/docs/ROADMAP`

**Role:** Intent & planning
**Authority:** None (non-binding)

#### CI MUST FAIL if:

* A ROADMAP file:

  * declares itself “Contract-Grade”
  * is referenced by runtime code
  * is referenced by `/docs/GOVERNANCE`

⚠️ Allowed:

* Normative language
* Inventories
* Non-final behavior

---

### 1.4 `/docs/TDD`

**Role:** Proof
**Authority:** Subordinate to Contracts

#### CI MUST FAIL if:

* A TDD references a non-existent `REQ-*`
* A TDD introduces behavior not present in a Contract
* A runtime-affecting TDD lacks:

  * at least one Negative test
  * at least one Teardown test

---

### 1.5 `/docs/TOOLS`

**Role:** Meta tooling
**Authority:** None

#### CI MUST FAIL if:

* A tool doc defines REQs
* A tool doc is referenced by runtime code

---

### 1.6 `/docs/ARCHIVE`

**Role:** Dead history

#### CI MUST FAIL if:

* Any non-archive file references `/docs/ARCHIVE`
* Any archived spec is listed in the audit matrix as active

---

## 2️⃣ REQ Language Enforcement (Critical)

### Global Rule

CI scans **all markdown files** except `/docs/ROADMAP` and `/docs/ARCHIVE`.

#### CI MUST FAIL if:

* `MUST`, `SHALL`, `FORBIDDEN`, `NEVER` appear:

  * outside a `REQ-*` block
  * inside `agent.md`
  * inside README files
* A `REQ-*` block exists outside `/docs/CONTRACTS`

This directly enforces:

* REQs live only in Contracts
* agent.md cannot be elevated accidentally
* README remains explanatory only

---

## 3️⃣ REQ ↔ TDD Traceability Rules

For every `REQ-XYZ-NN`:

CI MUST verify:

* It appears in exactly **one** Contract
* It appears in ≥1 TDD test
* It is referenced bidirectionally:

  * Contract → TDD
  * TDD → Contract

CI MUST FAIL if:

* Orphan REQs exist
* Orphan tests exist
* REQ IDs are skipped or reused inconsistently

---

## 4️⃣ Runtime Gate Enforcement

For any Contract affecting runtime, adapters, or export:

CI MUST FAIL if the associated TDD does not include tests for:

* Init gate
* Teardown gate
* Idempotence OR determinism
* Editor-safe exclusion (negative test)

This includes:

* Runtime Boundary
* Adapter Registry
* Runtime Workbench
* Export Suite

---

## 5️⃣ Agent & Prompt Injection Safety Rules

### agent.md Classification

```
Document Class: Informational / Agent Governance
May Define REQs: ❌ No
```

#### CI MUST FAIL if:

* `agent.md` contains:

  * `REQ-`
  * Contract-style normative language
  * Claims of authority over `/docs/CONTRACTS`
* agent.md references:

  * ROADMAP specs as truth
  * implementation details as guarantees

This protects against:

* Copilot hallucinations
* RooCode prompt drift
* “agent becomes spec” failure mode

---

## 6️⃣ Legacy Import Guard (Forward Compatibility)

CI MUST FAIL if:

* Code imports directly from legacy paths marked for migration
* Docs reference legacy file locations post-migration

This supports:

* RooCode restructuring
* GAIS non-delete limitation
* Forward compatibility with B / C phases

---

## 7️⃣ Reference Implementation (Node-Free Compatible)

Your existing `scripts/check-contract.js` can enforce all of this using:

### Core Checks

* Markdown AST or regex scan
* Directory-based rule application
* REQ registry map
* TDD coverage map

### Minimal Pseudocode Sketch

```js
scanFiles('/docs', (file) => {
  if (file.isGovernance && containsREQ(file)) fail();
  if (file.isContract && hasNormativeOutsideREQ(file)) fail();
  if (file.isAgent && containsNormative(file)) fail();
});

verifyREQs({
  contracts: '/docs/CONTRACTS',
  tdds: '/docs/TDD'
});
```

No Node APIs beyond file reading.
No runtime dependencies.

---

## 8️⃣ CI Failure Philosophy

CI errors must be:

* explicit
* actionable
* non-negotiable

Example:

> ❌ CONTRACT VIOLATION
> `spec-runtime-workbench.md` contains normative language outside a REQ block
> Line 87: “The Workbench must isolate runtime state”

---

## Final Outcome

With these rules:

* Docs become enforceable architecture
* Agent.md stays safe and subordinate
* ROADMAP stays creative but non-binding
* CI becomes the arbiter of truth
* GAIS limitations stop being a liability

If you want next, I can:

* translate this into a **ready-to-drop `AUDIT_ENFORCEMENT.md`**
* implement the **exact regex / AST rules**
* generate **CI error message templates**
* add a **migration-safe legacy path map**

This system is now tight enough to scale without entropy.