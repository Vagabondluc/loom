# Contract Layer — What Must Be True

## Role
This layer turns intent into verifiable requirements. Every contract doc describes product behavior that production code must satisfy.

## Document set
- `docs/roadmap/spec-*.md` (contract-grade specs live alongside roadmap planning).
- `docs/specs/*.md`: an optional home for stable specs.
- `docs/prd/*.md`: product requirements that are ready for formalization.
- `docs/CONTRACTS/REQ_ID_TEMPLATE.md`: a shared requirement block template.

## Writing practice
- Use `REQ-` identifiers for every statement that can block code; include a failure mode, a UX stake, and the scope.
- Reference the TDD partner (e.g., `tdd-*.md`) before shipping.
- Declare expected test coverage, instrumentation, and monitoring obligations.
- State dependencies on governance or other contracts explicitly.

## Enforcement
CI checks expect every spec to carry `REQ` IDs and to point to TDD coverage. Normative text outside REQ blocks is disallowed at this layer.
