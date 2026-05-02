import { useEffect, useState } from 'react'

import { parseUrl } from './parseUrl'
import type { RouteIntent } from './routing.types'

const readIntent = (): RouteIntent => parseUrl(new URL(window.location.href))

export const useRouteIntent = (): RouteIntent => {
  const [intent, setIntent] = useState<RouteIntent>(readIntent)

  useEffect(() => {
    const handleNavigation = () => setIntent(readIntent())

    window.addEventListener('popstate', handleNavigation)
    window.addEventListener('hashchange', handleNavigation)

    return () => {
      window.removeEventListener('popstate', handleNavigation)
      window.removeEventListener('hashchange', handleNavigation)
    }
  }, [])

  return intent
}
