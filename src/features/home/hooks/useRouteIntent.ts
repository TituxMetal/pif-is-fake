import { useEffect, useState } from 'react'

import { parseUrl } from '~/lib/routing'
import type { RouteIntent } from '~/lib/routing'

const readIntent = (): RouteIntent => parseUrl(new URL(window.location.href))

export const useRouteIntent = (): RouteIntent => {
  const [intent, setIntent] = useState<RouteIntent>(readIntent)

  useEffect(() => {
    const handlePopState = () => setIntent(readIntent())

    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return intent
}
