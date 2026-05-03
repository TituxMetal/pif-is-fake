import { useLoadingProgress } from '~/features/home/hooks/useLoadingProgress'
import { useTheme } from '~/lib/theme'

type LoadingProps = {
  steps: string[]
  durationMs: number
  onComplete: () => void
}

const LEADER_DOTS = '.'.repeat(200)

export const Loading = ({ steps, durationMs, onComplete }: LoadingProps) => {
  const { theme } = useTheme()
  const stepIndex = useLoadingProgress(steps, durationMs, onComplete)

  if (theme === 'terminal') {
    const visibleSteps = steps.slice(0, stepIndex + 1)

    return (
      <ul
        role='status'
        aria-live='polite'
        className='flex flex-col font-mono text-xs leading-relaxed text-fg-dim'
      >
        {visibleSteps.map((step, index) => {
          const isComplete = index < stepIndex

          return (
            <li key={step} className='flex items-baseline whitespace-nowrap'>
              <span aria-hidden='true' className='mr-2 shrink-0 text-fg'>
                $
              </span>
              <span className='shrink-0'>{step}</span>
              <span aria-hidden='true' className='mx-1 flex-1 overflow-hidden text-fg-faint'>
                {LEADER_DOTS}
              </span>
              <span className={`shrink-0 ${isComplete ? 'text-fg' : 'text-fg-dim'}`}>
                {isComplete ? '[ OK ]' : '...'}
              </span>
            </li>
          )
        })}
      </ul>
    )
  }

  const currentStep = steps[stepIndex]

  if (currentStep === undefined) return null

  return (
    <div role='status' aria-live='polite' className='py-8 text-center'>
      <p className='font-mono text-sm text-fg-dim'>{currentStep}</p>
    </div>
  )
}
