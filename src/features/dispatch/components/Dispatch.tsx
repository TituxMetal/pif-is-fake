import { DispatchGrid } from '~/features/dispatch/components/DispatchGrid'
import { DispatchHeader } from '~/features/dispatch/components/DispatchHeader'
import { useDispatchN } from '~/features/dispatch/hooks/useDispatchN'
import { useDispatchRoll } from '~/features/dispatch/hooks/useDispatchRoll'
import { useNoIndex } from '~/features/dispatch/hooks/useNoIndex'
import { Loading } from '~/features/home/components/Loading'
import { CommandEcho } from '~/features/shell'
import { useTheme } from '~/lib/theme'

export const Dispatch = () => {
  useNoIndex()
  const { theme } = useTheme()
  const interimCount = useDispatchN()
  const { phase, loading, view, generate, handleLoadingComplete } = useDispatchRoll(interimCount)

  const buttonLabel =
    view === null ? 'Générer la distribution' : 'Générer une nouvelle distribution'

  const headerSigle =
    phase === 'loading' && loading !== null ? loading.pendingView.sigle : (view?.sigle ?? null)
  const headerCardCount =
    phase === 'loading' && loading !== null
      ? loading.pendingView.cards.length
      : (view?.cards.length ?? null)

  return (
    <section className='flex w-full flex-col gap-8 py-12'>
      <DispatchHeader sigle={headerSigle} cardCount={headerCardCount} />

      {phase === 'loading' && loading !== null && (
        <>
          {theme === 'terminal' && (
            <CommandEcho
              command={`pif dispatch --site=${loading.pendingView.sigle} --n=${loading.pendingView.cards.length}`}
              framingLines={['Generating distribution', 'Shuffling vests']}
            />
          )}
          <Loading
            steps={loading.steps}
            durationMs={loading.durationMs}
            onComplete={handleLoadingComplete}
          />
        </>
      )}

      {phase !== 'loading' && (
        <button
          type='button'
          onClick={generate}
          className='flex min-h-12 cursor-pointer items-center justify-between gap-3 self-start border border-hi bg-hi px-4 py-3 font-mono text-sm font-bold tracking-wide text-ink-on-hi uppercase hover:bg-transparent hover:text-hi'
        >
          <span>{buttonLabel}</span>
          <span aria-hidden='true'>▶▶</span>
        </button>
      )}

      {phase === 'revealed' && view !== null && <DispatchGrid cards={view.cards} />}
    </section>
  )
}
