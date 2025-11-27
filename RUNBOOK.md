# Operational Runbook

## Deployment
### Manual Deploy
```bash
npm run build
npm run deploy:prod
```

### Rollback
Identify the last stable tag:
```bash
git tag --list
git checkout v1.2.0
npm run deploy:prod
```

## Secrets Rotation
1. Generate new API keys in Shopify Admin.
2. Update `.env` locally (verify).
3. Update GitHub Secrets / Hosting Environment Variables.
4. Restart the server/redeploy.

## Cache Clearing
If customers see stale content:
1. Purge CDN cache (via Hosting Dashboard).
2. Purge Hydrogen Cache (if using custom caching strategy).

## Database/Store Sync
If product data is out of sync:
1. Verify Shopify Webhooks are active.
2. Manually trigger a "Sync Products" job (if applicable).
