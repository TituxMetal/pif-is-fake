import { type ChangeEvent, useState } from 'react'

import { DispatchTriggerLink } from '~/features/home/components/DispatchTriggerLink'
import { Loading } from '~/features/home/components/Loading'
import { ManifesteCta } from '~/features/home/components/ManifesteCta'
import { ManifesteHero } from '~/features/home/components/ManifesteHero'
import { ManifestePitch } from '~/features/home/components/ManifestePitch'
import { ManifestePrenomInput } from '~/features/home/components/ManifestePrenomInput'
import { ManifesteVestSelector } from '~/features/home/components/ManifesteVestSelector'
import { ResultDisplay } from '~/features/home/components/ResultDisplay'
import { TerminalBootBlock } from '~/features/home/components/TerminalBootBlock'
import { CommandEcho } from '~/features/shell'
import { TerminalCta } from '~/features/home/components/TerminalCta'
import { TerminalHero } from '~/features/home/components/TerminalHero'
import { TerminalPitch } from '~/features/home/components/TerminalPitch'
import { TerminalPrenomInput } from '~/features/home/components/TerminalPrenomInput'
import { TerminalVestSelector } from '~/features/home/components/TerminalVestSelector'
import type { HomeProps, VestSelectValue } from '~/features/home/types/home.types'
import { ShareActions } from '~/features/sharing'
import { loadingSteps } from '~/lib/banks'
import { composeRoll, isTriggerSigle } from '~/lib/generation'
import { pickN } from '~/lib/generation/pickers'
import { buildPath, emitPathChange } from '~/lib/routing'
import type { RouteIntent } from '~/lib/routing'
import { useTheme } from '~/lib/theme'
import { sanitizePrenom } from '~/lib/validation'
import type { Roll } from '~/types/roll.types'

type Phase = 'idle' | 'loading' | 'revealed'

interface LoadingState {
  steps: string[]
  durationMs: number
  pendingRoll: Roll
}

const FRESH_LOADING_MS = 4000
const FRESH_LOADING_STEP_COUNT = 2
const REPLAY_LOADING_MS = 1000
const REPLAY_LOADING_STEP_COUNT = 1

const initialPrenomFor = (intent: RouteIntent): string => {
  if (intent.kind === 'forced-prenom') return intent.prenom
  if (intent.kind === 'forced-prenom-sigle') return intent.prenom
  if (intent.kind === 'replay') return intent.prenom

  return ''
}

const initialVestFor = (intent: RouteIntent): VestSelectValue => {
  if (intent.kind === 'replay') return intent.roll.vest

  return 'random'
}

const initialForcedSigleFor = (intent: RouteIntent): string | null => {
  if (intent.kind === 'forced-prenom-sigle') return intent.sigle

  return null
}

const initialPhaseFor = (intent: RouteIntent): Phase => {
  if (intent.kind === 'replay') return 'loading'

  return 'idle'
}

const initialLoadingFor = (intent: RouteIntent): LoadingState | null => {
  if (intent.kind !== 'replay') return null

  return {
    steps: pickN(loadingSteps, REPLAY_LOADING_STEP_COUNT),
    durationMs: REPLAY_LOADING_MS,
    pendingRoll: intent.roll
  }
}

export const Home = ({ intent }: HomeProps) => {
  const { theme } = useTheme()
  const [prenomInput, setPrenomInput] = useState(() => initialPrenomFor(intent))
  const [vestSelect, setVestSelect] = useState<VestSelectValue>(() => initialVestFor(intent))
  const [forcedSigle, setForcedSigle] = useState<string | null>(() => initialForcedSigleFor(intent))
  const [phase, setPhase] = useState<Phase>(() => initialPhaseFor(intent))
  const [loading, setLoading] = useState<LoadingState | null>(() => initialLoadingFor(intent))
  const [roll, setRoll] = useState<Roll | null>(null)

  const handlePrenomChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrenomInput(event.target.value)
  }

  const handleRoll = () => {
    const prenom = sanitizePrenom(prenomInput)
    const vest = vestSelect === 'random' ? undefined : vestSelect
    const sigle = forcedSigle ?? undefined
    const composed = composeRoll({ prenom, sigle, vest })

    setLoading({
      steps: pickN(loadingSteps, FRESH_LOADING_STEP_COUNT),
      durationMs: FRESH_LOADING_MS,
      pendingRoll: composed
    })
    setForcedSigle(null)
    setPhase('loading')
  }

  const handleLoadingComplete = () => {
    if (loading === null) return

    setRoll(loading.pendingRoll)
    setPhase('revealed')
    setLoading(null)
    window.history.replaceState(null, '', buildPath(loading.pendingRoll))
    emitPathChange()
  }

  const ctaLabel = roll === null ? 'Tirer ma prime' : 'Tirer une autre prime'

  return (
    <section className='flex w-full flex-col gap-8 py-12'>
      {theme === 'terminal' && phase === 'idle' && <TerminalBootBlock />}
      {theme === 'manifeste' && (
        <span className='inline-flex items-center self-start bg-hi px-3 py-1 font-mono text-xs font-bold tracking-widest text-ink-on-hi uppercase'>
          MAI 2026
        </span>
      )}
      <header className='flex flex-col gap-4'>
        {theme === 'terminal' ? <TerminalHero /> : <ManifesteHero />}
        {theme === 'terminal' ? <TerminalPitch /> : <ManifestePitch />}
      </header>

      {phase === 'loading' && loading !== null && (
        <>
          {theme === 'terminal' && (
            <CommandEcho
              command={`pif draw --user=${loading.pendingRoll.prenom.toUpperCase()} --site=${loading.pendingRoll.sigle}`}
              framingLines={['Connecting to /dev/arbitrary', 'Drawing prime']}
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
        <>
          <div className='flex w-full flex-col gap-4'>
            {theme === 'terminal' ? (
              <TerminalPrenomInput value={prenomInput} onChange={handlePrenomChange} />
            ) : (
              <ManifestePrenomInput value={prenomInput} onChange={handlePrenomChange} />
            )}
            {theme === 'terminal' ? (
              <TerminalVestSelector value={vestSelect} onChange={setVestSelect} />
            ) : (
              <ManifesteVestSelector value={vestSelect} onChange={setVestSelect} />
            )}
          </div>

          {theme === 'terminal' ? (
            <TerminalCta label={ctaLabel} onClick={handleRoll} />
          ) : (
            <ManifesteCta label={ctaLabel} onClick={handleRoll} />
          )}

          {roll && <ResultDisplay roll={roll} />}
          {roll && <ShareActions roll={roll} />}
          {roll && isTriggerSigle(roll.sigle) && <DispatchTriggerLink />}
        </>
      )}
    </section>
  )
}
