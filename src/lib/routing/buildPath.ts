import { encodeRollHash } from '~/lib/hash/codec'
import type { Roll } from '~/types/roll.types'

export const buildPath = (roll: Roll): string => {
  const hash = encodeRollHash(roll)

  return `/${encodeURIComponent(roll.prenom)}/${roll.sigle}#${hash}`
}
