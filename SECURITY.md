# Security Policy

## 1. Reporting Vulnerabilities
If you discover a security vulnerability, please report it privately to the Security Ops agent or the repository maintainer. **DO NOT** open a public issue.

## 2. Secure Development Lifecycle (SDLC)
- **Dependency Scanning**: `npm audit` must pass before merge.
- **Code Analysis**: Static analysis checks for common vulnerabilities (XSS, Injection).
- **Secrets Management**:
  - Never commit `.env` files.
  - Use GitHub Secrets for CI/CD.
  - Rotate keys immediately if compromised.

## 3. Data Protection
- **PII**: Personally Identifiable Information must be handled according to GDPR/CCPA.
- **Shopify Token**: Storefront Access Token is public-safe, but Admin API tokens must remain private.

## 4. Third-Party Tools
- Only approved npm packages from `package.json` are allowed.
- Review new dependencies for supply chain attacks.
