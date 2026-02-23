import { describe, it, expect } from 'vitest'
import {
  formatPokemonId,
  formatHeight,
  formatWeight,
  capitalize,
  formatAbilityName,
  formatStatName,
  extractIdFromUrl,
} from './formatters'

describe('formatPokemonId', () => {
  it('pads single digit', () => expect(formatPokemonId(1)).toBe('#001'))
  it('pads double digit', () => expect(formatPokemonId(25)).toBe('#025'))
  it('keeps triple digit', () => expect(formatPokemonId(150)).toBe('#150'))
  it('handles 4+ digits', () => expect(formatPokemonId(1000)).toBe('#1000'))
})

describe('formatHeight', () => {
  it('converts decimeters to meters', () => expect(formatHeight(7)).toBe('0.7 m'))
  it('handles larger values', () => expect(formatHeight(20)).toBe('2.0 m'))
})

describe('formatWeight', () => {
  it('converts hectograms to kg', () => expect(formatWeight(69)).toBe('6.9 kg'))
  it('handles larger values', () => expect(formatWeight(1000)).toBe('100.0 kg'))
})

describe('capitalize', () => {
  it('capitalizes first letter', () => expect(capitalize('bulbasaur')).toBe('Bulbasaur'))
  it('handles single char', () => expect(capitalize('a')).toBe('A'))
})

describe('formatAbilityName', () => {
  it('formats hyphenated name', () => expect(formatAbilityName('solar-power')).toBe('Solar Power'))
  it('formats single word', () => expect(formatAbilityName('overgrow')).toBe('Overgrow'))
})

describe('formatStatName', () => {
  it('maps hp', () => expect(formatStatName('hp')).toBe('HP'))
  it('maps special-attack', () => expect(formatStatName('special-attack')).toBe('Sp. Atk'))
  it('maps special-defense', () => expect(formatStatName('special-defense')).toBe('Sp. Def'))
  it('returns unknown stats as-is', () => expect(formatStatName('unknown')).toBe('unknown'))
})

describe('extractIdFromUrl', () => {
  it('extracts ID from Pokemon URL', () =>
    expect(extractIdFromUrl('https://pokeapi.co/api/v2/pokemon/25/')).toBe(25))
  it('extracts ID without trailing slash', () =>
    expect(extractIdFromUrl('https://pokeapi.co/api/v2/pokemon/1')).toBe(1))
  it('returns 0 for invalid URL', () => expect(extractIdFromUrl('invalid')).toBe(0))
})
