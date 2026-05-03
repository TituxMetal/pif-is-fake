import { ManifesteShareActions } from '~/features/sharing/components/ManifesteShareActions'
import { TerminalShareActions } from '~/features/sharing/components/TerminalShareActions'
import { useTheme } from '~/lib/theme'
import type { Roll } from '~/types/roll.types'

interface ShareActionsProps {
  roll: Roll
}

export const ShareActions = ({ roll }: ShareActionsProps) => {
  const { theme } = useTheme()

  if (theme === 'manifeste') return <ManifesteShareActions roll={roll} />

  return <TerminalShareActions roll={roll} />
}
