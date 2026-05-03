import { buildPath } from '~/lib/routing/buildPath'
import type { Roll } from '~/types/roll.types'

export const buildShareUrl = (roll: Roll, origin: string): string => {
  return `${origin}${buildPath(roll)}`
}
