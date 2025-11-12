---
name: SKILL_NAME
description: One-line purpose
version: 1
owner: supervisor.dev
mcp_required: []        # e.g., ["playwright"]
inputs:
  - key: foo
    required: true
outputs:
  - key: bar
    path: reports/skill-bar.json
acceptance:
  - measurable, binary, or numeric threshold
---

## Overview
What this skill guarantees.

## Quick Start
Steps the agent executes deterministically in Sniper mode.

## Detailed Procedure
1. Preparation
2. Execution
3. Validation (write artifacts to `reports/`)

## Failure Modes
- Symptom → correction
- Timeouts → fallback skill / subagent

## Safety & Compliance
- No secrets in logs, follow `config.toml[security]`.
