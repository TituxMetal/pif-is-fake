import { describe, expect, it } from 'bun:test'

import { motifs } from '~/lib/banks'
import { composeRoll } from '~/lib/generation/roll'

describe('composeRoll', () => {
  it('returns a complete Roll with all fields populated', () => {
    const roll = composeRoll({ prenom: 'Test' })

    expect(roll.prenom).toBe('Test')
    expect(roll.sigle).toMatch(/^[A-Z]{3}$/)
    expect(
      roll.decomposition.production + roll.decomposition.qualite + roll.decomposition.securite
    ).toBeGreaterThanOrEqual(0)
    expect([0, 50, 100, 150]).toContain(roll.bonus)
    expect(['interim', 'embauche', 'responsable']).toContain(roll.vest)
    expect(roll.motifIndex).toBeGreaterThanOrEqual(0)
    expect(roll.motifIndex).toBeLessThan(motifs.length)
  })

  it('respects a forced sigle', () => {
    const roll = composeRoll({ prenom: 'Test', sigle: 'XYZ' })

    expect(roll.sigle).toBe('XYZ')
  })

  it('respects a forced vest', () => {
    const roll = composeRoll({ prenom: 'Test', vest: 'responsable' })

    expect(roll.vest).toBe('responsable')
  })
})
