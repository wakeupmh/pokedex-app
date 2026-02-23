import type { Pokemon, PokemonSpecies, CaughtPokemon } from '../../types/pokemon'

export const mockPokemon: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    other: {
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      },
    },
  },
  types: [
    { slot: 1, type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } },
    { slot: 2, type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' } },
  ],
  stats: [
    { base_stat: 45, stat: { name: 'hp' } },
    { base_stat: 49, stat: { name: 'attack' } },
    { base_stat: 49, stat: { name: 'defense' } },
    { base_stat: 65, stat: { name: 'special-attack' } },
    { base_stat: 65, stat: { name: 'special-defense' } },
    { base_stat: 45, stat: { name: 'speed' } },
  ],
  abilities: [
    { ability: { name: 'overgrow' }, is_hidden: false },
    { ability: { name: 'chlorophyll' }, is_hidden: true },
  ],
}

export const mockSpecies: PokemonSpecies = {
  gender_rate: 1,
  egg_groups: [{ name: 'monster' }, { name: 'plant' }],
  hatch_counter: 20,
  genera: [
    { genus: 'Seed Pokémon', language: { name: 'en' } },
  ],
  flavor_text_entries: [
    {
      flavor_text: 'A strange seed was planted on its back at birth.',
      language: { name: 'en' },
      version: { name: 'red' },
    },
  ],
}

export const mockCaughtPokemon: CaughtPokemon = {
  id: 1,
  name: 'bulbasaur',
  spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  types: ['grass', 'poison'],
}
