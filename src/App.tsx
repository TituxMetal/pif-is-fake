import { Disclaimer } from '~/features/disclaimer'
import { Dispatch } from '~/features/dispatch'
import { Home } from '~/features/home'
import { AppShell } from '~/features/shell'
import { encodeRollHash } from '~/lib/hash'
import { type RouteIntent, useDisplayPath, useRouteIntent } from '~/lib/routing'

const homeKey = (intent: RouteIntent): string => {
  if (intent.kind === 'forced-prenom') return `forced-prenom:${intent.prenom}`
  if (intent.kind === 'forced-prenom-sigle') {
    return `forced-prenom-sigle:${intent.prenom}/${intent.sigle}`
  }
  if (intent.kind === 'replay') {
    return `replay:${intent.prenom}/${intent.sigle}/${encodeRollHash(intent.roll)}`
  }

  return 'home'
}

const renderRoute = (intent: RouteIntent) => {
  if (intent.kind === 'disclaimer') return <Disclaimer />
  if (intent.kind === 'dispatch') return <Dispatch />

  return <Home key={homeKey(intent)} intent={intent} />
}

export const App = () => {
  const intent = useRouteIntent()
  const path = useDisplayPath()

  return <AppShell path={path}>{renderRoute(intent)}</AppShell>
}
