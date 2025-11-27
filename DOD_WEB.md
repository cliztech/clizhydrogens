# Definition of Done: Web Development

A task is considered **DONE** only when all the following criteria are met:

## 1. Code Quality
- [ ] **Linting**: `npm run lint` passes with no errors.
- [ ] **Types**: TypeScript check passes (no `any` types unless strictly justified).
- [ ] **Clean Code**: No `console.log` or debug comments left in production code.

## 2. Testing
- [ ] **Unit Tests**: Added/Updated tests pass.
- [ ] **Integration Tests**: Critical flows (e.g., Cart) verified.
- [ ] **E2E**: Playwright tests pass (if applicable).

## 3. Performance & Accessibility
- [ ] **Lighthouse**: Mobile Performance score ≥ 90.
- [ ] **Core Web Vitals**: LCP < 2.5s, CLS < 0.1.
- [ ] **Accessibility**: No violations in Axe DevTools (WCAG 2.1 AA).
- [ ] **Visuals**: Matches `brand_guidelines.md` (check borders, colors, fonts).

## 4. Deployment
- [ ] **Build**: `npm run build` succeeds locally.
- [ ] **CI**: GitHub Actions pipeline green.
- [ ] **Review**: Approved by at least one peer or Supervisor Agent.
