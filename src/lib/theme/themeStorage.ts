import type { Theme } from './theme.types'

export const THEME_STORAGE_KEY = 'pif:theme'
export const DEFAULT_THEME: Theme = 'terminal'

type ReadableStorage = Pick<Storage, 'getItem'>
type WritableStorage = Pick<Storage, 'setItem'>

const isTheme = (value: unknown): value is Theme => value === 'terminal' || value === 'manifeste'

export const readStoredTheme = (storage: ReadableStorage): Theme => {
  const raw = storage.getItem(THEME_STORAGE_KEY)

  if (isTheme(raw)) return raw

  return DEFAULT_THEME
}

export const writeStoredTheme = (storage: WritableStorage, theme: Theme): void => {
  storage.setItem(THEME_STORAGE_KEY, theme)
}
