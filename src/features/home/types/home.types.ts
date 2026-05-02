import type { RouteIntent } from '~/lib/routing'
import type { Vest } from '~/types/bank.types'

export type VestSelectValue = 'random' | Vest

export interface HomeProps {
  intent: RouteIntent
}
