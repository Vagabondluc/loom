# Audit Tools (Node-only)

Location: `docs/tools`

These tools are Node-only governance utilities intended for use in external CI or local audits. They must NOT be executed inside the GAIS browser runtime.

Usage (CI):

- GitHub Actions sample step: `node docs/tools/check-contract.node.mjs`

Local usage:

- If you have Node installed locally, you can run `node docs/tools/check-contract.node.mjs` to execute the contract checks.

Policy:

- Node APIs are only permitted under `docs/tools/`.
- Any Node-based tooling outside of `docs/tools/` will fail CI checks.
