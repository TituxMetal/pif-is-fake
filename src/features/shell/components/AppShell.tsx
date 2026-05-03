import type { ReactNode } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'

type AppShellProps = {
  path: string
  children: ReactNode
}

export const AppShell = ({ path, children }: AppShellProps) => (
  <div className='flex min-h-screen flex-col bg-bg text-fg'>
    <Header path={path} />
    <main className='mx-auto flex w-full max-w-5xl flex-1 flex-col px-4'>{children}</main>
    <Footer />
  </div>
)
