import { useMemo } from 'react'
import { useDebounce } from './useDebounce'
import { usePokemonSearch } from '../api/hooks/usePokemonSearch'

export interface PokemonSummary {
  id: number
  name: string
}

export function usePokemonSearchLogic(search: string, allPokemon: PokemonSummary[]) {
  const debouncedSearch = useDebounce(search)

  const isSearching = debouncedSearch.length > 0

  // Search: first filter cached Pokemon (partial match)
  const cachedResults = useMemo(() => {
    if (!isSearching) return []
    const query = debouncedSearch.toLowerCase()
    return allPokemon.filter((p) => p.name.includes(query))
  }, [debouncedSearch, allPokemon, isSearching])

  // Search: if no cached results, try API with exact name
  const shouldSearchApi = isSearching && cachedResults.length === 0
  const {
    data: apiResult,
    isLoading: apiSearching,
    isError: apiError,
  } = usePokemonSearch(debouncedSearch, shouldSearchApi)

  // Combine results
  const results = useMemo(() => {
    if (cachedResults.length > 0) return cachedResults
    if (apiResult) return [{ id: apiResult.id, name: apiResult.name }]
    return []
  }, [cachedResults, apiResult])

  return {
    results,
    isSearching,
    isLoading: apiSearching,
    isError: apiError,
    debouncedSearch,
  }
}
