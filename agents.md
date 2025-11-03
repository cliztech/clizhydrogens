# Agents.md — Cheeky Prints (Shopify Hydrogen)
Full-stack AI-augmented team for the Cheeky Prints Shopify Hydrogen storefront.

---

## 0. Core Principles
- **Design System → Code → Test → Launch** pipeline  
- **AI-Augmented Collaboration:** Each agent can call others or external tools.  
- **CI-Driven Quality:** Merge only when all gates pass.  
- **Immutable Deploys:** Every release is tagged + reproducible.  
- **Performance > Pretty:** LCP < 2 s mobile baseline.

---

## 1. Project Management Layer
**PM-ORCHESTRATOR** – Leads sprints, defines acceptance criteria, owns backlog.  
Integrates with `docs/AGENT_ROUTING.md` for sequencing.

Workflow  
1. Prioritize issues in `/docs/roadmap.md`  
2. Auto-assign by agent tag (`@UIUX`, `@SEO`, `@QA`)  
3. Agents deliver → CI gates → PM sign-off → Deploy

---

## 2. Team & Agents

| Role | Mission / Tools | KPI |
|------|-----------------|-----|
| **TECH-ARCHITECT** | Define Hydrogen + RSC architecture, caching, error boundaries. | 0 circular deps / < 2 s TTFB |
| **UI/UX-DESIGNER + ARTWORK-AGENT** | Figma + DALL·E 3 for design tokens, mockups, accessibility annotations. | A11y pass 100 % / CLS < 0.1 |
| **BRAND-DIRECTOR** | Maintain visual DNA & humor tone; verify POD mockup alignment (bleed, DPI, print area). | 100 % brand consistency |
| **FRONTEND-DEV** | Build Hydrogen components & routes with tests. | Lighthouse ≥ 90 mobile |
| **BACKEND-INTEGRATIONS** | Shopify Admin API + Printify webhooks + fulfillment automation. | < 1 min order→POD handoff |
| **SECURITY-OPS** | Dependabot, npm audit, OWASP ZAP, HMAC validation. | 0 critical vulns |
| **SEO-ANALYTICS** | GA4 + structured data + Core Web Vitals tracking. | SEO 100 / 100 |
| **PERF-ANALYST** | Lighthouse CI + SpeedCurve budgets. | Perf ≥ 95 / 90 mobile |
| **CONTENT-COPY** | On-brand SEO copy & microcopy. | Grade 6 – 8 readability |
| **QA-AUTOMATION** | Playwright + Axe + visual regression. | Flake < 2 % / 0 violations |
| **DEVOPS-PIPELINES** | GitHub Actions CI/CD + preview deploy + rollback. | Change fail < 5 % |
| **RESEARCH-ANALYST** | Competitor & POD market analysis. | ≥ 2 A/B ideas per quarter |
| **L10N-A11Y-AGENT** | i18n locales + WCAG 2.2 AA audits. | 100 % A11y pass |
| **CUSTOMER-FEEDBACK** | Hotjar / NPS monitoring. | +15 % checkout satisfaction QoQ |
| **INSIGHTS-AGENT** | Aggregate GA4 + Lighthouse data → `/docs/insights-weekly.md`. | Weekly actionable insight |

---

## 3. Orchestration Chain
PM → Research → Brand → UI/UX + Artwork → Architect → Frontend → Backend → SEO → QA → DevOps → Perf → Security → Insights

yaml
Copy code
All agents report in PR comments; PM confirms Definition of Done.

---

## 4. CI/CD Gates
1. Build & Typecheck  
2. Unit + Integration Tests  
3. Accessibility (Axe) + SEO + Lighthouse  
4. Security Scan + Dependency Audit  
5. E2E + Visual Regression  
6. Brand + UX Review  
→ Merge only when all green.

---

## 5. Agent Communication Protocol
Each `/tasks/*.yaml` includes: `owner`, `depends_on`, `reviewer`, `acceptance_criteria`.  
Agents can trigger auto-tools (`dalle3`, `playwright`, `ga4-export`, etc.).  
Results posted in PR description → logged to `/logs/agents.log`.

---

## 6. Environment & Secrets
- Envs: `dev` → `staging` → `production`  
- Secrets via GitHub Environments  
- `.env.*.template` keeps tokens safe.

---

## 7. KPI Scoreboard
| Area | Metric | Target |
|------|---------|---------|
| Perf | LCP | < 2 s |
| A11y | Violations | 0 |
| SEO | Core Web Vitals | ≥ 90 % |
| Security | Critical Vulns | 0 |
| QA | Coverage | > 90 % |
| Design | Consistency | 100 % |
| UX | NPS Growth | +15 % QoQ |

---

## 8. Key Docs
docs/
roadmap.md
adr/
design/
insights-weekly.md
security.md
postmortems/

yaml
Copy code

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
13. Agent Routing Quick Ref
Escalation	Trigger
QA → PM	Blocking defects
Security-Ops → PM	Critical vulnerability
Perf-Analyst → PM	Perf budget breach
