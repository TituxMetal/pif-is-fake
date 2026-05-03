import { cardAccentClass, isWinner } from '~/features/dispatch/lib/cardStyling'
import { motifs } from '~/lib/banks'
import type { Bonus, Roll } from '~/types/roll.types'

interface TerminalDispatchCardProps {
  card: Roll
  index: number
}

const BAR_CELLS = 10
const FILLED_CELL = '━'
const EMPTY_CELL = '─'

const buildBar = (value: number): string => {
  const ratio = Math.min(Math.max(value, 0), 200) / 200
  const filled = Math.round(ratio * BAR_CELLS)

  return FILLED_CELL.repeat(filled) + EMPTY_CELL.repeat(BAR_CELLS - filled)
}

const bonusLabel = (bonus: Bonus): string | null => {
  if (bonus === 50) return 'Bonus surproduction'
  if (bonus === 100) return 'Bonus négocié'
  if (bonus === 150) return `Bonus — t'as bien fait de râler`

  return null
}

export const TerminalDispatchCard = ({ card, index }: TerminalDispatchCardProps) => {
  const { production, qualite, securite } = card.decomposition
  const total = production + qualite + securite + card.bonus
  const motif = motifs[card.motifIndex] ?? '(motif indisponible)'
  const bonus = bonusLabel(card.bonus)
  const winner = isWinner(total)
  const cardNumber = `#${String(index).padStart(2, '0')}`
  const totalClass = total === 0 ? 'text-red' : 'text-hi-2'

  return (
    <article
      data-vest={card.vest}
      className={`flex flex-col gap-2 border-t-2 bg-panel p-3 font-mono text-xs ${cardAccentClass(total, card.bonus)}`}
    >
      <header className='flex items-baseline justify-between gap-2'>
        <h2 className='text-sm font-bold tracking-wide text-hi uppercase'>{card.prenom}</h2>
        <span className='shrink-0 text-[10px] text-hi-2'>{cardNumber}</span>
      </header>

      <ul className='flex flex-col gap-0.5 tabular-nums'>
        <li className='grid grid-cols-[3.5em_1fr_3em] items-baseline gap-1 whitespace-nowrap'>
          <span className='text-fg-dim'>Prod</span>
          <span aria-hidden='true' className='overflow-hidden text-hi'>
            {buildBar(production)}
          </span>
          <span className='text-right text-hi'>{production}€</span>
        </li>
        <li className='grid grid-cols-[3.5em_1fr_3em] items-baseline gap-1 whitespace-nowrap'>
          <span className='text-fg-dim'>Qual</span>
          <span aria-hidden='true' className='overflow-hidden text-hi'>
            {buildBar(qualite)}
          </span>
          <span className='text-right text-hi'>{qualite}€</span>
        </li>
        <li className='grid grid-cols-[3.5em_1fr_3em] items-baseline gap-1 whitespace-nowrap'>
          <span className='text-fg-dim'>Sécu</span>
          <span aria-hidden='true' className='overflow-hidden text-hi'>
            {buildBar(securite)}
          </span>
          <span className='text-right text-hi'>{securite}€</span>
        </li>
      </ul>

      {bonus !== null && (
        <p className='flex items-baseline justify-between text-[11px] tabular-nums text-hi-2'>
          <span>+ {bonus}</span>
          <span>+{card.bonus}€</span>
        </p>
      )}

      <p className='flex items-baseline justify-between border border-hi-2 px-2 py-1.5 tabular-nums'>
        <span className='text-[10px] font-bold tracking-wider text-hi-2 uppercase'>Total</span>
        <span
          className={`flex items-baseline gap-1 font-display text-base font-bold ${totalClass}`}
        >
          {winner && (
            <span role='img' aria-label='gagnant' title='Gagnant'>
              ★
            </span>
          )}
          {total}€
        </span>
      </p>

      <p className='border-l-2 border-hi-2 pl-2 text-[11px] text-fg-dim italic'>« {motif} »</p>
    </article>
  )
}
