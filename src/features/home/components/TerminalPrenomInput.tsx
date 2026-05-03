import type { ChangeEvent } from 'react'

import { Caret } from '~/features/shell'

type TerminalPrenomInputProps = {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const TerminalPrenomInput = ({ value, onChange }: TerminalPrenomInputProps) => (
  <label className='flex flex-col gap-2 font-mono text-xs tracking-wide text-fg-dim uppercase'>
    ▸ Ton prénom (optionnel)
    <span className='flex min-h-11 items-center gap-2 border border-fg-faint bg-panel px-3'>
      <span aria-hidden='true' className='text-fg'>
        $
      </span>
      <input
        type='text'
        value={value}
        onChange={onChange}
        className='flex-1 bg-transparent py-2 font-mono text-sm text-fg focus:outline-none'
      />
      <Caret className='text-fg' />
    </span>
  </label>
)
