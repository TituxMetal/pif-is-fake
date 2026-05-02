import { describe, expect, it } from 'bun:test'

import { composeRoll } from '~/lib/generation/roll'
import { encodeRollHash } from '~/lib/hash/codec'
import { parseUrl } from '~/lib/routing/parseUrl'

const ORIGIN = 'http://localhost'
const url = (path: string): URL => new URL(path, ORIGIN)

describe('parseUrl', () => {
  it('returns home on the root path', () => {
    expect(parseUrl(url('/'))).toEqual({ kind: 'home' })
  })

  it('returns home on an empty pathname', () => {
    expect(parseUrl(url(''))).toEqual({ kind: 'home' })
  })

  it('returns disclaimer on /avertissement', () => {
    expect(parseUrl(url('/avertissement'))).toEqual({ kind: 'disclaimer' })
  })

  it('returns forced-prenom for a single valid segment', () => {
    expect(parseUrl(url('/Jean'))).toEqual({ kind: 'forced-prenom', prenom: 'Jean' })
  })

  it('returns forced-prenom for percent-encoded accented prenom', () => {
    expect(parseUrl(url('/Aur%C3%A9lie'))).toEqual({
      kind: 'forced-prenom',
      prenom: 'Aurélie'
    })
  })

  it('handles a trailing slash on a single segment', () => {
    expect(parseUrl(url('/Jean/'))).toEqual({ kind: 'forced-prenom', prenom: 'Jean' })
  })

  it('returns forced-prenom-sigle for /<prenom>/<sigle>', () => {
    expect(parseUrl(url('/Jean/ABC'))).toEqual({
      kind: 'forced-prenom-sigle',
      prenom: 'Jean',
      sigle: 'ABC'
    })
  })

  it('returns replay when pathname carries a valid hash', () => {
    const roll = composeRoll({ prenom: 'Jean', sigle: 'ABC' })
    const hash = encodeRollHash(roll)
    const intent = parseUrl(url(`/Jean/ABC#${hash}`))

    expect(intent.kind).toBe('replay')
    if (intent.kind !== 'replay') return
    expect(intent.prenom).toBe('Jean')
    expect(intent.sigle).toBe('ABC')
    expect(intent.roll).toEqual(roll)
  })

  it('falls back silently to forced-prenom-sigle on a corrupted hash', () => {
    expect(parseUrl(url('/Jean/ABC#zzzzzz'))).toEqual({
      kind: 'forced-prenom-sigle',
      prenom: 'Jean',
      sigle: 'ABC'
    })
  })

  it('falls back silently to forced-prenom-sigle on a wrong-length hash', () => {
    expect(parseUrl(url('/Jean/ABC#abc'))).toEqual({
      kind: 'forced-prenom-sigle',
      prenom: 'Jean',
      sigle: 'ABC'
    })
  })

  it('normalizes a lowercase sigle to uppercase', () => {
    expect(parseUrl(url('/Jean/abc'))).toEqual({
      kind: 'forced-prenom-sigle',
      prenom: 'Jean',
      sigle: 'ABC'
    })
  })

  it('falls back silently to forced-prenom on a sigle with digits', () => {
    expect(parseUrl(url('/Jean/A1B'))).toEqual({ kind: 'forced-prenom', prenom: 'Jean' })
  })

  it('falls back silently to forced-prenom on a sigle with consecutive doubles', () => {
    expect(parseUrl(url('/Jean/AAB'))).toEqual({ kind: 'forced-prenom', prenom: 'Jean' })
  })

  it('falls back silently to home on a strips-to-empty prenom', () => {
    expect(parseUrl(url('/123'))).toEqual({ kind: 'home' })
  })

  it('strips disallowed characters in the prenom segment', () => {
    expect(parseUrl(url('/Jean123'))).toEqual({ kind: 'forced-prenom', prenom: 'Jean' })
  })

  it('truncates an over-long prenom to 24 characters', () => {
    const long = 'A'.repeat(30)
    const intent = parseUrl(url(`/${long}`))

    expect(intent.kind).toBe('forced-prenom')
    if (intent.kind !== 'forced-prenom') return
    expect(intent.prenom).toHaveLength(24)
  })
})
