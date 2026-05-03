interface TerminalDispatchHeaderProps {
  sigle: string | null
  cardCount: number | null
}

export const TerminalDispatchHeader = ({ sigle, cardCount }: TerminalDispatchHeaderProps) => {
  const sigleDisplay = sigle ?? '???'
  const countDisplay = cardCount === null ? '—' : String(cardCount)

  return (
    <header className='flex flex-col gap-2 font-mono'>
      <h1 className='text-3xl font-bold tracking-wide text-hi uppercase md:text-5xl'>
        <span aria-hidden='true' className='mr-2'>
          ┃
        </span>
        Distribution mensuelle
      </h1>
      <p className='text-xs text-fg-dim'>
        Société {sigleDisplay} Logistics · {countDisplay} salariés · MAI 2026
      </p>
    </header>
  )
}
