import { describe, expect, it } from 'bun:test'

import { generateSigle } from '~/lib/generation/sigle'

describe('generateSigle', () => {
  it('returns a 3-letter uppercase string', () => {
    const sigle = generateSigle()

    expect(sigle).toMatch(/^[A-Z]{3}$/)
  })

  it('never produces an identical triple over 1000 samples', () => {
    for (let i = 0; i < 1000; i++) {
      const sigle = generateSigle()
      const isTriple = sigle[0] === sigle[1] && sigle[1] === sigle[2]

      expect(isTriple).toBe(false)
    }
  })

  it('never produces consecutive identical letters over 1000 samples', () => {
    for (let i = 0; i < 1000; i++) {
      const sigle = generateSigle()

      expect(sigle[0] === sigle[1]).toBe(false)
      expect(sigle[1] === sigle[2]).toBe(false)
    }
  })
})
