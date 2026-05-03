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

const isVestSelectValue = (value: string): value is VestSelectValue =>
  value === 'random' || value === 'interim' || value === 'embauche' || value === 'responsable'

export const VestSelector = ({ value, onChange }: VestSelectorProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value

    if (isVestSelectValue(next)) onChange(next)
  }

  return (
    <label className='flex flex-col gap-2 font-mono text-xs uppercase text-fg-dim'>
      Gilet
      <select
        value={value}
        onChange={handleChange}
        aria-label='Choix du gilet'
        className='min-h-11 border border-fg-faint bg-panel px-3 py-2 font-mono text-sm normal-case text-fg focus:border-hi focus:outline-none'
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
