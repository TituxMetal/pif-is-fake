import { describe, expect, it } from 'bun:test'

import { genericNames } from '~/lib/banks'
import { sanitizePrenom } from '~/lib/validation/prenom'

describe('sanitizePrenom', () => {
  it('returns the input unchanged when valid and short', () => {
    expect(sanitizePrenom('Jean')).toBe('Jean')
  })

  it('preserves accented French letters', () => {
    expect(sanitizePrenom('Aurélie')).toBe('Aurélie')
    expect(sanitizePrenom('Françoise')).toBe('Françoise')
  })

  it('preserves hyphens and apostrophes', () => {
    expect(sanitizePrenom('Jean-Marc')).toBe('Jean-Marc')
    expect(sanitizePrenom("D'Artagnan")).toBe("D'Artagnan")
  })

  it('strips disallowed characters', () => {
    expect(sanitizePrenom('Jean123')).toBe('Jean')
    expect(sanitizePrenom('Jean@Doe')).toBe('JeanDoe')
  })

  it('trims surrounding whitespace', () => {
    expect(sanitizePrenom('  Jean  ')).toBe('Jean')
  })

  it('truncates inputs longer than 24 characters', () => {
    const long = 'A'.repeat(30)

    expect(sanitizePrenom(long)).toHaveLength(24)
  })

  it('falls back to a generic name when input is empty', () => {
    expect(genericNames).toContain(sanitizePrenom(''))
  })

  it('falls back when input is undefined', () => {
    expect(genericNames).toContain(sanitizePrenom(undefined))
  })

  it('falls back when input is whitespace-only', () => {
    expect(genericNames).toContain(sanitizePrenom('   '))
  })

  it('falls back when input strips to empty', () => {
    expect(genericNames).toContain(sanitizePrenom('123!@#'))
  })
})
