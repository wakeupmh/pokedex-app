import type { Pokemon, PokemonListResponse, PokemonSpecies } from '../types/pokemon'

const BASE_URL = 'https://pokeapi.co/api/v2'

export async function fetchPokemonList(offset = 0, limit = 20): Promise<PokemonListResponse> {
  const res = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`)
  if (!res.ok) throw new Error('Failed to fetch Pokemon list')
  return res.json()
}

export async function fetchPokemon(idOrName: number | string): Promise<Pokemon> {
  const res = await fetch(`${BASE_URL}/pokemon/${idOrName}`)
  if (!res.ok) throw new Error(`Failed to fetch Pokemon: ${idOrName}`)
  return res.json()
}

export async function fetchPokemonSpecies(id: number): Promise<PokemonSpecies> {
  const res = await fetch(`${BASE_URL}/pokemon-species/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch species: ${id}`)
  return res.json()
}

export async function fetchAllPokemonNames(): Promise<{ name: string; url: string }[]> {
  const res = await fetch(`${BASE_URL}/pokemon?limit=1500`)
  if (!res.ok) throw new Error('Failed to fetch Pokemon names')
  const data: PokemonListResponse = await res.json()
  return data.results
}
