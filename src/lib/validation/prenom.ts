import { genericNames } from '~/lib/banks'

const DISALLOWED_CHARS = /[^A-Za-zÀ-ÖØ-öø-ÿ\-']/g
const SEGMENT_START = /(^|[-'])([a-zà-ÿ])/g
const MAX_PRENOM_LENGTH = 24

const pickRandomGenericName = (): string => {
  const index = Math.floor(Math.random() * genericNames.length)
  const name = genericNames[index]
  if (name === undefined) throw new Error('genericNames bank is empty')

  return name
}

const toTitleCase = (input: string): string =>
  input.toLowerCase().replace(SEGMENT_START, (_match, separator: string, letter: string) => {
    return separator + letter.toUpperCase()
  })

export const validatePrenom = (input?: string): string | null => {
  const trimmed = input?.trim() ?? ''
  const cleaned = trimmed.replace(DISALLOWED_CHARS, '')

  if (cleaned === '') return null

  return toTitleCase(cleaned.slice(0, MAX_PRENOM_LENGTH))
}

export const sanitizePrenom = (input?: string): string => {
  const validated = validatePrenom(input)

  return validated ?? pickRandomGenericName()
}
