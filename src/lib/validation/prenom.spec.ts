import { describe, expect, it } from 'bun:test'

import { genericNames } from '~/lib/banks'
import { sanitizePrenom, validatePrenom } from '~/lib/validation/prenom'

describe('sanitizePrenom', () => {
  it('returns a Title Case name when valid and short', () => {
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

  it('normalizes lowercase input to Title Case', () => {
    expect(sanitizePrenom('titux')).toBe('Titux')
    expect(sanitizePrenom('aurélie')).toBe('Aurélie')
  })

  it('normalizes uppercase input to Title Case', () => {
    expect(sanitizePrenom('TITUX')).toBe('Titux')
  })

  it('normalizes Title Case across hyphen segments', () => {
    expect(sanitizePrenom('jean-marc')).toBe('Jean-Marc')
    expect(sanitizePrenom('JEAN-MARC')).toBe('Jean-Marc')
    expect(sanitizePrenom('marie-hélène')).toBe('Marie-Hélène')
  })

  it('normalizes Title Case after an apostrophe', () => {
    expect(sanitizePrenom("d'artagnan")).toBe("D'Artagnan")
  })

  it('strips disallowed characters', () => {
    expect(sanitizePrenom('Jean123')).toBe('Jean')
    expect(sanitizePrenom('Jean@Doe')).toBe('Jeandoe')
  })

  it('strips Unicode math symbols inside the À-ÿ range (×, ÷)', () => {
    expect(sanitizePrenom('Jean×Marc')).toBe('Jeanmarc')
    expect(sanitizePrenom('Anne÷')).toBe('Anne')
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

describe('validatePrenom', () => {
  it('returns the cleaned name when valid', () => {
    expect(validatePrenom('Jean')).toBe('Jean')
  })

  it('preserves accents, hyphens, and apostrophes', () => {
    expect(validatePrenom('Aurélie')).toBe('Aurélie')
    expect(validatePrenom('Jean-Marc')).toBe('Jean-Marc')
    expect(validatePrenom("D'Artagnan")).toBe("D'Artagnan")
  })

  it('normalizes case to Title Case', () => {
    expect(validatePrenom('titux')).toBe('Titux')
    expect(validatePrenom('TITUX')).toBe('Titux')
    expect(validatePrenom('jean-marc')).toBe('Jean-Marc')
    expect(validatePrenom("d'artagnan")).toBe("D'Artagnan")
  })

  it('strips disallowed characters', () => {
    expect(validatePrenom('Jean123')).toBe('Jean')
    expect(validatePrenom('Jean@Doe')).toBe('Jeandoe')
  })

  it('truncates to 24 characters', () => {
    expect(validatePrenom('A'.repeat(30))).toHaveLength(24)
  })

  it('returns null on undefined input', () => {
    expect(validatePrenom(undefined)).toBeNull()
  })

  it('returns null on empty string', () => {
    expect(validatePrenom('')).toBeNull()
  })

  it('returns null on whitespace-only input', () => {
    expect(validatePrenom('   ')).toBeNull()
  })

  it('returns null when input strips to empty', () => {
    expect(validatePrenom('123!@#')).toBeNull()
  })
})
