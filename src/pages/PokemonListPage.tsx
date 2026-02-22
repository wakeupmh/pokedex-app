import { useState, useMemo } from 'react'
import { Box } from '@mui/material'
import { usePokemonList } from '../api/hooks/usePokemonList'
import { usePokemonSearch } from '../api/hooks/usePokemonSearch'
import { useDebounce } from '../hooks/useDebounce'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { extractIdFromUrl } from '../utils/formatters'
import PokemonGrid from '../components/pokemon/PokemonGrid'
import SearchBar from '../components/search/SearchBar'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'
import EmptyState from '../components/common/EmptyState'

export default function PokemonListPage() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)

  const isSearching = debouncedSearch.length > 0

  // Infinite scroll mode
  const {
    data: listData,
    isLoading: listLoading,
    isError: listError,
    refetch: refetchList,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = usePokemonList()

  const sentinelRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage })

  // Build full list from loaded pages
  const listPokemon = useMemo(() => {
    if (!listData) return []
    return listData.pages.flatMap((page) =>
      page.results.map((p) => ({ id: extractIdFromUrl(p.url), name: p.name })),
    )
  }, [listData])

  // Search: first filter cached Pokemon (partial match)
  const cachedResults = useMemo(() => {
    if (!isSearching) return []
    const query = debouncedSearch.toLowerCase()
    return listPokemon.filter((p) => p.name.includes(query))
  }, [debouncedSearch, listPokemon, isSearching])

  // Search: if no cached results, try API with exact name
  const shouldSearchApi = isSearching && cachedResults.length === 0
  const {
    data: apiResult,
    isLoading: apiSearching,
    isError: apiError,
  } = usePokemonSearch(debouncedSearch, shouldSearchApi)

  // Combine results
  const searchResults = useMemo(() => {
    if (cachedResults.length > 0) return cachedResults
    if (apiResult) return [{ id: apiResult.id, name: apiResult.name }]
    return []
  }, [cachedResults, apiResult])

  const pokemon = isSearching ? searchResults : listPokemon

  const showEmpty = isSearching && !apiSearching && searchResults.length === 0

  return (
    <Box>
      <SearchBar value={search} onChange={setSearch} />

      {listLoading && !isSearching && <LoadingSpinner />}
      {listError && !isSearching && <ErrorMessage onRetry={refetchList} />}

      {apiSearching && <LoadingSpinner />}

      {showEmpty && !apiError && (
        <EmptyState
          title="No Pokemon found"
          description={`No results for "${debouncedSearch}". Try an exact Pokemon name.`}
        />
      )}

      {pokemon.length > 0 && <PokemonGrid pokemon={pokemon} />}

      {!isSearching && (
        <Box ref={sentinelRef} sx={{ py: 4 }}>
          {isFetchingNextPage && <LoadingSpinner />}
        </Box>
      )}
    </Box>
  )
}
