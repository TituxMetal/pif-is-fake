import { useTheme } from '~/lib/theme'

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme()
  const alternative = theme === 'terminal' ? 'Manifeste' : 'Terminal'

  return (
    <button
      type='button'
      onClick={toggleTheme}
      className='inline-flex min-h-11 cursor-pointer items-center px-2 font-mono text-xs tracking-wider whitespace-nowrap text-fg-dim hover:text-hi'
      aria-label={`Activer le thème ${alternative}`}
      aria-pressed={theme === 'manifeste'}
    >
      [{alternative} ▶]
    </button>
  )
}
