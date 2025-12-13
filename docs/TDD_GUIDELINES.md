# 🧪 TDD Guidelines for the Visual Builder

## 1. Philosophy: Testing for Trust

Our testing methodology is driven by the **[Visual Builder UX Contract](docs/UX_CONTRACT.md)**. We do not merely test for feature existence; we test for **trust, predictability, and user confidence.** A feature is not "done" when it works; it is done when it can be trusted.

This requires a three-layer approach to Test-Driven Development for every new feature or subsystem. A feature must pass all three layers to be considered complete.

---

## 2. The Three Layers of TDD

### Layer 1: Mechanical TDD
> **Question:** "Does the code run? Does state change?"

This is the baseline sanity check. These tests verify the fundamental connections between UI, state, and actions. They are necessary but **never sufficient** for shipping a feature.

### Layer 2: Behavioral TDD
> **Question:** "Does it behave correctly under real-world usage patterns?"

This layer simulates how a user actually interacts with the system, including edge cases, rapid actions, and complex scenarios. It tests the system's robustness and usability beyond the ideal "happy path."

### Layer 3: UX Contract TDD
> **Question:** "Does the system keep its promises to the user?"

This is the most critical layer. These tests directly enforce the non-negotiable guarantees defined in the UX Contract. If a UX Contract test fails, the feature is considered broken, regardless of other passing tests.

---

## 3. TDD File Structure & Templates

Every TDD plan (e.g., `docs/tdd-add-panel.md`) should follow this structure.

### 3.1 Feature Declaration Block

Start every TDD file by defining the scope and purpose.

```markdown
**Feature:** [Name of the Feature, e.g., Add Panel]
**Subsystem:** [System Area, e.g., Dock / Creation]
**UX Contract Sections Covered:** [e.g., 2.1, 2.2, 6.2]
**Primary User Intent:** [e.g., "Insert new components quickly and predictably."]
**Failure Modes Considered:** [e.g., "Mis-drop, scroll interference, lost intent."]
```

### 3.2 Mechanical TDD Template

Use this for basic implementation checks.

```markdown
### Layer 1: Mechanical TDD

*   **[M-01] Component Renders:** The primary component mounts without errors.
*   **[M-02] State Toggles:** A user action (e.g., click) correctly updates the relevant state in the store.
*   **[M-03] Action Executes:** A valid input triggers the intended state mutation (e.g., dropping a component adds a node).
```

### 3.3 Behavioral TDD Template

Use this to simulate realistic user workflows.

```markdown
### Layer 2: Behavioral TDD

#### [BT-ID] Title of Behavior
*   **Context:** Describe the initial state of the system.
*   **Action:** Describe the sequence of user actions.
*   **Expected Behavior:** Describe the correct, intuitive outcome.
*   **Failure Condition:** Describe what would constitute a failure of this behavior.
```

**Example:**
```markdown
#### [BT-AP-02] Muscle Memory Stability
*   **Context:** The user has just inserted a "Button" component.
*   **Action:** The user immediately goes to insert another "Button" from the "Recently Used" list.
*   **Expected Behavior:** The "Button" in "Recently Used" is in a stable, predictable position. The user can repeat the insertion action without re-scanning the UI.
*   **Failure Condition:** The "Recently Used" list re-shuffles unpredictably, breaking muscle memory.
```

### 3.4 UX Contract TDD Template

Use this to verify the core promises.

```markdown
### Layer 3: UX Contract TDD

#### [UX-ID] Contract Clause Being Tested
*   **Guarantee:** State the promise from the UX Contract.
*   **Verification Method:** Describe the specific test case (manual or automated) that verifies this promise.
*   **Violation Examples:** List concrete examples of what would break this contract.
```

**Example:**
```markdown
#### [UX-DR-02] One Drag, One Meaning
*   **Guarantee:** At any moment during a drag, exactly one drop target may be active.
*   **Verification Method:** Drag a component over a deeply nested layout with multiple potential drop zones. Assert that only one drop zone highlight is rendered at any given time and does not flicker.
*   **Violation Examples:** Multiple highlights are active simultaneously. The highlight flickers rapidly between two zones.
```

### 3.5 Failure & Recovery TDD Template

Crucial for building a resilient tool.

```markdown
### Layer 4: Failure & Recovery TDD (Optional but Encouraged)

#### [FR-ID] Failure Case
*   **Context:** The state of the system leading up to the failure.
*   **Action:** The user action that is invalid or outside normal bounds (e.g., dropping outside the canvas).
*   **System Response:** The expected graceful response (e.g., no state mutation, no errors).
*   **Recovery Path:** The user can immediately and cleanly retry the action.
```

---

## 4. The Golden Rule of Enforcement

> **If a test violates the UX Contract, the code is wrong—even if it works.**

The UX Contract is the ultimate source of truth for quality. All implementation choices must align with it. A pull request that passes all mechanical tests but fails a UX Contract test must be rejected until the contract violation is resolved.