All agents report via Pull-Request comments; PM confirms DoD.

---

## 4. CI/CD & Quality Gates
1. **Build & Typecheck**  
2. **Unit + Integration Tests**  
3. **Accessibility (Axe) + SEO + Lighthouse**  
4. **Security scan + dependency audit**  
5. **E2E + Visual Regression**  
6. **Brand + UX Review**  
→ Merge only when all green.

---

## 5. Agent Communication Protocol
- Each `/tasks/*.yaml` includes: `owner`, `depends_on`, `reviewer`, `acceptance_criteria`.  
- Agents can call auto-tools (`dalle3`, `playwright`, `ga4-export`, etc.).  
- Results posted in PR description.  
- Logs in `/logs/agents.log`.

---

## 6. Environment & Secrets
`dev` → `staging` → `production`  
`.env.*.template` manages tokens.  
Secrets stored via GitHub Environments (dev/stage/prod).

---

## 7. KPI Scoreboard
| Area | Metric | Target |
|-------|---------|--------|
| Perf | LCP | < 2 s |
| A11y | Violations | 0 |
| SEO | Core Web Vitals Pass | ≥ 90 % |
| Security | Critical Vulns | 0 |
| QA | Test Coverage | > 90 % |
| Design | Brand Consistency | 100 % |
| UX | NPS Growth | +15 % QoQ |

---

## 8. Key Docs
