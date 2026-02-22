import { Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

export default function PokemonDetailPage() {
  const { id } = useParams<{ id: string }>()
  return <Typography variant="h4">Pokemon #{id} (coming soon)</Typography>
}
