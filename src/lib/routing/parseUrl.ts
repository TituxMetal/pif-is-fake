import { decodeRollHash } from '~/lib/hash/codec'
import type { RouteIntent } from '~/lib/routing/routing.types'
import { validatePrenom } from '~/lib/validation/prenom'
import { validateSigle } from '~/lib/validation/sigle'

const DISCLAIMER_PATH = 'avertissement'
const DISPATCH_PATH = 'dispatch'

const safeDecodeURIComponent = (input: string): string | null => {
  try {
    return decodeURIComponent(input)
  } catch {
    return null
  }
}

export const parseUrl = (url: URL): RouteIntent => {
  const segments = url.pathname.split('/').filter((segment) => segment !== '')

  if (segments.length === 0) return { kind: 'home' }
  if (segments.length > 2) return { kind: 'home' }

  const first = segments[0]
  const second = segments[1]

  if (first === undefined) return { kind: 'home' }

  if (first === DISCLAIMER_PATH) {
    if (second !== undefined) return { kind: 'home' }

    return { kind: 'disclaimer' }
  }

  if (first === DISPATCH_PATH) {
    if (second !== undefined) return { kind: 'home' }

    return { kind: 'dispatch' }
  }

  const decodedFirst = safeDecodeURIComponent(first)
  const prenom = decodedFirst === null ? null : validatePrenom(decodedFirst)

  if (prenom === null) return { kind: 'home' }
  if (second === undefined) return { kind: 'forced-prenom', prenom }

  const sigle = validateSigle(second)

  if (sigle === null) return { kind: 'forced-prenom', prenom }

  const rawHash = url.hash.startsWith('#') ? url.hash.slice(1) : url.hash

  if (rawHash === '') return { kind: 'forced-prenom-sigle', prenom, sigle }

  const decoded = decodeRollHash(rawHash)

  if (decoded === null) return { kind: 'forced-prenom-sigle', prenom, sigle }

  return {
    kind: 'replay',
    prenom,
    sigle,
    roll: { prenom, sigle, ...decoded }
  }
}
