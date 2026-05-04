import { describe, expect, it } from 'bun:test'

import { pickIndex, pickN, pickNIndexes } from '~/lib/generation/pickers'

describe('pickIndex', () => {
  it('returns an integer in [0, bankSize) over 1000 samples', () => {
    for (let i = 0; i < 1000; i++) {
      const idx = pickIndex(10)

      expect(idx).toBeGreaterThanOrEqual(0)
      expect(idx).toBeLessThan(10)
      expect(Number.isInteger(idx)).toBe(true)
    }
  })
})

describe('pickN', () => {
  it('returns n distinct elements from the bank', () => {
    const bank = ['a', 'b', 'c', 'd', 'e']

    for (let i = 0; i < 100; i++) {
      const picks = pickN(bank, 3)

      expect(picks).toHaveLength(3)
      expect(new Set(picks).size).toBe(3)
      for (const p of picks) {
        expect(bank).toContain(p)
      }
    }
  })

  it('throws when n exceeds bank size', () => {
    expect(() => pickN(['a', 'b'], 3)).toThrow()
  })
})

describe('pickNIndexes', () => {
  it('returns n distinct indexes within [0, bankSize)', () => {
    for (let i = 0; i < 100; i++) {
      const indexes = pickNIndexes(10, 5)

      expect(indexes).toHaveLength(5)
      expect(new Set(indexes).size).toBe(5)
      for (const idx of indexes) {
        expect(idx).toBeGreaterThanOrEqual(0)
        expect(idx).toBeLessThan(10)
        expect(Number.isInteger(idx)).toBe(true)
      }
    }
  })

  it('throws when n exceeds bank size', () => {
    expect(() => pickNIndexes(2, 3)).toThrow()
  })
})
