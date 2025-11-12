#!/usr/bin/env bash
set -euo pipefail

if [[ -f "skills/shopify.build/SKILL.md" ]]; then
  echo "shopify.build OK"
else
  echo "shopify.build missing" >&2
  exit 1
fi
