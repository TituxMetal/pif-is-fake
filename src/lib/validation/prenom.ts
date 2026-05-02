import { genericNames } from '~/lib/banks'

const DISALLOWED_CHARS = /[^A-Za-zÀ-ÿ\-']/g
const MAX_PRENOM_LENGTH = 24

const pickRandomGenericName = (): string => {
  const idx = Math.floor(Math.random() * genericNames.length)
  const name = genericNames[idx]
  if (name === undefined) throw new Error('genericNames bank is empty')
  return name
}

export const sanitizePrenom = (input?: string): string => {
  const trimmed = input?.trim() ?? ''
  const cleaned = trimmed.replace(DISALLOWED_CHARS, '')
  if (cleaned === '') return pickRandomGenericName()
  return cleaned.slice(0, MAX_PRENOM_LENGTH)
}
