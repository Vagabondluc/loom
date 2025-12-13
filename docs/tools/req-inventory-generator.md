
# REQ Inventory Generator (Spec Upgrade Helper)

## Goal
For any `spec-*.md` that is not Contract-Grade, generate a **REQ Inventory**:
- list proposed `REQ-<DOMAIN>-<NN>` IDs
- one-line statement per requirement
- tag if it needs: Negative / Teardown / Idempotence / Editor-Safe gate
- output is a *plan*, not a rewrite

## Extraction Rules (strict)
1) Scan spec text for normative phrases:
   - MUST, MUST NOT, SHALL, FORBIDDEN, NEVER
   - and implied gates: init, teardown, preview, export, editor, registry, idempotent
2) If normative language exists outside REQ blocks → flag as **Non-Contract**.
3) If spec has no normative language → classify as **Informational** or **Narrative**.
4) Assign domain by file:
   - export suite → EXP
   - runtime boundary → BND
   - runtime workbench → RW
   - page settings → PAGE
   - icon library → ICON
   - document engine → DOC
   - procedural wizard → WIZ (or AI if mostly AI)
   - UI warnings → UI
   - envelope system → ENV

## Output Format (required)
Each inventory MUST include:
- Proposed REQ table
- Missing gates checklist
- TDD impact list (which new tdd-*.md needs to exist or be updated)

## Non-Goals
- Do not edit the spec
- Do not add new requirements beyond what is already implied
- Do not invent behavior

## “Ready to Upgrade” definition
A spec is ready to be rewritten into Contract-Grade once:
- inventory exists
- proposed IDs are stable
- missing gates are known
