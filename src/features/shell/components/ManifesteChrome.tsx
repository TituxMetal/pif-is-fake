import { ThemeSwitcher } from './ThemeSwitcher'

export const ManifesteChrome = () => (
  <header className='border-b border-fg-faint'>
    <div className='mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3'>
      <a
        href='/'
        className='inline-flex min-h-11 cursor-pointer items-center font-mono text-xs tracking-widest text-fg-dim uppercase hover:text-hi'
        aria-label="Retour à l'accueil"
      >
        PIF v0.0.1
      </a>
      <ThemeSwitcher />
    </div>
  </header>
)
