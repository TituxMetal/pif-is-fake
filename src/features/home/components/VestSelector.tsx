import type { ChangeEvent } from 'react'

import type { VestSelectValue } from '~/features/home/types/home.types'

interface VestSelectorProps {
  value: VestSelectValue
  onChange: (value: VestSelectValue) => void
}

const OPTIONS: ReadonlyArray<{ value: VestSelectValue; label: string }> = [
  { value: 'random', label: 'Aléatoire' },
  { value: 'interim', label: 'Intérim' },
  { value: 'embauche', label: 'Embauché' },
  { value: 'responsable', label: 'Responsable' }
]

const isVestSelectValue = (v: string): v is VestSelectValue =>
  v === 'random' || v === 'interim' || v === 'embauche' || v === 'responsable'

export const VestSelector = ({ value, onChange }: VestSelectorProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value
    if (isVestSelectValue(v)) onChange(v)
  }

  return (
    <select value={value} onChange={handleChange} className='border px-2 py-1'>
      {OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
