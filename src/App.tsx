import { Disclaimer } from '~/features/disclaimer'
import { Home } from '~/features/home'
import { type RouteIntent, useRouteIntent } from '~/lib/routing'

const homeKey = (intent: RouteIntent): string => {
  if (intent.kind === 'forced-prenom') return `forced-prenom:${intent.prenom}`
  if (intent.kind === 'forced-prenom-sigle') {
    return `forced-prenom-sigle:${intent.prenom}/${intent.sigle}`
  }
  if (intent.kind === 'replay') {
    return `replay:${intent.prenom}/${intent.sigle}/${window.location.hash.slice(1)}`
  }

  return 'home'
}

export const App = () => {
  const intent = useRouteIntent()

  if (intent.kind === 'disclaimer') return <Disclaimer />

  return <Home key={homeKey(intent)} intent={intent} />
}
