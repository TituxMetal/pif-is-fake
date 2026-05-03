const BOOT_LINES = [
  'Loading kernel',
  'Mounting motifs.bank',
  'Init random seed',
  'Loading colleagues.dat',
  'Calibrating arbitrariness coefficient'
] as const

const LEADER_DOTS = '.'.repeat(200)

export const TerminalBootBlock = () => (
  <ul className='flex flex-col font-mono text-xs text-fg-dim'>
    {BOOT_LINES.map((line) => (
      <li key={line} className='pif-boot-line flex items-baseline whitespace-nowrap'>
        <span className='shrink-0'>{line}</span>
        <span aria-hidden='true' className='mx-1 flex-1 overflow-hidden text-fg-faint'>
          {LEADER_DOTS}
        </span>
        <span className='shrink-0 text-fg'>[ OK ]</span>
      </li>
    ))}
  </ul>
)
