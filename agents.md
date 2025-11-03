
---

## 9. Release Policy
- Tag every prod deploy `vX.Y.Z`  
- Auto-generate CHANGELOG  
- Run post-deploy E2E suite  
- Rollback within 10 min via last green artifact

---

## 10. Post-Launch Learning Loop
1. Insights-Agent aggregates metrics weekly.  
2. PM creates new tasks from findings.  
3. Brand Director refreshes visual assets quarterly.  
4. Perf Analyst re-benchmarks monthly.  
5. Updates stored in `/docs/insights-weekly.md`.

---

## 11. CI/CD Reference
See `.github/workflows/ci.yml` for gates (lint → type → unit → E2E → Lighthouse → Security → Deploy).

---

## 12. Task Template
Example `/tasks/*.yaml`:

```yaml
owner: FRONTEND-DEV
title: "<ProductGrid> Component"
depends_on: ["tasks/uiux-tokens-hero.yaml"]
reviewer: TECH-ARCHITECT
outputs:
  - app/components/ProductGrid.tsx
acceptance_criteria:
  - "Accessible facets"
  - "Infinite scroll"
  - "Tests pass"
done_when:
  - "CI green"
