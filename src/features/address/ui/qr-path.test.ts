import { describe, expect, test } from 'bun:test'

import { qrPath } from './qr-path'

describe('qrPath', () => {
  const { path, size } = qrPath('7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU')

  test('starts with the top-left finder pattern as one 7-module run', () => {
    expect(path.startsWith('M0 0h7v1.05h-7z')).toBe(true)
  })

  test('overlaps every row except the last', () => {
    expect(path).toMatch(/v1h-\d+z$/)
    expect(path).not.toContain(`M0 ${size - 1}h7v1.05`)
  })
})
