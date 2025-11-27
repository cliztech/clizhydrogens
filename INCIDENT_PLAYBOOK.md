# Incident Playbook

## Severity Levels
- **SEV-1 (Critical)**: Site down, Checkout broken, Data leak. **Response time: < 15 min.**
- **SEV-2 (High)**: Major feature broken (e.g., Search), Performance degradation. **Response time: < 1 hour.**
- **SEV-3 (Medium)**: Minor UI bug, Non-critical path issue. **Response time: Next business day.**

## Response Process

### 1. Acknowledge
- Confirm the incident in the team channel/tracker.
- Assign an Incident Commander (IC).

### 2. Triangulate
- Check logs: `npm run start` logs, Shopify Admin logs.
- Check Status: Shopify Status Page, Hosting provider status.

### 3. Mitigate
- **Rollback**: If a recent deploy caused it, rollback immediately to the last known good tag.
  ```bash
  git checkout vX.Y.Z-1
  npm run deploy
  ```
- **Hotfix**: If rollback fails, create a hotfix branch.

### 4. Resolve & Post-Mortem
- Confirm fix in production.
- Write a Post-Mortem in `reports/postmortems/`.
- Update `RUNBOOK.md` to prevent recurrence.
