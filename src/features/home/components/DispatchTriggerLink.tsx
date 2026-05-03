export const DispatchTriggerLink = () => {
  return (
    <a
      href='/dispatch'
      className='flex min-h-11 items-center justify-between gap-2 border border-hi-2 border-l-4 border-l-hi-2 bg-panel px-3 py-2 font-mono text-xs uppercase tracking-wide text-hi-2 hover:bg-hi-2 hover:text-bg'
    >
      <span>Tiens donc. Dispatch des primes disponible</span>
      <span aria-hidden='true'>→</span>
    </a>
  )
}
