import { type ChangeEvent, useState } from 'react'

import { Loading } from '~/features/home/components/Loading'
import { ResultDisplay } from '~/features/home/components/ResultDisplay'
import { VestSelector } from '~/features/home/components/VestSelector'
import { useRouteIntent } from '~/features/home/hooks/useRouteIntent'
import type { VestSelectValue } from '~/features/home/types/home.types'
import { loadingSteps } from '~/lib/banks'
import { composeRoll } from '~/lib/generation'
import { pickN } from '~/lib/generation/pickers'
import { buildPath } from '~/lib/routing'
import type { RouteIntent } from '~/lib/routing'
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

export const Home = () => {
  const intent = useRouteIntent()

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
  }

  return (
    <main className='min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-base-100 text-base-content'>
      <h1 className='text-4xl font-bold tracking-tight'>PrimeAuPif</h1>

      {phase === 'loading' && loading !== null && (
        <Loading
          steps={loading.steps}
          durationMs={loading.durationMs}
          onComplete={handleLoadingComplete}
        />
      )}

      {phase !== 'loading' && (
        <>
          <div className='flex flex-col gap-3 w-full max-w-md'>
            <label className='flex flex-col gap-1'>
              <span className='text-sm opacity-70'>Ton prénom (optionnel)</span>
              <input
                type='text'
                value={prenomInput}
                onChange={handlePrenomChange}
                className='border px-2 py-1'
              />
            </label>
            <VestSelector value={vestSelect} onChange={setVestSelect} />
          </div>

          <button
            type='button'
            onClick={handleRoll}
            className='border px-4 py-2 font-bold uppercase'
          >
            {roll === null ? 'Tirer ma prime' : 'Tirer une autre prime'}
          </button>

          {roll && <ResultDisplay roll={roll} />}
        </>
      )}
    </main>
  )
}
