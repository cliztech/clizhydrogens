---
name: qa.a11y
description: Enforce WCAG 2.2 AA via axe.
version: 1
owner: qa.core
mcp_required: ["playwright"]
inputs:
  - key: base_url
    required: true
outputs:
  - key: axe_report
    path: reports/axe.json
acceptance:
  - "axe violations = 0 on / /collections /products/* /cart"
---
## Procedure
- Use @axe-core/playwright.
- Produce JSON at `reports/axe.json`.
- If failures, patch simple DOM issues or open PR with diff.
