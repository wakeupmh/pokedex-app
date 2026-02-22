import { useQuery } from '@tanstack/react-query'
import { fetchPokemon } from '../pokeApi'
import { pokemonKeys } from '../queryKeys'

export function usePokemon(id: number | string) {
  return useQuery({
    queryKey: pokemonKeys.detail(id),
    queryFn: () => fetchPokemon(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  })
}
