import { Disclaimer } from '~/features/disclaimer'
import { Home } from '~/features/home'
import { AppShell } from '~/features/shell'
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

const pathFromIntent = (intent: RouteIntent): string => {
  if (intent.kind === 'disclaimer') return '~/avertissement'
  if (intent.kind === 'forced-prenom') return `~/pif/${intent.prenom}`
  if (intent.kind === 'forced-prenom-sigle') return `~/pif/${intent.prenom}/${intent.sigle}`
  if (intent.kind === 'replay') return `~/pif/${intent.prenom}/${intent.sigle}`

  return '~/pif'
}

export const App = () => {
  const intent = useRouteIntent()
  const path = pathFromIntent(intent)

  return (
    <AppShell path={path}>
      {intent.kind === 'disclaimer' ? (
        <Disclaimer />
      ) : (
        <Home key={homeKey(intent)} intent={intent} />
      )}
    </AppShell>
  )
}
