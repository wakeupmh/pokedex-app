# Pokedex App — Implementation Plan

## Context

Build a polished, responsive Pokedex web app for a technical assessment. The app fetches Pokemon data from PokeAPI, displays them in an infinite-scroll grid with search, shows detailed views with tabs, and lets users catch/release Pokemon into a persistent collection. The UI should match a mobile-first card-based design with type-colored backgrounds.

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | React 19 + TypeScript | Required by assessment |
| Build | Vite | Fast dev server, modern defaults |
| Package Manager | Bun | Fast installs and runtime |
| UI Library | MUI (Material UI) + Emotion | Bonus points per requirements |
| Data Fetching | TanStack React Query | Caching, dedup, infinite queries |
| Routing | React Router DOM v7 | Standard React routing |
| State | React Context + localStorage | Caught Pokemon persistence |
| Testing | Vitest + Testing Library | Fast, Vite-native |

---

## Folder Structure

```
src/
├── api/
│   ├── pokeApi.ts                 # Fetch functions for PokeAPI
│   ├── queryKeys.ts               # React Query key factory
│   └── hooks/
│       ├── usePokemonList.ts      # useInfiniteQuery (paginated list)
│       ├── usePokemon.ts          # useQuery (single Pokemon detail)
│       ├── usePokemonSpecies.ts   # useQuery (species data)
│       └── usePokemonSearch.ts    # useQuery (exact name API search)
├── components/
│   ├── layout/
│   │   └── AppLayout.tsx          # Top AppBar + Outlet
│   ├── pokemon/
│   │   ├── PokemonCard.tsx        # Card: sprite, name, type chips, colored bg
│   │   ├── PokemonGrid.tsx        # Responsive grid container
│   │   ├── TypeChip.tsx           # Type badge with color
│   │   ├── StatBar.tsx            # Stat row with progress bar
│   │   ├── PokemonTabs.tsx        # MUI Tabs (About / Base Stats)
│   │   ├── AboutTab.tsx           # Species, height, weight, abilities, breeding
│   │   └── BaseStatsTab.tsx       # 6 stat bars
│   ├── search/
│   │   └── SearchBar.tsx          # Debounced MUI TextField with search icon
│   └── common/
│       ├── LoadingSpinner.tsx     # Centered CircularProgress
│       ├── ErrorMessage.tsx       # Error state with retry
│       ├── EmptyState.tsx         # Empty collection / no results
│       └── CatchButton.tsx        # Heart toggle (catch/release)
├── pages/
│   ├── PokemonListPage.tsx        # Main list: search + infinite scroll
│   ├── PokemonDetailPage.tsx      # Detail: colored header, tabs, catch
│   └── CollectionPage.tsx         # Caught Pokemon grid
├── context/
│   └── CaughtPokemonContext.tsx   # Context + Provider + useCaughtPokemon hook
├── hooks/
│   ├── useInfiniteScroll.ts       # IntersectionObserver for infinite scroll
│   └── useDebounce.ts            # Debounce hook for search
├── types/
│   └── pokemon.ts                 # All TypeScript interfaces
├── utils/
│   ├── typeColors.ts              # 18 Pokemon types → hex colors
│   ├── formatters.ts              # ID padding, height/weight conversion
│   └── localStorage.ts           # Type-safe get/set for caught Pokemon
├── theme/
│   └── theme.ts                   # MUI createTheme customization
├── test/
│   ├── setup.ts                   # Vitest setup
│   └── mocks/pokemonData.ts       # Mock Pokemon data for tests
├── App.tsx                        # Providers + Router + Routes
├── main.tsx                       # ReactDOM entry
└── index.css                      # Global resets
```

---

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | PokemonListPage | Grid + search + infinite scroll |
| `/pokemon/:id` | PokemonDetailPage | Full detail with tabs |
| `/collection` | CollectionPage | Caught Pokemon grid |

---

## Data Fetching Strategy

### Paginated List (Infinite Scroll)
- `GET /pokemon?limit=20&offset=N` returns `{name, url}` pairs
- `useInfiniteQuery` manages pagination cursor via `next` URL
- IntersectionObserver on a sentinel div triggers `fetchNextPage()`
- `rootMargin: '200px'` for pre-fetching before user reaches bottom

### Pokemon Details (Per Card)
- Each `PokemonCard` calls `usePokemon(id)` to get sprite URL + types
- React Query deduplicates and caches — detail page gets instant data

### Search (Cache-First + API Fallback)
- First searches through already-cached Pokemon from infinite scroll (partial match)
- If no cached results, fetches exact name from API: `GET /pokemon/{name}`
- Result cached by React Query for future lookups
- Debounce: 300ms delay before searching

### Species Data (Detail Page Only)
- `GET /pokemon-species/{id}` for breeding info, genus, flavor text

---

## State Management

### Server State → React Query
- List pages: `staleTime: 5min`
- Pokemon detail: `staleTime: 10min`

### Client State → React Context + localStorage
- `CaughtPokemon[]` with `{id, name, spriteUrl, types}`
- Lazy useState initializer reads from localStorage on mount
- Synced to localStorage on every catch/release mutation

---

## Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Per-card detail fetching | Each PokemonCard calls `usePokemon(id)` | React Query caches mean detail page is instant |
| Search: cache-first | Filter loaded Pokemon, then API fallback | Avoids 78KB upfront fetch; PokeAPI has no partial search |
| IntersectionObserver | Over scroll events | More performant, cleaner API |
| CSS Grid over MUI Grid | Box with `display: grid` | Avoids MUI v6 Grid TypeScript issues, simpler |
| Minimal caught data | Store only `{id, name, sprite, types}` | Collection renders without API calls |
| No Redux/Zustand | Context + React Query | App scope doesn't justify additional state library |
