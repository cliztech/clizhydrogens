# Memory Playbook

## Purpose
This document outlines how agents should record and retrieve memory to maintain context across tasks.

## Recording Memory
When an agent solves a complex problem or learns a new pattern, it should record a memory:
- **Trigger**: `initiate_memory_recording` tool.
- **Content**:
  - Context: What was the task?
  - Solution: What worked?
  - Caveats: What didn't work?

## Retrieving Memory
Before starting a task, agents should check existing memories to avoid repeating mistakes.
