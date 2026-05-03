import { Caret } from '~/features/shell'

export const TerminalHero = () => (
  <h1 className='flex flex-col font-mono text-[38px] font-bold leading-none uppercase md:text-[50px]'>
    <span>Prime</span>
    <span>
      Au
      <span className='text-hi'>
        Pif
        <Caret />
      </span>
    </span>
  </h1>
)
