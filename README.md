# Pokedex App

A responsive Pokedex web app built with React 19 and TypeScript. Browse Pokemon with infinite scroll, search by name, view detailed stats, and build your own collection.

## Tech Stack

- **React 19** + **TypeScript** — UI framework
- **Vite** — Build tool and dev server
- **MUI (Material UI)** + **Emotion** — Component library and styling
- **TanStack React Query** — Server state management with caching
- **React Router v7** — Client-side routing
- **Vitest** + **Testing Library** — Unit testing

## Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Run tests
bun run test

# Production build
bun run build
```

## Features

- **Infinite scroll** — Browse 1000+ Pokemon with automatic pagination using IntersectionObserver
- **Search** — Partial match on cached Pokemon, exact name API fallback for uncached results
- **Detail view** — Type-colored headers, official artwork, About tab (species, height, weight, abilities, breeding), Base Stats tab with visual bars
- **Catch/Release** — Build a personal collection persisted to localStorage
- **Responsive** — 2-column (mobile), 3-column (tablet), 4-column (desktop) grid

## Project Structure

```
src/
├── api/          # PokeAPI fetch functions and React Query hooks
├── components/   # Reusable UI components (layout, pokemon, search, common)
├── context/      # CaughtPokemonContext with localStorage persistence
├── hooks/        # Custom hooks (useDebounce, useInfiniteScroll)
├── pages/        # Route pages (List, Detail, Collection)
├── theme/        # MUI theme configuration
├── types/        # TypeScript interfaces
└── utils/        # Helpers (typeColors, formatters, localStorage)
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Pokemon list with infinite scroll and search |
| `/pokemon/:id` | Pokemon detail with tabs (About, Base Stats) |
| `/collection` | Caught Pokemon collection |

## AI Usage

This project was built with assistance from Claude (Anthropic). Claude helped with:
- Project scaffolding and architecture decisions
- Implementation of all components, hooks, and pages
- Test creation and debugging
- Code review and optimization
