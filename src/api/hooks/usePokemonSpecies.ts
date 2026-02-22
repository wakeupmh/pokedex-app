import { useQuery } from '@tanstack/react-query'
import { fetchPokemonSpecies } from '../pokeApi'
import { pokemonKeys } from '../queryKeys'

export function usePokemonSpecies(id: number) {
  return useQuery({
    queryKey: pokemonKeys.species(id),
    queryFn: () => fetchPokemonSpecies(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  })
}
