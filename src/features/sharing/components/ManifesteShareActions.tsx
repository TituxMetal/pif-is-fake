import { Toast } from '~/features/sharing/components/Toast'
import { useShareActions } from '~/features/sharing/hooks/useShareActions'
import type { Roll } from '~/types/roll.types'

interface ManifesteShareActionsProps {
  roll: Roll
}

const filledClass =
  'flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 border border-hi bg-hi px-4 py-3 font-mono text-[11px] font-bold tracking-[0.15em] text-ink-on-hi uppercase whitespace-nowrap hover:bg-transparent hover:text-hi'

const outlinedClass =
  'flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 border border-fg-dim bg-transparent px-4 py-3 font-mono text-[11px] tracking-[0.15em] text-fg uppercase whitespace-nowrap hover:border-hi hover:text-hi'

export const ManifesteShareActions = ({ roll }: ManifesteShareActionsProps) => {
  const { toastMessage, copyLink, share, exportImage } = useShareActions(roll)

  return (
    <>
      <div className='flex w-full flex-col gap-2 sm:flex-row'>
        <button type='button' onClick={copyLink} className={filledClass}>
          Copier le lien
          <span aria-hidden='true'>▶</span>
        </button>
        <button type='button' onClick={share} className={outlinedClass}>
          Partager
        </button>
        <button type='button' onClick={exportImage} className={outlinedClass}>
          Copier l'image
        </button>
      </div>
      <Toast message={toastMessage} />
    </>
  )
}
