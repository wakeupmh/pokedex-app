import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CaughtPokemonProvider, useCaughtPokemon } from './CaughtPokemonContext'
import { mockCaughtPokemon } from '../test/mocks/pokemonData'
import type { ReactNode } from 'react'

const STORAGE_KEY = 'pokedex-caught-pokemon'

const wrapper = ({ children }: { children: ReactNode }) => (
  <CaughtPokemonProvider>{children}</CaughtPokemonProvider>
)

// Mock localStorage since jsdom's implementation can be incomplete
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    removeItem: vi.fn((key: string) => { delete store[key] }),
    clear: vi.fn(() => { store = {} }),
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

beforeEach(() => {
  localStorageMock.clear()
  vi.clearAllMocks()
})

describe('CaughtPokemonContext', () => {
  it('starts with empty collection', () => {
    const { result } = renderHook(() => useCaughtPokemon(), { wrapper })
    expect(result.current.caughtPokemon).toEqual([])
  })

  it('catches a Pokemon', () => {
    const { result } = renderHook(() => useCaughtPokemon(), { wrapper })

    act(() => result.current.catchPokemon(mockCaughtPokemon))

    expect(result.current.caughtPokemon).toHaveLength(1)
    expect(result.current.isCaught(1)).toBe(true)
  })

  it('does not catch duplicates', () => {
    const { result } = renderHook(() => useCaughtPokemon(), { wrapper })

    act(() => result.current.catchPokemon(mockCaughtPokemon))
    act(() => result.current.catchPokemon(mockCaughtPokemon))

    expect(result.current.caughtPokemon).toHaveLength(1)
  })

  it('releases a Pokemon', () => {
    const { result } = renderHook(() => useCaughtPokemon(), { wrapper })

    act(() => result.current.catchPokemon(mockCaughtPokemon))
    act(() => result.current.releasePokemon(1))

    expect(result.current.caughtPokemon).toHaveLength(0)
    expect(result.current.isCaught(1)).toBe(false)
  })

  it('persists to localStorage', () => {
    const { result } = renderHook(() => useCaughtPokemon(), { wrapper })

    act(() => result.current.catchPokemon(mockCaughtPokemon))

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      STORAGE_KEY,
      expect.stringContaining('bulbasaur'),
    )
  })

  it('loads from localStorage on mount', () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([mockCaughtPokemon]))

    const { result } = renderHook(() => useCaughtPokemon(), { wrapper })
    expect(result.current.caughtPokemon).toHaveLength(1)
    expect(result.current.isCaught(1)).toBe(true)
  })

  it('throws when used outside provider', () => {
    expect(() => {
      renderHook(() => useCaughtPokemon())
    }).toThrow('useCaughtPokemon must be used within a CaughtPokemonProvider')
  })
})
