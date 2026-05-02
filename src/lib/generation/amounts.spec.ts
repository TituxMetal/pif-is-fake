import { describe, expect, it } from 'bun:test'

import { decomposePrime, generateBasePrime, generateBonus } from '~/lib/generation/amounts'
import type { Bonus } from '~/types/roll.types'

describe('generateBasePrime', () => {
  it('returns an integer in [0, 200] over 1000 samples', () => {
    for (let i = 0; i < 1000; i++) {
      const p = generateBasePrime()

      expect(p).toBeGreaterThanOrEqual(0)
      expect(p).toBeLessThanOrEqual(200)
      expect(Number.isInteger(p)).toBe(true)
    }
  })
})

describe('decomposePrime', () => {
  it('returns three components summing to base', () => {
    for (let i = 0; i < 1000; i++) {
      const base = Math.floor(Math.random() * 201)
      const d = decomposePrime(base)

      expect(d.production + d.qualite + d.securite).toBe(base)
      expect(d.production).toBeGreaterThanOrEqual(0)
      expect(d.qualite).toBeGreaterThanOrEqual(0)
      expect(d.securite).toBeGreaterThanOrEqual(0)
    }
  })

  it('returns all zeros when base is 0', () => {
    expect(decomposePrime(0)).toEqual({ production: 0, qualite: 0, securite: 0 })
  })
})

describe('generateBonus', () => {
  it('only returns one of {0, 50, 100, 150}', () => {
    for (let i = 0; i < 1000; i++) {
      expect([0, 50, 100, 150]).toContain(generateBonus())
    }
  })

  it('roughly matches the 65/25/8/2 distribution over 10000 samples', () => {
    const counts: Record<Bonus, number> = { 0: 0, 50: 0, 100: 0, 150: 0 }
    const N = 10000

    for (let i = 0; i < N; i++) {
      const k = generateBonus()
      counts[k] = (counts[k] ?? 0) + 1
    }

    const ratio = (key: Bonus): number => (counts[key] ?? 0) / N

    expect(ratio(0)).toBeGreaterThan(0.62)
    expect(ratio(0)).toBeLessThan(0.68)
    expect(ratio(50)).toBeGreaterThan(0.22)
    expect(ratio(50)).toBeLessThan(0.28)
    expect(ratio(100)).toBeGreaterThan(0.06)
    expect(ratio(100)).toBeLessThan(0.1)
    expect(ratio(150)).toBeGreaterThan(0.01)
    expect(ratio(150)).toBeLessThan(0.04)
  })
})
