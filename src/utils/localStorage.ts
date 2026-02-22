import type { CaughtPokemon } from '../types/pokemon'

const CAUGHT_KEY = 'pokedex-caught-pokemon'

export function getCaughtPokemon(): CaughtPokemon[] {
  try {
    const raw = localStorage.getItem(CAUGHT_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function setCaughtPokemon(pokemon: CaughtPokemon[]): void {
  localStorage.setItem(CAUGHT_KEY, JSON.stringify(pokemon))
}
