import { Card, CardActionArea, CardContent, Typography, Box, Skeleton, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { usePokemon } from '../../api/hooks/usePokemon'
import { getTypeColor } from '../../utils/typeColors'
import { capitalize, formatPokemonId } from '../../utils/formatters'
import TypeChip from './TypeChip'

interface PokemonCardProps {
  id: number
  name: string
}

export default function PokemonCard({ id, name }: PokemonCardProps) {
  const { data: pokemon, isLoading } = usePokemon(id)

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
