#!/usr/bin/env bash

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "Checking demo runtime shim purity..."

failed=0
while IFS= read -r f; do
  # Ensure file is within demo/**/registry/runtime/** and is a ts/tsx file
  case "$f" in
    */registry/runtime/*.ts|*/registry/runtime/*.tsx) : ;;
    *) continue ;;
  esac
  # Skip files that are known to be allowed (e.g., README or intentionally empty shims)
  rel=${f#$ROOT/}
  # Collect non-empty, non-comment lines
  violations=$(awk 'NF && $1 !~ /^\/\// && $1 !~ /^export/ && $1 !~ /^\/\*/ && $1 !~ /^declare/ {print NR ": " $0}' "$f" || true)
  if [ -n "$violations" ]; then
    echo "Violation in shim: $rel" >&2
    echo "$violations" | sed 's/^/  /' >&2
    failed=1
  fi
  # Also check for class|function definitions
  if grep -E "(^|[[:space:]])class[[:space:]]|(^|[[:space:]])function[[:space:]]" -n "$f" >/dev/null 2>&1; then
    echo "Found class/function in shim: $rel" >&2
    grep -nE "(^|[[:space:]])class[[:space:]]|(^|[[:space:]])function[[:space:]]" "$f" | sed 's/^/  /' >&2
    failed=1
  fi
done < <(find "$ROOT/demo" -type f -path "*/registry/runtime/*" \( -name "*.ts" -o -name "*.tsx" \) 2>/dev/null)

if [ "$failed" -eq 1 ]; then
  echo "Demo runtime shim purity checks failed." >&2
  exit 1
fi

echo "Demo runtime shim purity checks passed." 
