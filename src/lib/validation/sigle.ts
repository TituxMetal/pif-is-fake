const SIGLE_REGEX = /^[A-Z]{3}$/

const hasConsecutiveDouble = (sigle: string): boolean => {
  if (sigle[0] === sigle[1]) return true
  if (sigle[1] === sigle[2]) return true
  return false
}

export const validateSigle = (input?: string): string | null => {
  if (input === undefined) return null

  const upper = input.trim().toUpperCase()
  if (!SIGLE_REGEX.test(upper)) return null
  if (hasConsecutiveDouble(upper)) return null

  return upper
}
