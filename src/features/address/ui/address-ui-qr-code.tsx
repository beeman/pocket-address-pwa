import { useMemo } from 'react'

import { qrPath } from './qr-path'

/** Dark-on-white, no quiet zone; the white card around it is the quiet zone. Fills its parent. */
export function AddressUiQrCode({ value }: { value: string }) {
  const { path, size } = useMemo(() => qrPath(value), [value])

  return (
    <svg className="block size-full" viewBox={`0 0 ${size} ${size}`}>
      <path d={path} fill="var(--qr-foreground)" />
    </svg>
  )
}
