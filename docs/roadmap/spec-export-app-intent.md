
# Specification: App Intent Export (Headless Contracts)

**Type:** Logical Abstraction
**Fidelity:** Semantic Intent Only (No Implementation Details)
**Target Audience:** Enterprise Platforms, Proprietary Renderers, AI Analysis

## 1. Overview
This is the most abstract export target. It strips away **all** implementation details—including HTML tags, Tailwind utility classes, and DaisyUI component classes—leaving only the **User Intent**.

It answers: *"What is this component trying to do?"* not *"How does it look?"*

## 2. Output Format
A JSON structure describing the application flow and capabilities.

```json
{
  "view": "Checkout Page",
  "archetype": "commerce",
  "intents": [
    {
      "id": "node-123",
      "role": "action",
      "semantics": {
        "type": "button",
        "importance": "primary",
        "state": "default"
      },
      "label": "Complete Purchase",
      "behavior": {
        "trigger": "click",
        "action": "submit-form",
        "target": "payment-form"
      }
    },
    {
      "id": "node-456",
      "role": "input",
      "semantics": {
        "dataType": "email",
        "validation": "required",
        "label": "Customer Email"
      }
    },
    {
      "id": "node-789",
      "role": "feedback",
      "semantics": {
        "type": "alert",
        "severity": "error",
        "message": "Payment failed"
      }
    }
  ]
}
```

## 3. Transformation Rules (DaisyUI → Intent)

The exporter parses DaisyUI class names to derive semantic meaning.

### 3.1 Actions (Buttons & Links)
- **High Importance:** `btn btn-primary`, `btn-accent` → `importance: "high"`
- **Medium Importance:** `btn btn-secondary`, `btn-neutral` → `importance: "medium"`
- **Low Importance:** `btn btn-ghost`, `btn-link` → `importance: "low"`
- **Destructive:** `btn-error` → `intent: "destructive"`

### 3.2 Structural Grouping
- `card` → `container: "card"`
- `hero` → `container: "featured"`
- `drawer` → `container: "overlay"`
- `collapse` / `accordion` → `container: "disclosure"`
- `modal` → `container: "dialog"`

### 3.3 Status & Feedback
- `alert alert-info` → `feedback: "information"`
- `alert alert-success` → `feedback: "success"`
- `alert alert-warning` → `feedback: "warning"`
- `alert alert-error` → `feedback: "error"`
- `badge` → `indicator: "status"`

### 3.4 Navigation
- `steps` → `flow: "sequence"`
- `tabs` → `flow: "parallel-group"`
- `breadcrumbs` → `flow: "hierarchy"`

## 4. Logic Extraction
- **Behavior Engine:** Logic flows defined in the Logic Lab are serialized as abstract workflow steps (e.g., `when: "submit"`, `then: "validate"`).
- **Zod Schemas:** Data requirements are exported as schema definitions, not UI inputs.

## 5. Use Cases
1.  **Platform Re-platforming:** Migrate a design from Loom to a native iOS/Android builder by interpreting intents (e.g., mapping `container: "card"` to a SwiftUI View).
2.  **Accessibility Audits:** Analyze the semantic structure without visual noise to ensure hierarchy makes sense for screen readers.
3.  **AI Analysis:** Allow LLMs to reason about the application's capabilities ("Does this page have a checkout flow?") without parsing HTML.

## 6. UX Contract
- **[UX-EXP-AI-01]** The export must not contain any Tailwind, CSS, or HTML specific artifacts.
- **[UX-EXP-AI-02]** Every interactive element in the builder must map to a distinct Intent node.
- **[UX-EXP-AI-03]** DaisyUI visual styles (colors, radius) are discarded; only the *semantic role* of the class persists.
