import { afterEach, describe, expect, it, mock } from 'bun:test'

import { shareViaWebShare, webShareSupported } from '~/lib/share/webShare'

interface MutableNavigator {
  share?: Navigator['share']
}

const mutableNavigator = navigator as unknown as MutableNavigator
const originalShare = mutableNavigator.share

afterEach(() => {
  if (originalShare === undefined) {
    delete mutableNavigator.share

    return
  }

  mutableNavigator.share = originalShare
})

describe('webShareSupported', () => {
  it('returns true when navigator.share is a function', () => {
    mutableNavigator.share = mock(() => Promise.resolve())

    expect(webShareSupported()).toBe(true)
  })

  it('returns false when navigator.share is missing', () => {
    delete mutableNavigator.share

    expect(webShareSupported()).toBe(false)
  })
})

describe('shareViaWebShare', () => {
  it('calls navigator.share with url and title and returns true on success', async () => {
    const shareMock = mock(() => Promise.resolve())
    mutableNavigator.share = shareMock

    const result = await shareViaWebShare('https://pif.tuxlab.fr/Jean/GIT#abcdef', 'PIF — Jean')

    expect(result).toBe(true)
    expect(shareMock).toHaveBeenCalledTimes(1)
    expect(shareMock).toHaveBeenCalledWith({
      url: 'https://pif.tuxlab.fr/Jean/GIT#abcdef',
      title: 'PIF — Jean'
    })
  })

  it('returns false when navigator.share rejects (user cancel or error)', async () => {
    mutableNavigator.share = mock(() => Promise.reject(new Error('AbortError')))

    const result = await shareViaWebShare('https://example.com', 'title')

    expect(result).toBe(false)
  })

  it('returns false when navigator.share is unsupported', async () => {
    delete mutableNavigator.share

    const result = await shareViaWebShare('https://example.com', 'title')

    expect(result).toBe(false)
  })
})
