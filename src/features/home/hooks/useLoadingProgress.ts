import { useEffect, useState } from 'react'

export const useLoadingProgress = (
  steps: ReadonlyArray<string>,
  durationMs: number,
  onComplete: () => void
): number => {
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    if (steps.length === 0) {
      onComplete()

      return
    }

    const stepDurationMs = durationMs / steps.length
    const timer = setTimeout(() => {
      if (stepIndex < steps.length - 1) {
        setStepIndex(stepIndex + 1)

        return
      }

      onComplete()
    }, stepDurationMs)

    return () => {
      clearTimeout(timer)
    }
  }, [stepIndex, steps, durationMs, onComplete])

  return stepIndex
}
