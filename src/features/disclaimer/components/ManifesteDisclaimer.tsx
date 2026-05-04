import {
  disclaimerHeading,
  disclaimerLegal,
  disclaimerMotivation,
  disclaimerSource
} from '~/features/disclaimer/content/disclaimerCopy'

export const ManifesteDisclaimer = () => (
  <section className='mx-auto flex w-full max-w-prose flex-col gap-6 py-12'>
    <h1 className='font-display text-4xl leading-[0.9] tracking-tighter text-fg-strong uppercase sm:text-6xl md:text-7xl'>
      {disclaimerHeading}
      <span className='text-hi'>{' !'}</span>
    </h1>

    {disclaimerLegal.map((paragraph) => (
      <p key={paragraph} className='font-body text-base leading-[1.55] text-fg-strong'>
        {paragraph}
      </p>
    ))}

    <hr className='border-0 border-t border-fg-faint' />

    <p className='font-body text-base leading-[1.55] text-fg-strong'>{disclaimerMotivation}</p>

    <p className='font-body text-base leading-[1.55] text-fg-strong'>
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
    </p>
  </section>
)
