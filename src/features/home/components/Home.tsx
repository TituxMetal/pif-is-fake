import { type ChangeEvent, useState } from 'react'

import { Loading } from '~/features/home/components/Loading'
import { ResultDisplay } from '~/features/home/components/ResultDisplay'
import { VestSelector } from '~/features/home/components/VestSelector'
import type { HomeProps, VestSelectValue } from '~/features/home/types/home.types'
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

export const Home = ({ intent }: HomeProps) => {
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
    <section className='mx-auto flex w-full max-w-md flex-col gap-8 py-12'>
      <header className='flex flex-col gap-4'>
        <h1 className='wordmark font-display text-4xl leading-none tracking-tight uppercase md:text-5xl'>
          <span className='wordmark-prime'>Prime</span>
          <span className='wordmark-au'>Au</span>
          <span className='wordmark-pif text-hi'>Pif</span>
        </h1>
        <p className='font-mono text-xs leading-relaxed text-fg-dim'>
          Tirage mensuel arbitraire.
          <br />
          <span className='text-hi'>0 à 350 €</span>. Personne sait pourquoi.
        </p>
      </header>

      {phase === 'loading' && loading !== null && (
        <Loading
          steps={loading.steps}
          durationMs={loading.durationMs}
          onComplete={handleLoadingComplete}
        />
      )}

      {phase !== 'loading' && (
        <>
          <div className='flex w-full flex-col gap-4'>
            <label className='flex flex-col gap-2 font-mono text-xs uppercase text-fg-dim'>
              ▸ Ton prénom (optionnel)
              <span className='flex min-h-11 items-center gap-2 border border-fg-faint border-l-2 border-l-hi bg-panel px-3'>
                <span aria-hidden='true' className='text-fg-dim'>
                  $
                </span>
                <input
                  type='text'
                  value={prenomInput}
                  onChange={handlePrenomChange}
                  className='flex-1 bg-transparent py-2 font-mono text-sm text-fg focus:outline-none'
                />
              </span>
            </label>
            <VestSelector value={vestSelect} onChange={setVestSelect} />
          </div>

          <button
            type='button'
            onClick={handleRoll}
            className='flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 border-2 border-hi bg-hi px-4 py-3 font-mono text-sm font-bold tracking-wide uppercase text-bg hover:bg-bg hover:text-hi'
          >
            <span>{roll === null ? 'Tirer ma prime' : 'Tirer une autre prime'}</span>
            <span aria-hidden='true'>▶▶</span>
          </button>

          {roll && <ResultDisplay roll={roll} />}
        </>
      )}
    </section>
  )
}
