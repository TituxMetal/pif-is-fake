import { describe, expect, it } from 'bun:test'

import { validateSigle } from '~/lib/validation/sigle'

describe('validateSigle', () => {
  it('returns the uppercase sigle for valid input', () => {
    expect(validateSigle('ABC')).toBe('ABC')
    expect(validateSigle('abc')).toBe('ABC')
    expect(validateSigle('aBc')).toBe('ABC')
  })

  it('trims surrounding whitespace', () => {
    expect(validateSigle('  ABC  ')).toBe('ABC')
  })

  it('returns null for wrong length', () => {
    expect(validateSigle('AB')).toBeNull()
    expect(validateSigle('ABCD')).toBeNull()
    expect(validateSigle('')).toBeNull()
  })

  it('returns null for non-letter characters', () => {
    expect(validateSigle('A1C')).toBeNull()
    expect(validateSigle('A-C')).toBeNull()
    expect(validateSigle('123')).toBeNull()
  })

  it('returns null for identical triples', () => {
    expect(validateSigle('AAA')).toBeNull()
    expect(validateSigle('zzz')).toBeNull()
  })

  it('returns null for consecutive identical letters', () => {
    expect(validateSigle('AAB')).toBeNull()
    expect(validateSigle('ABB')).toBeNull()
  })

  it('returns null for undefined', () => {
    expect(validateSigle(undefined)).toBeNull()
  })
})
