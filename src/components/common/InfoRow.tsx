import { Box, Typography } from '@mui/material'

interface InfoRowProps {
  label: string
  value: string
}

export default function InfoRow({ label, value }: InfoRowProps) {
  return (
    <Box sx={{ display: 'flex', mb: 1.5 }}>
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120, fontWeight: 500 }}>
        {label}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  )
}
