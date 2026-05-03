import { useCallback, useSyncExternalStore } from 'react'

import type { Theme } from './theme.types'
import { readStoredTheme, writeStoredTheme } from './themeStorage'

const applyTheme = (theme: Theme): void => {
  document.documentElement.dataset.theme = theme
}

let currentTheme: Theme = readStoredTheme(window.localStorage)
applyTheme(currentTheme)

const listeners = new Set<() => void>()

const subscribe = (callback: () => void) => {
  listeners.add(callback)

  return () => {
    listeners.delete(callback)
  }
}

const getSnapshot = (): Theme => currentTheme

const setTheme = (next: Theme): void => {
  currentTheme = next
  applyTheme(next)
  writeStoredTheme(window.localStorage, next)
  listeners.forEach((notify) => {
    notify()
  })
}

export const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, getSnapshot)

  const toggleTheme = useCallback(() => {
    setTheme(currentTheme === 'terminal' ? 'manifeste' : 'terminal')
  }, [])

  return { theme, toggleTheme }
}
