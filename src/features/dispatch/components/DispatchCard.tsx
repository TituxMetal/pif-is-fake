import { ManifesteDispatchCard } from '~/features/dispatch/components/ManifesteDispatchCard'
import { TerminalDispatchCard } from '~/features/dispatch/components/TerminalDispatchCard'
import { useTheme } from '~/lib/theme'
import type { Roll } from '~/types/roll.types'

interface DispatchCardProps {
  card: Roll
  index: number
}

export const DispatchCard = ({ card, index }: DispatchCardProps) => {
  const { theme } = useTheme()

  if (theme === 'manifeste') return <ManifesteDispatchCard card={card} index={index} />

  return <TerminalDispatchCard card={card} index={index} />
}
