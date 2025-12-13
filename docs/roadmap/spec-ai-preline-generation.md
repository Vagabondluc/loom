# Specification: AI Generation for Preline UI

## 1. Purpose & Guiding Principles
This document defines the contract for how the AI assistant must generate layouts and components using Preline UI. It ensures that all AI-generated output strictly adheres to the **Preline Integration Contract (Dec-014)** and the **AI Logic Generator Contract**.

The primary principle is:
> **The AI's role is to generate static structure, not runtime behavior.**

## 2. AI Output Contract
- **[AIP-01] Static Markup Only:** The AI's output for any Preline component **must** be a valid `BuilderNode` tree representing pure, static HTML and Tailwind classes.
- **[AIP-02] Include Data Attributes:** The generated markup must include the necessary `data-*` and `hs-*` attributes that Preline's JavaScript uses for runtime initialization.
- **[AIP-03] No Executable Code:** The AI **must not** generate any of the following:
    - `<script>` tags.
    - Inline JavaScript (e.g., `onclick="..."`).
    - React `useEffect` or `useLayoutEffect` hooks for initialization.
    - Calls to `HSStaticMethods.autoInit()`.
- **[AIP-04] Defer to Runtime:** The AI must operate with the understanding that the generated static markup will only become interactive within the builder's **Preview Mode**.

## 3. Example Scenario: AI-Generated Accordion

**User Prompt:**
> "Create an FAQ section with three questions and answers using a Preline-style accordion."

**✅ Correct AI Output (Conceptual):**
A `BuilderNode` tree that renders the following static HTML structure:
```html
<div class="hs-accordion-group">
  <div class="hs-accordion active">
    <button class="hs-accordion-toggle ...">FAQ 1</button>
    <div class="hs-accordion-content ...">
      <p>Answer to FAQ 1.</p>
    </div>
  </div>
  <div class="hs-accordion">
    <button class="hs-accordion-toggle ...">FAQ 2</button>
    <div class="hs-accordion-content hidden ...">
      <p>Answer to FAQ 2.</p>
    </div>
  </div>
  ...
</div>
```
This output is safe, declarative, and respects the Static vs. Runtime separation.

**❌ Incorrect AI Output (Violation):**
```jsx
// This is a contract violation and must be prevented.
import React, { useEffect } from 'react';

const FaqAccordion = () => {
  useEffect(() => {
    // FORBIDDEN: AI must not generate initialization logic.
    window.HSStaticMethods.autoInit();
  }, []);

  return (
    <div class="hs-accordion-group">...</div>
  );
};
```

## 4. Validation
- All AI-generated node trees containing Preline components must be validated against a schema that disallows script tags or executable event handlers.
- This ensures the AI adheres to the **"Editor Never Executes Logic"** guarantee of the UX Contract.