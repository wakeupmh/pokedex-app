import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchPokemonList } from '../pokeApi'
import { pokemonKeys } from '../queryKeys'

const PAGE_SIZE = 20

export function usePokemonList() {
  return useInfiniteQuery({
    queryKey: pokemonKeys.lists(),
    queryFn: ({ pageParam = 0 }) => fetchPokemonList(pageParam, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined
      const url = new URL(lastPage.next)
      return Number(url.searchParams.get('offset'))
    },
    staleTime: 5 * 60 * 1000,
  })
}
