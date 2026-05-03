import { describe, expect, it } from 'bun:test'

import { decodeDispatchN } from '~/features/dispatch/hooks/useDispatchN'

describe('decodeDispatchN', () => {
  it('returns 0 when the param is missing', () => {
    expect(decodeDispatchN('')).toBe(0)
    expect(decodeDispatchN('?other=42')).toBe(0)
  })

  it('returns 0 when the param is empty', () => {
    expect(decodeDispatchN('?n=')).toBe(0)
  })

  it('returns 0 when the param is unparseable', () => {
    expect(decodeDispatchN('?n=zz')).toBe(0)
    expect(decodeDispatchN('?n=!')).toBe(0)
    expect(decodeDispatchN('?n=foo')).toBe(0)
  })

  it('decodes single base62 digits', () => {
    expect(decodeDispatchN('?n=0')).toBe(0)
    expect(decodeDispatchN('?n=7')).toBe(7)
    expect(decodeDispatchN('?n=A')).toBe(10)
    expect(decodeDispatchN('?n=F')).toBe(15)
    expect(decodeDispatchN('?n=K')).toBe(20)
  })

  it('clamps any value above 20 to 20', () => {
    expect(decodeDispatchN('?n=L')).toBe(20)
    expect(decodeDispatchN('?n=Z')).toBe(20)
    expect(decodeDispatchN('?n=z')).toBe(20)
  })

  it('treats lowercase letters as a continuation of base62', () => {
    expect(decodeDispatchN('?n=a')).toBe(20)
  })
})
