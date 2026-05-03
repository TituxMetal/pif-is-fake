export const webShareSupported = (): boolean => {
  if (typeof navigator === 'undefined') return false

  return typeof navigator.share === 'function'
}

export const shareViaWebShare = async (url: string, title: string): Promise<boolean> => {
  if (!webShareSupported()) return false

  try {
    await navigator.share({ url, title })

    return true
  } catch {
    return false
  }
}
