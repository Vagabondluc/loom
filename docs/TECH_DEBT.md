
### 5. Lazy / Dynamic Loading Policy
*   **The Debt:** We have "Applets" and "Preline" conceptually, but no single document defining the loading lifecycle (Loaded vs. Active vs. Executing).
*   **Risk:** Performance guarantees are hard to reason about. Race conditions in Preview Mode initialization.
*   **Remediation:** **Loading Domain Contract**. Define domains (Static Presence, Module Availability, Runtime Activation) and enforce them in the Inspector and Renderer.
*   **Target:** Phase 21 (Boundary Enforcement).

### 6. Fake Data Ambiguity
*   **The Debt:** Placeholders (Lorem/Picsum) and mock data tables look real but lack a contract for export behavior.
*   **Risk:** Users export a project expecting the mock data to be hardcoded, or conversely, expecting it to be stripped/stubbed.
*   **Remediation:** **Fake Data Policy**. Explicitly label mock data in the Inspector and provide export-time controls (Keep / Strip / Replace).
*   **Target:** Phase 22 (Export Integrity).

---

## 🟨 Tier 3 — Product Debt (Feature Gaps)
*Intentional omissions to speed up core development.*

### 7. Fake Backend Tooling
