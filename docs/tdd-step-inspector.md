# TDD — Behavior Engine Step Inspector (Contract-Complete)

**Feature:** Step Inspector & Self-Documenting Logic
**Subsystem:** Behavior Engine
**UX Contract Sections Covered:** 1.1, 8.2, and §10 (UX-BL-10 to UX-BL-14)
**Primary User Intent:** To understand the purpose and intent of each step in a logic flow without having to read code, guess, or trust stale information.

---

### Layer 1: Mechanical TDD (Extended for Contract Compliance)
*   **[M-LL-01]** The "System Log" panel in `LogicLab.tsx` is replaced with a new "Step Inspector" panel.
*   **[M-LL-02]** The `LogicNode.description` type is an object, not a raw string, containing at least `{ text: string; authority: 'generated' | 'authored' | 'stale' }`.
*   **[M-LL-03]** Clicking a step in the flow diagram updates a `selectedNodeId` local state in `LogicLab.tsx`.
*   **[M-LL-04]** The Step Inspector panel displays the `description.text` of the `selectedNodeId`.
*   **[M-LL-05]** When no node is selected, the inspector displays a default "Flow Overview" message.
*   **[M-LL-06]** The Step Inspector renders a distinct visual indicator (e.g., a badge) based on the `description.authority` state.
*   **[M-LL-07]** The Inspector can render a "no description" state if the description object is missing or null, distinct from an empty string.
*   **[M-LL-08]** Logic nodes track a structural hash or `lastModified` timestamp to enable drift detection.
*   **[M-LL-09]** The Step Inspector treats any unknown or missing description.authority value as an invalid state and displays a Contract Violation warning.


---

### Layer 2: Behavioral TDD (Extended for Trustworthy Interaction)
*   **[BT-LL-01] Inspector Content Updates:** Selecting a step immediately shows its specific description text in the inspector.
*   **[BT-LL-02] Selection is Sticky:** Running the flow simulation does not clear the `selectedNodeId` or change the inspector's content.
*   **[BT-LL-03] Flow Change Resets Inspector:** Switching flows resets the inspector to its default "Flow Overview" state.
*   **[BT-LL-04] Authority Visibility:** Selecting a step correctly displays its explanation authority (e.g., a "Generated" or "Authored" badge).
*   **[BT-LL-05] Drift Detection:** A user edits a step’s core logic (e.g., changes a condition). The `description.authority` for that step immediately and automatically updates to `stale`. The inspector UI reflects this change with a warning state.
*   **[BT-LL-06] Inspector Reset on Regeneration:** A user triggers a "Regenerate Explanation" action. The `description.authority` is reset to `generated`, and any "stale" visual warnings are removed.
*   **[BT-LL-07] No Silent Mutation:** Editing a step's logic must never silently change the `description.text` of an "Authored" explanation. It may only change its `authority` to `stale`.

---

### Layer 3: UX Contract TDD (Upgraded to Full Compliance)
*   **[UX-LL-01] Logic Is Self-Documenting (UX-BL-10):** Every step in a flow has an inspectable explanation object. The UI never presents a logic step without a way to understand its intent.
*   **[UX-LL-02] Explanations Are Design-Time Only (UX-BL-11):** The explanation text and authority badge never change during a runtime simulation. They are static, design-time artifacts.
*   **[UX-LL-03] Editor Never Executes Logic (Contract 8.2):** Inspecting, editing, or regenerating an explanation triggers no runtime behavior.
*   **[UX-LL-04] Explanation Authority Is Explicit (UX-BL-12):** The inspector **must always** display a clear, unambiguous indicator for "Generated", "Authored", or "Stale" ("Out of Sync"). There are no hidden authority states.
*   **[UX-LL-05] Drift Is Never Silent (UX-BL-13):** If a logic definition changes while its explanation is "Authored," the UI **must** visually flag the explanation as potentially out of sync. The user is never allowed to trust a stale explanation unknowingly.
*   **[UX-LL-06] Inspector Never Lies (Contract 1.1):** An explanation must never describe behavior not present in the logic structure. If ambiguity exists (e.g., in an AI-generated flow), the explanation itself must state the ambiguity.