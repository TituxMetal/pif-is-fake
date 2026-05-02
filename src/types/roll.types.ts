import type { Vest } from '~/types/bank.types'

export type Bonus = 0 | 50 | 100 | 150

export interface Decomposition {
  production: number
  qualite: number
  securite: number
}

export interface Roll {
  prenom: string
  sigle: string
  decomposition: Decomposition
  bonus: Bonus
  vest: Vest
  motifIndex: number
}
