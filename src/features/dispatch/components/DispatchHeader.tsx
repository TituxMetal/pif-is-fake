import { ManifesteDispatchHeader } from '~/features/dispatch/components/ManifesteDispatchHeader'
import { TerminalDispatchHeader } from '~/features/dispatch/components/TerminalDispatchHeader'
import { useTheme } from '~/lib/theme'

interface DispatchHeaderProps {
  sigle: string | null
  cardCount: number | null
}

export const DispatchHeader = ({ sigle, cardCount }: DispatchHeaderProps) => {
  const { theme } = useTheme()

  if (theme === 'manifeste') return <ManifesteDispatchHeader sigle={sigle} cardCount={cardCount} />

  return <TerminalDispatchHeader sigle={sigle} cardCount={cardCount} />
}
