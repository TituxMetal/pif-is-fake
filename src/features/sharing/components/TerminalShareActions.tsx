import { Toast } from '~/features/sharing/components/Toast'
import { useShareActions } from '~/features/sharing/hooks/useShareActions'
import type { Roll } from '~/types/roll.types'

interface TerminalShareActionsProps {
  roll: Roll
}

const filledClass =
  'flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 border border-hi bg-hi px-3 py-2 font-mono text-xs font-bold tracking-wide text-ink-on-hi uppercase whitespace-nowrap hover:bg-transparent hover:text-hi'

const outlinedClass =
  'flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 border border-hi-2 bg-transparent px-3 py-2 font-mono text-xs font-bold tracking-wide text-hi-2 uppercase whitespace-nowrap hover:bg-hi-2 hover:text-ink-on-hi'

const ghostClass =
  'flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 border border-fg bg-transparent px-3 py-2 font-mono text-xs font-bold tracking-wide text-fg uppercase whitespace-nowrap hover:bg-fg hover:text-bg'

export const TerminalShareActions = ({ roll }: TerminalShareActionsProps) => {
  const { toastMessage, copyLink, share, exportImage } = useShareActions(roll)

  return (
    <>
      <div className='flex w-full flex-col gap-2 sm:flex-row'>
        <button type='button' onClick={copyLink} className={filledClass}>
          [F1] Copier lien
        </button>
        <button type='button' onClick={share} className={outlinedClass}>
          [F2] Partager
        </button>
        <button type='button' onClick={exportImage} className={ghostClass}>
          [F3] Copier image
        </button>
      </div>
      <Toast message={toastMessage} />
    </>
  )
}
