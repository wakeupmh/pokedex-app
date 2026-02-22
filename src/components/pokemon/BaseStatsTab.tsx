import { Box, Typography } from '@mui/material'
import type { Pokemon } from '../../types/pokemon'
import StatBar from './StatBar'

interface BaseStatsTabProps {
  pokemon: Pokemon
  typeColor: string
}

export default function BaseStatsTab({ pokemon, typeColor }: BaseStatsTabProps) {
  const total = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0)

  return (
    <Box>
      {pokemon.stats.map((stat) => (
        <StatBar
          key={stat.stat.name}
          name={stat.stat.name}
          value={stat.base_stat}
          color={typeColor}
        />
      ))}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, pt: 1, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <Typography variant="body2" color="text.secondary" sx={{ minWidth: 70, fontWeight: 700 }}>
          Total
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {total}
        </Typography>
      </Box>
    </Box>
  )
}
