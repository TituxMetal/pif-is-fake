const A_CHAR_CODE = 65

const randomLetter = (): string => {
  return String.fromCharCode(A_CHAR_CODE + Math.floor(Math.random() * 26))
}

const hasConsecutiveDouble = (sigle: string): boolean => {
  if (sigle[0] === sigle[1]) return true
  if (sigle[1] === sigle[2]) return true
  return false
}

export const generateSigle = (): string => {
  while (true) {
    const candidate = randomLetter() + randomLetter() + randomLetter()
    if (!hasConsecutiveDouble(candidate)) return candidate
  }
}
