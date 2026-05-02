import { describe, expect, it } from 'bun:test'

import { composeRoll } from '~/lib/generation/roll'
import { decodeRollHash, encodeRollHash } from '~/lib/hash/codec'

describe('encodeRollHash', () => {
  it('returns a 6-char base62 string', () => {
    const roll = composeRoll({ prenom: 'X' })
    const hash = encodeRollHash(roll)

    expect(hash).toHaveLength(6)
    expect(hash).toMatch(/^[0-9A-Za-z]{6}$/)
  })
})

describe('decodeRollHash', () => {
  it('returns null on wrong length', () => {
    expect(decodeRollHash('abc')).toBeNull()
    expect(decodeRollHash('abcdefg')).toBeNull()
    expect(decodeRollHash('')).toBeNull()
  })

  it('returns null on invalid base62 chars', () => {
    expect(decodeRollHash('aaa+aa')).toBeNull()
    expect(decodeRollHash('aaa@aa')).toBeNull()
    expect(decodeRollHash('aaa-aa')).toBeNull()
  })

  it('returns null for the reserved vest code (binary 11)', () => {
    // packed = vestCode 3 << 7 = 384, all other fields 0 → base62 '00006C'
    expect(decodeRollHash('00006C')).toBeNull()
  })
})

describe('encode / decode round-trip', () => {
  it('preserves all encoded fields over 100 random rolls', () => {
    for (let i = 0; i < 100; i++) {
      const roll = composeRoll({ prenom: 'X' })
      const hash = encodeRollHash(roll)
      const decoded = decodeRollHash(hash)

      expect(decoded).not.toBeNull()
      expect(decoded?.decomposition).toEqual(roll.decomposition)
      expect(decoded?.bonus).toBe(roll.bonus)
      expect(decoded?.vest).toBe(roll.vest)
      expect(decoded?.motifIndex).toBe(roll.motifIndex)
    }
  })
})
