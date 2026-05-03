import { describe, expect, it } from 'bun:test'

import { isTriggerSigle, triggerSigles } from './triggerSigles'

describe('triggerSigles', () => {
  it('contains exactly 36 sigles', () => {
    expect(triggerSigles.size).toBe(36)
  })

  it('includes the two logistics anchors', () => {
    expect(triggerSigles.has('GXO')).toBe(true)
    expect(triggerSigles.has('XPO')).toBe(true)
  })

  it('includes the locked geek references', () => {
    const expected = [
      'GIT',
      'NPM',
      'URL',
      'FTP',
      'API',
      'DNS',
      'SQL',
      'AWS',
      'TCP',
      'UDP',
      'VIM',
      'GPL',
      'MIT',
      'BSD',
      'ZIP',
      'TAR',
      'TLS',
      'VPN',
      'KEY',
      'DEV',
      'BUG',
      'LOG',
      'TXT',
      'WSL',
      'LAN',
      'WAN',
      'SVG',
      'PNG',
      'JPG',
      'XML',
      'GPU',
      'CPU',
      'RAM',
      'USB'
    ]

    for (const sigle of expected) {
      expect(triggerSigles.has(sigle)).toBe(true)
    }
  })

  it('rejects sigles that violate the no-consecutive-double rule', () => {
    expect(triggerSigles.has('SSH')).toBe(false)
    expect(triggerSigles.has('CSS')).toBe(false)
    expect(triggerSigles.has('WWW')).toBe(false)
  })
})

describe('isTriggerSigle', () => {
  it('returns true for a known trigger', () => {
    expect(isTriggerSigle('GIT')).toBe(true)
  })

  it('returns false for a non-trigger sigle', () => {
    expect(isTriggerSigle('ABC')).toBe(false)
  })

  it('is case-sensitive — only uppercase matches', () => {
    expect(isTriggerSigle('git')).toBe(false)
  })
})
