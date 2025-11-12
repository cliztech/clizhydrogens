---
name: shopify.build
description: Scaffold Hydrogen 2 store with Tailwind, tests, Lighthouse CI, and axe.
version: 2
owner: supervisor.dev
mcp_required: []
inputs:
  - key: store_domain
    required: true
  - key: api_token
    required: false
outputs:
  - key: repo_scaffold
    path: reports/shopify_scaffold.txt
  - key: ci_pipeline
    path: .github/workflows/ci.yml
acceptance:
  - "npm run dev responds 200 on /"
  - "npx playwright test passes"
  - "LH perf>=0.90 a11y>=0.90 seo>=0.90"
---

## Quick Start (Sniper)
- Run the one-shot scaffold script.
- Create `.env.sample` with `PUBLIC_STORE_DOMAIN`, `PUBLIC_STOREFRONT_API_TOKEN`.
- Generate routes: `/`, `/collections`, `/products/$handle`, `/cart`.
- Install Playwright + axe tests, write smoke + a11y specs.
- Commit and open PR `feat(store): hydrogen scaffold`.

## Validation
- Write `reports/shopify_scaffold.txt` with server URL and test summary.
