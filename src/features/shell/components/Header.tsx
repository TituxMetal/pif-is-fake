import { ThemeSwitcher } from './ThemeSwitcher'

type HeaderProps = {
  path: string
}

export const Header = ({ path }: HeaderProps) => (
  <header className='border-b border-fg-faint bg-panel font-mono text-xs'>
    <div className='mx-auto grid max-w-5xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-2'>
      <a
        href='/'
        className='inline-flex min-h-11 cursor-pointer items-center px-2 py-1 font-bold text-hi hover:bg-hi hover:text-bg'
        aria-label="Retour à l'accueil"
      >
        ● Pif.sh
      </a>
      <span className='truncate text-center text-fg-dim'>{path}</span>
      <ThemeSwitcher />
    </div>
  </header>
)
