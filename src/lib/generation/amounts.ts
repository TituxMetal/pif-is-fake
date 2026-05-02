import type { Bonus, Decomposition } from '~/types/roll.types'

const MAX_BASE_PRIME = 200

export const generateBasePrime = (): number => {
  return Math.floor(Math.random() * (MAX_BASE_PRIME + 1))
}

export const decomposePrime = (base: number): Decomposition => {
  if (base === 0) return { production: 0, qualite: 0, securite: 0 }

  const cut1 = Math.floor(Math.random() * (base + 1))
  const cut2 = Math.floor(Math.random() * (base + 1))
  const low = Math.min(cut1, cut2)
  const high = Math.max(cut1, cut2)

  return {
    production: low,
    qualite: high - low,
    securite: base - high
  }
}

export const generateBonus = (): Bonus => {
  const r = Math.random()

  if (r < 0.65) return 0
  if (r < 0.9) return 50
  if (r < 0.98) return 100

  return 150
}
