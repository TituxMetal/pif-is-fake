import { motifs } from '~/lib/banks'
import type { Bonus, Roll } from '~/types/roll.types'

interface ResultDisplayProps {
  roll: Roll
}

const getBonusLabel = (bonus: Bonus): string | null => {
  if (bonus === 50) return 'Bonus surproduction'
  if (bonus === 100) return 'Bonus négocié au bureau'
  if (bonus === 150) return "Bonus — t'as bien fait de râler"
  return null
}

export const ResultDisplay = ({ roll }: ResultDisplayProps) => {
  const { production, qualite, securite } = roll.decomposition
  const total = production + qualite + securite + roll.bonus
  const motif = motifs[roll.motifIndex] ?? '(motif indisponible)'
  const bonusLabel = getBonusLabel(roll.bonus)

  return (
    <article className='border p-4 flex flex-col gap-2 max-w-md'>
      <header>
        <h2 className='text-2xl font-bold'>
          {roll.prenom} — {roll.sigle} Logistics
        </h2>
      </header>
      <ul className='font-mono text-sm'>
        <li>Production : {production} €</li>
        <li>Qualité : {qualite} €</li>
        <li>Sécurité : {securite} €</li>
        {bonusLabel && (
          <li>
            {bonusLabel} : +{roll.bonus} €
          </li>
        )}
      </ul>
      <p className='font-bold'>Total : {total} €</p>
      <p className='italic'>{motif}</p>
      <p className='text-xs opacity-70'>Gilet : {roll.vest}</p>
    </article>
  )
}
