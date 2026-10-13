import { describe, expect, it } from 'bun:test'

import { previousMonthLabel } from '~/lib/util/monthLabel'

describe('previousMonthLabel', () => {
  it('returns the previous month within the same year', () => {
    expect(previousMonthLabel('uppercase', new Date(2026, 4, 4))).toBe('AVRIL 2026')
    expect(previousMonthLabel('capitalized', new Date(2026, 4, 4))).toBe('Avril 2026')
  })

  it('returns May when the current month is June', () => {
    expect(previousMonthLabel('uppercase', new Date(2026, 5, 1))).toBe('MAI 2026')
    expect(previousMonthLabel('capitalized', new Date(2026, 5, 1))).toBe('Mai 2026')
  })

  it('rolls back to December of the previous year in January', () => {
    expect(previousMonthLabel('uppercase', new Date(2027, 0, 15))).toBe('DÉCEMBRE 2026')
    expect(previousMonthLabel('capitalized', new Date(2027, 0, 15))).toBe('Décembre 2026')
  })

  it('preserves accents in both casing variants', () => {
    expect(previousMonthLabel('uppercase', new Date(2026, 2, 1))).toBe('FÉVRIER 2026')
    expect(previousMonthLabel('capitalized', new Date(2026, 2, 1))).toBe('Février 2026')
  })
})
