import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme/theme'
import { CaughtPokemonProvider } from './context/CaughtPokemonContext'
import AppLayout from './components/layout/AppLayout'
import PokemonListPage from './pages/PokemonListPage'
import PokemonDetailPage from './pages/PokemonDetailPage'
import CollectionPage from './pages/CollectionPage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CaughtPokemonProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<PokemonListPage />} />
                <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
                <Route path="/collection" element={<CollectionPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CaughtPokemonProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
