
# Specification: Preline Runtime Adapters (v1)

## 1. General Principles
*   **Scoped Init:** Adapters must strictly scope their initialization to the target root element. Global `autoInit()` is forbidden in the Workbench/Editor context; it is only allowed in full Page Preview.
*   **Best-Effort Teardown:** Preline does not natively support robust teardown for all components. Adapters must implement best-effort cleanup (removing listeners) and rely on React key-thrashing (hard remount) to clear DOM mutations.

## 2. Adapter Definitions

### 2.1 Preline Modal Adapter
*   **Target Node:** `preline-modal` (Applet)
*   **Prerequisites:** Target element must have `id` and `data-hs-overlay` attributes.
*   **Init:**
    *   Check for `window.HSOverlay`.
    *   Register event listeners for `open.hs.overlay` and `close.hs.overlay`.
*   **Supported Actions:**
    *   `openOverlay(targetId)`: Invokes `HSOverlay.open(targetId)`.
    *   `closeOverlay(targetId)`: Invokes `HSOverlay.close(targetId)`.
*   **Events Logged:** `overlay:open`, `overlay:close`.

### 2.2 Preline Accordion Adapter
*   **Target Node:** `preline-accordion` (Applet)
*   **Prerequisites:** Root element must have class `hs-accordion-group`.
*   **Init:**
    *   Initialize `HSAccordion` on the specific root element.
*   **Supported Actions:**
    *   `expandSection(sectionIndex)`: Manually adds `active` class and adjusts height style.
    *   `collapseSection(sectionIndex)`: Removes `active` class.
*   **Events Logged:** `accordion:expand`, `accordion:collapse`.

### 2.3 Preline Tabs Adapter
*   **Target Node:** `preline-tabs` (Applet)
*   **Prerequisites:** Valid `role="tablist"` structure.
*   **Init:**
    *   Initialize `HSTabs`.
*   **Supported Actions:**
    *   `selectTab(tabId)`: Simulates click on the tab trigger.
*   **Events Logged:** `tabs:change`.

## 3. Failure Modes
*   **Missing Runtime:** If `window.HSStaticMethods` is missing, the adapter must log an error `[Preline] Runtime not found` and abort initialization without crashing the UI.
*   **Malformed DOM:** If the node structure does not match Preline expectations, log `[Preline] Invalid structure` and do not attempt initialization.
