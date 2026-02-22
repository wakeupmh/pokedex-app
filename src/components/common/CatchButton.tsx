import { IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

interface CatchButtonProps {
  isCaught: boolean
  onToggle: () => void
  size?: 'small' | 'medium' | 'large'
}

export default function CatchButton({ isCaught, onToggle, size = 'medium' }: CatchButtonProps) {
  return (
    <IconButton
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onToggle()
      }}
      color="error"
      size={size}
      aria-label={isCaught ? 'Release Pokemon' : 'Catch Pokemon'}
    >
      {isCaught ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  )
}
