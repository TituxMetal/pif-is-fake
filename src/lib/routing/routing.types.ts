import type { Roll } from '~/types/roll.types'

export type RouteIntent =
  | { kind: 'home' }
  | { kind: 'disclaimer' }
  | { kind: 'forced-prenom'; prenom: string }
  | { kind: 'forced-prenom-sigle'; prenom: string; sigle: string }
  | { kind: 'replay'; prenom: string; sigle: string; roll: Roll }
