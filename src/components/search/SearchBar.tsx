import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <TextField
      fullWidth
      placeholder="Search Pokemon..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      size="small"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        mb: 3,
        '& .MuiOutlinedInput-root': {
          borderRadius: 3,
          backgroundColor: '#fff',
        },
      }}
    />
  )
}
