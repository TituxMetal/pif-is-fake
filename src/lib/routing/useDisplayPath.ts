import { useEffect, useState } from 'react'

const PATH_CHANGE_EVENT = 'pif:pathchange'

const safeDecodeURIComponent = (input: string): string => {
  try {
    return decodeURIComponent(input)
  } catch {
    return input
  }
}

const computeDisplayPath = (): string => {
  const segments = window.location.pathname
    .split('/')
    .filter((segment) => segment !== '')
    .map(safeDecodeURIComponent)
  const hash = window.location.hash

  if (segments.length === 0) return '~/pif'

  return `~/pif/${segments.join('/')}${hash}`
}

export const emitPathChange = () => {
  window.dispatchEvent(new Event(PATH_CHANGE_EVENT))
}

export const useDisplayPath = (): string => {
  const [path, setPath] = useState<string>(computeDisplayPath)

  useEffect(() => {
    const handleChange = () => setPath(computeDisplayPath())

    window.addEventListener('popstate', handleChange)
    window.addEventListener('hashchange', handleChange)
    window.addEventListener(PATH_CHANGE_EVENT, handleChange)

    return () => {
      window.removeEventListener('popstate', handleChange)
      window.removeEventListener('hashchange', handleChange)
      window.removeEventListener(PATH_CHANGE_EVENT, handleChange)
    }
  }, [])

  return path
}
