import { fetchPokemon } from '../pokeApi'
import { pokemonKeys } from '../queryKeys'
import { createDetailQuery } from './createPokemonQuery'

export const usePokemon = createDetailQuery(pokemonKeys.detail, fetchPokemon)
