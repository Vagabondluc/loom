
# Specification: Icon Library v2.0 (Tags & Theming)

## 1. Overview
This update expands the Icon Library from a simple flat list into a rich exploration tool. It adds **Taxonomy Filtering** to help users discover icons by intent rather than just name, and **Visual Theming** to preview icons in different contexts (e.g., thin stroke vs. bold, small vs. large).

## 2. Feature: Tag-Based Filtering

### 2.1 The Problem
Users often don't know the exact name of an icon (e.g., looking for "sending" but the icon is named "PaperPlane").

### 2.2 Taxonomy Strategy (Heuristic)
Since we cannot ship a massive metadata database, we will use a **Heuristic Keyword Matcher** to group icons into logical tags based on their PascalCase names.

**Categories:**
*   **Arrows:** `Arrow`, `Chevron`, `Corner`, `Move`, `Refresh`, `Rotate`
*   **Communication:** `Mail`, `Message`, `Phone`, `Send`, `Share`, `Inbox`
*   **Media:** `Play`, `Pause`, `Video`, `Image`, `Camera`, `Music`, `Film`
*   **Editor:** `Text`, `Align`, `Bold`, `Italic`, `List`, `Link`, `Edit`
*   **Interface:** `Menu`, `Grid`, `Layout`, `Settings`, `Search`, `User`
*   **Files:** `File`, `Folder`, `Save`, `Download`, `Upload`
*   **Brands:** `Github`, `Twitter`, `Facebook`, `Chrome`, `Slack`
*   **Weather:** `Sun`, `Cloud`, `Rain`, `Wind`, `Moon`

### 2.3 Interaction Design
*   **Tag Cloud:** A horizontal scrollable list of "Pills" below the search bar.
*   **Behavior:** Clicking a tag filters the list to matches. Clicking the active tag deselects it (returning to "All").
*   **Search Interop:** Search text AND Tag filter are additive (AND logic).

## 3. Feature: Visual Theming

### 3.1 The Problem
Lucide icons are vector-based and highly customizable, but the static list only shows them at `24px / 2px stroke`. Users need to see if an icon holds up at small sizes or looks good with a thin stroke.

### 3.2 Control Surface
A "Display Settings" toolbar containing:
1.  **Size Slider:** Range `12px` to `64px` (Default: 24).
2.  **Stroke Slider:** Range `0.5px` to `3px` (Step 0.25, Default: 2).

### 3.3 Persistence
*   These settings are ephemeral (session-based) for the purpose of the viewer.
*   They do *not* affect the copied text (which remains just the Icon Name), as the `BuilderNode` handles props separately.

## 4. UX Contract Updates

*   **[UX-IC-05] Visual Fidelity:** The grid must update immediately (<16ms) when dragging sizing sliders.
*   **[UX-IC-06] Filtering Speed:** Switching tags must feel instantaneous.
