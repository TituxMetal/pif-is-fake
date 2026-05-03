import { useCallback, useEffect, useRef, useState } from 'react'

import { buildShareUrl, shareViaWebShare, webShareSupported } from '~/lib/share'
import type { Roll } from '~/types/roll.types'

const TOAST_DURATION_MS = 2400

interface UseShareActionsResult {
  toastMessage: string | null
  copyLink: () => Promise<void>
  share: () => Promise<void>
  exportImage: () => void
}

export const useShareActions = (roll: Roll): UseShareActionsResult => {
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current)
    }
  }, [])

  const showToast = useCallback((message: string) => {
    setToastMessage(message)

    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setToastMessage(null), TOAST_DURATION_MS)
  }, [])

  const copyLink = useCallback(async () => {
    const url = buildShareUrl(roll, window.location.origin)

    try {
      await navigator.clipboard.writeText(url)
      showToast('Lien copié')
    } catch {
      showToast('Copie impossible')
    }
  }, [roll, showToast])

  const share = useCallback(async () => {
    const url = buildShareUrl(roll, window.location.origin)
    const title = `PrimeAuPif — ${roll.prenom}`

    if (webShareSupported()) {
      const ok = await shareViaWebShare(url, title)
      if (ok) return
    }

    try {
      await navigator.clipboard.writeText(url)
      showToast('Lien copié')
    } catch {
      showToast('Partage indisponible')
    }
  }, [roll, showToast])

  const exportImage = useCallback(() => {
    showToast(`L'image arrive. Probablement. Un jour.`)
  }, [showToast])

  return { toastMessage, copyLink, share, exportImage }
}
