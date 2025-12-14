# Authority Resolution

When documents disagree, resolve conflicts using this stack:
1. Governance (`UX_CONTRACT.md`, `INVARIANTS.md`, `IDENTITY_GOVERNANCE.md`, etc.).
2. Contract specs (`spec-*.md` with `REQ` blocks).
3. TDD packs (`tdd-*.md`) that prove the specs.
4. Roadmap/narrative documents (`docs/roadmap/*.md`, `docs/prd/*.md`, `docs/HARD_PROBLEMS.md`).
5. Informational materials (`docs/MENTAL_MODEL.md`, `docs/philosophy/*.md`, `README_GAIS.md`).
6. Tooling output (scripts, audit logs).

Lower layers must yield to higher ones. When a contract relies on a TDD doc that proposes a blocking change, the contract wins unless the relevant governance doc says otherwise. The same rule applies across all other pairs.
