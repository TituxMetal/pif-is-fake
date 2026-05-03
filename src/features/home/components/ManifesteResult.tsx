import { motifs } from '~/lib/banks'
import { encodeRollHash } from '~/lib/hash'
import type { Bonus, Roll } from '~/types/roll.types'

interface ManifesteResultProps {
  roll: Roll
}

const bonusLabel = (bonus: Bonus): string | null => {
  if (bonus === 50) return 'Bonus surproduction'
  if (bonus === 100) return 'Bonus négocié'
  if (bonus === 150) return `Bonus — t'as bien fait de râler`

  return null
}

interface DecompositionRowProps {
  label: string
  value: number
}

const DecompositionRow = ({ label, value }: DecompositionRowProps) => {
  const fillRatio = Math.min(Math.max(value, 0), 200) / 200
  const fillStyle = { ['--bar-fill' as never]: `${fillRatio * 100}%` }

  return (
    <li className='flex flex-col gap-2 border-t border-fg-faint pt-3'>
      <div className='flex items-baseline justify-between'>
        <span className='font-mono text-[11px] tracking-widest text-fg-dim uppercase'>{label}</span>
        <span className='font-display text-2xl tabular-nums text-fg-strong'>{value}€</span>
      </div>
      <span className='block h-[4px] w-full bg-fg-faint'>
        <span
          aria-hidden='true'
          className='block h-full w-[var(--bar-fill)] bg-fg-strong'
          style={fillStyle}
        />
      </span>
    </li>
  )
}

export const ManifesteResult = ({ roll }: ManifesteResultProps) => {
  const { production, qualite, securite } = roll.decomposition
  const total = production + qualite + securite + roll.bonus
  const motif = motifs[roll.motifIndex] ?? '(motif indisponible)'
  const bonus = bonusLabel(roll.bonus)
  const hash = encodeRollHash(roll)

  return (
    <article data-vest={roll.vest} className='flex flex-col gap-8'>
      <header className='flex flex-col gap-1'>
        <span className='font-mono text-[10px] tracking-[0.2em] text-hi-2 uppercase'>Salarié</span>
        <h2 className='font-display text-[40px] leading-none tracking-tight text-fg-strong uppercase'>
          {roll.prenom}
        </h2>
        <p className='font-mono text-[11px] tracking-wide text-fg-dim uppercase'>
          Société {roll.sigle} Logistics · #{hash}
        </p>
      </header>

      <section className='flex flex-col gap-3'>
        <h3 className='font-mono text-[10px] tracking-[0.2em] text-hi-2 uppercase'>
          Décomposition
        </h3>
        <ul className='flex flex-col gap-3'>
          <DecompositionRow label='Production' value={production} />
          <DecompositionRow label='Qualité' value={qualite} />
          <DecompositionRow label='Sécurité' value={securite} />
        </ul>
      </section>

      {bonus !== null && (
        <p className='flex items-baseline justify-between border-l-[3px] border-hi-2 bg-hi-2/10 px-4 py-3 font-mono text-[12px] tracking-wide text-fg-strong uppercase'>
          <span>{bonus}</span>
          <span className='font-display text-xl tabular-nums text-hi-2'>+{roll.bonus}€</span>
        </p>
      )}

      <div className='flex flex-col gap-2 bg-hi p-6 text-ink-on-hi'>
        <span className='font-mono text-[10px] font-bold tracking-[0.3em] uppercase'>Total</span>
        <div className='flex items-end justify-between gap-4'>
          <span className='font-mono text-[9px] tracking-[0.1em] uppercase'>Net — Mai 2026</span>
          <span className='font-display text-[64px] leading-none tracking-tighter tabular-nums md:text-[80px]'>
            {total}€
          </span>
        </div>
      </div>

      <section className='flex flex-col gap-2'>
        <h3 className='font-mono text-[10px] tracking-[0.2em] text-hi-2 uppercase'>Motif</h3>
        <p className='border-l-2 border-hi-2 pl-3 font-body text-base leading-relaxed text-fg-strong italic'>
          « {motif} »
        </p>
      </section>
    </article>
  )
}
