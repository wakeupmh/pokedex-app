import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { CaughtPokemon } from '../types/pokemon'
import { getCaughtPokemon, setCaughtPokemon as persistCaughtPokemon } from '../utils/localStorage'

interface CaughtPokemonContextValue {
  caughtPokemon: CaughtPokemon[]
  catchPokemon: (pokemon: CaughtPokemon) => void
  releasePokemon: (id: number) => void
  isCaught: (id: number) => boolean
}

const CaughtPokemonContext = createContext<CaughtPokemonContextValue | null>(null)

export function CaughtPokemonProvider({ children }: { children: ReactNode }) {
  const [caughtPokemon, setCaughtPokemon] = useState<CaughtPokemon[]>(getCaughtPokemon)

  useEffect(() => {
    persistCaughtPokemon(caughtPokemon)
  }, [caughtPokemon])

  const catchPokemon = useCallback((pokemon: CaughtPokemon) => {
    setCaughtPokemon((prev) => {
      if (prev.some((p) => p.id === pokemon.id)) return prev
      return [...prev, pokemon]
    })
  }, [])

  const releasePokemon = useCallback((id: number) => {
    setCaughtPokemon((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const isCaught = useCallback((id: number) => caughtPokemon.some((p) => p.id === id), [caughtPokemon])

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
