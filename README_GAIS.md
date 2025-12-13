# GAIS Browser-Only Project

This project is organized for GAIS (browser-only) workflows and must not install or run Node package managers without explicit permission.

- ❌ Do not run `npm install`, `pnpm`, or `yarn`.
- ❌ Do not create or check in `node_modules/` or lockfiles.
- ❌ Do not run `npm ci` or `npm install` without explicit, documented approval.

This repo includes a `package.json` for integration testing and optional export flows, but it is intentionally not used during GAIS-only edits.
