import { motifs } from '~/lib/banks'
import type { Bonus, Roll } from '~/types/roll.types'

interface ResultDisplayProps {
  roll: Roll
}

const getBonusLabel = (bonus: Bonus): string | null => {
  if (bonus === 50) return 'Bonus surproduction'
  if (bonus === 100) return 'Bonus négocié au bureau'
  if (bonus === 150) return `Bonus — t'as bien fait de râler`

  return null
}

export const ResultDisplay = ({ roll }: ResultDisplayProps) => {
  const { production, qualite, securite } = roll.decomposition
  const total = production + qualite + securite + roll.bonus
  const motif = motifs[roll.motifIndex] ?? '(motif indisponible)'
  const bonusLabel = getBonusLabel(roll.bonus)

  return (
    <article
      data-vest={roll.vest}
      className='flex w-full flex-col border border-fg-faint bg-panel font-mono text-sm'
    >
      <header className='border-b border-fg-faint p-5'>
        <p className='text-xs uppercase text-fg-dim'>Relevé de prime</p>
        <h2 className='mt-1 text-lg font-bold tracking-wide text-hi uppercase'>
          {roll.prenom} — {roll.sigle} Logistics
        </h2>
      </header>

      <ul className='flex flex-col gap-1 p-5 pb-3 tabular-nums'>
        <li className='flex justify-between'>
          <span className='text-fg-dim'>Production</span>
          <span>{production} €</span>
        </li>
        <li className='flex justify-between'>
          <span className='text-fg-dim'>Qualité</span>
          <span className={qualite === 0 ? 'text-red' : undefined}>{qualite} €</span>
        </li>
        <li className='flex justify-between'>
          <span className='text-fg-dim'>Sécurité</span>
          <span>{securite} €</span>
        </li>
      </ul>

      {bonusLabel && (
        <p className='mx-5 mb-3 flex justify-between bg-hi-2 px-3 py-2 font-bold tabular-nums text-bg'>
          <span className='uppercase'>{bonusLabel}</span>
          <span>+{roll.bonus} €</span>
        </p>
      )}

      <p className='mx-5 mb-5 flex items-baseline justify-between bg-hi px-4 py-3 text-bg'>
        <span className='text-xs font-bold uppercase'>Total</span>
        <span className='font-display text-3xl font-bold tabular-nums'>{total} €</span>
      </p>

      <p className='border-l-2 border-hi-2 mx-5 mb-5 pl-3 italic text-fg-dim'>{motif}</p>
    </article>
  )
}
