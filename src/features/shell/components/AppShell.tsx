import type { ReactNode } from 'react'

import { useTheme } from '~/lib/theme'

import { Footer } from './Footer'
import { ManifesteChrome } from './ManifesteChrome'
import { TerminalChrome } from './TerminalChrome'

type AppShellProps = {
  path: string
  children: ReactNode
}

export const AppShell = ({ path, children }: AppShellProps) => {
  const { theme } = useTheme()

  return (
    <div className='flex min-h-screen flex-col bg-bg text-fg'>
      {theme === 'terminal' ? <TerminalChrome path={path} /> : <ManifesteChrome />}
      <main className='mx-auto flex w-full max-w-5xl flex-1 flex-col px-4'>{children}</main>
      <Footer />
    </div>
  )
}
