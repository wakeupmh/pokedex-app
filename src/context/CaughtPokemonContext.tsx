import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { CaughtPokemon } from '../types/pokemon'
import { getCaughtPokemon, setCaughtPokemon } from '../utils/localStorage'

interface CaughtPokemonContextValue {
  caughtPokemon: CaughtPokemon[]
  catchPokemon: (pokemon: CaughtPokemon) => void
  releasePokemon: (id: number) => void
  isCaught: (id: number) => boolean
}

const CaughtPokemonContext = createContext<CaughtPokemonContextValue | null>(null)

export function CaughtPokemonProvider({ children }: { children: ReactNode }) {
  const [caughtPokemon, setCaughtState] = useState<CaughtPokemon[]>(getCaughtPokemon)

  const updateCaught = useCallback((next: CaughtPokemon[]) => {
    setCaughtPokemon(next)
    setCaughtState(next)
  }, [])

  const catchPokemon = useCallback((pokemon: CaughtPokemon) => {
    setCaughtState((prev) => {
      if (prev.some((p) => p.id === pokemon.id)) return prev
      const next = [...prev, pokemon]
      updateCaught(next)
      return next
    })
  }, [updateCaught])

  const releasePokemon = useCallback((id: number) => {
    setCaughtState((prev) => {
      const next = prev.filter((p) => p.id !== id)
      updateCaught(next)
      return next
    })
  }, [updateCaught])

  const isCaught = useCallback(
    (id: number) => caughtPokemon.some((p) => p.id === id),
    [caughtPokemon],
  )

  return (
    <CaughtPokemonContext.Provider value={{ caughtPokemon, catchPokemon, releasePokemon, isCaught }}>
      {children}
    </CaughtPokemonContext.Provider>
  )
}

export function useCaughtPokemon() {
  const context = useContext(CaughtPokemonContext)
  if (!context) {
    throw new Error('useCaughtPokemon must be used within a CaughtPokemonProvider')
  }
  return context
}
