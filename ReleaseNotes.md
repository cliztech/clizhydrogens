# Cheeky Prints Release Notes

## Release Candidate
- **Branch**: `work`
- **Commit**: `<pending commit>` (post-automation scaffolding)
- **Highlights**:
  - Added multi-agent artifacts (design tokens, performance/QA/SEO documentation).
  - Introduced GitHub Actions pipeline for preview → performance → QA → production promotion.
  - Scaffolded Playwright + axe-core tests aligned with TestPlan.
  - Added integration configuration templates and localization packs.

## Database / Shopify Changes
- None. All updates are documentation and automation scaffolding.

## Deployment Plan
1. Trigger GitHub Actions workflow `hydrogen-orchestration.yml` on `work` branch.
2. Workflow stages:
   - Build + deploy preview to Oxygen.
   - Run Lighthouse performance loop (max 3 iterations).
   - Execute Playwright smoke + axe accessibility suite.
   - Await manual approval (`production-approval`) before promoting to production Oxygen environment.
3. On approval, workflow dispatches production deployment via `githubDispatch` tool.
4. Post-deploy smoke tests verify `/`, `/collections`, `/products/:handle`, `/cart` return 200.

## Rollback Strategy
- Use Shopify Oxygen console to redeploy previous build ID (auto-logged by workflow artifact `deployment-manifest.json`).
- Alternatively, re-run workflow selecting prior git SHA and `skip_perf=true` to expedite.

## QA Sign-off
- Pending automated Playwright execution (see `TestResults.xml`). Manual QA required once preview is live.
