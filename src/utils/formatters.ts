/** Pad Pokemon ID to 3 digits: 1 → "#001" */
export function formatPokemonId(id: number): string {
  return `#${String(id).padStart(3, '0')}`
}

/** Convert decimeters to meters: 7 → "0.7 m" */
export function formatHeight(decimeters: number): string {
  return `${(decimeters / 10).toFixed(1)} m`
}

/** Convert hectograms to kilograms: 69 → "6.9 kg" */
export function formatWeight(hectograms: number): string {
  return `${(hectograms / 10).toFixed(1)} kg`
}

/** Capitalize first letter: "bulbasaur" → "Bulbasaur" */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/** Format ability name: "solar-power" → "Solar Power" */
export function formatAbilityName(name: string): string {
  return name
    .split('-')
    .map(capitalize)
    .join(' ')
}

/** Format stat name: "special-attack" → "Sp. Atk" */
export function formatStatName(name: string): string {
  const statMap: Record<string, string> = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
  }
  return statMap[name] ?? name
}

/** Extract Pokemon ID from PokeAPI URL */
export function extractIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/)
  return match ? parseInt(match[1], 10) : 0
}
