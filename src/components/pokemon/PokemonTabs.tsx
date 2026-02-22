import { useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import AboutTab from './AboutTab'
import BaseStatsTab from './BaseStatsTab'
import type { Pokemon, PokemonSpecies } from '../../types/pokemon'

interface PokemonTabsProps {
  pokemon: Pokemon
  species: PokemonSpecies | undefined
  typeColor: string
}

export default function PokemonTabs({ pokemon, species, typeColor }: PokemonTabsProps) {
  const [tab, setTab] = useState(0)

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        centered
        textColor="inherit"
        sx={{
          '& .MuiTabs-indicator': { backgroundColor: typeColor },
          '& .Mui-selected': { color: typeColor, fontWeight: 700 },
        }}
      >
        <Tab label="About" />
        <Tab label="Base Stats" />
      </Tabs>
      <Box sx={{ pt: 3 }}>
        {tab === 0 && <AboutTab pokemon={pokemon} species={species} />}
        {tab === 1 && <BaseStatsTab pokemon={pokemon} typeColor={typeColor} />}
      </Box>
    </Box>
  )
}
