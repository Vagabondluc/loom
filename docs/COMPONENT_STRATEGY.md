# Documentation: Component Strategy (DaisyUI vs. Preline)

## 1. Purpose
This document provides a clear strategy for using DaisyUI and Preline UI components together within the Visual Builder. Its goal is to minimize redundancy, clarify the strengths of each library, and provide clear guidance for both end-users and the AI assistant.

## 2. Core Philosophies

- **DaisyUI (Primary System):**
    - **Role:** The default, foundational component system.
    - **Strengths:** Semantic component classes (`btn`, `card`), extensive theme support, pure CSS patterns.
    - **When to Use:** For all common UI needs. It is the baseline for consistency.

- **Preline UI (Secondary / Specialized System):**
    - **Role:** An alternative, utility-first system for specific aesthetics and JS-driven components.
    - **Strengths:** "Enterprise SaaS" look and feel, robust JS-driven interactions.
    - **When to Use:** When its specific visual style is desired, or when its JS-driven behavior is needed (in Preview Mode).

## 3. Architectural Embodiment: The Kitchen Sink
This strategy is directly reflected in the **UI Kitchen Sink's tabbed interface**.
- The **`DaisyUI` tab** contains the primary, default component set.
- The **`Preline` tab** showcases static templates for its distinct aesthetic and runtime-driven components.
This reinforces the separation of concerns and guides the user toward the intended use of each library.

## 4. Component Overlap Map & Recommendations

| Component   | DaisyUI (Primary Choice)                               | Preline (Secondary Choice)                          | Builder Recommendation                                                                                                                              |
|-------------|--------------------------------------------------------|-----------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| **Button**  | ✅ `btn`, `btn-primary`                                | Utility-heavy (`py-3 px-4...`)                      | **Use DaisyUI by default.** Offer Preline buttons as a distinct stylistic choice in the palette, clearly labeled.                                     |
| **Card**    | ✅ `card`, `card-body`                                 | Utility-heavy (`flex flex-col...`)                  | **Use DaisyUI by default.** Preline cards are an excellent alternative for a more modern, less-stylized look. Offer both.                       |
| **Modal**   | ✅ CSS-driven (`<dialog>`)                             | JS-driven (`data-hs-overlay`)                       | Both are represented as static templates. **DaisyUI is simpler.** Preline offers more runtime features. Offer both, with warnings on the Preline version. |
| **Tabs**    | ✅ CSS-driven (`tabs`, `input[type=radio]`)            | JS-driven (`hs-tab-group`)                          | Both are excellent static patterns. Offer both, as their visual styles are distinct. Label Preline as runtime-interactive.                          |
| **Accordion** | ✅ CSS-driven (`collapse`, `input[type=radio]`)        | JS-driven (`hs-accordion-group`)                    | Same as Tabs. The visual difference is significant. Offer both and let the user choose the style.                                                 |
| **Alert**   | ✅ `alert`, `alert-info`                               | CSS-only utility classes                            | **Use DaisyUI.** The semantic classes are simpler and integrate better with the theme engine. Preline offers no significant advantage here.            |
| **Dropdown**| ✅ CSS/Focus-driven (`dropdown`)                       | JS-driven (`hs-dropdown`)                           | Both are good static patterns. Offer both, as their runtime behavior and appearance may differ.                                                     |

## 5. Guidance for the Builder User
- **Start with DaisyUI:** For general-purpose layout and components, always start with the DaisyUI options. They are simpler and more consistent with the theming engine.
- **Choose Preline for Style:** Use Preline components when you specifically want their "clean," "enterprise," or "utility-first" aesthetic.
- **Mind the Runtime:** Remember that any Preline component marked with a "Play" icon in the palette will only become interactive in **Preview Mode**.

## 6. Guidance for the AI Assistant
- **Default to DaisyUI:** When a user asks for a generic component (e.g., "add a button," "create a card"), you **must** default to generating the DaisyUI version.
- **Use Preline on Request:** Only generate a Preline component if the user's prompt explicitly contains:
    - The word "Preline" (e.g., "add a Preline card").
    - Descriptive terms that match its aesthetic (e.g., "a more corporate-looking button," "a simple, unstyled card with a border").
- **Reinforce the Contract:** When generating a JS-driven Preline component, your response may include a brief note: "This component's interactive features will be active in Preview Mode."