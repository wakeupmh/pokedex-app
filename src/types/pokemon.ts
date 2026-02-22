// PokeAPI response types (subset of what we actually use)

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export interface PokemonListItem {
  name: string
  url: string
}

export interface Pokemon {
  id: number
  name: string
  height: number // in decimeters
  weight: number // in hectograms
  sprites: PokemonSprites
  types: PokemonType[]
  stats: PokemonStat[]
  abilities: PokemonAbility[]
}

export interface PokemonSprites {
  front_default: string | null
  other: {
    'official-artwork': {
      front_default: string | null
    }
  }
}

export interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonStat {
  base_stat: number
  stat: {
    name: string
  }
}

export interface PokemonAbility {
  ability: {
    name: string
  }
  is_hidden: boolean
}

export interface PokemonSpecies {
  gender_rate: number // -1 = genderless, 0-8 = female eighths
  egg_groups: { name: string }[]
  hatch_counter: number
  genera: { genus: string; language: { name: string } }[]
  flavor_text_entries: {
    flavor_text: string
    language: { name: string }
    version: { name: string }
  }[]
}

// Client-side types

export interface CaughtPokemon {
  id: number
  name: string
  spriteUrl: string
  types: string[]
}
