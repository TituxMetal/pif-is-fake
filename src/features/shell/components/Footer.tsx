import { BACKRONYMS } from '../content/backronyms'
import { useFooterBackronym } from '../hooks/useFooterBackronym'

const APP_VERSION = 'v0.0.1'

export const Footer = () => {
  const word = useFooterBackronym(BACKRONYMS)

  return (
    <footer className='border-t border-fg-faint bg-bg font-mono text-xs text-fg-dim'>
      <p className='mx-auto max-w-5xl px-4 py-3 text-center'>
        <span className='block sm:inline'>
          PIF {APP_VERSION} — Prime [<span className='text-hi'>{word}</span>] Fictive
        </span>
        <span className='hidden sm:inline'> — </span>
        <span className='block sm:inline'>
          PIF Is Fake —{' '}
          <a href='/avertissement' className='cursor-pointer underline hover:bg-fg hover:text-bg'>
            /avertissement
          </a>
        </span>
      </p>
    </footer>
  )
}
