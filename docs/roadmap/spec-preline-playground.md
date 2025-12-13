# Specification: Runtime Workbench Contract

## 1. Purpose
To create a safe, isolated, and "runtime-hot" environment for demonstrating the full interactivity of all JS-driven Preline UI components. This page serves as the designated area for behavioral testing and demonstration, distinct from the static-only `KitchenSink`.

It also acts as the **visual debugger for concrete runtime adapters** that execute actions defined in the abstract `Logic Lab`.

## 2. Core Contract & Guarantees

- **[PPC-01] Total Isolation:**
    - The Runtime Workbench will be a new, standalone "demo" page accessible from the main navigation (e.g., `App.tsx`).
    - It **must not** share any state with the `builderStore` or any other part of the Visual Builder.
    - It **must not** include any Builder UI chrome (e.g., Palette, Properties Panel, Toolbar).

- **[PPC-02] Static-First Rendering:**
    - The HTML structure of the Playground page must be rendered as a static, fixed layout by React.
    - It should not contain complex conditional rendering or dynamic lists that would cause React to re-render frequently after the initial mount.

- **[PPC-03] One-Time Initialization:**
    - The Preline JavaScript `(window as any).HSStaticMethods.autoInit()` **is allowed** to run on this page.
    - It must be called exactly **once**, inside a `useEffect` or `useLayoutEffect` hook with an empty dependency array (`[]`), ensuring it runs only after the initial DOM has been rendered.

- **[PPC-04] The Purpose is Behavior:**
    - The sole purpose of this page is to answer the question: "How do these Preline components *behave* at runtime?"
    - It will contain fully interactive examples of Modals, Accordions, Tabs, Dropdowns, Carousels, etc.

## 3. Relationship to Other Demos

- **Kitchen Sink (`PrelineSection`):** Shows the **static, structural form** of Preline components. It answers "What does it look like?". The `PrelineSection` should contain a link to the Workbench.
- **Runtime Workbench:** Shows the **live, behavioral form** of Preline components. It answers "What does it do?".

This strict separation allows the project to showcase the full power of Preline without compromising the stability of the Visual Builder, in full compliance with **Architectural Decision Dec-014**.