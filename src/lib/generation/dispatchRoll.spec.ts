import { describe, expect, it } from 'bun:test'

import { colleagues } from '~/lib/banks/colleagues'
import { composeDispatchView } from '~/lib/generation/dispatchRoll'

describe('composeDispatchView', () => {
  it('produces one card per real colleague when no interim count is given', () => {
    const view = composeDispatchView({ sigle: 'GIT' })

    expect(view.cards).toHaveLength(colleagues.length)
  })

  it('appends N fictional intérim cards when interimCount > 0', () => {
    const view = composeDispatchView({ sigle: 'GIT', interimCount: 5 })

    expect(view.cards).toHaveLength(colleagues.length + 5)
  })

  it('shares the same sigle across every card', () => {
    const view = composeDispatchView({ sigle: 'XPO', interimCount: 3 })

    for (const card of view.cards) {
      expect(card.sigle).toBe('XPO')
    }
  })

  it('preserves each real colleague vest and name (no random reassignment)', () => {
    const view = composeDispatchView({ sigle: 'GIT' })
    const realByName = new Map(colleagues.map((colleague) => [colleague.name, colleague.vest]))

    for (const card of view.cards) {
      const expectedVest = realByName.get(card.prenom)
      if (expectedVest === undefined) continue
      expect(card.vest).toBe(expectedVest)
    }
  })

  it('marks every fictional intérim card with the interim vest', () => {
    const view = composeDispatchView({ sigle: 'GIT', interimCount: 8 })
    const fictional = view.cards.filter((card) => card.vest === 'interim')

    expect(fictional).toHaveLength(8)
    for (const card of fictional) {
      expect(card.vest).toBe('interim')
    }
  })

  it('keeps prime amounts within the bounds documented in MVP', () => {
    const view = composeDispatchView({ sigle: 'GIT', interimCount: 5 })

    for (const card of view.cards) {
      const total =
        card.decomposition.production +
        card.decomposition.qualite +
        card.decomposition.securite +
        card.bonus

      expect(total).toBeGreaterThanOrEqual(0)
      expect(total).toBeLessThanOrEqual(350)
    }
  })

  it('generates a sigle when none is provided', () => {
    const view = composeDispatchView()

    expect(view.sigle).toMatch(/^[A-Z]{3}$/)
  })

  it('assigns a unique motifIndex to every card (no duplicate motifs across the dispatch)', () => {
    for (let attempt = 0; attempt < 50; attempt++) {
      const view = composeDispatchView({ sigle: 'GIT', interimCount: 20 })
      const motifIndexes = view.cards.map((card) => card.motifIndex)

      expect(new Set(motifIndexes).size).toBe(motifIndexes.length)
    }
  })

  it('shuffles cards (two consecutive views with interim differ in order)', () => {
    const first = composeDispatchView({ sigle: 'GIT', interimCount: 10 })
    const second = composeDispatchView({ sigle: 'GIT', interimCount: 10 })

    const firstNames = first.cards.map((card) => card.prenom).join(',')
    const secondNames = second.cards.map((card) => card.prenom).join(',')

    expect(firstNames).not.toBe(secondNames)
  })
})
