import { encode } from 'uqr'

/**
 * Encodes `value` as a QR code with no quiet zone and returns one SVG path: one rectangle per
 * horizontal run of dark modules. Each run overlaps the row below by a hair so anti-aliasing never
 * draws seams between rows.
 */
export function qrPath(value: string): { path: string; size: number } {
  const { data, size } = encode(value, { border: 0, ecc: 'M' })
  let path = ''
  data.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (!row[x]) {
        continue
      }
      const start = x
      while (row[x + 1]) {
        x++
      }
      const run = x - start + 1
      path += `M${start} ${y}h${run}v${y === size - 1 ? 1 : 1.05}h-${run}z`
    }
  })
  return { path, size }
}
