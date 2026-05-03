import { useTheme } from '~/lib/theme'

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme()
  const alternative = theme === 'terminal' ? 'Manifeste' : 'Terminal'

  return (
    <button
      type='button'
      onClick={toggleTheme}
      className='min-h-11 cursor-pointer border border-fg-faint px-3 py-2 font-mono text-xs text-fg hover:bg-fg hover:text-bg'
      aria-label={`Activer le thème ${alternative}`}
      aria-pressed={theme === 'manifeste'}
    >
      {alternative} ▶
    </button>
  )
}
