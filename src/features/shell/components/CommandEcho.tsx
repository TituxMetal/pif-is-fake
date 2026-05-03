type CommandEchoProps = {
  command: string
  framingLines: ReadonlyArray<string>
}

const LEADER_DOTS = '.'.repeat(200)

export const CommandEcho = ({ command, framingLines }: CommandEchoProps) => (
  <div className='flex flex-col font-mono text-xs leading-relaxed text-fg-dim'>
    <p>
      <span aria-hidden='true' className='mr-1 text-fg'>
        $
      </span>
      {command}
    </p>
    {framingLines.map((line) => (
      <p key={line} className='flex items-baseline whitespace-nowrap'>
        <span className='shrink-0'>{line}</span>
        <span aria-hidden='true' className='mx-1 flex-1 overflow-hidden text-fg-faint'>
          {LEADER_DOTS}
        </span>
        <span className='shrink-0 text-fg'>[ OK ]</span>
      </p>
    ))}
  </div>
)
