# AI Coding Assistant — Project Instructions

## Project: MERN-Forum

**Primary Language:** JavaScript  
**Framework(s):** JavaScript  
**Package Manager:** npm  
**TypeScript:** No

---

## Tech Stack

- **JavaScript** (63% of codebase, 39 files)
- **CSS** (19% of codebase, 12 files)
- **JSON** (11% of codebase, 7 files)
- **Markdown** (3% of codebase, 2 files)
- **YAML** (2% of codebase, 1 files)

---

## Detected Conventions

- **Naming:** kebab-case for files and identifiers
- **Linter:** none detected
- **Formatter:** none detected
- **Test Framework:** none detected
- **Test Directory:** none detected

---

## Key Files

- `README.md`
- `package.json`

---

## Architecture

See `.ai-os/context/architecture.md` for the full architecture overview.  
See `.ai-os/context/conventions.md` for detailed coding conventions.  
See `.ai-os/context/stack.md` for the complete dependency inventory.

---

## General Rules

- Prefer **early returns** (guard clauses) over deep nesting
- Validate all external inputs at the boundary (API/form/webhook)
- Scope database queries by the current user/owner when applicable
- Keep business logic out of UI components — delegate to services/utilities
- Use async/await over .then() chains
- Never commit secrets or credentials
- Only comment code that genuinely needs clarification

---

## MCP Tools Available

Use these tools to fetch project-specific context on demand:

- `search_codebase` — semantic search over project files
- `get_project_structure` — annotated file tree
- `get_conventions` — this project's coding conventions
- `get_stack_info` — full dependency/tech stack details
- `get_file_summary` — key exports and purpose of a specific file

---

## JavaScript Project

No specific framework template found. Follow the general rules above.
