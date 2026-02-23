export const pokemonKeys = {
  lists: () => ['pokemon', 'list'] as const,
  detail: (id: number | string) => ['pokemon', 'detail', id] as const,
  species: (id: number | string) => ['pokemon', 'species', id] as const,
}
