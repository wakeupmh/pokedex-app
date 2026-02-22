import { useQuery } from '@tanstack/react-query'
import { fetchPokemon } from '../pokeApi'
import { pokemonKeys } from '../queryKeys'
import type { Pokemon } from '../../types/pokemon'

/**
 * Search for a Pokemon by exact name via the API.
 * Only fires when `name` is non-empty and no cached results were found.
 * The result is cached by React Query for future lookups.
 */
export function usePokemonSearch(name: string, enabled: boolean) {
  return useQuery<Pokemon, Error>({
    queryKey: pokemonKeys.detail(name.toLowerCase()),
    queryFn: () => fetchPokemon(name.toLowerCase()),
    enabled: enabled && name.length > 0,
    staleTime: 10 * 60 * 1000,
    retry: false, // Don't retry on 404 (name not found)
  })
}
