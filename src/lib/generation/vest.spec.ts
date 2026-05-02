import { describe, expect, it } from 'bun:test'

import { generateVest } from '~/lib/generation/vest'
import type { Vest } from '~/types/bank.types'

describe('generateVest', () => {
  it('only returns one of the three valid Vest values', () => {
    for (let i = 0; i < 1000; i++) {
      expect(['interim', 'embauche', 'responsable']).toContain(generateVest())
    }
  })

  it('roughly matches the 60/30/10 distribution over 10000 samples', () => {
    const counts: Record<Vest, number> = { interim: 0, embauche: 0, responsable: 0 }
    const N = 10000

    for (let i = 0; i < N; i++) {
      const k = generateVest()
      counts[k] = (counts[k] ?? 0) + 1
    }

    const ratio = (key: Vest): number => (counts[key] ?? 0) / N

    expect(ratio('embauche')).toBeGreaterThan(0.57)
    expect(ratio('embauche')).toBeLessThan(0.63)
    expect(ratio('interim')).toBeGreaterThan(0.27)
    expect(ratio('interim')).toBeLessThan(0.33)
    expect(ratio('responsable')).toBeGreaterThan(0.07)
    expect(ratio('responsable')).toBeLessThan(0.13)
  })
})
