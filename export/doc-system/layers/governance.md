# Governance Layer — The Law

## Role
This layer defines what is allowed to exist, how authority resolves, and what blocks release. Every statement here is normative, CI-gated, and expected to stay constant for long windows.

## Typical documents
- `docs/UX_CONTRACT.md`: the non-negotiable promises for the builder experience.
- `docs/INVARIANTS.md`: architecture-level guarantees (state rules, selection behavior, undo safety).
- `docs/AUDIT_ENFORCEMENT.md`: traceability requirements, CI gate descriptions, and audit logging rules.
- `docs/IDENTITY_GOVERNANCE.md`: naming, tone, and AI persona contracts.
- `docs/import.md`: import map discipline, stack-leak prevention, and dependency policies.
- `docs/decisions.md`: architectural decision records that explain why each rule exists.
- `AGENTS.md` (plus the persona doc in `docs/review/agent.md`): how tooling is allowed to act without inventing new behavior.

## Writing rules
1. Use declarative, failure-mode-aware prose (not narrative).
2. Every change should cite why it is needed, ideally linking to a decision record or an audit finding.
3. Keep the scope broad (for example, “Preview may not execute runtime adapters”) rather than tied to specific features.
4. CI should gate merges when this layer changes; include automation notes when the rule is enforced.
