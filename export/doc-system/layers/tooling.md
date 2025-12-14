# Tooling Layer — Inspection & Enforcement

## Role
Provide automation and scripts that enforce governance, contracts, and TDD without defining runtime behavior.

## Document set
- `docs/tools/*.md` (audit helpers, inventory generators, doc parsers).
- `scripts/check-contract.*`, `scripts/check-shim-purity.sh`, and other inspection scripts.
- Review notes in `docs/review/*` when they describe how to run audits or operate the tooling workflow.

## Constraints
- Tooling must not run inside the browser runtime; it belongs in CI or local audit runs.
- Tools may read docs or code but may not invent new requirements.
- Log inputs and outputs clearly so auditors can trace enforcement back to the requirement.
