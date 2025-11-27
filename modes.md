# Environment Modes

## 1. Development (`dev`)
- **URL**: `localhost:3000`
- **Data**: Mock data or Dev Store.
- **Tools**: Hot Module Replacement (HMR), Debug logging enabled.
- **Agent Sandbox**: Read/Write access to `app/`.

## 2. Staging (`staging`)
- **URL**: `staging.cheekyprints.com` (Example)
- **Data**: Connected to Staging Shopify Store.
- **Tools**: Minified build, source maps enabled.
- **Gate**: Pre-production E2E tests run here.

## 3. Production (`production`)
- **URL**: `cheekyprints.com`
- **Data**: Live Shopify Store.
- **Tools**: Optimized build, minimal logging.
- **Constraint**: Immutable deployments.
