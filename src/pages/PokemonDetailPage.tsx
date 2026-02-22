import { Box, Typography, IconButton, Stack, Paper } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useParams, useNavigate } from 'react-router-dom'
import { usePokemon } from '../api/hooks/usePokemon'
import { usePokemonSpecies } from '../api/hooks/usePokemonSpecies'
import { useCaughtPokemon } from '../context/CaughtPokemonContext'
import { getTypeColor } from '../utils/typeColors'
import { capitalize, formatPokemonId } from '../utils/formatters'
import TypeChip from '../components/pokemon/TypeChip'
import PokemonTabs from '../components/pokemon/PokemonTabs'
import CatchButton from '../components/common/CatchButton'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'

export default function PokemonDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const numericId = Number(id)

  const { data: pokemon, isLoading, isError, refetch } = usePokemon(numericId)
  const { data: species } = usePokemonSpecies(numericId)
  const { isCaught, catchPokemon, releasePokemon } = useCaughtPokemon()

  if (isLoading) return <LoadingSpinner />
  if (isError || !pokemon) return <ErrorMessage onRetry={refetch} />

  const primaryType = pokemon.types[0]?.type.name ?? 'normal'
  const typeColor = getTypeColor(primaryType)
  const caught = isCaught(numericId)

  const artworkUrl =
    pokemon.sprites.other['official-artwork'].front_default ?? pokemon.sprites.front_default

  const handleToggleCatch = () => {
    if (caught) {
      releasePokemon(numericId)
    } else {
      catchPokemon({
        id: numericId,
        name: pokemon.name,
        spriteUrl: pokemon.sprites.front_default ?? '',
        types: pokemon.types.map((t) => t.type.name),
      })
    }
  }

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      {/* Colored header */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${typeColor}, ${typeColor}BB)`,
          borderRadius: 4,
          p: 3,
          pb: 10,
          position: 'relative',
          mb: -6,
        }}
      >
        {/* Top bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ color: '#fff' }}>
            <ArrowBackIcon />
          </IconButton>
          <CatchButton isCaught={caught} onToggle={handleToggleCatch} size="large" />
        </Box>

        {/* Name + ID */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>
            {capitalize(pokemon.name)}
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>
            {formatPokemonId(numericId)}
          </Typography>
        </Box>

        {/* Type chips */}
        <Stack direction="row" spacing={1}>
          {pokemon.types.map((t) => (
            <TypeChip key={t.type.name} type={t.type.name} />
          ))}
        </Stack>

        {/* Artwork */}
        {artworkUrl && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Box
              component="img"
              src={artworkUrl}
              alt={pokemon.name}
              sx={{ width: 200, height: 200, objectFit: 'contain' }}
            />
          </Box>
        )}
      </Box>

      {/* White card with tabs */}
      <Paper sx={{ borderRadius: 4, p: 3, position: 'relative', zIndex: 1 }}>
        <PokemonTabs pokemon={pokemon} species={species} typeColor={typeColor} />
      </Paper>
    </Box>
  )
}
