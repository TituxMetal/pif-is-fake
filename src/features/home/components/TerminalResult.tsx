import { Caret } from '~/features/shell'
import { motifs } from '~/lib/banks'
import { encodeRollHash } from '~/lib/hash'
import type { Bonus, Roll } from '~/types/roll.types'

interface TerminalResultProps {
  roll: Roll
}

const BAR_CELLS = 16
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

export const TerminalResult = ({ roll }: TerminalResultProps) => {
  const { production, qualite, securite } = roll.decomposition
  const total = production + qualite + securite + roll.bonus
  const motif = motifs[roll.motifIndex] ?? '(motif indisponible)'
  const bonus = bonusLabel(roll.bonus)
  const hash = encodeRollHash(roll)

  return (
    <article
      data-vest={roll.vest}
      className='flex flex-col gap-4 font-mono text-[13px] leading-relaxed text-fg'
    >
      <h2 className='text-sm font-bold tracking-wide text-hi uppercase'>
        <span aria-hidden='true' className='mr-2'>
          ┃
        </span>
        Relevé de prime — MAI 2026
      </h2>

      <dl className='grid grid-cols-[6.5em_1fr] gap-y-1'>
        <dt className='text-fg-dim'>salarié</dt>
        <dd className='text-fg-strong uppercase'>{roll.prenom}</dd>
        <dt className='text-fg-dim'>société</dt>
        <dd className='text-fg-strong'>{roll.sigle} Logistics</dd>
        <dt className='text-fg-dim'>tirage</dt>
        <dd className='text-fg-dim'>#{hash}</dd>
      </dl>

      <section className='flex flex-col gap-1'>
        <p className='text-fg-dim'>── DÉCOMPOSITION ──────────────</p>
        <ul className='flex flex-col gap-0 tabular-nums'>
          <li className='grid grid-cols-[6.5em_1fr_3.5em] items-baseline gap-2 whitespace-nowrap'>
            <span className='text-fg-dim'>Production</span>
            <span aria-hidden='true' className='overflow-hidden text-fg'>
              {buildBar(production)}
            </span>
            <span className='text-right text-fg'>{production}€</span>
          </li>
          <li className='grid grid-cols-[6.5em_1fr_3.5em] items-baseline gap-2 whitespace-nowrap'>
            <span className='text-fg-dim'>Qualité</span>
            <span aria-hidden='true' className='overflow-hidden text-fg'>
              {buildBar(qualite)}
            </span>
            <span className='text-right text-fg'>{qualite}€</span>
          </li>
          <li className='grid grid-cols-[6.5em_1fr_3.5em] items-baseline gap-2 whitespace-nowrap'>
            <span className='text-fg-dim'>Sécurité</span>
            <span aria-hidden='true' className='overflow-hidden text-fg'>
              {buildBar(securite)}
            </span>
            <span className='text-right text-fg'>{securite}€</span>
          </li>
        </ul>
      </section>

      <section className='flex flex-col gap-1'>
        <p className='text-fg-dim'>── BONUS ──────────────────────</p>
        {bonus === null ? (
          <p className='text-fg-dim italic'>(aucun — fais profil bas)</p>
        ) : (
          <p className='flex items-baseline justify-between border border-fg-faint px-3 py-2 tabular-nums'>
            <span>
              <span aria-hidden='true' className='mr-2 text-hi-2'>
                +
              </span>
              {bonus}
            </span>
            <span className='text-hi-2'>+{roll.bonus}€</span>
          </p>
        )}
      </section>

      <p className='flex items-baseline justify-between border border-hi bg-hi px-4 py-3 tabular-nums text-ink-on-hi'>
        <span className='text-xs font-bold tracking-wider uppercase'>
          <span aria-hidden='true' className='mr-2'>
            =
          </span>
          Total
        </span>
        <span className='font-display text-3xl font-bold'>{total} €</span>
      </p>

      <section className='flex flex-col gap-1'>
        <p className='text-fg-dim'>── MOTIF ──────────────────────</p>
        <p className='flex gap-2 text-fg'>
          <span aria-hidden='true' className='text-hi-2'>
            ┃
          </span>
          <span>« {motif} »</span>
        </p>
      </section>

      <p className='flex items-baseline gap-2 pt-2 text-fg'>
        <span aria-hidden='true'>$</span>
        <Caret />
      </p>
    </article>
  )
}
