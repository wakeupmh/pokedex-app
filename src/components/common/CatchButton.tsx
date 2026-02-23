import { Button } from '@mui/material'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'

interface CatchButtonProps {
  isCaught: boolean
  onToggle: () => void
}

export default function CatchButton({ isCaught, onToggle }: CatchButtonProps) {
  return isCaught ? (
    <Button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onToggle()
      }}
      variant="outlined"
      startIcon={<CatchingPokemonIcon />}
      aria-label="Release Pokémon"
      sx={{
        borderColor: 'error.main',
        color: 'error.main',
        backgroundColor: 'error.50',
        borderRadius: 3,
        textTransform: 'none',
        fontWeight: 600,
        '&:hover': {
          backgroundColor: 'error.100',
          borderColor: 'error.dark',
        },
      }}
    >
      Release
    </Button>
  ) : (
    <Button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onToggle()
      }}
      variant="contained"
      startIcon={<CatchingPokemonIcon />}
      aria-label="Catch Pokémon"
      sx={{
        backgroundColor: '#7B1D2A',
        borderRadius: 3,
        textTransform: 'none',
        fontWeight: 600,
        '&:hover': {
          backgroundColor: '#5e1520',
        },
      }}
    >
      Catch!
    </Button>
  )
}
