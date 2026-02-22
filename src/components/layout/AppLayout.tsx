import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function AppLayout() {
  const location = useLocation()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky">
        <Toolbar>
          <CatchingPokemonIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none', fontWeight: 700 }}
          >
            Pokedex
          </Typography>
          <Button
            component={Link}
            to="/"
            color="inherit"
            sx={{ fontWeight: location.pathname === '/' ? 700 : 400 }}
          >
            Browse
          </Button>
          <Button
            component={Link}
            to="/collection"
            color="inherit"
            startIcon={<FavoriteIcon />}
            sx={{ fontWeight: location.pathname === '/collection' ? 700 : 400 }}
          >
            Collection
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ flex: 1, py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  )
}
