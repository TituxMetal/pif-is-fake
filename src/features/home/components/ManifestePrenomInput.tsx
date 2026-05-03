import type { ChangeEvent } from 'react'

type ManifestePrenomInputProps = {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const ManifestePrenomInput = ({ value, onChange }: ManifestePrenomInputProps) => (
  <label className='flex flex-col gap-2 font-mono text-xs tracking-wide text-fg-dim uppercase'>
    ▸ Ton prénom (optionnel)
    <span className='flex min-h-11 items-center border-l-[3px] border-hi bg-panel px-3'>
      <input
        type='text'
        value={value}
        onChange={onChange}
        className='flex-1 bg-transparent py-2 font-display text-[22px] tracking-tight text-fg-strong uppercase focus:outline-none'
      />
    </span>
  </label>
)
