# TDD — “AI Logic Generator” (UX Contract-Driven)

**Feature:** AI Logic Generation
**Subsystem:** AI / Logic Engine
**UX Contract Sections Covered:** 1.1 (Builder Never Lies), 8.1 (Logic Is Never Implicit), 8.2 (Editor Never Executes Logic)
**Primary User Intent:** To translate a natural language story into structured, declarative logic that can be bound to the UI, without generating any backend code.

---

### Layer 1: Mechanical TDD
*   **[M-AIG-01]** An AI service call with a user story returns a response.
*   **[M-AIG-02]** The AI response is parsed into a valid JSON structure that matches the defined `LogicFlow` type.
*   **[M-AIG-03]** The generated JSON is successfully saved to a file in the virtual folder system (e.g., `/logic/interactions.json`).
*   **[M-AIG-04]** The Interaction Editor in the Properties panel can read and display actions from the generated logic file.

---

### Layer 2: Behavioral TDD
*   **[BT-AIG-01] Trigger Recognition:** The story "When the player clicks the 'Start Game' button..." correctly generates a logic node with `trigger: "onClick"` and attempts to identify a selector for the 'Start Game' button.
*   **[BT-AIG-02] Action Recognition:** The story "...go to the next screen" correctly generates an action with `{ "type": "navigate", "target": "..." }`.
*   **[BT-AIG-03] Conditional Recognition:** The story "If there’s no character created, show a modal" correctly generates a conditional action or a branching path.
*   **[BT-AIG-04] Ambiguity Handling:** An ambiguous story like "Make it look nice" should result in a placeholder or a request for clarification, not a guess at concrete actions.
*   **[BT-AIG-05] Preview Mode Execution:** In Preview Mode, clicking a button linked to AI-generated logic correctly executes the declarative actions (e.g., opens a modal, shows a toast).

---

### Layer 3: UX Contract TDD
*   **[UX-AIG-01] Contract Adherence: No Backend Code Generated:** The output from the AI generator **must never** contain any server-side code, Node.js APIs (`fs`, `http`), `eval()`, or executable JavaScript strings. It must be 100% declarative JSON data. A schema validation step must enforce this.
*   **[UX-AIG-02] Contract Adherence: Logic Is Never Implicit:** The generated logic nodes must be visible and editable in the Builder's Interaction panel. The user can always inspect and override what the AI has created. The system must not have hidden behaviors.
*   **[UX-AIG-03] Contract Adherence: Editor Never Executes Logic:** The process of generating logic or binding it to a UI element in the editor must never execute any part of that logic. All execution is strictly limited to Preview Mode.
*   **[UX-AIG-04] Predictability and Idempotency:** Submitting the exact same user story twice should produce a structurally identical logic graph. The generation process must be deterministic and free of random side effects.