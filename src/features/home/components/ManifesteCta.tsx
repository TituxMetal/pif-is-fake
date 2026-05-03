type ManifesteCtaProps = {
  label: string
  onClick: () => void
}

export const ManifesteCta = ({ label, onClick }: ManifesteCtaProps) => (
  <button
    type='button'
    onClick={onClick}
    className='flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 border border-hi bg-hi px-4 py-3 font-display text-[22px] tracking-wide text-ink-on-hi uppercase hover:bg-transparent hover:text-hi md:text-[28px]'
  >
    <span>{label}</span>
    <span aria-hidden='true'>▶▶</span>
  </button>
)
