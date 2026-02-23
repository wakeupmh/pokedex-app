import { fetchPokemonSpecies } from '../pokeApi'
import { pokemonKeys } from '../queryKeys'
import { createDetailQuery } from './createPokemonQuery'

export const usePokemonSpecies = createDetailQuery(pokemonKeys.species, fetchPokemonSpecies)
