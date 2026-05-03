import type { CSSProperties } from 'react'

import { cardAccentClass, isWinner } from '~/features/dispatch/lib/cardStyling'
import { motifs } from '~/lib/banks'
import type { Bonus, Roll } from '~/types/roll.types'

interface ManifesteDispatchCardProps {
  card: Roll
  index: number
}

interface DecompositionRowProps {
  label: string
  value: number
}

const DecompositionRow = ({ label, value }: DecompositionRowProps) => {
  const fillRatio = Math.min(Math.max(value, 0), 200) / 200
  const fillStyle = { ['--bar-fill' as never]: `${fillRatio * 100}%` }

  return (
    <li className='flex flex-col gap-1.5'>
      <div className='flex items-baseline justify-between'>
        <span className='font-mono text-[10px] tracking-widest text-fg-dim uppercase'>{label}</span>
        <span className='font-display text-base tabular-nums text-hi'>{value}€</span>
      </div>
      <span className='block h-[3px] w-full bg-fg-faint'>
        <span
          aria-hidden='true'
          className='block h-full w-[var(--bar-fill)] bg-hi'
          style={fillStyle}
        />
      </span>
    </li>
  )
}

const bonusLabel = (bonus: Bonus): string | null => {
  if (bonus === 50) return 'Bonus surproduction'
  if (bonus === 100) return 'Bonus négocié'
  if (bonus === 150) return `Bonus — t'as bien fait de râler`

  return null
}

export const ManifesteDispatchCard = ({ card, index }: ManifesteDispatchCardProps) => {
  const { production, qualite, securite } = card.decomposition
  const total = production + qualite + securite + card.bonus
  const motif = motifs[card.motifIndex] ?? '(motif indisponible)'
  const bonus = bonusLabel(card.bonus)
  const winner = isWinner(total)
  const cardNumber = `#${String(index).padStart(2, '0')}`
  const winnerBg: CSSProperties | undefined = winner
    ? { backgroundColor: 'color-mix(in srgb, var(--color-hi) 6%, transparent)' }
    : undefined
  const totalClass = total === 0 ? 'text-red' : 'text-hi-2'

  return (
    <article
      data-vest={card.vest}
      style={winnerBg}
      className={`flex flex-col gap-4 border-t-2 bg-panel p-4 ${cardAccentClass(total, card.bonus)}`}
    >
      <header className='flex items-baseline justify-between gap-3'>
        <h2 className='font-display text-2xl leading-none tracking-tight text-hi uppercase'>
          {card.prenom}
        </h2>
        <span className='shrink-0 font-mono text-[10px] tracking-[0.15em] text-hi-2'>
          {cardNumber}
        </span>
      </header>

      <ul className='flex flex-col gap-2'>
        <DecompositionRow label='Prod' value={production} />
        <DecompositionRow label='Qual' value={qualite} />
        <DecompositionRow label='Sécu' value={securite} />
      </ul>

      {bonus !== null && (
        <p className='flex items-baseline justify-between border-l-[3px] border-hi-2 bg-hi-2/10 px-3 py-2 font-mono text-[10px] tracking-wide uppercase'>
          <span className='text-fg-strong'>{bonus}</span>
          <span className='font-display text-base tabular-nums text-hi-2'>+{card.bonus}€</span>
        </p>
      )}

      <p className='flex items-baseline justify-between border-t border-fg-faint pt-3'>
        <span className='font-mono text-[9px] font-bold tracking-[0.25em] text-hi-2 uppercase'>
          Total
        </span>
        <span
          className={`flex items-baseline gap-1 font-display text-2xl tabular-nums ${totalClass}`}
        >
          {winner && (
            <span role='img' aria-label='gagnant' title='Gagnant'>
              ★
            </span>
          )}
          {total}€
        </span>
      </p>

      <p className='border-l-2 border-hi-2 pl-3 font-body text-[13px] leading-snug text-fg-strong italic'>
        « {motif} »
      </p>
    </article>
  )
}
