# TDD Layer — Proof

## Role
This layer proves that contracts are satisfied through executable descriptions.

## Document set
- `docs/tdd-*.md`
- `docs/TDD_GUIDELINES.md` (global conventions for naming, structure, and coverage).

## Expectations
1. Each TDD doc names its contract parent and the `REQ-` IDs it validates.
2. Cover mechanical behavior, UX-visible reactions, runtime/preview transitions, negatives, and teardown cases.
3. Include data injection examples, expected log entries, and how CI validates it.
4. Maintain traceability by listing the spec sections and tests that catch regressions.
