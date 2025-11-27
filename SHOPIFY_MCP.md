# Shopify Model Context Protocol (MCP)

## Overview
This document describes how AI Agents interact with the Shopify Hydrogen context.

## 1. Context Injection
Agents are provided with the following context at runtime:
- **Shopify Schema**: `storefrontapi.generated.d.ts` (GraphQL types).
- **Project Structure**: File tree summary.
- **Design System**: Content of `brand_guidelines.md`.

## 2. Code Generation
Agents must use the `@shopify/hydrogen` components and hooks.
- **Preferred**: `<CartProvider>`, `<Await>`, `useLoaderData`.
- **Avoid**: Raw `fetch` calls to Storefront API (use the client).

## 3. Validation
Generated code is validated against the TypeScript definitions.
- `npm run typecheck` is the final arbiter of valid MCP usage.

## 4. MCP Tools
See `codex_mcp.py` for the implementation of the context retrieval logic.
