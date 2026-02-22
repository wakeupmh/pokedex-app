export const pokemonKeys = {
  all: ['pokemon'] as const,
  lists: () => [...pokemonKeys.all, 'list'] as const,
  list: (offset: number) => [...pokemonKeys.lists(), offset] as const,
  details: () => [...pokemonKeys.all, 'detail'] as const,
  detail: (id: number | string) => [...pokemonKeys.details(), id] as const,
  species: (id: number) => [...pokemonKeys.all, 'species', id] as const,
}
