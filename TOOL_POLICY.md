# Tool Policy

## 1. General Usage
- Tools are executable functions available to Agents.
- **Approval**: All new tools must be approved by the Tech Architect.
- **Idempotency**: Tools should be idempotent whenever possible (running twice has the same effect as running once).

## 2. Permitted Tools
- **Read-Only**: `read_file`, `list_files`, `grep` (Safe to use freely).
- **Write**: `overwrite_file`, `create_file` (Requires strict verification).
- **External**: `curl`, `fetch` (Restricted to allowlisted domains).

## 3. Human-in-the-Loop
- Any tool action that deletes data or modifies production environments requires human confirmation (via PR approval).

## 4. Audit Log
- All tool executions are logged. Agents must provide a `thought` process before calling a tool.
