import { useEffect } from 'react'

const META_NAME = 'robots'
const META_CONTENT = 'noindex, nofollow'

export const useNoIndex = (): void => {
  useEffect(() => {
    const existing = document.querySelector(`meta[name="${META_NAME}"]`)
    if (existing !== null) return

    const meta = document.createElement('meta')
    meta.name = META_NAME
    meta.content = META_CONTENT
    document.head.appendChild(meta)

    return () => {
      meta.remove()
    }
  }, [])
}
