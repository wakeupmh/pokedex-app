import { Box, Typography, LinearProgress } from '@mui/material'
import { formatStatName } from '../../utils/formatters'

interface StatBarProps {
  name: string
  value: number
  color?: string
}

export default function StatBar({ name, value, color = '#4CAF50' }: StatBarProps) {
  const maxStat = 255
  const percentage = Math.min((value / maxStat) * 100, 100)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ minWidth: 70, fontWeight: 500 }}
      >
        {formatStatName(name)}
      </Typography>
      <Typography variant="body2" sx={{ minWidth: 35, fontWeight: 600 }}>
        {value}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          flex: 1,
          height: 6,
          borderRadius: 3,
          backgroundColor: 'rgba(0,0,0,0.08)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 3,
            backgroundColor: color,
          },
        }}
      />
    </Box>
  )
}
