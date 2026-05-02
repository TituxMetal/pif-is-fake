import type { Vest } from '~/types/bank.types'

export const generateVest = (): Vest => {
  const r = Math.random()
  if (r < 0.6) return 'embauche'
  if (r < 0.9) return 'interim'
  return 'responsable'
}
