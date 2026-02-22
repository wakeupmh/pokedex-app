import { Box, Typography, Button } from '@mui/material'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'
import { Link } from 'react-router-dom'

interface EmptyStateProps {
  title: string
  description?: string
  showBrowseButton?: boolean
}

export default function EmptyState({ title, description, showBrowseButton }: EmptyStateProps) {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <CatchingPokemonIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {description}
        </Typography>
      )}
      {showBrowseButton && (
        <Button component={Link} to="/" variant="contained">
          Browse Pokedex
        </Button>
      )}
    </Box>
  )
}
