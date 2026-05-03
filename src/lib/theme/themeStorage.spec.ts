import { describe, expect, it } from 'bun:test'

import {
  DEFAULT_THEME,
  readStoredTheme,
  THEME_STORAGE_KEY,
  writeStoredTheme
} from '~/lib/theme/themeStorage'

const memoryStorage = (initial: Record<string, string> = {}) => {
  const store = new Map<string, string>(Object.entries(initial))

  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value)
    },
    snapshot: () => Object.fromEntries(store)
  }
}

describe('readStoredTheme', () => {
  it('returns the default theme when nothing is stored', () => {
    const storage = memoryStorage()

    expect(readStoredTheme(storage)).toBe(DEFAULT_THEME)
  })

  it('returns the stored theme when the value is valid', () => {
    const storage = memoryStorage({ [THEME_STORAGE_KEY]: 'manifeste' })

    expect(readStoredTheme(storage)).toBe('manifeste')
  })

  it('returns the default theme when the stored value is unknown', () => {
    const storage = memoryStorage({ [THEME_STORAGE_KEY]: 'neon' })

    expect(readStoredTheme(storage)).toBe(DEFAULT_THEME)
  })

  it('returns the default theme when the stored value is empty', () => {
    const storage = memoryStorage({ [THEME_STORAGE_KEY]: '' })

    expect(readStoredTheme(storage)).toBe(DEFAULT_THEME)
  })

  it('returns the default theme when storage access throws', () => {
    const storage = {
      getItem: () => {
        throw new Error('SecurityError: storage blocked')
      }
    }

    expect(readStoredTheme(storage)).toBe(DEFAULT_THEME)
  })
})

describe('writeStoredTheme', () => {
  it('persists the theme under the storage key', () => {
    const storage = memoryStorage()

    writeStoredTheme(storage, 'manifeste')

    expect(storage.snapshot()[THEME_STORAGE_KEY]).toBe('manifeste')
  })

  it('overwrites a previously stored theme', () => {
    const storage = memoryStorage({ [THEME_STORAGE_KEY]: 'terminal' })

    writeStoredTheme(storage, 'manifeste')

    expect(storage.snapshot()[THEME_STORAGE_KEY]).toBe('manifeste')
  })

  it('does not throw when storage access throws', () => {
    const storage = {
      setItem: () => {
        throw new Error('QuotaExceededError')
      }
    }

    expect(() => writeStoredTheme(storage, 'manifeste')).not.toThrow()
  })
})
