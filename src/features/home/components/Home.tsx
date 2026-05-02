import { type ChangeEvent, useState } from 'react'

import { ResultDisplay } from '~/features/home/components/ResultDisplay'
import { VestSelector } from '~/features/home/components/VestSelector'
import type { VestSelectValue } from '~/features/home/types/home.types'
import { composeRoll } from '~/lib/generation'
import { sanitizePrenom } from '~/lib/validation'
import type { Roll } from '~/types/roll.types'

export const Home = () => {
  const [prenomInput, setPrenomInput] = useState('')
  const [vestSelect, setVestSelect] = useState<VestSelectValue>('random')
  const [roll, setRoll] = useState<Roll | null>(null)

  const handleRoll = () => {
    const prenom = sanitizePrenom(prenomInput)
    const vest = vestSelect === 'random' ? undefined : vestSelect
    setRoll(composeRoll({ prenom, vest }))
  }

  const handlePrenomChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrenomInput(e.target.value)
  }

  return (
    <main className='min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-base-100 text-base-content'>
      <h1 className='text-4xl font-bold tracking-tight'>PrimeAuPif</h1>

      <div className='flex flex-col gap-3 w-full max-w-md'>
        <label className='flex flex-col gap-1'>
          <span className='text-sm opacity-70'>Ton prénom (optionnel)</span>
          <input
            type='text'
            value={prenomInput}
            onChange={handlePrenomChange}
            className='border px-2 py-1'
          />
        </label>
        <VestSelector value={vestSelect} onChange={setVestSelect} />
      </div>

      <button type='button' onClick={handleRoll} className='border px-4 py-2 font-bold uppercase'>
        TIRER MA PRIME
      </button>

      {roll && <ResultDisplay roll={roll} />}
    </main>
  )
}
