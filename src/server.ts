import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'

const app = new Hono()

app.get('/api/health', (c) => c.json({ status: 'ok' }))

app.use('/assets/*', serveStatic({ root: './dist' }))
app.use('/favicon.svg', serveStatic({ root: './dist' }))
app.use('/robots.txt', serveStatic({ root: './dist' }))

app.get('*', serveStatic({ root: './dist', path: '/index.html' }))

const port = Number(process.env.PORT ?? 3000)

if (process.env.NODE_ENV !== 'test') {
  serve({ fetch: app.fetch, port }, (info) => {
    // biome-ignore lint/suspicious/noConsole: server startup log
    console.log(`PIF running at http://localhost:${info.port}`)
  })
}

export { app }
