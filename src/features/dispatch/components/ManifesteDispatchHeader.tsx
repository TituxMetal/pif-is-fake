interface ManifesteDispatchHeaderProps {
  sigle: string | null
  cardCount: number | null
}

export const ManifesteDispatchHeader = ({ sigle, cardCount }: ManifesteDispatchHeaderProps) => {
  const sigleDisplay = sigle ?? '???'
  const countDisplay = cardCount === null ? '—' : String(cardCount)

  return (
    <header className='flex flex-col gap-3'>
      <h1 className='flex flex-col font-display text-4xl leading-[0.9] tracking-tighter text-fg-strong uppercase sm:text-6xl md:text-7xl'>
        <span>Distribution</span>
        <span>Mensuelle</span>
      </h1>
      <p className='font-mono text-[11px] tracking-wide text-fg-dim uppercase'>
        Société {sigleDisplay} Logistics · {countDisplay} salariés · Mai 2026
      </p>
    </header>
  )
}
