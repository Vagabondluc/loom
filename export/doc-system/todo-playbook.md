# Task Backlog Playbook

## Section Zero: Core directives
1. **Immutability:** Section Zero cannot be rewritten. Keep the core directives intact.
2. **Atomicity:** Every task must be a single, verifiable change.
3. **Decomposition:** Large requests must be broken into phases that reference `/docs`.

*Scope note:* `todo.md` tracks architectural and feature execution only; governance and audit tooling stay in `/docs` unless they unblock a phase.

## Execution structure
Keep an active sprint with a named phase and a backlog of epics. Each epic should link to the relevant spec (`spec-*.md`) or PRD (`docs/prd/`). Track progress with checkboxes that describe steps, validations, and pull requests.

## GAIS protections
- No GAIS shims or runtime compatibility hacks.
- No placeholder re-exports, temporary files, or `any` just to make TypeScript happy.
- Do not move multiple domains at once.
- Respect layered authority; do not insert governance inside a roadmap card.

## Execution guidelines
1. Freeze authority and scope before moving files.
2. Create target folders first and add placeholder barrels before moving content.
3. Move one domain at a time (utils → stores → services → ui → config → demo).
4. Normalize import paths after each domain move; run a search to confirm no leftover references.
5. Enforce runtime/demo boundaries: runtime may consume demo, but not vice versa.
6. Fix entry points and routing to avoid cross dependency leaks.
7. Run TypeScript integrity checks; do not add `any` to silence errors.
8. Add CI rules that encode the new discipline, such as forbidding demo imports outside demo.
9. Commit in logical chunks that compile independently.
10. Final validation: no duplicate files, no empty shells, CI and manual review pass.

## Preconditions & stop conditions
- Preconditions: not in GAIS, have delete/rename authority, project builds before the refactor, tests pass.
- Stop if you are about to leave temporary forwarding files, add `any` for success, or plan to move multiple domains at once.

## Next actions (suggestions)
- Generate exact CI rule text for the current phase.
- Validate the target folder map before moving files.
- Produce a GAIS re-entry checklist that complements these protections.
