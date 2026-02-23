import { Card, CardActionArea, CardContent, Typography, Box, Skeleton, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { usePokemon } from '../../api/hooks/usePokemon'
import { useCaughtPokemon } from '../../context/CaughtPokemonContext'
import { getTypeColor } from '../../utils/typeColors'
import { capitalize, formatPokemonId } from '../../utils/formatters'
import TypeChip from './TypeChip'

interface PokemonCardProps {
  id: number
  name: string
}

export default function PokemonCard({ id, name }: PokemonCardProps) {
  // The PokeAPI list endpoint returns only { name, url } — no sprite or types.
  // PokemonGrid therefore has no preloaded detail data to pass down, so each
  // card must fetch its own detail. This is not a fixable N+1: it is an
  // inherent property of the API shape.
  //
  // Mitigation: usePokemon (via createDetailQuery) sets staleTime=10min so
  // React Query serves cached responses on revisit without a network round-trip.
  // React Query also deduplicates concurrent requests, so parallel card mounts
  // produce at most one in-flight fetch per unique Pokemon id.
  const { data: pokemon, isLoading } = usePokemon(id)
  const { isCaught } = useCaughtPokemon()
  const caught = isCaught(id)

  const primaryType = pokemon?.types[0]?.type.name ?? 'normal'
  const bgColor = getTypeColor(primaryType)

  if (isLoading) {
    return (
      <Card sx={{ borderRadius: 3 }}>
        <Skeleton variant="rectangular" height={180} />
        <CardContent>
          <Skeleton width="60%" />
          <Skeleton width="40%" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardActionArea component={Link} to={`/pokemon/${id}`}>
        <Box
          sx={{
            background: `linear-gradient(135deg, ${bgColor}CC, ${bgColor}99)`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
            height: 160,
            position: 'relative',
          }}
        >
          {caught && (
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                left: 10,
                width: 22,
                height: 22,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Pokeball icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#e53935" strokeWidth="2.5" fill="white" />
                <path d="M2 12h20" stroke="#e53935" strokeWidth="2.5" />
                <circle cx="12" cy="12" r="3" fill="#e53935" />
                <circle cx="12" cy="12" r="1.5" fill="white" />
              </svg>
            </Box>
          )}
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              top: 8,
              right: 12,
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 700,
              fontSize: '0.85rem',
            }}
          >
            {formatPokemonId(id)}
          </Typography>
          {pokemon?.sprites.front_default && (
            <Box
              component="img"
              src={pokemon.sprites.front_default}
              alt={name}
              sx={{ width: 100, height: 100, imageRendering: 'pixelated' }}
            />
          )}
        </Box>
        <CardContent sx={{ pb: '12px !important' }}>
          <Typography variant="subtitle1" fontWeight={700}>
            {capitalize(name)}
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
            {pokemon?.types.map((t) => (
              <TypeChip key={t.type.name} type={t.type.name} />
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
