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

  it('respects a forced (valid) sigle', () => {
    const roll = composeRoll({ prenom: 'Test', sigle: 'XYZ' })

    expect(roll.sigle).toBe('XYZ')
  })

  it('uppercases a forced sigle given in lowercase', () => {
    const roll = composeRoll({ prenom: 'Test', sigle: 'xyz' })

    expect(roll.sigle).toBe('XYZ')
  })

  it('falls back to a generated sigle when the forced sigle is invalid', () => {
    const roll = composeRoll({ prenom: 'Test', sigle: 'AAA' })

    expect(roll.sigle).not.toBe('AAA')
    expect(roll.sigle).toMatch(/^[A-Z]{3}$/)
  })

  it('respects a forced vest', () => {
    const roll = composeRoll({ prenom: 'Test', vest: 'responsable' })

    expect(roll.vest).toBe('responsable')
  })
})
