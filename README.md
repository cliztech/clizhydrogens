# Cheeky Prints — Shopify Hydrogen

Welcome to the **Cheeky Prints** storefront repository. This project is a Shopify Hydrogen (Remix) application built with a **brutalist design system** and an **AI-augmented development workflow**.

## 📖 Documentation

- **Team & Workflow**: [agents.md](./agents.md) - Roles, CI/CD gates, and process.
- **Agent Configuration**: [AGENTS.md](./AGENTS.md) - Technical config for the agentic layer.
- **Brand Guidelines**: [brand_guidelines.md](./brand_guidelines.md) - Design system (Neon/Brutalist).
- **Project Management**: [DOD_WEB.md](./DOD_WEB.md) (Tech DoD) & [DOD_CONTENT.md](./DOD_CONTENT.md) (Content DoD).

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- Shopify CLI

### Installation
```bash
npm install
```

### Development
Start the dev server:
```bash
npm run dev
```
Access the site at `http://localhost:3000`.

### Building
```bash
npm run build
```

## 📂 Project Structure
- `app/`: Application source code (Remix routes, components).
- `public/`: Static assets.
- `skills/`: Agent skills registry.
- `*.md`: Documentation and Guidelines (Root level).

## 🤖 AI Agents
This project uses AI agents for various tasks (Dev, Design, QA).
- Prompts are located in the root directory (e.g., `frontend_prompt.md`, `qa_prompt.md`).
- Configuration in `AGENTS.md`.
