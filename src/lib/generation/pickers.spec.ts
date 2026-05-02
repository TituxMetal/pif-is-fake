import { describe, expect, it } from 'bun:test'

import { pickIndex, pickN } from '~/lib/generation/pickers'

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
