
### 🛡️ PHASE 21: Boundary Enforcement & Loading Contracts
*Formalize the distinction between Static Structure, Module Availability, and Runtime Activation.*
- **Goal:** Eliminate "Tier 2" Technical Debt.
- **Key Features:**
    - [ ] **Runtime Boundary Spec:** Define strict Node Kinds (Static vs. Applet).
    - [ ] **Loading Domain Contract:** Formalize lazy-loading policies (`docs/philosophy/loading-domains.md`).
    - [ ] **Enforcement:** Ensure the Inspector and Renderer respect these domains explicitly.

### ⚖️ PHASE 22: Export Integrity & Preview Equivalence
*Formalize the guarantee that what you see in Preview is what you get in Export.*
- **Goal:** Eliminate ambiguity between simulation and output.
- **Key Features:**
    - [ ] **Equivalence Contract:** Implement §16 of the UX Contract.
    - [ ] **Fake Data Policy:** Explicit labeling of mock data (Picsum/Lorem) vs real data in exports.
    - [ ] **Export UI Wizard:** A unified interface for selecting export targets with fidelity warnings (Lossless vs Semantic vs Structural).

### ✨ EPIC: Procedural Page Wizard (v2)
*A guided, educational workflow for generating complete page layouts with intentional content strategies.*
