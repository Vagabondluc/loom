# Import Source Policy

This document outlines the strict rules for managing ESM module imports in this browser-native project. Adherence to these rules is mandatory to ensure stability and prevent runtime conflicts.

## Core Rules

*   **System-level imports** injected by Google AI Studio (from `aistudiocdn.com`) are trusted and immutable.
*   **User-level imports** must come only from the following approved CDNs: `esm.sh`, `unpkg.com`, `jsdelivr.net`, or `skypack.dev`.
*   **Do not alias, duplicate, override, or version-shadow** any AI Studio-managed imports.
*   **React and ReactDOM must resolve to a single, consistent instance** across all origins. If AI Studio provides `react` from `aistudiocdn.com`, all other modules must use that instance (e.g., via `?external=react` on `esm.sh`).
*   All substitutions or new CDN-based imports must be recorded in this file.

## Import Log

This section records all significant changes and additions to the project's import map.

*   **2024-06-02**: Removed conflicting `react/` and `react-dom/` path-based mappings pointing to `esm.sh`. This definitively resolves a "Script error" race condition by enforcing a single React instance from `aistudiocdn.com`.
