import { useState } from 'react'

import { loadingSteps } from '~/lib/banks'
import { composeDispatchView } from '~/lib/generation/dispatchRoll'
import type { DispatchView } from '~/lib/generation/dispatchRoll'
import { pickN } from '~/lib/generation/pickers'

const LOADING_DURATION_MS = 6000
const LOADING_STEP_COUNT = 3

export type DispatchPhase = 'idle' | 'loading' | 'revealed'

interface LoadingState {
  steps: string[]
  durationMs: number
  pendingView: DispatchView
}

interface UseDispatchRollResult {
  phase: DispatchPhase
  loading: LoadingState | null
  view: DispatchView | null
  generate: () => void
  handleLoadingComplete: () => void
}

export const useDispatchRoll = (interimCount: number): UseDispatchRollResult => {
  const [phase, setPhase] = useState<DispatchPhase>('idle')
  const [loading, setLoading] = useState<LoadingState | null>(null)
  const [view, setView] = useState<DispatchView | null>(null)

  const generate = () => {
    const pendingView = composeDispatchView({ interimCount })

    setLoading({
      steps: pickN(loadingSteps, LOADING_STEP_COUNT),
      durationMs: LOADING_DURATION_MS,
      pendingView
    })
    setPhase('loading')
  }

  const handleLoadingComplete = () => {
    if (loading === null) return

    setView(loading.pendingView)
    setLoading(null)
    setPhase('revealed')
  }

  return { phase, loading, view, generate, handleLoadingComplete }
}
