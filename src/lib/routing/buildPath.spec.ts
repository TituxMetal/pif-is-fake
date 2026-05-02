import { describe, expect, it } from 'bun:test'

import { composeRoll } from '~/lib/generation/roll'
import { buildPath } from '~/lib/routing/buildPath'
import { parseUrl } from '~/lib/routing/parseUrl'

const ORIGIN = 'http://localhost'

describe('buildPath', () => {
  it('builds /<prenom>/<sigle>#<hash> with a 6-char base62 hash', () => {
    const roll = composeRoll({ prenom: 'Jean', sigle: 'ABC' })
    const path = buildPath(roll)

    expect(path).toMatch(/^\/Jean\/ABC#[0-9A-Za-z]{6}$/)
  })

  it('percent-encodes accented characters in the prenom', () => {
    const roll = composeRoll({ prenom: 'Aurélie', sigle: 'ABC' })
    const path = buildPath(roll)

    expect(path.startsWith('/Aur%C3%A9lie/ABC#')).toBe(true)
  })
})

describe('buildPath / parseUrl round-trip', () => {
  it('produces a replay intent that matches the original roll over 50 random rolls', () => {
    for (let iteration = 0; iteration < 50; iteration += 1) {
      const roll = composeRoll({ prenom: 'Jean' })
      const path = buildPath(roll)
      const intent = parseUrl(new URL(path, ORIGIN))

      expect(intent.kind).toBe('replay')
      if (intent.kind !== 'replay') continue
      expect(intent.roll).toEqual(roll)
    }
  })

  it('preserves prenoms with apostrophes through the round-trip', () => {
    const roll = composeRoll({ prenom: "D'Artagnan", sigle: 'ABC' })
    const path = buildPath(roll)
    const intent = parseUrl(new URL(path, ORIGIN))

    expect(intent.kind).toBe('replay')
    if (intent.kind !== 'replay') return
    expect(intent.roll).toEqual(roll)
  })

  it('preserves prenoms with hyphens through the round-trip', () => {
    const roll = composeRoll({ prenom: 'Jean-Marc', sigle: 'ABC' })
    const path = buildPath(roll)
    const intent = parseUrl(new URL(path, ORIGIN))

    expect(intent.kind).toBe('replay')
    if (intent.kind !== 'replay') return
    expect(intent.roll).toEqual(roll)
  })
})
