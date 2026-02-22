import { Chip } from '@mui/material'
import { getTypeColor } from '../../utils/typeColors'

interface TypeChipProps {
  type: string
}

export default function TypeChip({ type }: TypeChipProps) {
  return (
    <Chip
      label={type.charAt(0).toUpperCase() + type.slice(1)}
      size="small"
      sx={{
        backgroundColor: getTypeColor(type),
        color: '#fff',
        fontWeight: 600,
        fontSize: '0.7rem',
        height: 24,
      }}
    />
  )
}
