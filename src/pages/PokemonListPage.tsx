import { useState, useMemo } from 'react'
import { Box } from '@mui/material'
import { usePokemonList } from '../api/hooks/usePokemonList'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { usePokemonSearchLogic } from '../hooks/usePokemonSearchLogic'
import { extractIdFromUrl } from '../utils/formatters'
import PokemonGrid from '../components/pokemon/PokemonGrid'
import SearchBar from '../components/search/SearchBar'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'
import EmptyState from '../components/common/EmptyState'

export default function PokemonListPage() {
  const [search, setSearch] = useState('')

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

  const {
    results: searchResults,
    isSearching,
    isLoading: apiSearching,
    isError: apiError,
    debouncedSearch,
  } = usePokemonSearchLogic(search, listPokemon)

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
