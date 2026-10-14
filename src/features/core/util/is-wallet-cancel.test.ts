import { describe, expect, test } from 'bun:test'

import { isWalletCancel } from './is-wallet-cancel'

function mwaError(code: string): Error {
  return Object.assign(new Error(code), { code })
}

describe('isWalletCancel', () => {
  test('detects a closed session nested in cause', () => {
    const error = new Error('outer', { cause: new Error('inner', { cause: mwaError('ERROR_SESSION_CLOSED') }) })
    expect(isWalletCancel(error)).toBe(true)
  })

  test('is false for other errors', () => {
    expect(isWalletCancel(new Error('outer', { cause: mwaError('ERROR_WALLET_NOT_FOUND') }))).toBe(false)
    expect(isWalletCancel(undefined)).toBe(false)
  })
})
