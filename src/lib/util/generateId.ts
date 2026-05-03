const fallbackId = (): string => {
  const left = Math.random().toString(36).slice(2, 10)
  const right = Math.random().toString(36).slice(2, 10)

  return `${left}-${right}`
}

export const generateId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    try {
      return crypto.randomUUID()
    } catch {
      return fallbackId()
    }
  }

  return fallbackId()
}
