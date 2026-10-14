import { describe, expect, test } from 'bun:test'

import { isWebShell } from './is-web-shell'

describe('isWebShell', () => {
  test('detects the web shell user agent', () => {
    expect(
      isWebShell(
        'Mozilla/5.0 (Linux; Android 16; Seeker Build/BP2A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/154.0.0.0 Mobile Safari/537.36 Solana Mobile Web Shell',
      ),
    ).toBe(true)
  })

  test('is false in Chrome and Trusted Web Activities', () => {
    expect(
      isWebShell(
        'Mozilla/5.0 (Linux; Android 16; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Mobile Safari/537.36',
      ),
    ).toBe(false)
  })
})
