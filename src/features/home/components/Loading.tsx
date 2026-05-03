import { useEffect, useState } from 'react'

interface LoadingProps {
  steps: string[]
  durationMs: number
  onComplete: () => void
}

export const Loading = ({ steps, durationMs, onComplete }: LoadingProps) => {
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

    return () => clearTimeout(timer)
  }, [stepIndex, steps, durationMs, onComplete])

  const currentStep = steps[stepIndex]

  if (currentStep === undefined) return null

  return (
    <div role='status' aria-live='polite' className='py-8 text-center'>
      <p className='font-mono text-sm text-hi'>{currentStep}</p>
    </div>
  )
}
