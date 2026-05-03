import { ManifesteDisclaimer } from '~/features/disclaimer/components/ManifesteDisclaimer'
import { TerminalDisclaimer } from '~/features/disclaimer/components/TerminalDisclaimer'
import { useTheme } from '~/lib/theme'

export const Disclaimer = () => {
  const { theme } = useTheme()

  if (theme === 'manifeste') return <ManifesteDisclaimer />

  return <TerminalDisclaimer />
}
