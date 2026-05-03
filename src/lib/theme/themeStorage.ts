import type { Theme } from './theme.types'

export const THEME_STORAGE_KEY = 'pif:theme'
export const DEFAULT_THEME: Theme = 'terminal'

type ReadableStorage = Pick<Storage, 'getItem'>
type WritableStorage = Pick<Storage, 'setItem'>

const isTheme = (value: unknown): value is Theme => value === 'terminal' || value === 'manifeste'

export const readStoredTheme = (storage: ReadableStorage): Theme => {
  try {
    const raw = storage.getItem(THEME_STORAGE_KEY)

    if (isTheme(raw)) return raw

    return DEFAULT_THEME
  } catch {
    return DEFAULT_THEME
  }
}

export const writeStoredTheme = (storage: WritableStorage, theme: Theme): void => {
  try {
    storage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Storage may be blocked (Safari private mode, Brave strict, quota exceeded).
    // Persistence is non-critical — silently degrade.
  }
}
