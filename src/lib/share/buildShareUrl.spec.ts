import { describe, expect, it } from 'bun:test'

import { buildShareUrl } from '~/lib/share/buildShareUrl'
import type { Roll } from '~/types/roll.types'

const baseRoll: Roll = {
  prenom: 'Jean',
  sigle: 'GIT',
  decomposition: { production: 100, qualite: 50, securite: 25 },
  bonus: 50,
  vest: 'embauche',
  motifIndex: 3
}

describe('buildShareUrl', () => {
  it('assembles origin + path + hash', () => {
    const url = buildShareUrl(baseRoll, 'https://pif.tuxlab.fr')

    expect(url.startsWith('https://pif.tuxlab.fr/Jean/GIT#')).toBe(true)
    expect(url).toMatch(/#[0-9A-Za-z]{6}$/)
  })

  it('percent-encodes accented prenom', () => {
    const accentedRoll: Roll = { ...baseRoll, prenom: 'Aurélie' }
    const url = buildShareUrl(accentedRoll, 'https://pif.tuxlab.fr')

    expect(url).toContain('/Aur%C3%A9lie/')
  })

  it('keeps the sigle uppercased as stored on the roll', () => {
    const url = buildShareUrl(baseRoll, 'http://localhost:3000')

    expect(url).toContain('/Jean/GIT#')
  })
})
