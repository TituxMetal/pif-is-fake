import { VEST_OPTIONS } from '~/features/home/content/vestOptions'
import type { VestSelectValue } from '~/features/home/types/home.types'

type ManifesteVestSelectorProps = {
  value: VestSelectValue
  onChange: (value: VestSelectValue) => void
}

export const ManifesteVestSelector = ({ value, onChange }: ManifesteVestSelectorProps) => (
  <fieldset className='flex flex-col gap-2 font-mono text-xs tracking-wide text-fg-dim uppercase'>
    <legend>Gilet</legend>
    <div className='flex w-full flex-wrap gap-2'>
      {VEST_OPTIONS.map((option) => {
        const isSelected = option.value === value

        return (
          <button
            key={option.value}
            type='button'
            onClick={() => onChange(option.value)}
            aria-pressed={isSelected}
            className={`flex min-h-11 flex-1 cursor-pointer items-center justify-center px-3 py-2 font-mono text-[10px] tracking-widest uppercase ${
              isSelected
                ? 'bg-hi font-bold text-ink-on-hi'
                : 'border border-fg-faint text-fg-dim hover:text-hi'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  </fieldset>
)
