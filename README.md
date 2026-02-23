# Pokedex App

A production-patterns exercise built around the public [PokéAPI](https://pokeapi.co/) — focusing on caching strategy, async state management, and component architecture in React 19.

## Tech Stack

| | |
|---|---|
| **React 19** + **TypeScript** | UI framework |
| **Vite** | Build tool and dev server |
| **MUI (Material UI)** + **Emotion** | Component library and styling |
| **TanStack React Query** | Server state management with caching |
| **React Router v7** | Client-side routing |
| **Vitest** + **Testing Library** | Unit testing |

## Features

- **Infinite scroll** — Browse 1000+ Pokémon with automatic pagination using `IntersectionObserver`
- **Two-pass search** — Partial match on cached Pokémon first; falls back to exact-name API lookup for uncached results
- **Detail view** — Type-colored headers, official artwork, About tab (species, height, weight, abilities, breeding), Base Stats tab with animated bars
- **Catch/Release** — Personal collection persisted to `localStorage`
- **Responsive** — 2-column (mobile) → 3-column (tablet) → 4-column (desktop) grid

## Architecture & Design Decisions

### Two-Pass Search

Search runs against the local React Query cache first (partial name match across all cached Pokémon), then falls back to a direct API call for exact names that aren't cached yet. This avoids a network round-trip for the common case while still supporting deep searches without requiring the full list to be loaded.

### Caching Strategy and the N+1 Pattern

Each Pokémon card triggers its own detail request — a pattern that's typically a code smell, but here it's the correct choice. The list endpoint (`/pokemon?limit=N`) returns only `name` and `url` per item; sprite URLs and type data aren't available until the detail endpoint is called. Prefetching at the grid level would be a no-op since there's nothing to prefetch from the list response.

Mitigation: detail queries use `staleTime: 10 minutes`, so cache hits are instant on revisits and React Query deduplicates in-flight requests for the same ID.

### Async State Abstraction

A reusable `AsyncBoundary` component collapses the repetitive loading/error guard pattern (check `isLoading` → render spinner; check `isError` → render error message; render content). Pages wrap their content in `AsyncBoundary` and pass `loading`, `error`, and an optional `onRetry` callback, keeping page components focused on layout rather than state branching.

### Persistence Layer

`CaughtPokemonContext` maintains a single write path to `localStorage`. State and storage are always updated together in the same operation, eliminating the drift risk that comes from keeping them in sync separately.

## Project Structure

```
src/
├── api/          # PokeAPI fetch functions and React Query hooks
├── components/   # UI components (layout, pokemon, search, common)
│   └── common/   # AsyncBoundary, CatchButton, InfoRow, ErrorMessage, LoadingSpinner
├── context/      # CaughtPokemonContext with localStorage persistence
├── hooks/        # Custom hooks (useDebounce, useInfiniteScroll, usePokemonSearchLogic)
├── pages/        # Route pages (List, Detail, Collection)
├── theme/        # MUI theme configuration
├── types/        # TypeScript interfaces
└── utils/        # Helpers (typeColors, formatters, localStorage)
```

## Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Run tests
bun run test

# Watch mode
bun run test:watch

# Production build
bun run build
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Pokémon list with infinite scroll and search |
| `/pokemon/:id` | Pokémon detail with tabs (About, Base Stats) |
| `/collection` | Caught Pokémon collection |

## AI Usage

This project was built with assistance from Claude (Anthropic). Claude helped with:
- Project scaffolding and architecture decisions
- Implementation of all components, hooks, and pages
- Test creation and debugging
- Code review and optimization

### Skills

Specialized workflows used throughout development:

| Skill | Purpose |
|---|---|
| `brainstorming` | Facilitated divergent thinking to explore design options before implementation |
| `writing-plans` | Drafted technical roadmaps before starting each feature |
| `executing-plans` | Step-by-step implementation of previously defined strategies |
| `systematic-debugging` | Isolated and fixed bugs using a logical, reproducible flow |
| `critical-thinking` | Analyzed trade-offs and identified risks before committing to approaches |
| `frontend-design` | Architectural and UI/UX guidance for building modern web interfaces |
| `verification-before-completion` | Final checklist to ensure requirements and tests were met before shipping |
| `requesting-code-review` | Prepared clean pull request context for reviewers |
| `receiving-code-review` | Processed feedback and implemented requested changes effectively |
| `session-handoff` | Summarized state and context to resume work across sessions |
| `web-design-guidelines` | Ensured adherence to accessibility, responsiveness, and design standards |
| `logging-best-practices` | Implemented structured, meaningful logs for better observability |
| `skill-creator` | Defined and built new modular capabilities for the agent |
| `supabase-postgres-best-practices` | Database schema, security, and performance guidance |
| `using-superpowers` | Orchestrated the specialized advanced toolset for complex tasks |

#### Superpowers & Workflow

| Skill | Purpose |
|---|---|
| `finishing-a-development-branch` | Cleaned up code and prepared branches for merging |
| `using-git-worktrees` | Managed multiple concurrent branches without switching directories |
| `dispatching-parallel-agents` | Triggered multiple sub-agents to handle independent tasks simultaneously |
| `subagent-driven-development` | Broke down tasks into smaller units managed by specialized sub-agents |
| `test-driven-development` | Ensured code was written to satisfy pre-defined test cases |
| `writing-skills` | Refined documentation and technical explanations |

### Plugins

MCP servers and plugins that extended Claude's capabilities:

| Plugin | Purpose |
|---|---|
| `claude-mem` | Long-term memory and context retrieval across sessions via MCP |
| `context7` | Enhanced project context window and documentation retrieval via MCP |
| `serena` | Semantic code navigation and symbol-level editing via MCP |
| `feature-dev` | Streamlined the end-to-end lifecycle of building new features |
| `code-review` | Automated code quality and style analysis |
| `code-simplifier` | Refactored complex logic into more readable and maintainable code |
| `ralph-loop` | Managed iterative feedback loops during development |
| `security-guidance` | Identified vulnerabilities and suggested secure coding patterns |
| `claude-code-setup` | Managed environment and configuration for Claude's coding tools |
