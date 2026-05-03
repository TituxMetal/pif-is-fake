import type { VestSelectValue } from '~/features/home/types/home.types'

type VestOption = {
  value: VestSelectValue
  label: string
}

export const VEST_OPTIONS: ReadonlyArray<VestOption> = [
  { value: 'random', label: 'Aléatoire' },
  { value: 'interim', label: 'Intérim' },
  { value: 'embauche', label: 'Embauché' },
  { value: 'responsable', label: 'Resp.' }
]
