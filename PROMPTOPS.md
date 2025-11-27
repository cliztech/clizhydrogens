# Prompt Operations (PromptOps)

## 1. Prompt Storage
- All agent prompts are stored in the root directory as `*_prompt.md`.
- **Naming Convention**: `[role]_prompt.md` (e.g., `frontend_prompt.md`).

## 2. Versioning
- Prompts are versioned with the code.
- Significant changes to prompts should be tested against a "Gold Set" of tasks.

## 3. Maintenance
- **Review**: Review prompts quarterly to ensure they align with new library versions (e.g., Remix v2 -> v3).
- **Optimization**: If agents consistently fail tasks, refine the prompt instructions (add examples, clarify constraints).

## 4. Updates
To update a prompt:
1. Edit the `.md` file.
2. Run a test task with the agent.
3. Submit PR with "Prompt Update" label.
