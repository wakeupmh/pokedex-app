import { Box } from '@mui/material'
import PokemonCard from './PokemonCard'

interface PokemonGridProps {
  pokemon: { id: number; name: string }[]
}

export default function PokemonGrid({ pokemon }: PokemonGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
        },
        gap: 2,
      }}
    >
      {pokemon.map((p) => (
        <PokemonCard key={p.id} id={p.id} name={p.name} />
      ))}
    </Box>
  )
}
