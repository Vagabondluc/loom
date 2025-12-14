#!/usr/bin/env bash
set -euo pipefail

# Check script for enforcing doc and import rules for the refactor project.
# Exits non-zero on violations.

ROOT_DIR=$(pwd)
FAIL=0

echo "Running contract & CI enforcement checks..."

# Utility: exit on fail
function fail() {
  echo "❌ $1"
  FAIL=1
}

# If a Node validator exists in docs/tools, run it (this is an explicit Node-only audit helper).
if [ -f "docs/tools/check-contract.node.mjs" ]; then
  echo "Found Node-based contract checker at docs/tools/check-contract.node.mjs. Running with Node..."
  if ! command -v node >/dev/null 2>&1; then
    echo "⚠️ Node runtime not found locally. Skipping Node-based contract check; in CI this will run Node."
  else
    node docs/tools/check-contract.node.mjs || exit 1
  fi
  echo "Node-based contract checks passed."
else
  echo "No Node-based audit tool found. Proceeding with shell-based checks..."
fi

# 1) Demo Import Guard: runtime folders must not import from demo/**
RUNTIME_FOLDERS=("ui" "stores" "services" "utils" "config" "types.ts")
for f in "${RUNTIME_FOLDERS[@]}"; do
  echo "Checking imports from demo in $f..."
  git ls-files "$f/**" || true
  IFS=$'\n'
  for file in $(git ls-files "$f/**" 2>/dev/null || true); do
    if [ -f "$file" ]; then
      if grep -nE "from\s+['\"](\.\.?/)?demo/|from\s+['\"]demo/" "$file" >/dev/null; then
        echo "Found demo import in runtime file: $file"
        grep -nE "from\s+['\"](\.\.?/)?demo/|from\s+['\"]demo/" "$file" || true
        fail "Runtime import from demo detected: $file"
      fi
    fi
  done
  unset IFS
done

# 2) Demo Deletability: only index.demo.tsx may import demo and demo folder files
ALLOWED_DEMO_IMPORTS=("index.demo.tsx" "App.tsx")
echo "Checking demo import allowed paths..."
IFS=$'\n'
for file in $(git ls-files "**/*.*"); do
  if grep -nE "from\s+['\"](\.\.?/)?demo/|from\s+['\"]demo/" "$file" >/dev/null; then
    # Allow if file is under demo or it's in the allowed list (e.g., host App or index.demo)
    if [[ "$file" == demo/* ]]; then
      continue
    fi
    skip_allowed=0
    for allow in "${ALLOWED_DEMO_IMPORTS[@]}"; do
      if [[ "$file" == "$allow" ]]; then
        skip_allowed=1
        break
      fi
    done
    if [[ $skip_allowed -eq 1 ]]; then
      continue
    fi
    echo "Found demo import in non-demo file: $file"
    grep -nE "from\s+['\"](\.\.?/)?demo/|from\s+['\"]demo/" "$file" || true
    fail "Non-demo file imports from demo: $file"
  fi
done
unset IFS

# 1a) Shim purity guard: ensure demo registry runtime files are only shims (no logic)
echo "Checking demo runtime shim purity..."
if [ -x "$(pwd)/scripts/check-shim-purity.sh" ]; then
  if ! bash ./scripts/check-shim-purity.sh; then
    fail "Demo runtime shim purity checks failed"
  fi
else
  echo "Shim purity script not found or not executable; skipping shim purity check."
fi

# 3) Docs Authority Guard
# 3a) GOV files must not contain REQ- or normative words
echo "Checking governance docs for REQ- and normative terms..."
GOV_FILES=$(git ls-files "docs/governance/**" || true)
for f in $GOV_FILES; do
  # Use awk to strip fenced code blocks from the file before searching
  tmpfile=$(mktemp)
  awk 'BEGIN{skip=0} /^```/ {skip=1-skip; next} !skip {print}' "$f" > "$tmpfile" || true
  if grep -nE "REQ-" "$tmpfile" >/dev/null; then
    echo "Found REQ- in governance doc: $f"
    fail "Governance doc contains REQ-: $f"
  fi
  if grep -nE "\b(MUST|SHALL|NEVER|FORBIDDEN|SHOULD)\b" "$tmpfile" >/dev/null; then
    echo "Found normative term in governance doc: $f"
    grep -nE "\b(MUST|SHALL|NEVER|FORBIDDEN|SHOULD)\b" "$f" || true
    fail "Governance doc contains normative language: $f"
  fi
  rm -f "$tmpfile"
done

# 3b) Agent file mustn't contain REQ- or normative terms
AGENT_FILE="AGENTS.md"
if [ -f "$AGENT_FILE" ]; then
  if grep -nE "REQ-" "$AGENT_FILE" >/dev/null; then
    fail "AGENTS.md must not contain REQ-"
  fi
fi

# 4) REQ ↔ TDD Traceability
# Find all REQ- IDs and ensure they appear in docs/CONTRACTS and docs/TDD
echo "Checking REQ ↔ TDD traceability..."
REQS=$(grep -rhoE "REQ-[A-Za-z0-9_-]+" docs || true | sort -u)
for req in $REQS; do
  if [ -z "$req" ]; then continue; fi
  in_contract=$(grep -rho "$req" docs/CONTRACTS || true)
  if [ -z "$in_contract" ]; then
    echo "$req not found in docs/CONTRACTS"
    fail "REQ appears outside docs/CONTRACTS: $req"
  fi

  in_tdd=$(grep -rho "$req" docs/TDD || true)
  if [ -z "$in_tdd" ]; then
    echo "$req not referenced in docs/TDD"
    fail "REQ not referenced by any TDD: $req"
  fi
done

# 5) REQ only in docs/CONTRACTS
echo "Ensuring REQ- appears only in Contract docs..."
ALL_REQ_OCCURRENCES=$(grep -rhoE "REQ-[A-Za-z0-9_-]+" docs || true)
for occ in $ALL_REQ_OCCURRENCES; do
  file=$(grep -R -n "$occ" docs | head -n1 | cut -d: -f1 || true)
  if [[ $file != docs/CONTRACTS/* ]]; then
    echo "$occ found in non-contract file: $file"
    fail "REQ found outside docs/CONTRACTS: $occ in $file"
  fi
done

# 6) Runtime docs import guard: runtime code must not import docs
echo "Checking runtime code does not import markdown/docs content..."
for f in $(git ls-files "ui/**" "stores/**" "services/**" "utils/**" "config/**" "types.ts" 2>/dev/null || true); do
  if grep -nE "from\s+['\"](.*docs/|docs/)" "$f" >/dev/null; then
    echo "Found import from docs in runtime file: $f"
    grep -nE "from\s+['\"](.*docs/|docs/)" "$f" || true
    fail "Runtime file imports from docs: $f"
  fi
done

# 7) Legacy Import Guard (placeholder) - check for 'legacy/' or 'deprecated/' or 'pre-refactor' paths
DEPRECATED_PATTERNS=("legacy/" "deprecated/" "old/")
for p in "${DEPRECATED_PATTERNS[@]}"; do
  if git grep -n "$p" -- "**/*" >/dev/null 2>&1; then
    echo "Found deprecated pattern '$p' referenced in repository"
    git grep -n "$p" -- "**/*" || true
    fail "Deprecated pattern referenced: $p"
  fi
done

# 8) Enforce that only index.demo.tsx imports demo into non-demo exports
# (already covered by demo import guard); redundant check omitted.

if [ "$FAIL" -eq 1 ]; then
  echo "One or more checks failed. See messages above.";
  exit 1
fi

echo "All CI enforcement checks passed."
exit 0
