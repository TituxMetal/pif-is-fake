import { useCallback, useEffect, useState } from 'react'

import type { Theme } from './theme.types'
import { readStoredTheme, writeStoredTheme } from './themeStorage'

const applyTheme = (theme: Theme): void => {
  document.documentElement.dataset.theme = theme
}

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => readStoredTheme(window.localStorage))

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'terminal' ? 'manifeste' : 'terminal'

      writeStoredTheme(window.localStorage, next)

      return next
    })
  }, [])

  return { theme, toggleTheme }
}
