import { ManifesteResult } from '~/features/home/components/ManifesteResult'
import { TerminalResult } from '~/features/home/components/TerminalResult'
import { useTheme } from '~/lib/theme'
import type { Roll } from '~/types/roll.types'

interface ResultDisplayProps {
  roll: Roll
}

export const ResultDisplay = ({ roll }: ResultDisplayProps) => {
  const { theme } = useTheme()

  if (theme === 'manifeste') return <ManifesteResult roll={roll} />

  return <TerminalResult roll={roll} />
}
