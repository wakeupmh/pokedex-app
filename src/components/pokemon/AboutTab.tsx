import { Box, Typography } from '@mui/material'
import type { Pokemon, PokemonSpecies } from '../../types/pokemon'
import { formatHeight, formatWeight, formatAbilityName } from '../../utils/formatters'

interface AboutTabProps {
  pokemon: Pokemon
  species: PokemonSpecies | undefined
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', mb: 1.5 }}>
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120, fontWeight: 500 }}>
        {label}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  )
}

export default function AboutTab({ pokemon, species }: AboutTabProps) {
  const genus = species?.genera.find((g) => g.language.name === 'en')?.genus ?? '—'

  const flavorText =
    species?.flavor_text_entries
      .find((e) => e.language.name === 'en')
      ?.flavor_text.replace(/[\n\f]/g, ' ') ?? ''

  const abilities = pokemon.abilities
    .map((a) => formatAbilityName(a.ability.name) + (a.is_hidden ? ' (Hidden)' : ''))
    .join(', ')

  const genderRate = species?.gender_rate
  let genderText = '—'
  if (genderRate !== undefined && genderRate !== -1) {
    const female = (genderRate / 8) * 100
    const male = 100 - female
    genderText = `${male}% Male, ${female}% Female`
  } else if (genderRate === -1) {
    genderText = 'Genderless'
  }

  const eggGroups = species?.egg_groups.map((g) => g.name).join(', ') ?? '—'
  const eggCycles = species?.hatch_counter?.toString() ?? '—'

  return (
    <Box>
      {flavorText && (
        <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.6 }}>
          {flavorText}
        </Typography>
      )}
      <InfoRow label="Species" value={genus} />
      <InfoRow label="Height" value={formatHeight(pokemon.height)} />
      <InfoRow label="Weight" value={formatWeight(pokemon.weight)} />
      <InfoRow label="Abilities" value={abilities} />

      <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5, fontWeight: 700 }}>
        Breeding
      </Typography>
      <InfoRow label="Gender" value={genderText} />
      <InfoRow label="Egg Groups" value={eggGroups} />
      <InfoRow label="Egg Cycles" value={eggCycles} />
    </Box>
  )
}
