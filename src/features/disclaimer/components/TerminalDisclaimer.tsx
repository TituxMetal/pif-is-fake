import {
  disclaimerHeading,
  disclaimerLegal,
  disclaimerMotivation,
  disclaimerSource
} from '~/features/disclaimer/content/disclaimerCopy'
import { Caret } from '~/features/shell'

export const TerminalDisclaimer = () => (
  <section className='mx-auto flex w-full max-w-prose flex-col gap-6 py-12 font-mono text-sm leading-[1.55]'>
    <h1 className='text-3xl font-bold tracking-wide text-hi uppercase md:text-5xl'>
      <span aria-hidden='true' className='mr-2'>
        ┃
      </span>
      {disclaimerHeading}
    </h1>

    {disclaimerLegal.map((paragraph) => (
      <p key={paragraph} className='text-fg'>
        {paragraph}
      </p>
    ))}

    <p aria-hidden='true' className='text-fg-faint'>
      ──────────────────────────────
    </p>

    <p className='flex gap-2 text-fg-dim'>
      <span aria-hidden='true' className='shrink-0'>
        &gt;
      </span>
      <span>{disclaimerMotivation}</span>
    </p>

    <p className='flex gap-2 text-fg'>
      <span aria-hidden='true' className='shrink-0'>
        {'>'}
      </span>
      <span>
        {`${disclaimerSource.prefix} `}
        <a
          href={disclaimerSource.url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-hi underline underline-offset-2 hover:opacity-90'
        >
          {disclaimerSource.label}
        </a>
        .
      </span>
    </p>

    <p className='flex items-baseline gap-2 pt-2 text-fg'>
      <span aria-hidden='true'>$</span>
      <Caret />
    </p>
  </section>
)
