import { Disclaimer } from '~/features/disclaimer'
import { Home } from '~/features/home'

const DISCLAIMER_PATH = '/avertissement'

export const App = () => {
  if (window.location.pathname === DISCLAIMER_PATH) return <Disclaimer />

  return <Home />
}
