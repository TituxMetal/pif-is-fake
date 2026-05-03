import { describe, expect, it } from 'bun:test'

import { app } from '~/server'

describe('server', () => {
  describe('GET /api/health', () => {
    it('returns status 200', async () => {
      const response = await app.request('/api/health')

      expect(response.status).toBe(200)
    })

    it('returns JSON body { status: "ok" }', async () => {
      const response = await app.request('/api/health')
      const body = await response.json()

      expect(body).toEqual({ status: 'ok' })
    })

    it('is registered before the SPA catch-all', async () => {
      const response = await app.request('/api/health')
      const contentType = response.headers.get('content-type') ?? ''

      expect(contentType).toContain('application/json')
    })
  })

  describe('robots.txt route', () => {
    it('is registered explicitly so static serving wins over the SPA catch-all', () => {
      const robotsRoute = app.routes.find((route) => route.path === '/robots.txt')

      expect(robotsRoute).toBeDefined()
    })
  })

  describe('GET /dispatch', () => {
    it('falls through to the SPA catch-all (HTML response)', async () => {
      const response = await app.request('/dispatch')
      const contentType = response.headers.get('content-type') ?? ''

      expect(contentType).toContain('text/html')
    })
  })
})
