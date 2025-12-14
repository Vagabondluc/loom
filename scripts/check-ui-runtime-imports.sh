#!/usr/bin/env bash

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "Checking for runtime imports inside ui/..."

failed=0
while IFS= read -r f; do
  # Only analyze TypeScript/TSX files
  case "$f" in
    *.ts|*.tsx) : ;;
    *) continue ;;
  esac

  # Find import lines that reference demo/ or services/
  violations=$(grep -nE "from ['\"](\.\./|\./)?(demo|services)(/|['\"])" "$f" || true)
  if [ -n "$violations" ]; then
    rel=${f#$ROOT/}
    echo "Runtime import in UI file: $rel" >&2
    echo "$violations" | sed 's/^/  /' >&2
    failed=1
  fi
done < <(find "$ROOT/ui" -type f 2>/dev/null)

if [ "$failed" -eq 1 ]; then
  echo "UI runtime import checks failed." >&2
  exit 1
fi

echo "UI runtime import checks passed."
