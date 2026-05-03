type TerminalCtaProps = {
  label: string
  onClick: () => void
}

export const TerminalCta = ({ label, onClick }: TerminalCtaProps) => (
  <button
    type='button'
    onClick={onClick}
    className='flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 border border-hi bg-hi px-4 py-3 font-mono text-sm font-bold tracking-wide text-ink-on-hi uppercase hover:bg-transparent hover:text-hi'
  >
    <span className='flex items-center gap-2'>
      <span aria-hidden='true'>▶</span>
      {label}
    </span>
    <span aria-hidden='true'>↵</span>
  </button>
)
