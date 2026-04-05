---
applyTo: "**"
---

# AI OS — Active (MERN-Forum)

This repository uses **AI OS** for context-enriched Copilot assistance.
The following MCP tools are available — use them proactively:

| Tool | When to call |
|---|---|
| `get_project_structure` | Before exploring unfamiliar directories |
| `get_stack_info` | Before suggesting any library or tooling changes |
| `get_conventions` | Before writing new code in this repo |
| `get_file_summary` | To understand a file without reading it fully |
| `get_impact_of_change` | **Before editing any file** — shows blast radius |
| `get_dependency_chain` | To trace how a module connects to the rest of the code |
| `search_codebase` | To find symbols, patterns, or usage examples |
| `get_env_vars` | Before referencing environment variables |
| `check_for_updates` | To see if AI OS artifacts are out of date |

## Update AI OS

If `check_for_updates` returns an available update, run:
```bash
npm run update
```
This refreshes all context docs, agent files, skills, and MCP tools in-place.