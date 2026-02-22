import { Box, Typography } from '@mui/material'
import { useCaughtPokemon } from '../context/CaughtPokemonContext'
import PokemonGrid from '../components/pokemon/PokemonGrid'
import EmptyState from '../components/common/EmptyState'

export default function CollectionPage() {
  const { caughtPokemon } = useCaughtPokemon()

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        My Collection ({caughtPokemon.length})
      </Typography>

      {caughtPokemon.length === 0 ? (
        <EmptyState
          title="No Pokemon caught yet"
          description="Start exploring the Pokedex and catch your favorites!"
          showBrowseButton
        />
      ) : (
        <PokemonGrid
          pokemon={caughtPokemon.map((p) => ({ id: p.id, name: p.name }))}
        />
      )}
    </Box>
  )
}
