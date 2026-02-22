import { useQuery } from '@tanstack/react-query'
import { fetchAllPokemonNames } from '../pokeApi'
import { pokemonKeys } from '../queryKeys'

export function useAllPokemonNames() {
  return useQuery({
    queryKey: pokemonKeys.allNames(),
    queryFn: fetchAllPokemonNames,
    staleTime: 30 * 60 * 1000,
  })
}
